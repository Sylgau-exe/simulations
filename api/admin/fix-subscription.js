// api/admin/fix-subscription.js - Debug/Fix user subscription
import { sql } from '@vercel/postgres';
import { verifyToken } from '../../lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Verify admin authentication
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Check if user is admin
    const adminResult = await sql`SELECT is_admin FROM users WHERE id = ${payload.userId}`;
    if (!adminResult.rows[0]?.is_admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    if (req.method === 'GET') {
      // Get user subscription details by email
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ error: 'Email required' });
      }

      const result = await sql`
        SELECT id, name, email, subscription_tier, subscription_status, 
               stripe_customer_id, stripe_subscription_id
        FROM users WHERE email = ${email}
      `;

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json({ user: result.rows[0] });
    }

    if (req.method === 'POST') {
      // Fix user subscription
      const { email, tier, status } = req.body;
      if (!email || !tier || !status) {
        return res.status(400).json({ error: 'email, tier, and status required' });
      }

      const result = await sql`
        UPDATE users SET
          subscription_tier = ${tier},
          subscription_status = ${status},
          updated_at = CURRENT_TIMESTAMP
        WHERE email = ${email}
        RETURNING id, name, email, subscription_tier, subscription_status
      `;

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json({ success: true, user: result.rows[0] });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Fix subscription error:', error);
    return res.status(500).json({ error: error.message });
  }
}
