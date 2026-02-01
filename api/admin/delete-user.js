// api/admin/delete-user.js
import { sql } from '@vercel/postgres';
import { getUserFromRequest, cors } from '../../lib/auth.js';

export default async function handler(req, res) {
  cors(res);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify admin
    const decoded = getUserFromRequest(req);
    if (!decoded) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Check if user is admin
    const adminCheck = await sql`SELECT is_admin FROM users WHERE id = ${decoded.userId}`;
    if (!adminCheck.rows[0]?.is_admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    // Prevent self-deletion
    if (userId === decoded.userId) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    // Delete user (cascades to related tables)
    await sql`DELETE FROM users WHERE id = ${userId}`;

    console.log(`User ${userId} deleted by admin ${decoded.userId}`);

    res.json({ success: true, message: 'User deleted successfully' });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
}
