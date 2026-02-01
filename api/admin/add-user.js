// api/admin/add-user.js - Admin endpoint to create new users
import { sql } from '@vercel/postgres';
import { getUserFromRequest, cors } from '../../lib/auth.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  cors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify admin authentication
    const decoded = getUserFromRequest(req);
    if (!decoded) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Check if user is admin
    const adminCheck = await sql`SELECT is_admin FROM users WHERE id = ${decoded.userId}`;
    if (!adminCheck.rows[0]?.is_admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // Get user data from request
    const { email, name, password, plan, status } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required' });
    }

    // Check if email already exists
    const existingUser = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password if provided, otherwise generate a random one
    const userPassword = password || Math.random().toString(36).slice(-12);
    const passwordHash = await bcrypt.hash(userPassword, 10);

    // Determine subscription tier and status
    const subscriptionTier = plan || 'free';
    const subscriptionStatus = status || (subscriptionTier === 'free' ? 'inactive' : 'active');

    // Create the user
    const result = await sql`
      INSERT INTO users (email, password_hash, name, subscription_tier, subscription_status, auth_provider)
      VALUES (${email}, ${passwordHash}, ${name}, ${subscriptionTier}, ${subscriptionStatus}, 'email')
      RETURNING id, email, name, subscription_tier, subscription_status, created_at
    `;

    const newUser = result.rows[0];

    return res.status(201).json({ 
      success: true, 
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        plan: newUser.subscription_tier,
        status: newUser.subscription_status,
        createdAt: newUser.created_at
      },
      // Only return password if it was auto-generated
      ...(password ? {} : { temporaryPassword: userPassword })
    });

  } catch (error) {
    console.error('Add user error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
