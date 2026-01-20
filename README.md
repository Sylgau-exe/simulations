# 🎓 BizSimHub

A business simulation marketplace for education - learn project management, marketing, and strategy through interactive simulations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)

## 🚀 Features

- **Interactive Simulations** - Project Apex with 5 industry scenarios
- **User Authentication** - JWT-based auth with secure password hashing
- **Subscription Tiers** - Free, Pro ($29/mo), Enterprise ($199/mo)
- **Stripe Integration** - Secure payments with webhooks
- **Progress Tracking** - Scores, leaderboards, analytics
- **Modern UI** - Dark theme, responsive design

## 📁 Project Structure

```
bizsimhub/
├── backend/                # Express.js API
│   ├── server.js          # Main server
│   ├── database.js        # SQLite layer
│   └── package.json
│
├── frontend/              # React + Vite
│   ├── src/
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   ├── index.html
│   └── package.json
│
└── README.md
```

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Stripe account (for payments)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/bizsimhub.git
cd bizsimhub
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

The API will run on `http://localhost:3001`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will run on `http://localhost:5173`

## ⚙️ Environment Variables

Create `backend/.env`:

```env
# Server
PORT=3001
FRONTEND_URL=http://localhost:5173

# JWT (generate a secure random string)
JWT_SECRET=your-secret-key-at-least-32-characters

# Stripe (get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs (create in Stripe Dashboard)
STRIPE_PRICE_PRO_MONTHLY=price_...
STRIPE_PRICE_PRO_ANNUAL=price_...
STRIPE_PRICE_ENTERPRISE_MONTHLY=price_...
STRIPE_PRICE_ENTERPRISE_ANNUAL=price_...
```

## 💳 Stripe Setup

1. Create account at [stripe.com](https://stripe.com)
2. Go to **Products** → Create products:
   - Pro Plan: $29/month, $290/year
   - Enterprise Plan: $199/month, $1990/year
3. Copy the price IDs to your `.env`
4. Set up webhook endpoint: `https://your-domain.com/api/webhooks/stripe`
5. Select events: `checkout.session.completed`, `customer.subscription.*`, `invoice.*`

### Test Cards

| Card | Result |
|------|--------|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 0002` | Declined |

## 📡 API Endpoints

### Authentication
```
POST /api/auth/register     - Create account
POST /api/auth/login        - Login
GET  /api/auth/me           - Get current user
```

### Subscriptions
```
POST /api/stripe/create-checkout-session  - Start checkout
POST /api/stripe/create-portal-session    - Billing portal
GET  /api/stripe/subscription             - Get status
```

### Simulations
```
POST /api/simulations/:id/scores      - Record score
GET  /api/simulations/scores          - User's scores
GET  /api/simulations/:id/leaderboard - Rankings
```

## 🎮 Available Simulations

| Simulation | Status | Tier |
|------------|--------|------|
| 🎯 Project Apex | ✅ Available | Free |
| 📈 Market Dynamics | 🔜 Coming Soon | Pro |
| 🚚 Supply Chain Crisis | 🔜 Coming Soon | Pro |
| 🚀 Startup Journey | 🔜 Coming Soon | Enterprise |
| 🤝 Negotiation Mastery | 🔜 Coming Soon | Pro |
| 💰 Financial Strategy | 🔜 Coming Soon | Enterprise |

## 🚀 Deployment

### Backend (Railway/Render/Heroku)

```bash
cd backend
# Set environment variables in dashboard
# Deploy via Git or CLI
```

### Frontend (Vercel/Netlify)

```bash
cd frontend
npm run build
# Deploy dist/ folder
```

Update `VITE_API_URL` in frontend for production API URL.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 👨‍💻 Author

**Sylvain Deschamps**  
McGill University - School of Continuing Studies

---

Built with ❤️ for business education
