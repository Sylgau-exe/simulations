import React, { useState, useEffect } from 'react';

// ============================================
// API CLIENT
// ============================================

// Use environment variable or proxy in development
const API_BASE = import.meta.env.VITE_API_URL || '/api';
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

const api = {
  token: null,
  
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('bsim_token', token);
    } else {
      localStorage.removeItem('bsim_token');
    }
  },
  
  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('bsim_token');
    }
    return this.token;
  },
  
  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    };
    
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    
    return data;
  },
  
  // Auth
  register: (name, email, password) => 
    api.request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
  login: (email, password) => 
    api.request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  getMe: () => 
    api.request('/auth/me'),
  updateProfile: (data) => 
    api.request('/auth/profile', { method: 'PATCH', body: JSON.stringify(data) }),
  
  // Stripe
  createCheckoutSession: (planId, billingCycle) => 
    api.request('/stripe/create-checkout-session', { method: 'POST', body: JSON.stringify({ planId, billingCycle }) }),
  createPortalSession: () => 
    api.request('/stripe/create-portal-session', { method: 'POST' }),
  getSubscription: () => 
    api.request('/stripe/subscription'),
  
  // Simulations
  recordScore: (simId, scoreData) => 
    api.request(`/simulations/${simId}/scores`, { method: 'POST', body: JSON.stringify(scoreData) }),
  getScores: () => 
    api.request('/simulations/scores'),
  getLeaderboard: (simId) => 
    api.request(`/simulations/${simId}/leaderboard`),
  getStats: () => 
    api.request('/simulations/stats')
};

// ============================================
// SIMULATIONS CATALOG
// ============================================

const SIMULATIONS = [
  {
    id: 'project-apex',
    title: 'Project Apex',
    subtitle: 'Project Management Simulation',
    description: 'Master the art of project management by navigating real-world challenges. Balance scope, schedule, budget, and team dynamics across multiple industry scenarios.',
    icon: '🎯',
    category: 'Project Management',
    difficulty: 'Intermediate',
    duration: '45-60 min',
    scenarios: 5,
    skills: ['Resource Allocation', 'Risk Management', 'Stakeholder Communication', 'Decision Making'],
    featured: true,
    available: true,
    tier: 'free'
  },
  {
    id: 'market-dynamics',
    title: 'Market Dynamics',
    subtitle: 'Strategic Marketing Simulation',
    description: 'Lead a marketing team through product launches, competitive battles, and market shifts.',
    icon: '📈',
    category: 'Marketing',
    difficulty: 'Intermediate',
    duration: '30-45 min',
    scenarios: 4,
    skills: ['Market Analysis', 'Brand Strategy', 'Budget Management'],
    available: false,
    tier: 'pro',
    comingSoon: true
  },
  {
    id: 'supply-chain-crisis',
    title: 'Supply Chain Crisis',
    subtitle: 'Operations Management Simulation',
    description: 'Navigate global supply chain disruptions, manage inventory levels, and optimize logistics.',
    icon: '🚚',
    category: 'Operations',
    difficulty: 'Advanced',
    duration: '60-90 min',
    scenarios: 6,
    skills: ['Logistics Planning', 'Vendor Management', 'Crisis Response'],
    available: false,
    tier: 'pro',
    comingSoon: true
  },
  {
    id: 'startup-journey',
    title: 'Startup Journey',
    subtitle: 'Entrepreneurship Simulation',
    description: 'Build a startup from idea to scale-up. Make critical decisions on funding, hiring, and market entry.',
    icon: '🚀',
    category: 'Entrepreneurship',
    difficulty: 'Advanced',
    duration: '60-90 min',
    scenarios: 5,
    skills: ['Fundraising', 'Team Building', 'Financial Planning'],
    available: false,
    tier: 'enterprise',
    comingSoon: true
  },
  {
    id: 'negotiation-mastery',
    title: 'Negotiation Mastery',
    subtitle: 'Business Negotiation Simulation',
    description: 'Practice high-stakes negotiations: M&A deals, contracts, and partnership agreements.',
    icon: '🤝',
    category: 'Leadership',
    difficulty: 'Intermediate',
    duration: '30-45 min',
    scenarios: 8,
    skills: ['Active Listening', 'BATNA Analysis', 'Value Creation'],
    available: false,
    tier: 'pro',
    comingSoon: true
  },
  {
    id: 'financial-strategy',
    title: 'Financial Strategy',
    subtitle: 'Corporate Finance Simulation',
    description: 'Step into the CFO role: capital allocation, M&A evaluation, and investor relations.',
    icon: '💰',
    category: 'Finance',
    difficulty: 'Expert',
    duration: '90-120 min',
    scenarios: 4,
    skills: ['Financial Modeling', 'Capital Budgeting', 'Strategic Planning'],
    available: false,
    tier: 'enterprise',
    comingSoon: true
  }
];

const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    priceAnnual: 0,
    period: 'forever',
    description: 'Perfect for trying out simulations',
    features: ['Access to 1 simulation', 'Basic scenarios only', 'Personal progress tracking', 'Community support'],
    cta: 'Get Started',
    popular: false
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 29,
    priceAnnual: 290,
    period: 'month',
    description: 'For serious learners and educators',
    features: ['Access to all simulations', 'All scenarios & difficulty levels', 'Detailed analytics & reports', 'Certificates of completion', 'Priority support', 'Custom scenario parameters'],
    cta: 'Start Pro Trial',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    priceAnnual: 1990,
    period: 'month',
    description: 'For teams and institutions',
    features: ['Everything in Professional', 'Unlimited team members', 'Admin dashboard', 'Custom branding', 'LMS integration', 'Dedicated account manager', 'Custom simulation development'],
    cta: 'Contact Sales',
    popular: false
  }
];

// ============================================
// PROJECT APEX SCENARIOS
// ============================================

