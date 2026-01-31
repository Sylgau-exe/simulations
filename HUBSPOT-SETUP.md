# HubSpot + Stripe Tracking Setup for BizSimHub

## Overview

This guide sets up full-funnel tracking:

```
Ad Click → Site Visit → Registration → Trial → Paid Subscription
   ↓           ↓            ↓           ↓           ↓
  UTM      HubSpot      Contact      Free        Revenue
 Params    Tracking     Created     User        Tracked
```

---

## Step 1: Create HubSpot Free Account

1. Go to: https://app.hubspot.com/signup-hubspot/crm
2. Sign up with your business email (sylvain@bizsimhub.com)
3. Choose **"Free Tools"**
4. Complete the onboarding wizard

---

## Step 2: Get Your HubSpot Portal ID

1. Log into HubSpot
2. Click ⚙️ **Settings** (top right)
3. Go to **Tracking & Analytics** → **Tracking Code**
4. Find your **Portal ID** (a number like `12345678`)
5. Copy it

---

## Step 3: Add Portal ID to Your Site

Edit `index.html` and replace `YOUR_HUBSPOT_ID`:

```html
<script type="text/javascript" id="hs-script-loader" async defer 
  src="//js.hs-scripts.com/YOUR_HUBSPOT_ID.js"></script>
```

Example with real ID:
```html
<script type="text/javascript" id="hs-script-loader" async defer 
  src="//js.hs-scripts.com/12345678.js"></script>
```

---

## Step 4: Create Custom Events in HubSpot

In HubSpot, go to **Settings** → **Tracking & Analytics** → **Behavioral Events** → **Create Event**

Create these 3 events:

### Event 1: Registration Complete
- **Event name**: `pe_registration_complete`
- **Properties**: source, medium, campaign

### Event 2: Checkout Started
- **Event name**: `pe_checkout_started`
- **Properties**: plan, billing_cycle, email

### Event 3: Payment Complete
- **Event name**: `pe_payment_complete`
- **Properties**: session_id, source, medium, campaign

---

## Step 5: Set Up HubSpot + Stripe Integration

### Option A: Native Integration (Recommended)
1. In HubSpot, go to **Settings** → **Integrations** → **Connected Apps**
2. Search for **Stripe**
3. Click **Connect**
4. Authorize with your Stripe account
5. This syncs payment data to contacts automatically

### Option B: Zapier (if native doesn't work)
1. Create Zapier account (free tier)
2. Create Zap: **Stripe New Charge** → **HubSpot Update Contact**
3. Map `customer_email` to find contact
4. Add property: `stripe_customer = true`, `total_revenue = amount`

---

## Step 6: Create Your Tracking Dashboard

In HubSpot, go to **Reports** → **Dashboards** → **Create Dashboard**

Add these reports:

### Report 1: Registration by Source
- **Type**: Funnel
- **Stage 1**: Contact created
- **Stage 2**: Event = pe_registration_complete
- **Break down by**: UTM Source

### Report 2: Conversion Funnel
- **Type**: Funnel
- **Stage 1**: Contact created
- **Stage 2**: pe_registration_complete
- **Stage 3**: pe_checkout_started
- **Stage 4**: pe_payment_complete

### Report 3: Revenue by Campaign
- **Type**: Bar chart
- **Measure**: Contact count with pe_payment_complete
- **Break down by**: UTM Campaign

---

## Step 7: UTM Links for Your Campaigns

Use these UTM patterns for all your marketing:

### LinkedIn (Organic)
```
https://bizsimhub.com/?utm_source=linkedin&utm_medium=organic&utm_campaign=launch_feb2026
```

### LinkedIn (Paid)
```
https://bizsimhub.com/?utm_source=linkedin&utm_medium=paid&utm_campaign=pm_professionals
```

### Facebook (Organic)
```
https://bizsimhub.com/?utm_source=facebook&utm_medium=organic&utm_campaign=launch_feb2026
```

### Facebook (Paid)
```
https://bizsimhub.com/?utm_source=facebook&utm_medium=paid&utm_campaign=pm_training
```

### Twitter/X
```
https://bizsimhub.com/?utm_source=twitter&utm_medium=organic&utm_campaign=pm_tips
```

### Email Newsletter
```
https://bizsimhub.com/?utm_source=newsletter&utm_medium=email&utm_campaign=launch_announcement
```

### Google Ads
```
https://bizsimhub.com/?utm_source=google&utm_medium=cpc&utm_campaign=pmp_training
```

---

## Step 8: Track Key Metrics

### Your Weekly KPIs

| Metric | How to Calculate | Target |
|--------|------------------|--------|
| **CPV** (Cost per Visit) | Ad Spend ÷ Site Visits | < $0.50 |
| **CPR** (Cost per Registration) | Ad Spend ÷ Registrations | < $5 |
| **CAC** (Cost per Customer) | Ad Spend ÷ Paid Customers | < $50 |
| **Registration Rate** | Registrations ÷ Visits | > 5% |
| **Trial-to-Paid Rate** | Paid ÷ Registrations | > 10% |
| **LTV:CAC Ratio** | ($19 × Months) ÷ CAC | > 3:1 |

---

## Step 9: Buffer Setup for Social Media

1. Go to: https://buffer.com
2. Sign up free
3. Connect: LinkedIn, Twitter, Facebook, Instagram
4. Schedule posts with UTM links from Step 7

---

## Quick Start Checklist

- [ ] Create HubSpot account
- [ ] Get Portal ID
- [ ] Update `index.html` with Portal ID
- [ ] Deploy updated site to Vercel
- [ ] Create 3 custom events in HubSpot
- [ ] Connect Stripe to HubSpot
- [ ] Create tracking dashboard
- [ ] Set up Buffer for social scheduling
- [ ] Create UTM links for each channel
- [ ] Test full funnel (click ad → register → pay)

---

## Testing Your Setup

1. Open an incognito window
2. Visit: `https://bizsimhub.com/?utm_source=test&utm_medium=test&utm_campaign=test`
3. Register for an account
4. Check HubSpot: **Contacts** → Find your test contact
5. Verify UTM properties are captured
6. Complete a test checkout ($19)
7. Verify payment event appears in HubSpot

---

## Support

- HubSpot Help: https://knowledge.hubspot.com
- Buffer Help: https://support.buffer.com
- Questions: Contact Claude for help troubleshooting

---

## Cost Summary

| Tool | Monthly Cost |
|------|--------------|
| HubSpot Free | $0 |
| Buffer Free | $0 |
| Google Analytics 4 | $0 |
| **Total** | **$0** |

Upgrade later:
- HubSpot Starter: $20/month (when >1,000 emails)
- Buffer Essentials: $6/month (when >10 scheduled posts)
