// api/auth/forgot-password.js
import { UserDB } from '../../lib/db.js';
import { sendPasswordResetEmail } from '../../lib/email.js';
import { cors } from '../../lib/auth.js';
import crypto from 'crypto';

export default async function handler(req, res) {
  cors(res);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Find user by email
    const user = await UserDB.findByEmail(email.toLowerCase());

    // Always return success to prevent email enumeration attacks
    // But only send email if user exists
    if (user) {
      // Check if user signed up with Google (no password)
      if (user.auth_provider === 'google' && !user.password_hash) {
        // Still return success but don't send email
        // User should use Google Sign-In
        console.log(`Password reset requested for Google user: ${email}`);
      } else {
        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

        // Save token to database
        await UserDB.setResetToken(email.toLowerCase(), resetToken, expiresAt);

        // Get the frontend URL
        const frontendUrl = process.env.VERCEL_URL 
          ? `https://${process.env.VERCEL_URL}` 
          : process.env.FRONTEND_URL || 'http://localhost:5173';

        const resetUrl = `${frontendUrl}?reset_token=${resetToken}`;

        // Send email
        try {
          await sendPasswordResetEmail({
            name: user.name,
            email: user.email,
            resetToken,
            resetUrl
          });
          console.log(`Password reset email sent to: ${email}`);
        } catch (emailError) {
          console.error('Failed to send reset email:', emailError);
          // Don't expose email errors to client
        }
      }
    } else {
      console.log(`Password reset requested for non-existent email: ${email}`);
    }

    // Always return success
    res.json({ 
      success: true, 
      message: 'If an account with this email exists, you will receive a password reset link shortly.' 
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
}
