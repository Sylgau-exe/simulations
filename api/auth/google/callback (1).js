// api/auth/google/callback.js - Handle Google OAuth callback
import { UserDB } from '../../../lib/db.js';
import { generateToken } from '../../../lib/auth.js';

export default async function handler(req, res) {
  const { code, error } = req.query;

  if (error) {
    return res.redirect('/?error=google_auth_failed');
  }

  if (!code) {
    return res.redirect('/?error=no_code');
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    
    // Get the host from the request or use env var
    const host = req.headers.host;
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${protocol}://${host}/api/auth/google/callback`;

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', tokenData);
      return res.redirect('/?error=token_exchange_failed');
    }

    // Get user info from Google
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleUser = await userInfoResponse.json();

    if (!googleUser.email) {
      return res.redirect('/?error=no_email');
    }

    // Find or create user
    let user = await UserDB.findByEmail(googleUser.email);
    let isNewUser = false;

    if (!user) {
      // Create new user (no password for Google users)
      user = await UserDB.createGoogleUser(
        googleUser.email,
        googleUser.name || googleUser.email.split('@')[0],
        googleUser.id
      );
      isNewUser = true;
    } else if (!user.google_id) {
      // Link existing account to Google
      await UserDB.linkGoogleAccount(user.id, googleUser.id);
    }

    // Log Google OAuth activity
    console.log('Google OAuth:', isNewUser ? 'NEW USER' : 'EXISTING USER', googleUser.email);

    // Submit ALL Google registrations to HubSpot (HubSpot handles duplicates)
    const HUBSPOT_PORTAL_ID = '342933870';
    const HUBSPOT_FORM_GUID = '2bc1e72b-901a-45dd-9ea6-ea442fd0a125';
    
    const hubspotData = {
      fields: [
        { name: 'email', value: googleUser.email },
        { name: 'firstname', value: (googleUser.name || '').split(' ')[0] || '' },
        { name: 'lastname', value: (googleUser.name || '').split(' ').slice(1).join(' ') || '' }
      ],
      context: {
        pageUri: 'https://bizsimlive.com',
        pageName: 'Google OAuth Registration'
      }
    };

    console.log('Submitting to HubSpot:', googleUser.email);
    
    // Submit to HubSpot with error logging
    fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hubspotData)
    })
    .then(res => {
      if (!res.ok) {
        return res.text().then(text => console.log('HubSpot error:', res.status, text));
      }
      console.log('HubSpot SUCCESS for:', googleUser.email);
    })
    .catch(err => console.log('HubSpot tracking error:', err));

    // Generate JWT token
    const token = generateToken(user);

    // Redirect to frontend with token
    res.redirect(`/?token=${token}`);
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect('/?error=auth_failed');
  }
}
