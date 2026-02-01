// api/stripe/create-checkout-session.js
import Stripe from 'stripe';
import { UserDB } from '../../lib/db.js';
import { getUserFromRequest, cors } from '../../lib/auth.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_IDS = {
  pro_monthly: process.env.STRIPE_PRICE_PRO_MONTHLY,
  pro_lifetime: process.env.STRIPE_PRICE_PRO_LIFETIME,
  pro_annual: process.env.STRIPE_PRICE_PRO_ANNUAL,
  enterprise_monthly: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY,
  enterprise_annual: process.env.STRIPE_PRICE_ENTERPRISE_ANNUAL
};

// One-time payment products (not subscriptions)
const ONE_TIME_PRODUCTS = ['pro_lifetime'];

export default async function handler(req, res) {
  cors(res);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const decoded = getUserFromRequest(req);
    if (!decoded) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { planId, billingCycle = 'monthly' } = req.body;
    const user = await UserDB.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Determine price key - lifetime doesn't need billing cycle
    const priceKey = planId === 'pro_lifetime' ? 'pro_lifetime' : `${planId}_${billingCycle}`;
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
      await UserDB.update(user.id, { stripe_customer_id: customerId });
    }

    // Get the frontend URL
    const frontendUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.FRONTEND_URL || 'http://localhost:5173';

    // Check if this is a one-time payment or subscription
    const isOneTime = ONE_TIME_PRODUCTS.includes(priceKey);

    // Create checkout session with appropriate mode
    const sessionConfig = {
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1
      }],
      mode: isOneTime ? 'payment' : 'subscription',
      success_url: `${frontendUrl}?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${frontendUrl}?canceled=true`,
      metadata: {
        userId: user.id.toString(),
        planId: priceKey,
        isLifetime: isOneTime ? 'true' : 'false'
      }
    };

    // Add subscription metadata only for subscriptions
    if (!isOneTime) {
      sessionConfig.subscription_data = {
        metadata: {
          userId: user.id.toString(),
          planId: planId
        }
      };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
