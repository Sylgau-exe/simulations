// server.js - BizSimHub Backend Server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { initializeDatabase, UserDB, ScoreDB, PaymentDB, EventDB } = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

// Environment variables (set these in .env file)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_your_stripe_secret_key';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_your_webhook_secret';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Initialize Stripe
const stripe = require('stripe')(STRIPE_SECRET_KEY);

// Stripe Price IDs (create these in your Stripe Dashboard)
const PRICE_IDS = {
  pro_monthly: process.env.STRIPE_PRICE_PRO_MONTHLY || 'price_pro_monthly',
  pro_annual: process.env.STRIPE_PRICE_PRO_ANNUAL || 'price_pro_annual',
  enterprise_monthly: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY || 'price_enterprise_monthly',
  enterprise_annual: process.env.STRIPE_PRICE_ENTERPRISE_ANNUAL || 'price_enterprise_annual'
};

// Middleware
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

// Raw body needed for Stripe webhooks
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));
app.use(express.json());

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = decoded;
    next();
  });
};

// Helper to sanitize user object (remove sensitive fields)
const sanitizeUser = (user) => {
  if (!user) return null;
  const { password_hash, ...safeUser } = user;
  return safeUser;
};

// ============================================
// AUTH ROUTES
// ============================================

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    
    // Check if user exists
    const existingUser = UserDB.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create user
    const user = UserDB.create(email, passwordHash, name);
    
    // Create Stripe customer
    try {
      const customer = await stripe.customers.create({
        email: email,
        name: name,
        metadata: { userId: user.id.toString() }
      });
      
      UserDB.update(user.id, { stripe_customer_id: customer.id });
      user.stripe_customer_id = customer.id;
    } catch (stripeError) {
      console.error('Stripe customer creation failed:', stripeError.message);
      // Continue without Stripe customer - can create later
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      message: 'Registration successful',
      token,
      user: sanitizeUser(user)
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find user
    const user = UserDB.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      message: 'Login successful',
      token,
      user: sanitizeUser(user)
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = UserDB.findById(req.user.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ user: sanitizeUser(user) });
});

// Update profile
app.patch('/api/auth/profile', authenticateToken, (req, res) => {
  const { name, organization, role } = req.body;
  
  const user = UserDB.update(req.user.userId, { name, organization, role });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json({ user: sanitizeUser(user) });
});

// ============================================
// STRIPE / SUBSCRIPTION ROUTES
// ============================================

// Create checkout session
app.post('/api/stripe/create-checkout-session', authenticateToken, async (req, res) => {
  try {
    const { planId, billingCycle = 'monthly' } = req.body;
    const user = UserDB.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Get the appropriate price ID
    const priceKey = `${planId}_${billingCycle}`;
    const priceId = PRICE_IDS[priceKey];
    
    if (!priceId) {
      return res.status(400).json({ error: 'Invalid plan selected' });
    }
    
    // Create or get Stripe customer
    let customerId = user.stripe_customer_id;
    
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { userId: user.id.toString() }
      });
      customerId = customer.id;
      UserDB.update(user.id, { stripe_customer_id: customerId });
    }
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1
      }],
      mode: 'subscription',
      success_url: `${FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/pricing`,
      metadata: {
        userId: user.id.toString(),
        planId: planId
      },
      subscription_data: {
        metadata: {
          userId: user.id.toString(),
          planId: planId
        }
      }
    });
    
    res.json({ sessionId: session.id, url: session.url });
    
  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Create customer portal session (for managing subscription)
app.post('/api/stripe/create-portal-session', authenticateToken, async (req, res) => {
  try {
    const user = UserDB.findById(req.user.userId);
    
    if (!user || !user.stripe_customer_id) {
      return res.status(400).json({ error: 'No subscription found' });
    }
    
    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripe_customer_id,
      return_url: `${FRONTEND_URL}/dashboard`
    });
    
    res.json({ url: session.url });
    
  } catch (error) {
    console.error('Portal session error:', error);
    res.status(500).json({ error: 'Failed to create portal session' });
  }
});

// Get subscription status
app.get('/api/stripe/subscription', authenticateToken, async (req, res) => {
  try {
    const user = UserDB.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    let stripeSubscription = null;
    
    if (user.stripe_subscription_id) {
      try {
        stripeSubscription = await stripe.subscriptions.retrieve(user.stripe_subscription_id);
      } catch (e) {
        console.error('Failed to retrieve subscription:', e.message);
      }
    }
    
    res.json({
      tier: user.subscription_tier,
      status: user.subscription_status,
      stripeSubscriptionId: user.stripe_subscription_id,
      startDate: user.subscription_start_date,
      endDate: user.subscription_end_date,
      stripeDetails: stripeSubscription ? {
        status: stripeSubscription.status,
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
        cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end
      } : null
    });
    
  } catch (error) {
    console.error('Subscription fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch subscription' });
  }
});