const APEX_SCENARIOS = {
  tech_startup: {
    id: 'tech_startup',
    title: 'Tech Startup',
    subtitle: 'Software Product Launch',
    icon: '💻',
    difficulty: 'Standard',
    difficultyColor: '#3b82f6',
    description: 'You are the Project Manager at Nexus Technologies. Deliver a new SaaS platform.',
    company: 'Nexus Technologies',
    projectName: 'Phoenix Platform',
    deliverable: 'features',
    initial: { budget: 500000, weeks: 10, scope: 12, teamSize: 5, quality: 85, morale: 75 },
    weeklyCostPerPerson: 8000,
    events: [
      { id: 'scope_creep', title: 'Scope Creep Alert', description: 'The product owner wants to add 2 new features.', icon: '📈', options: [
        { id: 'accept', label: 'Accept all changes', effects: { scope: 2, budget: -30000, schedule: -1, morale: -5 } },
        { id: 'negotiate', label: 'Negotiate to add 1 feature', effects: { scope: 1, budget: -15000 } },
        { id: 'decline', label: 'Decline and stay focused', effects: { morale: 5, quality: 2 } }
      ]},
      { id: 'tech_debt', title: 'Technical Debt Crisis', description: 'QA discovered critical technical debt.', icon: '🔧', options: [
        { id: 'fix_now', label: 'Full refactor now', effects: { schedule: -1, quality: 15, budget: -20000 } },
        { id: 'patch', label: 'Quick patch', effects: { quality: 5, budget: -8000 } },
        { id: 'defer', label: 'Document for v2', effects: { quality: -15 } }
      ]},
      { id: 'dev_resignation', title: 'Lead Developer Resigns', description: 'Your lead developer accepted a FAANG offer.', icon: '🚪', options: [
        { id: 'counter', label: 'Counter-offer', effects: { budget: -45000, morale: 5 } },
        { id: 'transition', label: 'Knowledge transfer', effects: { team: -1, schedule: -1, morale: -5 } },
        { id: 'contractor', label: 'Hire contractor', effects: { budget: -55000, productivity: -0.1 } }
      ]},
      { id: 'team_conflict', title: 'Architecture Disagreement', description: 'Senior devs debate microservices vs monolith.', icon: '🔥', options: [
        { id: 'mediate', label: 'Architecture review', effects: { budget: -8000, morale: 10, productivity: 0.1 } },
        { id: 'decide', label: 'Executive decision', effects: { morale: -10, productivity: 0.05 } },
        { id: 'hybrid', label: 'Hybrid approach', effects: { budget: -5000, morale: 5 } }
      ]}
    ]
  },
  live_show: {
    id: 'live_show',
    title: 'Live Entertainment',
    subtitle: 'Touring Show Production',
    icon: '🎪',
    difficulty: 'Advanced',
    difficultyColor: '#f59e0b',
    description: 'Executive Producer at Stellar Productions. Launch an ambitious touring show.',
    company: 'Stellar Productions',
    projectName: 'AURORA - A Journey of Light',
    deliverable: 'acts',
    initial: { budget: 2500000, weeks: 12, scope: 8, teamSize: 12, quality: 80, morale: 80 },
    weeklyCostPerPerson: 6000,
    events: [
      { id: 'star_injury', title: 'Lead Performer Injury', description: 'Your star acrobat suffered a minor injury.', icon: '🤕', options: [
        { id: 'rest', label: 'Full recovery time', effects: { schedule: -2, quality: 10, morale: 10 } },
        { id: 'modified', label: 'Modified choreography', effects: { quality: -5, budget: -20000 } },
        { id: 'understudy', label: 'Promote understudy', effects: { morale: -10, quality: -10 } }
      ]},
      { id: 'creative_conflict', title: 'Creative Vision Clash', description: 'Director and choreographer disagree on Act 3.', icon: '🎭', options: [
        { id: 'director', label: "Back director's vision", effects: { morale: -15, quality: 5 } },
        { id: 'choreographer', label: 'Support choreographer', effects: { morale: -10, quality: 5 } },
        { id: 'workshop', label: 'Creative workshop', effects: { budget: -30000, schedule: -1, quality: 15, morale: 10 } }
      ]},
      { id: 'rigging_issue', title: 'Rigging Safety Concern', description: 'Aerial rigging may not meet safety standards.', icon: '⚠️', options: [
        { id: 'redesign', label: 'Full redesign', effects: { budget: -150000, schedule: -2, quality: 15 } },
        { id: 'reinforce', label: 'Reinforce current', effects: { budget: -60000, quality: 5 } },
        { id: 'simplify', label: 'Simplify sequences', effects: { scope: -1, quality: -10, morale: -10 } }
      ]}
    ]
  },
  construction: {
    id: 'construction',
    title: 'Construction',
    subtitle: 'Commercial Building Project',
    icon: '🏗️',
    difficulty: 'Standard',
    difficultyColor: '#3b82f6',
    description: 'Project Manager at UrbanCore Construction. Build a 12-story mixed-use building.',
    company: 'UrbanCore Construction',
    projectName: 'Metropolitan Tower',
    deliverable: 'floors',
    initial: { budget: 8000000, weeks: 16, scope: 12, teamSize: 25, quality: 85, morale: 70 },
    weeklyCostPerPerson: 4500,
    events: [
      { id: 'weather_delay', title: 'Severe Weather Alert', description: 'Major storm forecast for 10 days.', icon: '🌧️', options: [
        { id: 'pause', label: 'Pause outdoor work', effects: { schedule: -2, morale: 5 } },
        { id: 'interior', label: 'Interior work only', effects: { schedule: -1, budget: -50000 } },
        { id: 'push', label: 'Continue with caution', effects: { budget: -80000, quality: -5, morale: -10 } }
      ]},
      { id: 'permit_issue', title: 'Permit Inspection Failed', description: 'Inspector flagged electrical issues.', icon: '📋', options: [
        { id: 'rework', label: 'Full rework', effects: { schedule: -2, budget: -120000, quality: 10 } },
        { id: 'appeal', label: 'Appeal decision', effects: { schedule: -1, budget: -30000 } },
        { id: 'expedite', label: 'Hire specialist', effects: { budget: -180000 } }
      ]},
      { id: 'safety_incident', title: 'Safety Near-Miss', description: 'Scaffold bracket failed. OSHA will investigate.', icon: '🦺', options: [
        { id: 'full_audit', label: 'Full safety audit', effects: { schedule: -1, budget: -60000, quality: 10, morale: 10 } },
        { id: 'targeted', label: 'Targeted inspection', effects: { budget: -25000, quality: 5 } },
        { id: 'minimal', label: 'Document and continue', effects: { quality: -10, morale: -10 } }
      ]}
    ]
  }
};

const createApexInitialState = (scenario) => ({
  scenario: scenario.id,
  week: 1,
  totalWeeks: scenario.initial.weeks,
  budget: { total: scenario.initial.budget, spent: 0 },
  schedule: { deadline: scenario.initial.weeks },
  scope: { totalFeatures: scenario.initial.scope, completed: 0, quality: scenario.initial.quality },
  team: { size: scenario.initial.teamSize, morale: scenario.initial.morale, productivity: 1.0 },
  decisions: [],
  gamePhase: 'playing',
  currentEvent: null,
  startTime: Date.now()
});

const calculateWeeklyProgress = (team, scope) => {
  const baseProgress = (team.size * team.productivity * (team.morale / 100)) * 0.08;
  return Math.min(baseProgress, 1 - (scope.completed / scope.totalFeatures));
};

const calculateScore = (state) => {
  const budgetScore = Math.max(0, (1 - state.budget.spent / state.budget.total)) * 250;
  const scheduleScore = state.week <= state.schedule.deadline ? 250 : Math.max(0, 250 - (state.week - state.schedule.deadline) * 50);
  const scopeScore = (state.scope.completed / state.scope.totalFeatures) * 250;
  const qualityScore = (state.scope.quality / 100) * 250;
  return Math.round(budgetScore + scheduleScore + scopeScore + qualityScore);
};

const getGrade = (score) => score >= 800 ? 'A' : score >= 650 ? 'B' : score >= 500 ? 'C' : score >= 350 ? 'D' : 'F';

// ============================================
// MAIN APP COMPONENT
// ============================================

