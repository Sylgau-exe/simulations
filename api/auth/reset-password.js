// api/auth/reset-password.js
import { UserDB } from '../../lib/db.js';
import { cors } from '../../lib/auth.js';
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
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: 'Token and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Find user by reset token (also checks expiration)
    const user = await UserDB.findByResetToken(token);

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(password, 10);

    // Update password and clear reset token
    await UserDB.updatePassword(user.id, passwordHash);

    console.log(`Password reset successful for user: ${user.email}`);

    res.json({ 
      success: true, 
      message: 'Password has been reset successfully. You can now log in with your new password.' 
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
}