// Stripe Webhook
app.post('/api/webhooks/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Check if we've already processed this event
  if (EventDB.exists(event.id)) {
    console.log('Event already processed:', event.id);
    return res.json({ received: true });
  }
  
  console.log('Processing webhook event:', event.type);
  
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = parseInt(session.metadata.userId);
        const planId = session.metadata.planId;
        
        if (userId && planId) {
          UserDB.updateSubscription(userId, planId, 'active', session.subscription);
          console.log(`✅ Subscription activated for user ${userId}: ${planId}`);
        }
        break;
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const user = UserDB.findByStripeCustomerId(subscription.customer);
        
        if (user) {
          const status = subscription.status === 'active' ? 'active' : 
                         subscription.status === 'past_due' ? 'past_due' : 'inactive';
          UserDB.update(user.id, { 
            subscription_status: status,
            subscription_end_date: subscription.cancel_at ? new Date(subscription.cancel_at * 1000).toISOString() : null
          });
          console.log(`✅ Subscription updated for user ${user.id}: ${status}`);
        }
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const user = UserDB.findByStripeCustomerId(subscription.customer);
        
        if (user) {
          UserDB.updateSubscription(user.id, 'free', 'inactive', null);
          console.log(`✅ Subscription cancelled for user ${user.id}`);
        }
        break;
      }
      
      case 'invoice.paid': {
        const invoice = event.data.object;
        const user = UserDB.findByStripeCustomerId(invoice.customer);
        
        if (user) {
          PaymentDB.create(user.id, {
            invoiceId: invoice.id,
            paymentIntentId: invoice.payment_intent,
            amount: invoice.amount_paid,
            currency: invoice.currency,
            status: 'paid',
            description: `Subscription payment`
          });
          console.log(`✅ Payment recorded for user ${user.id}: $${invoice.amount_paid / 100}`);
        }
        break;
      }
      
      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const user = UserDB.findByStripeCustomerId(invoice.customer);
        
        if (user) {
          UserDB.update(user.id, { subscription_status: 'past_due' });
          PaymentDB.create(user.id, {
            invoiceId: invoice.id,
            amount: invoice.amount_due,
            currency: invoice.currency,
            status: 'failed',
            description: `Payment failed`
          });
          console.log(`⚠️ Payment failed for user ${user.id}`);
        }
        break;
      }
    }
    
    // Log the event
    const user = event.data.object.metadata?.userId ? 
      UserDB.findById(parseInt(event.data.object.metadata.userId)) : null;
    EventDB.create(event.id, event.type, event.data.object, user?.id);
    
  } catch (error) {
    console.error('Webhook processing error:', error);
    // Don't return error - we've received the webhook
  }
  
  res.json({ received: true });
});

// ============================================
// SIMULATION ROUTES
// ============================================

// Record a score
app.post('/api/simulations/:simId/scores', authenticateToken, (req, res) => {
  try {
    const { simId } = req.params;
    const { scenarioId, score, grade, budgetScore, scheduleScore, scopeScore, qualityScore, decisionsMade } = req.body;
    
    const scoreId = ScoreDB.create(req.user.userId, simId, scenarioId, {
      score,
      grade,
      budgetScore,
      scheduleScore,
      scopeScore,
      qualityScore,
      decisionsMade
    });
    
    res.status(201).json({ 
      message: 'Score recorded',
      scoreId 
    });
    
  } catch (error) {
    console.error('Score recording error:', error);
    res.status(500).json({ error: 'Failed to record score' });
  }
});

// Get user's scores
app.get('/api/simulations/scores', authenticateToken, (req, res) => {
  try {
    const scores = ScoreDB.getUserScores(req.user.userId);
    const bestScores = ScoreDB.getUserBestScores(req.user.userId);
    
    res.json({ scores, bestScores });
    
  } catch (error) {
    console.error('Scores fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch scores' });
  }
});

// Get leaderboard for a simulation
app.get('/api/simulations/:simId/leaderboard', (req, res) => {
  try {
    const { simId } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    
    const leaderboard = ScoreDB.getLeaderboard(simId, limit);
    
    res.json({ leaderboard });
    
  } catch (error) {
    console.error('Leaderboard fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get global stats
app.get('/api/simulations/stats', (req, res) => {
  try {
    const stats = ScoreDB.getGlobalStats();
    res.json({ stats });
  } catch (error) {
    console.error('Stats fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// ============================================
// ADMIN ROUTES (for instructors)
// ============================================

// Get all users (admin only - you'd add role checking here)
app.get('/api/admin/users', authenticateToken, (req, res) => {
  try {
    // In production, check if user is admin
    const user = UserDB.findById(req.user.userId);
    if (user.subscription_tier !== 'enterprise') {
      return res.status(403).json({ error: 'Enterprise subscription required' });
    }
    
    const users = UserDB.getAll();
    res.json({ users });
    
  } catch (error) {
    console.error('Admin users fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// ============================================
// HEALTH CHECK
// ============================================

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// ============================================
// START SERVER
// ============================================

async function startServer() {
  // Initialize database first
  await initializeDatabase();
  
  app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   🎓 BizSimHub Backend Server                          ║
║                                                        ║
║   Server running on: http://localhost:${PORT}            ║
║   API Base URL: http://localhost:${PORT}/api             ║
║                                                        ║
║   Endpoints:                                           ║
║   • POST /api/auth/register                            ║
║   • POST /api/auth/login                               ║
║   • GET  /api/auth/me                                  ║
║   • POST /api/stripe/create-checkout-session           ║
║   • POST /api/stripe/create-portal-session             ║
║   • GET  /api/stripe/subscription                      ║
║   • POST /api/webhooks/stripe                          ║
║   • POST /api/simulations/:id/scores                   ║
║   • GET  /api/simulations/scores                       ║
║   • GET  /api/simulations/:id/leaderboard              ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
    `);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

module.exports = app;