export default function BizSimHub() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [checkoutLoading, setCheckoutLoading] = useState(null);
  const [userScores, setUserScores] = useState({ scores: [], bestScores: [] });
  const [subscription, setSubscription] = useState(null);
  const [toast, setToast] = useState(null);
  
  // Simulation state
  const [selectedSimulation, setSelectedSimulation] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [simPhase, setSimPhase] = useState('select');

  // Toast helper
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Check for existing session on load
  useEffect(() => {
    const checkAuth = async () => {
      const token = api.getToken();
      if (token) {
        try {
          const data = await api.getMe();
          setCurrentUser(data.user);
          setCurrentPage('dashboard');
          loadUserData();
        } catch (e) {
          api.setToken(null);
        }
      }
    };
    checkAuth();
    
    // Check for success redirect from Stripe
    const params = new URLSearchParams(window.location.search);
    if (params.get('session_id')) {
      showToast('🎉 Payment successful! Your subscription is now active.', 'success');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const loadUserData = async () => {
    try {
      const [scoresData, subData] = await Promise.all([
        api.getScores(),
        api.getSubscription()
      ]);
      setUserScores(scoresData);
      setSubscription(subData);
    } catch (e) {
      console.error('Failed to load user data:', e);
    }
  };

  // Auth handlers
  const handleLogin = async (email, password) => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const data = await api.login(email, password);
      api.setToken(data.token);
      setCurrentUser(data.user);
      setCurrentPage('dashboard');
      loadUserData();
    } catch (e) {
      setAuthError(e.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignup = async (name, email, password) => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const data = await api.register(name, email, password);
      api.setToken(data.token);
      setCurrentUser(data.user);
      setCurrentPage('dashboard');
      showToast('Welcome to BizSimHub! 🎉', 'success');
    } catch (e) {
      setAuthError(e.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    api.setToken(null);
    setCurrentUser(null);
    setSubscription(null);
    setUserScores({ scores: [], bestScores: [] });
    setCurrentPage('landing');
  };

  // Stripe handlers
  const handleCheckout = async (planId) => {
    if (!currentUser) {
      setCurrentPage('auth');
      setAuthMode('signup');
      return;
    }
    
    setCheckoutLoading(planId);
    try {
      const data = await api.createCheckoutSession(planId, billingCycle);
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (e) {
      showToast('Failed to start checkout. Please try again.', 'error');
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const data = await api.createPortalSession();
      window.location.href = data.url;
    } catch (e) {
      showToast('Failed to open subscription portal.', 'error');
    }
  };

  // Simulation handlers
  const startSimulation = (simId) => {
    setSelectedSimulation(SIMULATIONS.find(s => s.id === simId));
    setSimPhase('select');
    setCurrentPage('simulation');
  };

  const selectScenario = (scenario) => {
    setSelectedScenario(scenario);
    setSimPhase('brief');
  };

  const beginSimulation = () => {
    setGameState(createApexInitialState(selectedScenario));
    setSimPhase('playing');
  };

  const handleAction = (action) => {
    setGameState(prev => {
      const newState = { ...prev };
      switch (action.type) {
        case 'hire':
          newState.team = { ...prev.team, size: prev.team.size + 1 };
          newState.budget = { ...prev.budget, spent: prev.budget.spent + action.cost };
          newState.team.morale = Math.min(100, prev.team.morale + 3);
          break;
        case 'fire':
          newState.team = { ...prev.team, size: prev.team.size - 1 };
          newState.team.morale = Math.max(0, prev.team.morale - 8);
          break;
        case 'boost_morale':
          newState.budget = { ...prev.budget, spent: prev.budget.spent + action.cost };
          newState.team = { ...prev.team, morale: Math.min(100, prev.team.morale + 10) };
          break;
        case 'quality_review':
          newState.budget = { ...prev.budget, spent: prev.budget.spent + action.cost };
          newState.scope = { ...prev.scope, quality: Math.min(100, prev.scope.quality + 5) };
          break;
      }
      return newState;
    });
  };

  const advanceWeek = () => {
    setGameState(prev => {
      const scenario = selectedScenario;
      const progress = calculateWeeklyProgress(prev.team, prev.scope);
      const weeklyCost = prev.team.size * scenario.weeklyCostPerPerson;
      const moraleDrift = (Math.random() - 0.5) * 6;
      
      const newState = {
        ...prev,
        week: prev.week + 1,
        budget: { ...prev.budget, spent: prev.budget.spent + weeklyCost },
        scope: { ...prev.scope, completed: prev.scope.completed + (progress * prev.scope.totalFeatures) },
        team: { ...prev.team, morale: Math.max(10, Math.min(100, prev.team.morale + moraleDrift)) }
      };
      
      if (Math.random() < 0.45 && prev.week < prev.totalWeeks) {
        const availableEvents = scenario.events.filter(e => !prev.decisions.find(d => d.eventId === e.id));
        if (availableEvents.length > 0) {
          newState.currentEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)];
          newState.gamePhase = 'event';
        }
      }
      
      if (newState.scope.completed >= newState.scope.totalFeatures || newState.week > newState.totalWeeks + 3) {
        const finalScore = calculateScore(newState);
        const grade = getGrade(finalScore);
        
        // Record score to backend
        if (currentUser) {
          api.recordScore(selectedSimulation.id, {
            scenarioId: selectedScenario.id,
            score: finalScore,
            grade,
            decisionsMade: newState.decisions.length,
            budgetScore: Math.round(Math.max(0, (1 - newState.budget.spent / newState.budget.total)) * 250),
            scheduleScore: Math.round(newState.week <= newState.schedule.deadline ? 250 : Math.max(0, 250 - (newState.week - newState.schedule.deadline) * 50)),
            scopeScore: Math.round((newState.scope.completed / newState.scope.totalFeatures) * 250),
            qualityScore: Math.round((newState.scope.quality / 100) * 250)
          }).then(() => loadUserData()).catch(console.error);
        }
        
        setSimPhase('ended');
      }
      
      return newState;
    });
  };

  const handleEventChoice = (option) => {
    setGameState(prev => {
      const effects = option.effects;
      const newState = {
        ...prev,
        gamePhase: 'playing',
        currentEvent: null,
        decisions: [...prev.decisions, { eventId: prev.currentEvent.id, choice: option.id, week: prev.week }]
      };
      
      if (effects.scope) newState.scope = { ...prev.scope, totalFeatures: Math.max(1, prev.scope.totalFeatures + effects.scope) };
      if (effects.budget) newState.budget = { ...prev.budget, spent: prev.budget.spent + Math.abs(effects.budget) };
      if (effects.schedule) newState.schedule = { ...prev.schedule, deadline: Math.max(1, prev.schedule.deadline + effects.schedule) };
      if (effects.morale) newState.team = { ...prev.team, morale: Math.max(5, Math.min(100, prev.team.morale + effects.morale)) };
      if (effects.productivity) newState.team = { ...newState.team, productivity: Math.max(0.4, Math.min(1.6, prev.team.productivity + effects.productivity)) };
      if (effects.quality) newState.scope = { ...newState.scope, quality: Math.max(0, Math.min(100, prev.scope.quality + effects.quality)) };
      if (effects.team) newState.team = { ...newState.team, size: Math.max(2, prev.team.size + effects.team) };
      
      return newState;
    });
  };

  // ============================================
  // RENDER COMPONENTS
  // ============================================

  const renderNavbar = (transparent = false) => (
    <nav className={`navbar ${transparent ? 'navbar-transparent' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={() => setCurrentPage(currentUser ? 'dashboard' : 'landing')}>
          <span className="logo-icon">🎓</span>
          <span className="logo-text">BizSim<span className="logo-accent">Hub</span></span>
        </div>
        <div className="nav-links">
          {!currentUser ? (
            <>
              <button className="nav-link" onClick={() => { setCurrentPage('auth'); setAuthMode('login'); }}>Log In</button>
              <button className="nav-btn-primary" onClick={() => { setCurrentPage('auth'); setAuthMode('signup'); }}>Get Started</button>
            </>
          ) : (
            <>
              <button className="nav-link" onClick={() => setCurrentPage('dashboard')}>Dashboard</button>
              <button className="nav-link" onClick={() => setCurrentPage('catalog')}>Simulations</button>
              <button className="nav-link" onClick={() => setCurrentPage('pricing')}>Pricing</button>
              <div className="nav-user">
                <span className="user-avatar">{currentUser.name?.charAt(0)}</span>
                <span className="user-name">{currentUser.name}</span>
                <button className="nav-link-small" onClick={handleLogout}>Logout</button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );

  const renderLanding = () => (
    <div className="landing-page">
      {renderNavbar(true)}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="hero-badge">🎓 Business Education Platform</div>
          <h1 className="hero-title">Learn by <span className="gradient-text">Doing</span></h1>
          <p className="hero-subtitle">Master business skills through immersive simulations. Practice project management, strategy, negotiations, and more in risk-free environments.</p>
          <div className="hero-cta">
            <button className="btn-primary-lg" onClick={() => { setCurrentPage('auth'); setAuthMode('signup'); }}>Start Free →</button>
            <button className="btn-secondary-lg" onClick={() => setCurrentPage('catalog')}>Browse Simulations</button>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">6+</span><span className="stat-label">Simulations</span></div>
            <div className="stat"><span className="stat-num">25+</span><span className="stat-label">Scenarios</span></div>
            <div className="stat"><span className="stat-num">1000+</span><span className="stat-label">Learners</span></div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">Featured</span>
            <h2>Project Apex</h2>
            <p>Our flagship project management simulation</p>
          </div>
          <div className="featured-card">
            <div className="featured-icon">🎯</div>
            <div className="featured-content">
              <h3>Master Project Management</h3>
              <p>Navigate real-world challenges across 5 industry scenarios. Balance scope, schedule, budget, and team dynamics.</p>
              <div className="featured-tags">
                <span>Tech Startup</span><span>Live Entertainment</span><span>Construction</span>
              </div>
              <button className="btn-primary" onClick={() => currentUser ? startSimulation('project-apex') : setCurrentPage('auth')}>
                {currentUser ? 'Play Now' : 'Try Free Now'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="simulations-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Simulation Library</h2>
            <p>Comprehensive business simulations for every skill</p>
          </div>
          <div className="sim-grid">
            {SIMULATIONS.map(sim => (
              <div key={sim.id} className={`sim-card ${sim.comingSoon ? 'coming-soon' : ''}`}>
                <div className="sim-icon">{sim.icon}</div>
                <div className="sim-category">{sim.category}</div>
                <h3>{sim.title}</h3>
                <p>{sim.subtitle}</p>
                <div className="sim-meta"><span>{sim.difficulty}</span><span>{sim.duration}</span></div>
                {sim.comingSoon && <div className="sim-badge-soon">Coming Soon</div>}
                {sim.featured && <div className="sim-badge-featured">Available Now</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <span className="logo-icon">🎓</span>
            <span className="logo-text">BizSim<span className="logo-accent">Hub</span></span>
            <p>Learn business through immersive simulations</p>
          </div>
          <div className="footer-links">
            <div className="footer-col"><h4>Product</h4><a href="#">Simulations</a><a href="#">Pricing</a><a href="#">For Educators</a></div>
            <div className="footer-col"><h4>Company</h4><a href="#">About</a><a href="#">Contact</a></div>
            <div className="footer-col"><h4>Legal</h4><a href="#">Privacy</a><a href="#">Terms</a></div>
          </div>
        </div>
        <div className="footer-bottom"><p>© 2025 BizSimHub. All rights reserved.</p></div>
      </footer>
    </div>
  );

  const renderAuth = () => (
    <div className="auth-page">
      {renderNavbar()}
      <div className="auth-container">
        <div className="auth-card">
          <h2>{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{authMode === 'login' ? 'Log in to continue learning' : 'Start your simulation journey'}</p>
          {authError && <div className="auth-error">{authError}</div>}
          <form onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            if (authMode === 'login') {
              handleLogin(form.email.value, form.password.value);
            } else {
              handleSignup(form.name.value, form.email.value, form.password.value);
            }
          }}>
            {authMode === 'signup' && (
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" placeholder="John Doe" required />
              </div>
            )}
            <div className="form-group"><label>Email</label><input type="email" name="email" placeholder="you@example.com" required /></div>
            <div className="form-group"><label>Password</label><input type="password" name="password" placeholder="••••••••" required minLength={6} /></div>
            <button type="submit" className="btn-primary btn-full" disabled={authLoading}>
              {authLoading ? 'Please wait...' : (authMode === 'login' ? 'Log In' : 'Create Account')}
            </button>
          </form>
          <div className="auth-switch">
            {authMode === 'login' ? (
              <p>Don't have an account? <button onClick={() => { setAuthMode('signup'); setAuthError(''); }}>Sign up</button></p>
            ) : (
              <p>Already have an account? <button onClick={() => { setAuthMode('login'); setAuthError(''); }}>Log in</button></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPricing = () => (
    <div className="pricing-page">
      {renderNavbar()}
      <div className="pricing-container">
        <div className="pricing-header">
          <h1>Simple, Transparent Pricing</h1>
          <p>Start free, upgrade when you need more</p>
          <div className="billing-toggle">
            <button className={billingCycle === 'monthly' ? 'active' : ''} onClick={() => setBillingCycle('monthly')}>Monthly</button>
            <button className={billingCycle === 'annual' ? 'active' : ''} onClick={() => setBillingCycle('annual')}>Annual <span className="save-badge">Save 20%</span></button>
          </div>
        </div>
        
        <div className="pricing-grid">
          {PRICING_PLANS.map(plan => (
            <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <h3>{plan.name}</h3>
              <div className="price">
                <span className="currency">$</span>
                <span className="amount">{billingCycle === 'annual' ? plan.priceAnnual : plan.price}</span>
                {plan.price > 0 && <span className="period">/{billingCycle === 'annual' ? 'year' : 'month'}</span>}
              </div>
              <p className="plan-desc">{plan.description}</p>
              <ul className="features-list">
                {plan.features.map((feature, i) => <li key={i}><span className="check">✓</span> {feature}</li>)}
              </ul>
              <button 
                className={`btn-${plan.popular ? 'primary' : 'secondary'} btn-full`}
                onClick={() => plan.id === 'free' ? (currentUser ? setCurrentPage('dashboard') : setCurrentPage('auth')) : handleCheckout(plan.id)}
                disabled={checkoutLoading === plan.id}
              >
                {checkoutLoading === plan.id ? 'Processing...' : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {subscription && subscription.tier !== 'free' && (
          <div className="current-sub-card">
            <h3>Your Current Subscription</h3>
            <p>Plan: <strong>{subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)}</strong></p>
            <p>Status: <span className={`status-${subscription.status}`}>{subscription.status}</span></p>
            <button className="btn-secondary" onClick={handleManageSubscription}>Manage Subscription</button>
          </div>
        )}
      </div>
    </div>
  );

  const renderDashboard = () => {
    const totalPlays = userScores.scores?.length || 0;
    const bestScore = userScores.bestScores?.length > 0 ? Math.max(...userScores.bestScores.map(s => s.best_score)) : 0;
    const uniqueSims = new Set(userScores.scores?.map(s => s.simulation_id)).size;

    return (
      <div className="dashboard-page">
        {renderNavbar()}
        <div className="dashboard-container">
          <aside className="sidebar">
            <nav className="sidebar-nav">
              <button className="sidebar-item active"><span>📊</span> Dashboard</button>
              <button className="sidebar-item" onClick={() => setCurrentPage('catalog')}><span>🎮</span> Simulations</button>
              <button className="sidebar-item" onClick={() => setCurrentPage('pricing')}><span>💳</span> Subscription</button>
              <button className="sidebar-item"><span>🏆</span> Leaderboard</button>
              <button className="sidebar-item"><span>⚙️</span> Settings</button>
            </nav>
          </aside>
          
          <main className="dashboard-main">
            <div className="dashboard-header">
              <div>
                <h1>Welcome back, {currentUser?.name?.split(' ')[0]}!</h1>
                <p>Continue your learning journey</p>
              </div>
              <button className="btn-primary" onClick={() => setCurrentPage('catalog')}>Browse Simulations</button>
            </div>
            
            <div className="stats-row">
              <div className="stat-card"><span className="stat-icon">🎮</span><div className="stat-content"><span className="stat-value">{totalPlays}</span><span className="stat-label">Simulations Played</span></div></div>
              <div className="stat-card"><span className="stat-icon">🏆</span><div className="stat-content"><span className="stat-value">{bestScore}</span><span className="stat-label">Best Score</span></div></div>
              <div className="stat-card"><span className="stat-icon">📚</span><div className="stat-content"><span className="stat-value">{uniqueSims}</span><span className="stat-label">Unique Simulations</span></div></div>
              <div className="stat-card"><span className="stat-icon">⭐</span><div className="stat-content"><span className="stat-value">{subscription?.tier || 'Free'}</span><span className="stat-label">Current Plan</span></div></div>
            </div>
            
            <div className="dashboard-section">
              <h2>Quick Start</h2>
              <div className="quick-start-grid">
                {SIMULATIONS.filter(s => s.available).map(sim => (
                  <div key={sim.id} className="quick-card" onClick={() => startSimulation(sim.id)}>
                    <span className="quick-icon">{sim.icon}</span>
                    <div><h3>{sim.title}</h3><p>{sim.subtitle}</p></div>
                    <span className="quick-arrow">→</span>
                  </div>
                ))}
              </div>
            </div>
            
            {userScores.scores?.length > 0 && (
              <div className="dashboard-section">
                <h2>Recent Scores</h2>
                <div className="scores-list">
                  {userScores.scores.slice(0, 5).map((score, i) => (
                    <div key={i} className="score-item">
                      <span className="score-icon">{SIMULATIONS.find(s => s.id === score.simulation_id)?.icon || '🎯'}</span>
                      <div className="score-info">
                        <span className="score-title">{SIMULATIONS.find(s => s.id === score.simulation_id)?.title}</span>
                        <span className="score-sub">{score.scenario_id} • Grade: {score.grade}</span>
                      </div>
                      <span className="score-value">{score.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  };

  const renderCatalog = () => (
    <div className="catalog-page">
      {renderNavbar()}
      <div className="catalog-container">
        <div className="catalog-header">
          <h1>Simulation Catalog</h1>
          <p>Choose a simulation to practice real-world business skills</p>
        </div>
        <div className="catalog-grid">
          {SIMULATIONS.map(sim => (
            <div key={sim.id} className={`catalog-card ${!sim.available ? 'locked' : ''}`}>
              <div className="catalog-card-header">
                <span className="catalog-icon">{sim.icon}</span>
                <div className="catalog-badges">
                  {sim.featured && <span className="badge-featured">Featured</span>}
                  {sim.comingSoon && <span className="badge-soon">Coming Soon</span>}
                  {sim.tier !== 'free' && <span className="badge-pro">{sim.tier.toUpperCase()}</span>}
                </div>
              </div>
              <div className="catalog-card-body">
                <span className="catalog-category">{sim.category}</span>
                <h3>{sim.title}</h3>
                <p className="catalog-subtitle">{sim.subtitle}</p>
                <p className="catalog-desc">{sim.description}</p>
                <div className="catalog-skills">
                  {sim.skills.slice(0, 3).map((skill, i) => <span key={i} className="skill-tag">{skill}</span>)}
                </div>
              </div>
              <div className="catalog-card-footer">
                <div className="catalog-meta"><span>⏱️ {sim.duration}</span><span>📊 {sim.difficulty}</span></div>
                <button className={`btn-${sim.available ? 'primary' : 'secondary'}`} onClick={() => sim.available && startSimulation(sim.id)} disabled={!sim.available}>
                  {sim.available ? 'Start Simulation' : 'Coming Soon'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSimulation = () => {
    if (!selectedSimulation) return null;

    if (simPhase === 'select') {
      return (
        <div className="sim-page">
          {renderNavbar()}
          <div className="sim-select-container">
            <button className="back-link" onClick={() => setCurrentPage('catalog')}>← Back to Catalog</button>
            <div className="sim-select-header">
              <span className="sim-select-icon">{selectedSimulation.icon}</span>
              <h1>{selectedSimulation.title}</h1>
              <p>{selectedSimulation.description}</p>
            </div>
            <h2 className="scenarios-title">Choose Your Scenario</h2>
            <div className="scenarios-grid">
              {Object.values(APEX_SCENARIOS).map(scenario => (
                <button key={scenario.id} className="scenario-card" onClick={() => selectScenario(scenario)}>
                  <span className="scenario-icon">{scenario.icon}</span>
                  <div className="scenario-info">
                    <h3>{scenario.title}</h3>
                    <p className="scenario-sub">{scenario.subtitle}</p>
                    <p className="scenario-desc">{scenario.description}</p>
                  </div>
                  <div className="scenario-meta">
                    <span className="difficulty" style={{ color: scenario.difficultyColor }}>{scenario.difficulty}</span>
                    <span>{scenario.initial.weeks} weeks • ${(scenario.initial.budget/1000000).toFixed(1)}M</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (simPhase === 'brief') {
      return (
        <div className="sim-page">
          {renderNavbar()}
          <div className="brief-container">
            <button className="back-link" onClick={() => setSimPhase('select')}>← Back to Scenarios</button>
            <div className="brief-header">
              <span className="brief-icon">{selectedScenario.icon}</span>
              <div><h1>{selectedScenario.projectName}</h1><p className="brief-company">{selectedScenario.company}</p></div>
            </div>
            <div className="brief-content">
              <div className="brief-section"><h3>Your Mission</h3><p>{selectedScenario.description}</p></div>
              <div className="brief-objectives">
                <h3>Success Criteria</h3>
                <div className="objectives-grid">
                  <div className="objective"><span>💰</span><strong>Budget</strong><span>${selectedScenario.initial.budget.toLocaleString()}</span></div>
                  <div className="objective"><span>📅</span><strong>Timeline</strong><span>{selectedScenario.initial.weeks} weeks</span></div>
                  <div className="objective"><span>✅</span><strong>Scope</strong><span>{selectedScenario.initial.scope} {selectedScenario.deliverable}</span></div>
                  <div className="objective"><span>👥</span><strong>Team</strong><span>{selectedScenario.initial.teamSize} members</span></div>
                </div>
              </div>
            </div>
            <button className="btn-primary btn-lg" onClick={beginSimulation}>Begin Simulation →</button>
          </div>
        </div>
      );
    }

    if (simPhase === 'playing' && gameState) {
      const budgetRemaining = gameState.budget.total - gameState.budget.spent;
      const budgetPercent = (budgetRemaining / gameState.budget.total) * 100;
      const scopePercent = (gameState.scope.completed / gameState.scope.totalFeatures) * 100;
      const hireCost = selectedScenario.weeklyCostPerPerson * 2;

      return (
        <div className="sim-page sim-playing">
          <div className="game-header">
            <div className="game-title">
              <span className="game-icon">{selectedScenario.icon}</span>
              <div><h2>{selectedScenario.projectName}</h2><span>{selectedScenario.company}</span></div>
            </div>
            <div className="week-badge">Week {gameState.week} / {gameState.totalWeeks}</div>
          </div>

          <div className="game-dashboard">
            <div className="metric"><span className="m-icon">💰</span><div><span className="m-label">Budget</span><span className="m-value">${budgetRemaining.toLocaleString()}</span></div><div className="m-bar"><div style={{ width: `${budgetPercent}%`, background: budgetPercent > 50 ? '#10b981' : '#f59e0b' }}/></div></div>
            <div className="metric"><span className="m-icon">📅</span><div><span className="m-label">Time Left</span><span className="m-value">{Math.max(0, gameState.schedule.deadline - gameState.week + 1)} weeks</span></div></div>
            <div className="metric"><span className="m-icon">✅</span><div><span className="m-label">Progress</span><span className="m-value">{gameState.scope.completed.toFixed(1)} / {gameState.scope.totalFeatures}</span></div><div className="m-bar"><div style={{ width: `${scopePercent}%`, background: '#8b5cf6' }}/></div></div>
            <div className="metric"><span className="m-icon">⭐</span><div><span className="m-label">Quality</span><span className="m-value">{Math.round(gameState.scope.quality)}%</span></div></div>
            <div className="metric"><span className="m-icon">👥</span><div><span className="m-label">Team</span><span className="m-value">{gameState.team.size}</span></div></div>
            <div className="metric"><span className="m-icon">😊</span><div><span className="m-label">Morale</span><span className="m-value">{Math.round(gameState.team.morale)}%</span></div></div>
          </div>

          <div className="game-actions">
            <h3>Weekly Actions</h3>
            <div className="action-row">
              <button className="action-btn" onClick={() => handleAction({ type: 'fire' })} disabled={gameState.team.size <= 2}>− Remove</button>
              <span className="action-label">{gameState.team.size} members</span>
              <button className="action-btn" onClick={() => handleAction({ type: 'hire', cost: hireCost })} disabled={budgetRemaining < hireCost}>+ Hire (${(hireCost/1000).toFixed(0)}K)</button>
            </div>
            <div className="quick-actions">
              <button className="quick-btn" onClick={() => handleAction({ type: 'boost_morale', cost: gameState.budget.total * 0.01 })} disabled={budgetRemaining < gameState.budget.total * 0.01}>🎉 Team Event (+10 Morale)</button>
              <button className="quick-btn" onClick={() => handleAction({ type: 'quality_review', cost: gameState.budget.total * 0.02 })} disabled={budgetRemaining < gameState.budget.total * 0.02}>🔍 Quality Review (+5 Quality)</button>
            </div>
            <button className="btn-primary btn-advance" onClick={advanceWeek}>Advance to Week {gameState.week + 1} →</button>
          </div>

          {gameState.gamePhase === 'event' && gameState.currentEvent && (
            <div className="event-overlay">
              <div className="event-modal">
                <span className="event-icon">{gameState.currentEvent.icon}</span>
                <h2>{gameState.currentEvent.title}</h2>
                <p>{gameState.currentEvent.description}</p>
                <div className="event-options">
                  {gameState.currentEvent.options.map(opt => (
                    <button key={opt.id} className="event-option" onClick={() => handleEventChoice(opt)}>{opt.label}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (simPhase === 'ended' && gameState) {
      const score = calculateScore(gameState);
      const grade = getGrade(score);
      const gradeColor = score >= 800 ? '#10b981' : score >= 650 ? '#3b82f6' : score >= 500 ? '#f59e0b' : '#ef4444';

      return (
        <div className="sim-page sim-ended">
          <div className="end-card">
            <span className="end-icon">{selectedScenario.icon}</span>
            <h1>{selectedScenario.projectName}</h1>
            <p>Project Complete</p>
            <div className="score-display">
              <span className="grade" style={{ color: gradeColor }}>{grade}</span>
              <span className="score">{score} / 1000</span>
            </div>
            <div className="results">
              <div className={`result ${gameState.budget.spent <= gameState.budget.total ? 'pass' : 'fail'}`}><span>{gameState.budget.spent <= gameState.budget.total ? '✓' : '✗'}</span>Budget: ${gameState.budget.spent.toLocaleString()} spent</div>
              <div className={`result ${gameState.week <= gameState.schedule.deadline ? 'pass' : 'fail'}`}><span>{gameState.week <= gameState.schedule.deadline ? '✓' : '✗'}</span>Schedule: {gameState.week} weeks</div>
              <div className={`result ${gameState.scope.completed >= gameState.scope.totalFeatures * 0.9 ? 'pass' : 'fail'}`}><span>{gameState.scope.completed >= gameState.scope.totalFeatures * 0.9 ? '✓' : '✗'}</span>Scope: {gameState.scope.completed.toFixed(1)} / {gameState.scope.totalFeatures}</div>
              <div className={`result ${gameState.scope.quality >= 80 ? 'pass' : 'fail'}`}><span>{gameState.scope.quality >= 80 ? '✓' : '✗'}</span>Quality: {Math.round(gameState.scope.quality)}%</div>
            </div>
            <div className="end-actions">
              <button className="btn-primary" onClick={() => { setGameState(createApexInitialState(selectedScenario)); setSimPhase('playing'); }}>Play Again</button>
              <button className="btn-secondary" onClick={() => setSimPhase('select')}>Try Another Scenario</button>
              <button className="btn-secondary" onClick={() => setCurrentPage('dashboard')}>Back to Dashboard</button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // ============================================
  // MAIN RENDER
  // ============================================

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        :root {
          --bg-primary: #06060a;
          --bg-secondary: #0d0d14;
          --bg-card: #12121c;
          --bg-elevated: #1a1a28;
          --text-primary: #f0f0f5;
          --text-secondary: #9ca3af;
          --text-muted: #6b7280;
          --accent-primary: #6366f1;
          --accent-secondary: #8b5cf6;
          --success: #10b981;
          --warning: #f59e0b;
          --error: #ef4444;
          --border: rgba(255,255,255,0.06);
          --border-hover: rgba(255,255,255,0.12);
          --glow: rgba(99, 102, 241, 0.25);
        }
        
        body, .app { font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; background: var(--bg-primary); color: var(--text-primary); min-height: 100vh; }
        .gradient-text { background: linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        
        /* Toast */
        .toast { position: fixed; top: 80px; right: 20px; padding: 1rem 1.5rem; border-radius: 10px; z-index: 1000; animation: slideIn 0.3s ease; }
        .toast.success { background: rgba(16, 185, 129, 0.9); }
        .toast.error { background: rgba(239, 68, 68, 0.9); }
        .toast.info { background: rgba(99, 102, 241, 0.9); }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        
        /* Navbar */
        .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(6, 6, 10, 0.9); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
        .navbar-transparent { background: transparent; border-bottom: none; }
        .nav-container { max-width: 1280px; margin: 0 auto; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
        .nav-logo { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
        .logo-icon { font-size: 1.5rem; }
        .logo-text { font-size: 1.25rem; font-weight: 700; }
        .logo-accent { color: var(--accent-primary); }
        .nav-links { display: flex; align-items: center; gap: 1rem; }
        .nav-link { background: none; border: none; color: var(--text-secondary); font-family: inherit; font-size: 0.95rem; cursor: pointer; padding: 0.5rem 1rem; transition: color 0.2s; }
        .nav-link:hover { color: var(--text-primary); }
        .nav-btn-primary { background: var(--accent-primary); color: white; border: none; padding: 0.6rem 1.25rem; border-radius: 8px; font-family: inherit; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .nav-btn-primary:hover { background: var(--accent-secondary); }
        .nav-user { display: flex; align-items: center; gap: 0.75rem; }
        .user-avatar { width: 32px; height: 32px; background: var(--accent-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; }
        .nav-link-small { background: none; border: none; color: var(--text-muted); font-size: 0.85rem; cursor: pointer; }
        
        /* Buttons */
        .btn-primary { background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-family: inherit; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px var(--glow); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .btn-secondary { background: var(--bg-elevated); color: var(--text-primary); border: 1px solid var(--border); padding: 0.75rem 1.5rem; border-radius: 10px; font-family: inherit; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .btn-secondary:hover { background: var(--bg-card); }
        .btn-primary-lg, .btn-secondary-lg { padding: 1rem 2rem; font-size: 1.05rem; }
        .btn-full { width: 100%; }
        .btn-lg { padding: 1rem 2.5rem; font-size: 1.1rem; }
        
        /* Hero */
        .landing-page { background: var(--bg-primary); }
        .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; padding: 6rem 2rem 4rem; }
        .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at top, rgba(99, 102, 241, 0.15) 0%, transparent 60%), radial-gradient(ellipse at bottom right, rgba(168, 85, 247, 0.1) 0%, transparent 50%); }
        .hero-content { position: relative; text-align: center; max-width: 800px; }
        .hero-badge { display: inline-block; padding: 0.5rem 1rem; background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: 50px; font-size: 0.85rem; color: #a5b4fc; margin-bottom: 1.5rem; }
        .hero-title { font-size: 4.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; }
        .hero-subtitle { font-size: 1.25rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto 2rem; line-height: 1.7; }
        .hero-cta { display: flex; gap: 1rem; justify-content: center; margin-bottom: 3rem; }
        .hero-stats { display: flex; gap: 3rem; justify-content: center; }
        .stat { text-align: center; }
        .stat-num { display: block; font-size: 2rem; font-weight: 700; }
        .stat-label { font-size: 0.9rem; color: var(--text-muted); }
        
        /* Sections */
        .section-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        .section-header { text-align: center; margin-bottom: 3rem; }
        .section-header h2 { font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem; }
        .section-header p { color: var(--text-secondary); }
        .section-badge { display: inline-block; padding: 0.35rem 0.75rem; background: var(--accent-primary); color: white; border-radius: 4px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; margin-bottom: 0.75rem; }
        
        /* Featured */
        .featured-section { padding: 6rem 0; background: var(--bg-secondary); }
        .featured-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 3rem; display: flex; gap: 3rem; align-items: center; }
        .featured-icon { font-size: 5rem; background: var(--bg-elevated); padding: 2rem; border-radius: 20px; }
        .featured-content h3 { font-size: 1.75rem; margin-bottom: 1rem; }
        .featured-content p { color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem; }
        .featured-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
        .featured-tags span { padding: 0.35rem 0.75rem; background: var(--bg-elevated); border-radius: 6px; font-size: 0.85rem; color: var(--text-secondary); }
        
        /* Simulations Grid */
        .simulations-section { padding: 6rem 0; }
        .sim-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
        .sim-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; position: relative; transition: all 0.3s; }
        .sim-card:hover { border-color: var(--border-hover); transform: translateY(-4px); }
        .sim-card.coming-soon { opacity: 0.7; }
        .sim-icon { font-size: 2.5rem; margin-bottom: 1rem; }
        .sim-category { font-size: 0.8rem; color: var(--accent-primary); font-weight: 500; margin-bottom: 0.5rem; }
        .sim-card h3 { font-size: 1.25rem; margin-bottom: 0.25rem; }
        .sim-card p { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem; }
        .sim-meta { display: flex; gap: 1rem; font-size: 0.8rem; color: var(--text-muted); }
        .sim-badge-soon, .sim-badge-featured { position: absolute; top: 1rem; right: 1rem; padding: 0.25rem 0.6rem; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
        .sim-badge-soon { background: var(--bg-elevated); color: var(--text-muted); }
        .sim-badge-featured { background: var(--success); color: white; }
        
        /* Pricing */
        .pricing-page { min-height: 100vh; padding-top: 65px; }
        .pricing-container { max-width: 1100px; margin: 0 auto; padding: 3rem 2rem; }
        .pricing-header { text-align: center; margin-bottom: 3rem; }
        .pricing-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .pricing-header p { color: var(--text-secondary); margin-bottom: 1.5rem; }
        .billing-toggle { display: inline-flex; background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px; padding: 0.25rem; }
        .billing-toggle button { padding: 0.6rem 1.5rem; border: none; background: none; color: var(--text-secondary); font-family: inherit; font-weight: 500; cursor: pointer; border-radius: 8px; transition: all 0.2s; }
        .billing-toggle button.active { background: var(--accent-primary); color: white; }
        .save-badge { background: var(--success); color: white; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.7rem; margin-left: 0.5rem; }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .pricing-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 2rem; position: relative; }
        .pricing-card.popular { border-color: var(--accent-primary); box-shadow: 0 0 40px var(--glow); }
        .popular-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--accent-primary); color: white; padding: 0.35rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
        .pricing-card h3 { font-size: 1.5rem; margin-bottom: 1rem; }
        .price { margin-bottom: 0.5rem; }
        .currency { font-size: 1.5rem; vertical-align: top; }
        .amount { font-size: 3.5rem; font-weight: 700; }
        .period { color: var(--text-muted); }
        .plan-desc { color: var(--text-secondary); margin-bottom: 1.5rem; }
        .features-list { list-style: none; margin-bottom: 2rem; }
        .features-list li { padding: 0.5rem 0; color: var(--text-secondary); display: flex; gap: 0.75rem; }
        .check { color: var(--success); }
        .current-sub-card { margin-top: 3rem; background: var(--bg-card); border: 1px solid var(--accent-primary); border-radius: 16px; padding: 1.5rem; text-align: center; }
        .status-active { color: var(--success); }
        .status-inactive { color: var(--text-muted); }
        
        /* Footer */
        .footer { padding: 4rem 0 2rem; border-top: 1px solid var(--border); }
        .footer-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; gap: 4rem; flex-wrap: wrap; }
        .footer-brand p { color: var(--text-muted); margin-top: 0.5rem; }
        .footer-links { display: flex; gap: 4rem; }
        .footer-col h4 { font-size: 0.9rem; margin-bottom: 1rem; }
        .footer-col a { display: block; color: var(--text-muted); text-decoration: none; padding: 0.35rem 0; }
        .footer-bottom { max-width: 1200px; margin: 3rem auto 0; padding: 1.5rem 2rem 0; border-top: 1px solid var(--border); }
        .footer-bottom p { color: var(--text-muted); font-size: 0.9rem; }
        
        /* Auth */
        .auth-page { min-height: 100vh; display: flex; flex-direction: column; }
        .auth-container { flex: 1; display: flex; align-items: center; justify-content: center; padding: 6rem 2rem 2rem; }
        .auth-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 2.5rem; width: 100%; max-width: 420px; }
        .auth-card h2 { font-size: 1.75rem; margin-bottom: 0.5rem; }
        .auth-card > p { color: var(--text-secondary); margin-bottom: 2rem; }
        .auth-error { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1rem; font-size: 0.9rem; }
        .form-group { margin-bottom: 1.25rem; }
        .form-group label { display: block; font-size: 0.9rem; font-weight: 500; margin-bottom: 0.5rem; }
        .form-group input { width: 100%; padding: 0.75rem 1rem; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 10px; color: var(--text-primary); font-family: inherit; font-size: 1rem; }
        .form-group input:focus { outline: none; border-color: var(--accent-primary); }
        .auth-switch { text-align: center; margin-top: 1.5rem; color: var(--text-muted); }
        .auth-switch button { background: none; border: none; color: var(--accent-primary); font-family: inherit; cursor: pointer; }
        
        /* Dashboard */
        .dashboard-page { min-height: 100vh; }
        .dashboard-container { display: flex; padding-top: 65px; }
        .sidebar { width: 240px; background: var(--bg-secondary); border-right: 1px solid var(--border); min-height: calc(100vh - 65px); position: fixed; left: 0; top: 65px; }
        .sidebar-nav { padding: 1.5rem 0; }
        .sidebar-item { display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 0.85rem 1.5rem; background: none; border: none; color: var(--text-secondary); font-family: inherit; font-size: 0.95rem; cursor: pointer; text-align: left; }
        .sidebar-item:hover, .sidebar-item.active { background: var(--bg-elevated); color: var(--text-primary); }
        .sidebar-item.active { border-right: 3px solid var(--accent-primary); }
        .dashboard-main { flex: 1; margin-left: 240px; padding: 2rem; }
        .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .dashboard-header h1 { font-size: 1.75rem; margin-bottom: 0.25rem; }
        .dashboard-header p { color: var(--text-muted); }
        .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
        .stat-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 1.25rem; display: flex; align-items: center; gap: 1rem; }
        .stat-icon { font-size: 2rem; }
        .stat-content { display: flex; flex-direction: column; }
        .stat-value { font-size: 1.75rem; font-weight: 700; font-family: 'JetBrains Mono', monospace; }
        .stat-label { font-size: 0.85rem; color: var(--text-muted); }
        .dashboard-section { margin-bottom: 2rem; }
        .dashboard-section h2 { font-size: 1.25rem; margin-bottom: 1rem; }
        .quick-start-grid { display: flex; flex-direction: column; gap: 0.75rem; }
        .quick-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 1rem 1.25rem; display: flex; align-items: center; gap: 1rem; cursor: pointer; transition: all 0.2s; }
        .quick-card:hover { border-color: var(--accent-primary); background: var(--bg-elevated); }
        .quick-icon { font-size: 1.5rem; }
        .quick-card h3 { font-size: 1rem; margin-bottom: 0.15rem; }
        .quick-card p { font-size: 0.85rem; color: var(--text-muted); }
        .quick-arrow { margin-left: auto; color: var(--accent-primary); }
        .scores-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .score-item { background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px; padding: 1rem; display: flex; align-items: center; gap: 1rem; }
        .score-icon { font-size: 1.5rem; }
        .score-info { flex: 1; }
        .score-title { font-weight: 500; }
        .score-sub { font-size: 0.8rem; color: var(--text-muted); display: block; }
        .score-value { font-family: 'JetBrains Mono', monospace; font-size: 1.25rem; font-weight: 600; color: var(--accent-primary); }
        
        /* Catalog */
        .catalog-page { min-height: 100vh; padding-top: 65px; }
        .catalog-container { max-width: 1280px; margin: 0 auto; padding: 2rem; }
        .catalog-header { text-align: center; margin-bottom: 2rem; }
        .catalog-header h1 { font-size: 2.25rem; margin-bottom: 0.5rem; }
        .catalog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 1.5rem; }
        .catalog-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; overflow: hidden; display: flex; flex-direction: column; transition: all 0.3s; }
        .catalog-card:hover { border-color: var(--border-hover); transform: translateY(-4px); }
        .catalog-card.locked { opacity: 0.75; }
        .catalog-card-header { padding: 1.5rem; display: flex; justify-content: space-between; align-items: flex-start; }
        .catalog-icon { font-size: 3rem; }
        .catalog-badges { display: flex; gap: 0.5rem; }
        .badge-featured { padding: 0.25rem 0.6rem; background: var(--success); color: white; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
        .badge-soon { padding: 0.25rem 0.6rem; background: var(--bg-elevated); color: var(--text-muted); border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
        .badge-pro { padding: 0.25rem 0.6rem; background: var(--accent-secondary); color: white; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
        .catalog-card-body { padding: 0 1.5rem 1.5rem; flex: 1; }
        .catalog-category { font-size: 0.8rem; color: var(--accent-primary); font-weight: 500; }
        .catalog-card-body h3 { font-size: 1.4rem; margin: 0.25rem 0; }
        .catalog-subtitle { color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 0.75rem; }
        .catalog-desc { color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem; }
        .catalog-skills { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .skill-tag { padding: 0.25rem 0.6rem; background: var(--bg-elevated); border-radius: 4px; font-size: 0.75rem; color: var(--text-secondary); }
        .catalog-card-footer { padding: 1.25rem 1.5rem; border-top: 1px solid var(--border); background: var(--bg-secondary); }
        .catalog-meta { display: flex; gap: 1rem; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem; }
        .catalog-card-footer button { width: 100%; }
        
        /* Simulation Pages */
        .sim-page { min-height: 100vh; padding-top: 65px; }
        .sim-select-container, .brief-container { max-width: 900px; margin: 0 auto; padding: 2rem; }
        .back-link { background: none; border: none; color: var(--accent-primary); font-family: inherit; font-size: 0.95rem; cursor: pointer; margin-bottom: 2rem; padding: 0; }
        .sim-select-header { text-align: center; margin-bottom: 3rem; }
        .sim-select-icon { font-size: 4rem; margin-bottom: 1rem; display: block; }
        .sim-select-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .scenarios-title { font-size: 1.25rem; margin-bottom: 1.5rem; color: var(--text-secondary); }
        .scenarios-grid { display: flex; flex-direction: column; gap: 1rem; }
        .scenario-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; display: flex; gap: 1.5rem; align-items: flex-start; text-align: left; cursor: pointer; transition: all 0.2s; font-family: inherit; color: inherit; width: 100%; }
        .scenario-card:hover { border-color: var(--accent-primary); background: var(--bg-elevated); }
        .scenario-icon { font-size: 2.5rem; background: var(--bg-elevated); padding: 1rem; border-radius: 14px; }
        .scenario-info { flex: 1; }
        .scenario-info h3 { font-size: 1.2rem; margin-bottom: 0.2rem; }
        .scenario-sub { color: var(--accent-primary); font-size: 0.9rem; margin-bottom: 0.5rem; }
        .scenario-desc { color: var(--text-muted); font-size: 0.9rem; }
        .scenario-meta { text-align: right; font-size: 0.85rem; color: var(--text-muted); }
        .scenario-meta .difficulty { font-weight: 600; display: block; margin-bottom: 0.25rem; }
        
        /* Brief */
        .brief-header { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; }
        .brief-icon { font-size: 3rem; background: var(--bg-elevated); padding: 1.25rem; border-radius: 18px; }
        .brief-header h1 { font-size: 2rem; margin-bottom: 0.25rem; }
        .brief-company { color: var(--accent-primary); }
        .brief-content { background: var(--bg-card); border: 1px solid var(--border); border-radius: 18px; padding: 2rem; margin-bottom: 2rem; }
        .brief-section { margin-bottom: 1.5rem; }
        .brief-section h3 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent-primary); margin-bottom: 0.5rem; }
        .brief-section p { color: var(--text-secondary); line-height: 1.7; }
        .brief-objectives h3 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent-primary); margin-bottom: 1rem; }
        .objectives-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .objective { background: var(--bg-elevated); border-radius: 12px; padding: 1rem; display: flex; flex-direction: column; gap: 0.25rem; }
        .objective span:first-child { font-size: 1.25rem; }
        .objective strong { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }
        .objective span:last-child { font-family: 'JetBrains Mono', monospace; font-weight: 600; }
        
        /* Game Playing */
        .sim-playing { padding: 1.5rem; background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%); }
        .game-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-top: 50px; }
        .game-title { display: flex; align-items: center; gap: 1rem; }
        .game-icon { font-size: 2rem; background: var(--bg-card); padding: 0.75rem; border-radius: 12px; }
        .game-title h2 { font-size: 1.4rem; margin-bottom: 0.15rem; }
        .game-title span { color: var(--text-muted); font-size: 0.9rem; }
        .week-badge { background: var(--accent-primary); color: white; padding: 0.6rem 1.25rem; border-radius: 50px; font-weight: 600; }
        .game-dashboard { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
        .metric { background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 1rem; }
        .m-icon { font-size: 1.25rem; display: block; margin-bottom: 0.5rem; }
        .m-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; display: block; }
        .m-value { font-family: 'JetBrains Mono', monospace; font-size: 1.2rem; font-weight: 600; }
        .m-bar { height: 4px; background: var(--bg-elevated); border-radius: 2px; margin-top: 0.5rem; overflow: hidden; }
        .m-bar div { height: 100%; border-radius: 2px; transition: width 0.5s; }
        .game-actions { background: var(--bg-card); border: 1px solid var(--border); border-radius: 18px; padding: 1.5rem; }
        .game-actions h3 { font-size: 1.1rem; margin-bottom: 1rem; color: var(--accent-primary); }
        .action-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .action-btn { padding: 0.6rem 1.25rem; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 10px; color: var(--text-primary); font-family: inherit; cursor: pointer; transition: all 0.2s; }
        .action-btn:hover:not(:disabled) { background: var(--bg-secondary); border-color: var(--accent-primary); }
        .action-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .action-label { font-family: 'JetBrains Mono', monospace; font-weight: 600; min-width: 120px; text-align: center; }
        .quick-actions { display: flex; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; }
        .quick-btn { padding: 0.75rem 1.25rem; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 10px; color: #6ee7b7; font-family: inherit; cursor: pointer; transition: all 0.2s; }
        .quick-btn:hover:not(:disabled) { background: rgba(16, 185, 129, 0.2); }
        .quick-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .btn-advance { width: 100%; margin-top: 0.5rem; }
        
        /* Event Modal */
        .event-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; z-index: 200; padding: 1rem; backdrop-filter: blur(4px); }
        .event-modal { background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 2.5rem; max-width: 480px; width: 100%; text-align: center; }
        .event-icon { font-size: 3.5rem; margin-bottom: 1rem; display: block; }
        .event-modal h2 { font-size: 1.5rem; margin-bottom: 0.75rem; }
        .event-modal p { color: var(--text-secondary); line-height: 1.7; margin-bottom: 2rem; }
        .event-options { display: flex; flex-direction: column; gap: 0.6rem; }
        .event-option { padding: 1rem 1.25rem; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 12px; color: var(--text-primary); font-family: inherit; font-size: 0.95rem; cursor: pointer; text-align: left; transition: all 0.2s; }
        .event-option:hover { background: rgba(99, 102, 241, 0.15); border-color: var(--accent-primary); transform: translateX(6px); }
        
        /* End Screen */
        .sim-ended { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 2rem; }
        .end-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 3rem; max-width: 550px; width: 100%; text-align: center; }
        .end-icon { font-size: 3rem; margin-bottom: 1rem; display: block; }
        .end-card h1 { font-size: 1.75rem; margin-bottom: 0.25rem; }
        .end-card > p { color: var(--text-muted); margin-bottom: 2rem; }
        .score-display { margin-bottom: 2rem; }
        .grade { font-size: 6rem; font-weight: 800; line-height: 1; }
        .score { font-family: 'JetBrains Mono', monospace; font-size: 1.5rem; color: var(--text-muted); display: block; }
        .results { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 2rem; text-align: left; }
        .result { padding: 0.85rem 1rem; background: var(--bg-elevated); border-radius: 10px; display: flex; align-items: center; gap: 0.75rem; font-size: 0.95rem; }
        .result.pass { border-left: 3px solid var(--success); }
        .result.fail { border-left: 3px solid var(--error); }
        .result.pass span { color: var(--success); }
        .result.fail span { color: var(--error); }
        .end-actions { display: flex; flex-direction: column; gap: 0.75rem; }
        
        @media (max-width: 768px) {
          .hero-title { font-size: 2.75rem; }
          .hero-cta { flex-direction: column; }
          .featured-card { flex-direction: column; text-align: center; }
          .sidebar { display: none; }
          .dashboard-main { margin-left: 0; }
          .catalog-grid { grid-template-columns: 1fr; }
          .objectives-grid { grid-template-columns: 1fr; }
          .game-dashboard { grid-template-columns: repeat(2, 1fr); }
          .action-row { flex-wrap: wrap; justify-content: center; }
        }
      `}</style>
      
      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
      
      {currentPage === 'landing' && renderLanding()}
      {currentPage === 'auth' && renderAuth()}
      {currentPage === 'dashboard' && renderDashboard()}
      {currentPage === 'catalog' && renderCatalog()}
      {currentPage === 'pricing' && renderPricing()}
      {currentPage === 'simulation' && renderSimulation()}
    </div>
  );
}
