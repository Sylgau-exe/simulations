// api/migrate-reset-token.js
// One-time migration to add password reset columns
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    // Add reset_token column if it doesn't exist
    await sql`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='reset_token') THEN
          ALTER TABLE users ADD COLUMN reset_token VARCHAR(255);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='reset_token_expires') THEN
          ALTER TABLE users ADD COLUMN reset_token_expires TIMESTAMP;
        END IF;
      END $$;
    `;

    res.json({ 
      success: true, 
      message: 'Migration completed - reset_token columns added' 
    });
  } catch (error) {
    console.error('Migration error:', error);
    res.status(500).json({ error: error.message });
  }
}
