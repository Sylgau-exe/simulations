import React, { useState, useEffect } from 'react';

// ============================================
// API CLIENT
// ============================================

const API_BASE = '/api';
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
    api.request('/simulations/scores', { method: 'POST', body: JSON.stringify({ simulationId: simId, ...scoreData }) }),
  getScores: () => 
    api.request('/simulations/scores'),
  getLeaderboard: (simId) => 
    api.request(`/simulations/leaderboard?simulationId=${simId}`),
  getStats: () => 
    Promise.resolve({ stats: { total_plays: 0, unique_players: 0, average_score: 0 } })
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
    skills: ['Resource Allocation', 'Risk Management', 'Team Leadership', 'Decision Making'],
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
    skills: ['Fundraising', 'Team Building', 'Product Strategy'],
    available: false,
    tier: 'pro',
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
    description: 'Perfect for trying out',
    features: ['1 simulation (Project Apex)', 'Basic scenarios', 'Score tracking', 'Community support'],
    cta: 'Current Plan',
    popular: false
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 29,
    priceAnnual: 290,
    period: 'month',
    description: 'For serious learners',
    features: ['All simulations', 'All scenarios', 'Detailed analytics', 'Certificates', 'Priority support'],
    cta: 'Upgrade Now',
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
// PROJECT APEX SCENARIOS - ENHANCED WITH HBP MECHANICS
// ============================================

/*
 * HBP-INSPIRED CAUSAL MODEL
 * =========================
 * 
 * Key Relationships (from Harvard Business Publishing simulation):
 * 
 * 1. STRESS DRIVERS:
 *    - Unrealistic schedule (deadline - week remaining < 0) → +stress
 *    - Team changes (hiring/firing) → +stress (transition costs)
 *    - Overtime/crunch mode → +stress
 *    - Low knowledge (early project) → +stress
 * 
 * 2. STRESS → MORALE:
 *    - High stress (>60) → morale decreases
 *    - Morale affects hours worked and engagement
 * 
 * 3. MORALE → PRODUCTIVITY:
 *    - Low morale → fewer productive hours
 *    - Morale < 40 → significant productivity penalty
 * 
 * 4. KNOWLEDGE ACCUMULATION:
 *    - Coaching meetings build knowledge over time
 *    - Knowledge reduces mistake rate
 *    - Team changes cause knowledge loss
 * 
 * 5. COORDINATION NEEDS:
 *    - Larger teams need more coordination (standups)
 *    - Without coordination → higher mistake rate → rework
 * 
 * 6. SCHEDULE CONSISTENCY:
 *    - Changing deadline frequently → morale penalty
 *    - Each change after week 2 → -5 morale, +10 stress
 */

const APEX_SCENARIOS = {
  tech_startup: {
    id: 'tech_startup',
    title: 'Tech Startup',
    subtitle: 'Software Product Launch',
    icon: '💻',
    difficulty: 'Standard',
    difficultyColor: '#3b82f6',
    description: 'You are the Project Manager at Nexus Technologies. Deliver a new SaaS platform while managing team dynamics and technical challenges.',
    company: 'Nexus Technologies',
    projectName: 'Phoenix Platform',
    deliverable: 'features',
    // Pedagogical focus: Learn basic mechanics, achievable targets
    pedagogicalFocus: 'mechanics',
    hasPrototyping: false,
    hasUncertainty: false,
    initial: { 
      budget: 500000, 
      weeks: 10, 
      scope: 12, 
      teamSize: 5, 
      quality: 85, 
      morale: 75,
      stress: 20,      // NEW: Starting stress level
      knowledge: 30,   // NEW: Starting knowledge (team familiarity)
    },
    weeklyCostPerPerson: 8000,
    // CAUSAL EVENTS: Triggered by conditions, not random
    causalEvents: [
      { 
        id: 'scope_creep', 
        title: 'Scope Creep Alert', 
        description: 'The product owner wants to add 2 new features. Your response affects both scope and team stress.',
        icon: '📈',
        // Trigger condition: After week 3, if quality > 80
        triggerCondition: (state) => state.week >= 3 && state.scope.quality > 80,
        options: [
          { id: 'accept', label: 'Accept all changes (+2 scope, +stress)', effects: { scope: 2, budget: -30000, stress: 15, morale: -5 } },
          { id: 'negotiate', label: 'Negotiate to add 1 feature', effects: { scope: 1, budget: -15000, stress: 5 } },
          { id: 'decline', label: 'Decline and stay focused (+morale)', effects: { morale: 8, quality: 2, stress: -5 } }
        ]
      },
      { 
        id: 'tech_debt', 
        title: 'Technical Debt Crisis', 
        description: 'QA discovered critical technical debt. Addressing it now prevents larger problems later.',
        icon: '🔧',
        // Trigger: Mid-project if quality dropped below 75
        triggerCondition: (state) => state.week >= 4 && state.scope.quality < 75,
        options: [
          { id: 'fix_now', label: 'Full refactor (schedule hit, quality gain)', effects: { schedule: -1, quality: 15, budget: -20000, knowledge: 10 } },
          { id: 'patch', label: 'Quick patch', effects: { quality: 5, budget: -8000 } },
          { id: 'defer', label: 'Document for v2 (risk)', effects: { quality: -15, stress: 10 } }
        ]
      },
      { 
        id: 'dev_resignation', 
        title: 'Lead Developer Resigns', 
        description: 'Your lead developer accepted a FAANG offer. This will cause knowledge loss.',
        icon: '🚪',
        // Trigger: If stress is high (>50) after week 5
        triggerCondition: (state) => state.week >= 5 && state.team.stress > 50,
        options: [
          { id: 'counter', label: 'Counter-offer (expensive, retain knowledge)', effects: { budget: -45000, morale: 5, knowledge: 0 } },
          { id: 'transition', label: 'Knowledge transfer period', effects: { team: -1, schedule: -1, morale: -5, knowledge: -15, stress: 15 } },
          { id: 'contractor', label: 'Hire contractor (no knowledge loss)', effects: { budget: -55000, productivity: -0.1 } }
        ]
      },
      { 
        id: 'team_conflict', 
        title: 'Architecture Disagreement', 
        description: 'Senior devs debate microservices vs monolith. Unresolved conflict will hurt productivity.',
        icon: '🔥',
        // Trigger: If team size > 5 and morale < 70
        triggerCondition: (state) => state.team.size > 5 && state.team.morale < 70,
        options: [
          { id: 'mediate', label: 'Architecture review workshop (+knowledge)', effects: { budget: -8000, morale: 10, productivity: 0.1, knowledge: 8 } },
          { id: 'decide', label: 'Executive decision (fast, some resentment)', effects: { morale: -10, productivity: 0.05 } },
          { id: 'hybrid', label: 'Hybrid approach (compromise)', effects: { budget: -5000, morale: 5 } }
        ]
      }
    ]
  },

  live_show: {
    id: 'live_show',
    title: 'Live Entertainment',
    subtitle: 'Touring Show Production',
    icon: '🎪',
    difficulty: 'Advanced',
    difficultyColor: '#f59e0b',
    description: 'Executive Producer at Stellar Productions. Launch an ambitious touring show while managing creative talent and safety requirements.',
    company: 'Stellar Productions',
    projectName: 'AURORA - A Journey of Light',
    deliverable: 'acts',
    // Pedagogical focus: People/creative management, high coordination needs
    pedagogicalFocus: 'people',
    hasPrototyping: true,  // Tech rehearsals = prototypes
    hasUncertainty: true,
    initial: { 
      budget: 2500000, 
      weeks: 12, 
      scope: 8, 
      teamSize: 12, 
      quality: 80, 
      morale: 80,
      stress: 25,
      knowledge: 20,  // Lower starting knowledge - creative project
    },
    weeklyCostPerPerson: 6000,
    causalEvents: [
      { 
        id: 'star_injury', 
        title: 'Lead Performer Injury', 
        description: 'Your star acrobat suffered a minor injury. How you handle this affects team trust.',
        icon: '🤕',
        triggerCondition: (state) => state.week >= 4 && state.team.stress > 40,
        options: [
          { id: 'rest', label: 'Full recovery time (+morale, +trust)', effects: { schedule: -2, quality: 10, morale: 15, stress: -10 } },
          { id: 'modified', label: 'Modified choreography', effects: { quality: -5, budget: -20000 } },
          { id: 'understudy', label: 'Promote understudy (risky)', effects: { morale: -10, quality: -10, stress: 10 } }
        ]
      },
      { 
        id: 'creative_conflict', 
        title: 'Creative Vision Clash', 
        description: 'Director and choreographer disagree on Act 3. Unresolved, this will fester.',
        icon: '🎭',
        triggerCondition: (state) => state.week >= 5 && state.team.morale < 75,
        options: [
          { id: 'director', label: "Back director's vision", effects: { morale: -15, quality: 5, stress: 5 } },
          { id: 'choreographer', label: 'Support choreographer', effects: { morale: -10, quality: 5, stress: 5 } },
          { id: 'workshop', label: 'Creative workshop (+knowledge)', effects: { budget: -30000, schedule: -1, quality: 15, morale: 10, knowledge: 12 } }
        ]
      },
      { 
        id: 'rigging_issue', 
        title: 'Rigging Safety Concern', 
        description: 'Aerial rigging may not meet safety standards. A prototype/tech rehearsal would have caught this earlier.',
        icon: '⚠️',
        // This event is MITIGATED if prototypes were built
        triggerCondition: (state) => state.week >= 6,
        prototypeModifier: true, // If prototypes built, effects reduced
        options: [
          { id: 'redesign', label: 'Full redesign (safest)', effects: { budget: -150000, schedule: -2, quality: 15, stress: -10 } },
          { id: 'reinforce', label: 'Reinforce current design', effects: { budget: -60000, quality: 5 } },
          { id: 'simplify', label: 'Simplify aerial sequences', effects: { scope: -1, quality: -10, morale: -10 } }
        ]
      }
    ]
  },

  construction: {
    id: 'construction',
    title: 'Construction',
    subtitle: 'Commercial Building Project',
    icon: '🏗️',
    difficulty: 'Standard',
    difficultyColor: '#3b82f6',
    description: 'Project Manager at UrbanCore Construction. Build a 12-story mixed-use building while managing permits, weather, and safety.',
    company: 'UrbanCore Construction',
    projectName: 'Metropolitan Tower',
    deliverable: 'floors',
    // Pedagogical focus: Risk management, prototyping value
    pedagogicalFocus: 'risk',
    hasPrototyping: true,  // Mockups, inspections = prototypes
    hasUncertainty: true,
    initial: { 
      budget: 8000000, 
      weeks: 16, 
      scope: 12, 
      teamSize: 25, 
      quality: 85, 
      morale: 70,
      stress: 30,
      knowledge: 40,  // Higher starting knowledge - experienced crew
    },
    weeklyCostPerPerson: 4500,
    causalEvents: [
      { 
        id: 'weather_delay', 
        title: 'Severe Weather Alert', 
        description: 'Major storm forecast for 10 days. Your choice affects both schedule and team safety.',
        icon: '🌧️',
        triggerCondition: (state) => state.week >= 4 && state.week <= 12,
        options: [
          { id: 'pause', label: 'Pause outdoor work (safe)', effects: { schedule: -2, morale: 5, stress: -5 } },
          { id: 'interior', label: 'Interior work only', effects: { schedule: -1, budget: -50000, knowledge: 5 } },
          { id: 'push', label: 'Continue with caution (risky)', effects: { budget: -80000, quality: -5, morale: -10, stress: 15 } }
        ]
      },
      { 
        id: 'permit_issue', 
        title: 'Permit Inspection Failed', 
        description: 'Inspector flagged electrical issues. A prototype/mockup inspection would have caught this earlier.',
        icon: '📋',
        triggerCondition: (state) => state.week >= 6,
        prototypeModifier: true,
        options: [
          { id: 'rework', label: 'Full rework (+quality)', effects: { schedule: -2, budget: -120000, quality: 10, knowledge: 8 } },
          { id: 'appeal', label: 'Appeal decision', effects: { schedule: -1, budget: -30000, stress: 10 } },
          { id: 'expedite', label: 'Hire specialist (expensive)', effects: { budget: -180000 } }
        ]
      },
      { 
        id: 'safety_incident', 
        title: 'Safety Near-Miss', 
        description: 'Scaffold bracket failed. OSHA will investigate. This affects team morale and stress significantly.',
        icon: '🦺',
        triggerCondition: (state) => state.week >= 5 && state.team.stress > 45,
        options: [
          { id: 'full_audit', label: 'Full safety audit (+trust)', effects: { schedule: -1, budget: -60000, quality: 10, morale: 15, stress: -15, knowledge: 10 } },
          { id: 'targeted', label: 'Targeted inspection', effects: { budget: -25000, quality: 5 } },
          { id: 'minimal', label: 'Document and continue (risky)', effects: { quality: -10, morale: -15, stress: 20 } }
        ]
      },
      { 
        id: 'materials_shortage', 
        title: 'Materials Shortage', 
        description: 'Supply chain issue: steel delivery delayed 3 weeks. Prototyping/early ordering would have mitigated this.',
        icon: '📦',
        triggerCondition: (state) => state.week >= 7,
        prototypeModifier: true,
        options: [
          { id: 'wait', label: 'Wait for delivery', effects: { schedule: -3, morale: -10, stress: 15 } },
          { id: 'alternative', label: 'Source alternative supplier', effects: { budget: -200000, schedule: -1 } },
          { id: 'redesign', label: 'Redesign with available materials', effects: { budget: -100000, quality: -5, knowledge: 5 } }
        ]
      }
    ]
  },

  // NEW SCENARIO: High-Uncertainty R&D Project
  rd_innovation: {
    id: 'rd_innovation',
    title: 'R&D Innovation',
    subtitle: 'New Technology Development',
    icon: '🔬',
    difficulty: 'Expert',
    difficultyColor: '#dc2626',
    description: 'Lead a cutting-edge R&D project with high uncertainty. Prototyping is essential to surface problems early.',
    company: 'FutureTech Labs',
    projectName: 'Quantum Sensor Array',
    deliverable: 'milestones',
    // Pedagogical focus: Prototyping value in uncertainty
    pedagogicalFocus: 'prototyping',
    hasPrototyping: true,
    hasUncertainty: true,
    initial: { 
      budget: 3000000, 
      weeks: 14, 
      scope: 10, 
      teamSize: 8, 
      quality: 75,  // Lower starting quality - R&D uncertainty
      morale: 85,
      stress: 35,   // Higher stress - cutting edge work
      knowledge: 25, // Low knowledge - novel technology
    },
    weeklyCostPerPerson: 10000,
    causalEvents: [
      { 
        id: 'tech_failure', 
        title: 'Core Technology Failure', 
        description: 'The main sensor approach isn\'t working as expected. Prototypes would have revealed this earlier.',
        icon: '💥',
        triggerCondition: (state) => state.week >= 5,
        prototypeModifier: true, // Severity significantly reduced if prototypes built
        options: [
          { id: 'pivot', label: 'Pivot to backup approach', effects: { scope: -2, budget: -200000, knowledge: 15, stress: -10 } },
          { id: 'iterate', label: 'Iterate on current design', effects: { schedule: -3, budget: -150000, quality: -10, stress: 15 } },
          { id: 'parallel', label: 'Run parallel approaches', effects: { budget: -400000, team: 2, stress: 20 } }
        ]
      },
      { 
        id: 'breakthrough', 
        title: 'Unexpected Breakthrough', 
        description: 'A team member discovered a shortcut. How you capitalize on it matters.',
        icon: '💡',
        triggerCondition: (state) => state.week >= 6 && state.team.knowledge > 50,
        options: [
          { id: 'focus', label: 'Focus resources on breakthrough', effects: { quality: 15, morale: 15, knowledge: 10, stress: -10 } },
          { id: 'validate', label: 'Build prototype to validate', effects: { budget: -50000, quality: 10, knowledge: 20 } },
          { id: 'patent', label: 'Document for patent first', effects: { schedule: -1, morale: -5 } }
        ]
      },
      { 
        id: 'competitor_announcement', 
        title: 'Competitor Announcement', 
        description: 'A competitor announced a similar product launching in 8 weeks. Time pressure increases.',
        icon: '⚡',
        triggerCondition: (state) => state.week >= 7,
        options: [
          { id: 'accelerate', label: 'Accelerate timeline (-3 weeks)', effects: { schedule: -3, stress: 25, morale: -10 } },
          { id: 'differentiate', label: 'Pivot to differentiation (+scope)', effects: { scope: 2, budget: -100000, knowledge: 5 } },
          { id: 'stay_course', label: 'Stay the course (quality focus)', effects: { quality: 10, morale: 5 } }
        ]
      }
    ]
  }
};

// ============================================
// ENHANCED GAME MECHANICS - HBP CAUSAL MODEL
// ============================================

/*
 * MEETING TYPES (replacing simple "boost morale")
 * Based on HBP simulation's three meeting types with distinct effects
 */
const MEETING_TYPES = {
  coaching: {
    id: 'coaching',
    name: 'One-on-One Coaching',
    description: 'Build team knowledge and skills. Best early in project.',
    hoursPerWeek: 2,
    costPerSession: 500, // per team member
    effects: {
      knowledge: 8,      // Primary benefit: builds knowledge
      morale: 3,         // Secondary: some morale boost
      stress: -2,        // Slight stress relief
    },
    icon: '🎓'
  },
  standup: {
    id: 'standup',
    name: 'Daily Standups',
    description: 'Prevent coordination mistakes. Essential for larger teams.',
    hoursPerWeek: 1.25, // 15 min/day × 5 days
    costPerSession: 0,  // No direct cost, just time
    effects: {
      coordination: 10,  // Reduces mistake rate
      productivity: 0.02, // Slight productivity boost from alignment
    },
    icon: '📊'
  },
  status: {
    id: 'status',
    name: 'Status Review',
    description: 'Team alignment and stakeholder communication.',
    hoursPerWeek: 2,
    costPerSession: 300, // room, materials
    effects: {
      morale: 5,        // Team feels heard
      stress: -5,       // Clarity reduces anxiety
      stakeholder: 10,  // Better stakeholder relations
    },
    icon: '📋'
  }
};

/*
 * PROTOTYPING MECHANIC
 * Prototypes cost time/money upfront but reduce severity of uncertainty events
 */
const PROTOTYPE_COST = {
  tech_startup: { budget: 15000, time: 0.5 }, // 0.5 = half a week of reduced progress
  live_show: { budget: 50000, time: 1 },      // Tech rehearsal
  construction: { budget: 80000, time: 1 },   // Mockup/inspection
  rd_innovation: { budget: 100000, time: 1 }, // Lab prototype
};

/*
 * CAUSAL CALCULATIONS
 */

// Calculate stress level based on multiple factors
const calculateStress = (state, scenario) => {
  let stress = state.team.stress;
  
  // Factor 1: Schedule pressure (unrealistic deadline)
  const weeksRemaining = state.schedule.deadline - state.week;
  const workRemaining = state.scope.totalFeatures - state.scope.completed;
  const weeklyCapacity = calculateWeeklyCapacity(state.team, state);
  const weeksNeeded = workRemaining / (weeklyCapacity * state.scope.totalFeatures);
  
  if (weeksNeeded > weeksRemaining) {
    // Schedule is unrealistic - add stress proportional to gap
    stress += Math.min(15, (weeksNeeded - weeksRemaining) * 5);
  }
  
  // Factor 2: Recent team changes (hiring/firing causes transition stress)
  // This is handled in action effects
  
  // Factor 3: Low knowledge early in project
  if (state.team.knowledge < 40 && state.week <= 4) {
    stress += 5;
  }
  
  // Factor 4: Crunch/overtime (handled in action effects)
  
  // Natural stress decay if conditions are good
  if (weeksNeeded <= weeksRemaining && state.team.morale > 70) {
    stress -= 3;
  }
  
  return Math.max(0, Math.min(100, stress));
};

// Stress affects morale (HBP: high stress → lower morale)
const calculateMoraleFromStress = (currentMorale, stress) => {
  let moraleDelta = 0;
  
  if (stress > 60) {
    moraleDelta = -((stress - 60) * 0.3); // High stress drains morale
  } else if (stress < 30) {
    moraleDelta = 2; // Low stress allows morale recovery
  }
  
  return Math.max(10, Math.min(100, currentMorale + moraleDelta));
};

// Morale affects productivity (HBP: low morale → fewer hours worked)
const calculateProductivityFromMorale = (baseProductivity, morale) => {
  if (morale >= 80) {
    return baseProductivity * 1.1; // High morale bonus
  } else if (morale >= 60) {
    return baseProductivity;
  } else if (morale >= 40) {
    return baseProductivity * 0.85; // Moderate penalty
  } else {
    return baseProductivity * 0.65; // Severe penalty
  }
};

// Knowledge affects mistake rate (HBP: low knowledge → more rework)
const calculateMistakeRate = (knowledge, hasStandups) => {
  let baseRate = 0.15 - (knowledge * 0.001); // 15% base, reduced by knowledge
  
  // Standups reduce coordination mistakes
  if (hasStandups) {
    baseRate *= 0.7; // 30% reduction
  }
  
  return Math.max(0.02, baseRate); // Minimum 2% mistake rate
};

// Weekly capacity calculation (enhanced)
const calculateWeeklyCapacity = (team, state) => {
  const baseCapacity = team.size * team.productivity;
  const moraleAdjustedProductivity = calculateProductivityFromMorale(team.productivity, team.morale);
  const mistakeRate = calculateMistakeRate(state.team.knowledge, state.meetings?.standup);
  
  // Effective capacity accounts for mistakes (rework)
  const effectiveCapacity = (team.size * moraleAdjustedProductivity * (team.morale / 100)) * (1 - mistakeRate);
  
  return effectiveCapacity * 0.08;
};

// Calculate weekly progress with enhanced model
const calculateWeeklyProgress = (team, scope, state) => {
  const capacity = calculateWeeklyCapacity(team, state);
  return Math.min(capacity, 1 - (scope.completed / scope.totalFeatures));
};

// Schedule consistency penalty
const calculateScheduleConsistencyPenalty = (scheduleChanges) => {
  if (scheduleChanges <= 1) return { morale: 0, stress: 0 };
  if (scheduleChanges === 2) return { morale: -3, stress: 5 };
  if (scheduleChanges === 3) return { morale: -8, stress: 10 };
  return { morale: -15, stress: 20 }; // 4+ changes
};

// Enhanced scoring (HBP-style with bonus for consistency)
const calculateScore = (state) => {
  const budgetScore = Math.max(0, (1 - state.budget.spent / state.budget.total)) * 200;
  const scheduleScore = state.week <= state.schedule.deadline 
    ? 200 
    : Math.max(0, 200 - (state.week - state.schedule.deadline) * 40);
  const scopeScore = (state.scope.completed / state.scope.totalFeatures) * 200;
  const qualityScore = (state.scope.quality / 100) * 200;
  
  // NEW: Team process score (HBP has this as 100 points)
  const avgMorale = state.moraleHistory 
    ? state.moraleHistory.reduce((a, b) => a + b, 0) / state.moraleHistory.length 
    : state.team.morale;
  const teamProcessScore = (avgMorale / 100) * 100;
  
  // NEW: Bonus for schedule consistency
  const consistencyBonus = state.scheduleChanges <= 1 ? 50 : state.scheduleChanges === 2 ? 25 : 0;
  
  // NEW: Prototype bonus (if applicable and prototypes were built)
  const prototypeBonus = state.prototypesBuilt > 0 ? state.prototypesBuilt * 25 : 0;
  
  return Math.round(budgetScore + scheduleScore + scopeScore + qualityScore + teamProcessScore + consistencyBonus + prototypeBonus);
};

const getGrade = (score) => {
  if (score >= 900) return 'A+';
  if (score >= 800) return 'A';
  if (score >= 700) return 'B+';
  if (score >= 600) return 'B';
  if (score >= 500) return 'C';
  if (score >= 400) return 'D';
  return 'F';
};

// Enhanced initial state with new fields
const createApexInitialState = (scenario) => ({
  scenario: scenario.id,
  week: 1,
  totalWeeks: scenario.initial.weeks,
  budget: { total: scenario.initial.budget, spent: 0 },
  schedule: { 
    deadline: scenario.initial.weeks,
    originalDeadline: scenario.initial.weeks // Track original for consistency
  },
  scope: { 
    totalFeatures: scenario.initial.scope, 
    completed: 0, 
    quality: scenario.initial.quality 
  },
  team: { 
    size: scenario.initial.teamSize, 
    morale: scenario.initial.morale, 
    productivity: 1.0,
    stress: scenario.initial.stress,
    knowledge: scenario.initial.knowledge
  },
  // NEW: Meeting tracking
  meetings: {
    coaching: false,
    standup: false,
    status: false
  },
  // NEW: Schedule change tracking
  scheduleChanges: 0,
  // NEW: Prototype tracking
  prototypesBuilt: 0,
  maxPrototypes: scenario.hasPrototyping ? 3 : 0,
  // NEW: Morale history for team process score
  moraleHistory: [scenario.initial.morale],
  // Decision tracking
  decisions: [],
  triggeredEvents: [], // Track which events have fired
  gamePhase: 'playing',
  currentEvent: null,
  startTime: Date.now()
});

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
  
  // NEW: How to Play modal
  const [showHowToPlay, setShowHowToPlay] = useState(false);

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
    
    const params = new URLSearchParams(window.location.search);
    
    // Handle Google OAuth token
    const googleToken = params.get('token');
    if (googleToken) {
      api.setToken(googleToken);
      api.getMe().then(data => {
        setCurrentUser(data.user);
        setCurrentPage('dashboard');
        loadUserData();
        showToast('🎉 Successfully signed in with Google!', 'success');
      }).catch(() => {
        api.setToken(null);
        showToast('Authentication failed. Please try again.', 'error');
      });
      window.history.replaceState({}, '', window.location.pathname);
    }
    
    // Handle Google OAuth errors
    const authError = params.get('error');
    if (authError) {
      showToast('Google sign-in failed. Please try again.', 'error');
      window.history.replaceState({}, '', window.location.pathname);
    }
    
    // Check for success redirect from Stripe
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

  // ENHANCED ACTION HANDLER with causal effects
  const handleAction = (action) => {
    setGameState(prev => {
      const newState = { ...prev };
      const scenario = selectedScenario;
      
      switch (action.type) {
        case 'hire':
          newState.team = { 
            ...prev.team, 
            size: prev.team.size + 1,
            morale: Math.min(100, prev.team.morale + 3),
            stress: prev.team.stress + 8, // Hiring causes transition stress
            knowledge: Math.max(prev.team.knowledge - 3, 10) // Dilutes team knowledge slightly
          };
          newState.budget = { ...prev.budget, spent: prev.budget.spent + action.cost };
          break;
          
        case 'fire':
          newState.team = { 
            ...prev.team, 
            size: Math.max(2, prev.team.size - 1),
            morale: Math.max(0, prev.team.morale - 12), // Firing hurts morale more
            stress: prev.team.stress + 10, // Also stressful
            knowledge: Math.max(prev.team.knowledge - 8, 10) // Knowledge loss
          };
          break;
          
        // NEW: Meeting type actions (replacing simple boost_morale)
        case 'meeting_coaching':
          const coachingCost = MEETING_TYPES.coaching.costPerSession * prev.team.size;
          newState.budget = { ...prev.budget, spent: prev.budget.spent + coachingCost };
          newState.team = { 
            ...prev.team, 
            knowledge: Math.min(100, prev.team.knowledge + MEETING_TYPES.coaching.effects.knowledge),
            morale: Math.min(100, prev.team.morale + MEETING_TYPES.coaching.effects.morale),
            stress: Math.max(0, prev.team.stress + MEETING_TYPES.coaching.effects.stress)
          };
          newState.meetings = { ...prev.meetings, coaching: true };
          break;
          
        case 'meeting_standup':
          newState.team = { 
            ...prev.team, 
            productivity: Math.min(1.5, prev.team.productivity + MEETING_TYPES.standup.effects.productivity)
          };
          newState.meetings = { ...prev.meetings, standup: true };
          break;
          
        case 'meeting_status':
          const statusCost = MEETING_TYPES.status.costPerSession;
          newState.budget = { ...prev.budget, spent: prev.budget.spent + statusCost };
          newState.team = { 
            ...prev.team, 
            morale: Math.min(100, prev.team.morale + MEETING_TYPES.status.effects.morale),
            stress: Math.max(0, prev.team.stress + MEETING_TYPES.status.effects.stress)
          };
          newState.meetings = { ...prev.meetings, status: true };
          break;
          
        case 'quality_review':
          newState.budget = { ...prev.budget, spent: prev.budget.spent + action.cost };
          newState.scope = { ...prev.scope, quality: Math.min(100, prev.scope.quality + 5) };
          newState.team = { ...prev.team, knowledge: Math.min(100, prev.team.knowledge + 2) };
          break;
          
        case 'crunch':
          newState.budget = { ...prev.budget, spent: prev.budget.spent + action.cost };
          newState.scope = { ...prev.scope, completed: prev.scope.completed + 0.5 };
          newState.team = { 
            ...prev.team, 
            morale: Math.max(10, prev.team.morale - 15),
            stress: Math.min(100, prev.team.stress + 20) // Crunch is very stressful
          };
          break;
          
        // NEW: Prototype action
        case 'build_prototype':
          if (scenario.hasPrototyping && prev.prototypesBuilt < prev.maxPrototypes) {
            const protoCost = PROTOTYPE_COST[scenario.id];
            newState.budget = { ...prev.budget, spent: prev.budget.spent + protoCost.budget };
            newState.prototypesBuilt = prev.prototypesBuilt + 1;
            newState.team = { 
              ...prev.team, 
              knowledge: Math.min(100, prev.team.knowledge + 10) // Prototypes build knowledge
            };
            // Slight progress penalty for time spent
            newState.scope = { 
              ...prev.scope, 
              completed: Math.max(0, prev.scope.completed - (protoCost.time * 0.03))
            };
          }
          break;
          
        // NEW: Adjust schedule (with consistency tracking)
        case 'extend_deadline':
          if (prev.week > 2) {
            newState.scheduleChanges = prev.scheduleChanges + 1;
            const penalty = calculateScheduleConsistencyPenalty(newState.scheduleChanges);
            newState.team = {
              ...prev.team,
              morale: Math.max(10, prev.team.morale + penalty.morale),
              stress: Math.min(100, prev.team.stress + penalty.stress)
            };
          }
          newState.schedule = { 
            ...prev.schedule, 
            deadline: prev.schedule.deadline + 1 
          };
          break;
      }
      
      return newState;
    });
  };

  // ENHANCED WEEK ADVANCEMENT with causal model
  const advanceWeek = () => {
    setGameState(prev => {
      const scenario = selectedScenario;
      const progress = calculateWeeklyProgress(prev.team, prev.scope, prev);
      const weeklyCost = prev.team.size * scenario.weeklyCostPerPerson;
      
      // Calculate new stress based on causal factors
      const newStress = calculateStress(prev, scenario);
      
      // Stress affects morale
      const stressAdjustedMorale = calculateMoraleFromStress(prev.team.morale, newStress);
      
      // Small natural morale drift
      const moraleDrift = (Math.random() - 0.5) * 4;
      
      const newState = {
        ...prev,
        week: prev.week + 1,
        budget: { ...prev.budget, spent: prev.budget.spent + weeklyCost },
        scope: { 
          ...prev.scope, 
          completed: prev.scope.completed + (progress * prev.scope.totalFeatures) 
        },
        team: { 
          ...prev.team, 
          morale: Math.max(10, Math.min(100, stressAdjustedMorale + moraleDrift)),
          stress: newStress
        },
        // Track morale history for team process score
        moraleHistory: [...prev.moraleHistory, stressAdjustedMorale + moraleDrift],
        // Reset weekly meeting flags
        meetings: { coaching: false, standup: false, status: false }
      };
      
      // CHECK FOR CAUSAL EVENTS (condition-based, not random)
      if (prev.week < prev.totalWeeks) {
        const availableEvents = scenario.causalEvents.filter(e => 
          !prev.triggeredEvents.includes(e.id) && 
          e.triggerCondition(newState)
        );
        
        if (availableEvents.length > 0) {
          // Pick the most relevant event (first one that triggers)
          const event = availableEvents[0];
          
          // If event has prototypeModifier and prototypes were built, modify effects
          if (event.prototypeModifier && prev.prototypesBuilt > 0) {
            // Create modified event with reduced severity
            const modifiedEvent = {
              ...event,
              description: event.description + ` (Severity reduced by ${prev.prototypesBuilt} prototype(s))`,
              options: event.options.map(opt => ({
                ...opt,
                effects: Object.fromEntries(
                  Object.entries(opt.effects).map(([key, val]) => {
                    // Reduce negative effects based on prototypes built
                    if (val < 0) {
                      return [key, Math.round(val * (1 - prev.prototypesBuilt * 0.2))];
                    }
                    return [key, val];
                  })
                )
              }))
            };
            newState.currentEvent = modifiedEvent;
          } else {
            newState.currentEvent = event;
          }
          newState.gamePhase = 'event';
          newState.triggeredEvents = [...prev.triggeredEvents, event.id];
        }
      }
      
      // Check for game end
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
            budgetScore: Math.round(Math.max(0, (1 - newState.budget.spent / newState.budget.total)) * 200),
            scheduleScore: Math.round(newState.week <= newState.schedule.deadline ? 200 : Math.max(0, 200 - (newState.week - newState.schedule.deadline) * 40)),
            scopeScore: Math.round((newState.scope.completed / newState.scope.totalFeatures) * 200),
            qualityScore: Math.round((newState.scope.quality / 100) * 200),
            teamProcessScore: Math.round((newState.moraleHistory.reduce((a, b) => a + b, 0) / newState.moraleHistory.length / 100) * 100),
            consistencyBonus: newState.scheduleChanges <= 1 ? 50 : newState.scheduleChanges === 2 ? 25 : 0,
            prototypeBonus: newState.prototypesBuilt * 25,
            prototypesBuilt: newState.prototypesBuilt,
            scheduleChanges: newState.scheduleChanges
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
      
      // Apply all effects
      if (effects.scope) newState.scope = { ...prev.scope, totalFeatures: Math.max(1, prev.scope.totalFeatures + effects.scope) };
      if (effects.budget) newState.budget = { ...prev.budget, spent: prev.budget.spent + Math.abs(effects.budget) };
      if (effects.schedule) newState.schedule = { ...prev.schedule, deadline: Math.max(1, prev.schedule.deadline + effects.schedule) };
      if (effects.morale) newState.team = { ...prev.team, morale: Math.max(5, Math.min(100, prev.team.morale + effects.morale)) };
      if (effects.productivity) newState.team = { ...newState.team, productivity: Math.max(0.4, Math.min(1.6, prev.team.productivity + effects.productivity)) };
      if (effects.quality) newState.scope = { ...newState.scope, quality: Math.max(0, Math.min(100, prev.scope.quality + effects.quality)) };
      if (effects.team) newState.team = { ...newState.team, size: Math.max(2, prev.team.size + effects.team) };
      if (effects.stress) newState.team = { ...newState.team, stress: Math.max(0, Math.min(100, prev.team.stress + effects.stress)) };
      if (effects.knowledge) newState.team = { ...newState.team, knowledge: Math.max(0, Math.min(100, prev.team.knowledge + effects.knowledge)) };
      
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
              <p>Navigate real-world challenges across 4 industry scenarios. Balance scope, schedule, budget, and team dynamics with our HBP-inspired causal model.</p>
              <div className="featured-tags">
                <span>Tech Startup</span><span>Live Entertainment</span><span>Construction</span><span>R&D Innovation</span>
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
          <p className="auth-subtitle">{authMode === 'login' ? 'Sign in to continue learning' : 'Start your learning journey'}</p>
          
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
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="••••••••" required minLength={6} />
            </div>
            <button type="submit" className="btn-primary btn-full" disabled={authLoading}>
              {authLoading ? 'Please wait...' : authMode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          
          <div className="auth-divider"><span>or</span></div>
          
          <button className="btn-google" onClick={() => window.location.href = `${API_BASE}/auth/google`}>
            <span className="google-icon">G</span>
            Continue with Google
          </button>
          
          <p className="auth-toggle">
            {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setAuthError(''); }}>
              {authMode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="dashboard-page">
      {renderNavbar()}
      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>Quick Actions</h3>
            <button className="sidebar-btn" onClick={() => startSimulation('project-apex')}>▶️ Play Project Apex</button>
            <button className="sidebar-btn" onClick={() => setCurrentPage('catalog')}>📚 Browse Simulations</button>
          </div>
          <div className="sidebar-section">
            <h3>Your Stats</h3>
            <div className="stat-item"><span>Simulations Played</span><strong>{userScores.scores?.length || 0}</strong></div>
            <div className="stat-item"><span>Best Grade</span><strong>{userScores.bestScores?.[0]?.grade || '-'}</strong></div>
            <div className="stat-item"><span>High Score</span><strong>{userScores.bestScores?.[0]?.score || 0}</strong></div>
          </div>
        </aside>
        <main className="dashboard-main">
          <div className="welcome-card">
            <h1>Welcome back, {currentUser?.name?.split(' ')[0]}!</h1>
            <p>Ready to continue your learning journey?</p>
          </div>
          
          <div className="dashboard-section">
            <h2>Recent Scores</h2>
            {userScores.scores?.length > 0 ? (
              <div className="scores-list">
                {userScores.scores.slice(0, 5).map((score, idx) => {
                  const dateStr = score.created_at ? new Date(score.created_at).toLocaleDateString() : '';
                  const isValidDate = dateStr && dateStr !== 'Invalid Date';
                  return (
                    <div key={idx} className="score-item">
                      <div className="score-info">
                        <span className="score-scenario">{score.scenario_id?.replace('_', ' ') || 'Unknown'}</span>
                        <span className="score-date">{isValidDate ? dateStr : 'Recent'}</span>
                      </div>
                      <div className="score-result">
                        <span className="score-grade">{score.grade}</span>
                        <span className="score-points">{score.score} pts</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="no-scores">No scores yet. Start playing to track your progress!</p>
            )}}
          </div>
          
          <div className="dashboard-section">
            <h2>Featured Simulation</h2>
            <div className="featured-sim-card" onClick={() => startSimulation('project-apex')}>
              <div className="featured-sim-icon">🎯</div>
              <div className="featured-sim-content">
                <h3>Project Apex</h3>
                <p>Master project management with our enhanced causal model simulation.</p>
                <span className="featured-sim-cta">Play Now →</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  const renderCatalog = () => (
    <div className="catalog-page">
      {renderNavbar()}
      <div className="catalog-container">
        <div className="catalog-header">
          <h1>Simulation Library</h1>
          <p>Choose your learning adventure</p>
        </div>
        <div className="catalog-grid">
          {SIMULATIONS.map(sim => (
            <div key={sim.id} className={`catalog-card ${sim.comingSoon ? 'locked' : ''}`}>
              <div className="catalog-card-header">
                <span className="catalog-icon">{sim.icon}</span>
                <div className="catalog-badges">
                  {sim.featured && <span className="badge-featured">Available</span>}
                  {sim.comingSoon && <span className="badge-soon">Coming Soon</span>}
                  {sim.tier === 'pro' && <span className="badge-pro">PRO</span>}
                </div>
              </div>
              <div className="catalog-card-body">
                <span className="catalog-category">{sim.category}</span>
                <h3>{sim.title}</h3>
                <p className="catalog-subtitle">{sim.subtitle}</p>
                <p className="catalog-desc">{sim.description}</p>
                <div className="catalog-skills">
                  {sim.skills?.slice(0, 3).map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
                </div>
              </div>
              <div className="catalog-card-footer">
                <div className="catalog-meta">
                  <span>🎯 {sim.difficulty}</span>
                  <span>⏱️ {sim.duration}</span>
                  <span>📊 {sim.scenarios} scenarios</span>
                </div>
                <button 
                  className="btn-primary btn-full"
                  disabled={!sim.available}
                  onClick={() => sim.available && startSimulation(sim.id)}
                >
                  {sim.comingSoon ? 'Coming Soon' : 'Start Simulation'}
                </button>
              </div>
            </div>
          ))}
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
          <p>Choose the plan that fits your learning goals</p>
          <div className="billing-toggle">
            <button className={billingCycle === 'monthly' ? 'active' : ''} onClick={() => setBillingCycle('monthly')}>Monthly</button>
            <button className={billingCycle === 'annual' ? 'active' : ''} onClick={() => setBillingCycle('annual')}>Annual (Save 17%)</button>
          </div>
        </div>
        <div className="pricing-grid">
          {PRICING_PLANS.map(plan => (
            <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <h3>{plan.name}</h3>
              <p className="plan-desc">{plan.description}</p>
              <div className="plan-price">
                <span className="price">${billingCycle === 'annual' ? Math.round(plan.priceAnnual / 12) : plan.price}</span>
                <span className="period">/{plan.price === 0 ? 'forever' : 'month'}</span>
              </div>
              <ul className="plan-features">
                {plan.features.map(f => <li key={f}>✓ {f}</li>)}
              </ul>
              <button 
                className={`btn-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => plan.id !== 'free' && handleCheckout(plan.id)}
                disabled={checkoutLoading === plan.id || plan.id === 'free'}
              >
                {checkoutLoading === plan.id ? 'Loading...' : plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ENHANCED SIMULATION RENDERING
  const renderSimulation = () => {
    if (simPhase === 'select') {
      return (
        <div className="sim-page">
          {renderNavbar()}
          <div className="sim-select-container">
            <button className="back-link" onClick={() => setCurrentPage('catalog')}>← Back to Library</button>
            <div className="sim-select-header">
              <span className="sim-select-icon">{selectedSimulation?.icon}</span>
              <h1>{selectedSimulation?.title}</h1>
              <p>{selectedSimulation?.description}</p>
            </div>
            <h3 className="scenarios-title">Choose Your Scenario</h3>
            <div className="scenarios-grid">
              {Object.values(APEX_SCENARIOS).map(scenario => (
                <button key={scenario.id} className="scenario-card" onClick={() => selectScenario(scenario)}>
                  <div className="scenario-icon">{scenario.icon}</div>
                  <div className="scenario-info">
                    <h3>{scenario.title}</h3>
                    <p className="scenario-sub">{scenario.subtitle}</p>
                    <p className="scenario-desc">{scenario.description}</p>
                    {scenario.hasPrototyping && <span className="scenario-badge">🔬 Prototyping Available</span>}
                    {scenario.hasUncertainty && <span className="scenario-badge">⚡ High Uncertainty</span>}
                  </div>
                  <div className="scenario-meta">
                    <span className="difficulty" style={{color: scenario.difficultyColor}}>{scenario.difficulty}</span>
                    <span>{scenario.initial.weeks} weeks</span>
                    <span>Focus: {scenario.pedagogicalFocus}</span>
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
              <div className="brief-icon">{selectedScenario.icon}</div>
              <div>
                <h1>{selectedScenario.projectName}</h1>
                <p className="brief-company">{selectedScenario.company}</p>
              </div>
            </div>
            <div className="brief-content">
              <div className="brief-section">
                <h3>Your Mission</h3>
                <p>{selectedScenario.description}</p>
              </div>
              <div className="brief-section">
                <h3>Enhanced Mechanics</h3>
                <p>This simulation uses a <strong>causal model</strong> where your decisions have systemic effects:</p>
                <ul className="mechanics-list">
                  <li><strong>Stress ↔ Morale ↔ Productivity:</strong> High stress lowers morale, which reduces output</li>
                  <li><strong>Knowledge Building:</strong> Coaching and experience reduce mistake rates</li>
                  <li><strong>Schedule Consistency:</strong> Frequent deadline changes hurt team trust</li>
                  {selectedScenario.hasPrototyping && <li><strong>Prototyping:</strong> Build prototypes early to reduce uncertainty risks</li>}
                </ul>
              </div>
              <div className="brief-objectives">
                <h3>Starting Conditions</h3>
                <div className="objectives-grid">
                  <div className="objective"><span>💰</span><strong>Budget</strong><span>${(selectedScenario.initial.budget / 1000).toFixed(0)}K</span></div>
                  <div className="objective"><span>📅</span><strong>Deadline</strong><span>{selectedScenario.initial.weeks} weeks</span></div>
                  <div className="objective"><span>📦</span><strong>Scope</strong><span>{selectedScenario.initial.scope} {selectedScenario.deliverable}</span></div>
                  <div className="objective"><span>👥</span><strong>Team</strong><span>{selectedScenario.initial.teamSize} members</span></div>
                  <div className="objective"><span>😊</span><strong>Morale</strong><span>{selectedScenario.initial.morale}%</span></div>
                  <div className="objective"><span>😰</span><strong>Stress</strong><span>{selectedScenario.initial.stress}%</span></div>
                  <div className="objective"><span>🧠</span><strong>Knowledge</strong><span>{selectedScenario.initial.knowledge}%</span></div>
                  <div className="objective"><span>⭐</span><strong>Quality</strong><span>{selectedScenario.initial.quality}%</span></div>
                </div>
              </div>
            </div>
            <div className="brief-actions">
              <button className="btn-secondary" onClick={() => setShowHowToPlay(true)}>📖 How to Play</button>
              <button className="btn-primary btn-lg" onClick={beginSimulation}>Begin Simulation →</button>
            </div>
          </div>
          
          {/* How to Play Modal */}
          {showHowToPlay && (
            <div className="event-overlay" onClick={() => setShowHowToPlay(false)}>
              <div className="how-to-play-modal" onClick={e => e.stopPropagation()}>
                <h2>📖 How to Play</h2>
                <div className="how-to-content">
                  <h3>🎯 Goal</h3>
                  <p>Complete your project scope within budget and deadline while maintaining team health.</p>
                  
                  <h3>⚡ The Causal Model</h3>
                  <p>Unlike random events, this simulation uses cause-and-effect relationships:</p>
                  <ul>
                    <li><strong>Unrealistic schedules</strong> increase stress</li>
                    <li><strong>High stress</strong> reduces morale</li>
                    <li><strong>Low morale</strong> reduces productivity</li>
                    <li><strong>Team changes</strong> cause knowledge loss</li>
                    <li><strong>Coaching meetings</strong> build knowledge over time</li>
                  </ul>
                  
                  <h3>🎮 Actions Each Week</h3>
                  <ul>
                    <li><strong>Hire/Fire:</strong> Adjust team size (affects stress & knowledge)</li>
                    <li><strong>Meetings:</strong> Choose coaching, standups, or status reviews</li>
                    <li><strong>Quality Review:</strong> Improve deliverable quality</li>
                    <li><strong>Crunch Mode:</strong> Speed up work at cost of morale</li>
                    {selectedScenario.hasPrototyping && <li><strong>Build Prototype:</strong> Reduce severity of future problems</li>}
                  </ul>
                  
                  <h3>📊 Scoring (1000 points max)</h3>
                  <ul>
                    <li>Budget: 200 pts</li>
                    <li>Schedule: 200 pts</li>
                    <li>Scope: 200 pts</li>
                    <li>Quality: 200 pts</li>
                    <li>Team Process: 100 pts</li>
                    <li>Consistency Bonus: up to 50 pts</li>
                    <li>Prototype Bonus: 25 pts each</li>
                  </ul>
                </div>
                <button className="btn-primary" onClick={() => setShowHowToPlay(false)}>Got it!</button>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (simPhase === 'playing' && gameState) {
      const scenario = selectedScenario;
      const budgetRemaining = gameState.budget.total - gameState.budget.spent;
      const budgetPercent = (budgetRemaining / gameState.budget.total) * 100;
      const scopePercent = (gameState.scope.completed / gameState.scope.totalFeatures) * 100;
      const weeksRemaining = gameState.schedule.deadline - gameState.week + 1;
      
      // Calculate effective productivity for display
      const effectiveProductivity = calculateProductivityFromMorale(gameState.team.productivity, gameState.team.morale);
      
      return (
        <div className="sim-playing">
          {renderNavbar()}
          <div className="game-header">
            <div className="game-title">
              <div className="game-icon">{scenario.icon}</div>
              <div>
                <h2>{scenario.projectName}</h2>
                <span>{scenario.company}</span>
              </div>
            </div>
            <div className="week-badge">Week {gameState.week} / {gameState.totalWeeks}</div>
          </div>

          {/* ENHANCED DASHBOARD with new metrics */}
          <div className="game-dashboard">
            <div className="metric">
              <span className="m-icon">💰</span>
              <span className="m-label">Budget Remaining</span>
              <span className="m-value">${(budgetRemaining / 1000).toFixed(0)}K</span>
              <div className="m-bar"><div style={{width: `${Math.max(0, budgetPercent)}%`, background: budgetPercent > 30 ? '#10b981' : '#ef4444'}}></div></div>
            </div>
            <div className="metric">
              <span className="m-icon">📅</span>
              <span className="m-label">Weeks Left</span>
              <span className="m-value">{Math.max(0, weeksRemaining)}</span>
              <div className="m-bar"><div style={{width: `${(weeksRemaining / gameState.totalWeeks) * 100}%`, background: weeksRemaining > 2 ? '#10b981' : '#f59e0b'}}></div></div>
            </div>
            <div className="metric">
              <span className="m-icon">📦</span>
              <span className="m-label">Scope Complete</span>
              <span className="m-value">{Math.round(scopePercent)}%</span>
              <div className="m-bar"><div style={{width: `${scopePercent}%`, background: '#6366f1'}}></div></div>
            </div>
            <div className="metric">
              <span className="m-icon">⭐</span>
              <span className="m-label">Quality</span>
              <span className="m-value">{Math.round(gameState.scope.quality)}%</span>
              <div className="m-bar"><div style={{width: `${gameState.scope.quality}%`, background: gameState.scope.quality > 70 ? '#10b981' : '#f59e0b'}}></div></div>
            </div>
            <div className="metric">
              <span className="m-icon">👥</span>
              <span className="m-label">Team Size</span>
              <span className="m-value">{gameState.team.size}</span>
            </div>
            <div className="metric">
              <span className="m-icon">😊</span>
              <span className="m-label">Morale</span>
              <span className="m-value">{Math.round(gameState.team.morale)}%</span>
              <div className="m-bar"><div style={{width: `${gameState.team.morale}%`, background: gameState.team.morale > 60 ? '#10b981' : gameState.team.morale > 40 ? '#f59e0b' : '#ef4444'}}></div></div>
            </div>
            {/* NEW: Stress indicator */}
            <div className="metric">
              <span className="m-icon">😰</span>
              <span className="m-label">Stress</span>
              <span className="m-value">{Math.round(gameState.team.stress)}%</span>
              <div className="m-bar"><div style={{width: `${gameState.team.stress}%`, background: gameState.team.stress < 40 ? '#10b981' : gameState.team.stress < 60 ? '#f59e0b' : '#ef4444'}}></div></div>
            </div>
            {/* NEW: Knowledge indicator */}
            <div className="metric">
              <span className="m-icon">🧠</span>
              <span className="m-label">Knowledge</span>
              <span className="m-value">{Math.round(gameState.team.knowledge)}%</span>
              <div className="m-bar"><div style={{width: `${gameState.team.knowledge}%`, background: '#8b5cf6'}}></div></div>
            </div>
            {/* NEW: Effective productivity */}
            <div className="metric">
              <span className="m-icon">⚡</span>
              <span className="m-label">Productivity</span>
              <span className="m-value">{Math.round(effectiveProductivity * 100)}%</span>
              <div className="m-bar"><div style={{width: `${effectiveProductivity * 100}%`, background: '#06b6d4'}}></div></div>
            </div>
            {/* NEW: Prototypes built (if applicable) */}
            {scenario.hasPrototyping && (
              <div className="metric">
                <span className="m-icon">🔬</span>
                <span className="m-label">Prototypes</span>
                <span className="m-value">{gameState.prototypesBuilt} / {gameState.maxPrototypes}</span>
              </div>
            )}
          </div>

          <div className="game-actions">
            <h3>📋 Weekly Actions</h3>
            
            {/* Team Management */}
            <div className="action-section">
              <h4>👥 Team Management</h4>
              <div className="action-row">
                <button className="action-btn" onClick={() => handleAction({ type: 'fire' })} disabled={gameState.team.size <= 2}>
                  − Fire
                </button>
                <span className="action-label">{gameState.team.size} members</span>
                <button className="action-btn" onClick={() => handleAction({ type: 'hire', cost: scenario.weeklyCostPerPerson * 2 })}>
                  + Hire (${(scenario.weeklyCostPerPerson * 2 / 1000).toFixed(0)}K)
                </button>
              </div>
            </div>
            
            {/* NEW: Meeting Types (replacing boost morale) */}
            <div className="action-section">
              <h4>📅 Meetings This Week</h4>
              <div className="meeting-options">
                {Object.values(MEETING_TYPES).map(meeting => (
                  <button 
                    key={meeting.id}
                    className={`meeting-btn ${gameState.meetings[meeting.id] ? 'active' : ''}`}
                    onClick={() => handleAction({ type: `meeting_${meeting.id}` })}
                    disabled={gameState.meetings[meeting.id]}
                  >
                    <span className="meeting-icon">{meeting.icon}</span>
                    <span className="meeting-name">{meeting.name}</span>
                    <span className="meeting-desc">{meeting.description}</span>
                    {gameState.meetings[meeting.id] && <span className="meeting-done">✓ Done</span>}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="action-section">
              <h4>⚡ Quick Actions</h4>
              <div className="quick-actions">
                <button className="quick-btn" onClick={() => handleAction({ type: 'quality_review', cost: 10000 })}>
                  🔍 Quality Review ($10K)
                </button>
                <button className="quick-btn crunch" onClick={() => handleAction({ type: 'crunch', cost: 15000 })}>
                  🔥 Crunch Mode ($15K, -morale, +stress)
                </button>
                {scenario.hasPrototyping && gameState.prototypesBuilt < gameState.maxPrototypes && (
                  <button className="quick-btn proto" onClick={() => handleAction({ type: 'build_prototype' })}>
                    🔬 Build Prototype (${(PROTOTYPE_COST[scenario.id].budget / 1000).toFixed(0)}K)
                  </button>
                )}
                <button className="quick-btn schedule" onClick={() => handleAction({ type: 'extend_deadline' })}>
                  📅 Extend Deadline +1 week {gameState.scheduleChanges > 0 && '(penalty)'}
                </button>
              </div>
            </div>
            
            {/* Schedule change warning */}
            {gameState.scheduleChanges > 1 && (
              <div className="warning-banner">
                ⚠️ Schedule changed {gameState.scheduleChanges} times. Team morale affected by uncertainty.
              </div>
            )}
            
            <button className="btn-primary btn-advance" onClick={advanceWeek}>
              Advance to Week {gameState.week + 1} →
            </button>
          </div>

          {/* Event Modal */}
          {gameState.gamePhase === 'event' && gameState.currentEvent && (
            <div className="event-overlay">
              <div className="event-modal">
                <span className="event-icon">{gameState.currentEvent.icon}</span>
                <h2>{gameState.currentEvent.title}</h2>
                <p>{gameState.currentEvent.description}</p>
                <div className="event-options">
                  {gameState.currentEvent.options.map(option => (
                    <button key={option.id} className="event-option" onClick={() => handleEventChoice(option)}>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (simPhase === 'ended' && gameState) {
      const finalScore = calculateScore(gameState);
      const grade = getGrade(finalScore);
      const budgetOnTarget = gameState.budget.spent <= gameState.budget.total;
      const scheduleOnTarget = gameState.week <= gameState.schedule.deadline;
      const scopeComplete = gameState.scope.completed >= gameState.scope.totalFeatures * 0.95;
      const qualityGood = gameState.scope.quality >= 75;
      
      return (
        <div className="sim-ended">
          <div className="end-card">
            <span className="end-icon">{grade === 'F' ? '😔' : grade.startsWith('A') ? '🏆' : grade === 'B' || grade === 'B+' ? '🎉' : '💪'}</span>
            <h1>Simulation Complete!</h1>
            <p>{selectedScenario.projectName}</p>
            
            <div className="score-display">
              <span className="grade" style={{color: grade.startsWith('A') ? '#10b981' : grade.startsWith('B') ? '#6366f1' : grade === 'C' ? '#f59e0b' : '#ef4444'}}>{grade}</span>
              <span className="score">{finalScore} / 1000 points</span>
            </div>

            <div className="results">
              <div className={`result ${budgetOnTarget ? 'pass' : 'fail'}`}>
                <span>{budgetOnTarget ? '✓' : '✗'}</span> Budget: ${(gameState.budget.spent / 1000).toFixed(0)}K / ${(gameState.budget.total / 1000).toFixed(0)}K
              </div>
              <div className={`result ${scheduleOnTarget ? 'pass' : 'fail'}`}>
                <span>{scheduleOnTarget ? '✓' : '✗'}</span> Schedule: Week {gameState.week} / {gameState.schedule.deadline}
              </div>
              <div className={`result ${scopeComplete ? 'pass' : 'fail'}`}>
                <span>{scopeComplete ? '✓' : '✗'}</span> Scope: {Math.round((gameState.scope.completed / gameState.scope.totalFeatures) * 100)}% complete
              </div>
              <div className={`result ${qualityGood ? 'pass' : 'fail'}`}>
                <span>{qualityGood ? '✓' : '✗'}</span> Quality: {Math.round(gameState.scope.quality)}%
              </div>
              <div className="result pass">
                <span>📊</span> Team Process: {Math.round(gameState.moraleHistory.reduce((a, b) => a + b, 0) / gameState.moraleHistory.length)}% avg morale
              </div>
              {gameState.scheduleChanges <= 1 && (
                <div className="result pass">
                  <span>🎯</span> Consistency Bonus: +{gameState.scheduleChanges <= 1 ? 50 : 25} pts
                </div>
              )}
              {gameState.prototypesBuilt > 0 && (
                <div className="result pass">
                  <span>🔬</span> Prototype Bonus: +{gameState.prototypesBuilt * 25} pts
                </div>
              )}
            </div>

            <div className="end-actions">
              <button className="btn-primary" onClick={beginSimulation}>Play Again</button>
              <button className="btn-secondary" onClick={() => { setSimPhase('select'); setGameState(null); }}>Try Different Scenario</button>
              <button className="btn-secondary" onClick={() => setCurrentPage('dashboard')}>Back to Dashboard</button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // ============================================
  // STYLES
  // ============================================

  return (
    <div className="app">
      <style>{`
        :root {
          --bg-primary: #0a0a0f;
          --bg-secondary: #12121a;
          --bg-card: #1a1a24;
          --bg-elevated: #242430;
          --text-primary: #ffffff;
          --text-secondary: #b4b4c0;
          --text-muted: #6b6b7a;
          --accent-primary: #6366f1;
          --accent-secondary: #8b5cf6;
          --border: #2a2a38;
          --border-hover: #3a3a4a;
          --success: #10b981;
          --warning: #f59e0b;
          --error: #ef4444;
        }
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--bg-primary);
          color: var(--text-primary);
          line-height: 1.6;
        }
        
        .app { min-height: 100vh; }
        
        button { cursor: pointer; font-family: inherit; }
        
        /* Navbar */
        .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1rem 2rem; background: rgba(10, 10, 15, 0.9); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); }
        .navbar-transparent { background: transparent; border-bottom: none; }
        .nav-container { max-width: 1400px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .nav-logo { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
        .logo-icon { font-size: 1.5rem; }
        .logo-text { font-size: 1.25rem; font-weight: 700; }
        .logo-accent { color: var(--accent-primary); }
        .nav-links { display: flex; align-items: center; gap: 1rem; }
        .nav-link { background: none; border: none; color: var(--text-secondary); font-size: 0.95rem; padding: 0.5rem 1rem; transition: color 0.2s; }
        .nav-link:hover { color: var(--text-primary); }
        .nav-btn-primary { background: var(--accent-primary); border: none; color: white; padding: 0.6rem 1.25rem; border-radius: 8px; font-weight: 500; transition: opacity 0.2s; }
        .nav-btn-primary:hover { opacity: 0.9; }
        .nav-user { display: flex; align-items: center; gap: 0.75rem; padding-left: 1rem; border-left: 1px solid var(--border); }
        .user-avatar { width: 32px; height: 32px; background: var(--accent-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem; }
        .user-name { font-size: 0.9rem; color: var(--text-secondary); }
        .nav-link-small { background: none; border: none; color: var(--text-muted); font-size: 0.85rem; }
        
        /* Buttons */
        .btn-primary { background: var(--accent-primary); border: none; color: white; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 500; font-size: 0.95rem; transition: all 0.2s; }
        .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .btn-secondary { background: var(--bg-elevated); border: 1px solid var(--border); color: var(--text-primary); padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 500; font-size: 0.95rem; transition: all 0.2s; }
        .btn-secondary:hover { border-color: var(--border-hover); background: var(--bg-card); }
        .btn-full { width: 100%; }
        .btn-lg { padding: 1rem 2rem; font-size: 1.1rem; }
        .btn-primary-lg { background: var(--accent-primary); border: none; color: white; padding: 1rem 2rem; border-radius: 12px; font-weight: 600; font-size: 1.1rem; }
        .btn-secondary-lg { background: transparent; border: 1px solid var(--border); color: var(--text-primary); padding: 1rem 2rem; border-radius: 12px; font-weight: 500; font-size: 1.1rem; }
        
        /* Toast */
        .toast { position: fixed; bottom: 2rem; right: 2rem; padding: 1rem 1.5rem; border-radius: 12px; background: var(--bg-card); border: 1px solid var(--border); z-index: 1000; animation: slideIn 0.3s ease; }
        .toast.success { border-color: var(--success); }
        .toast.error { border-color: var(--error); }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        
        /* Landing Page */
        .landing-page { min-height: 100vh; }
        .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at top, rgba(99, 102, 241, 0.15) 0%, transparent 60%); }
        .hero-content { position: relative; text-align: center; padding: 2rem; max-width: 800px; }
        .hero-badge { display: inline-block; padding: 0.5rem 1rem; background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 50px; font-size: 0.9rem; color: var(--accent-primary); margin-bottom: 1.5rem; }
        .hero-title { font-size: 4rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; }
        .gradient-text { background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-subtitle { font-size: 1.25rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto 2rem; line-height: 1.7; }
        .hero-cta { display: flex; gap: 1rem; justify-content: center; margin-bottom: 3rem; }
        .hero-stats { display: flex; gap: 3rem; justify-content: center; }
        .stat { text-align: center; }
        .stat-num { display: block; font-size: 2.5rem; font-weight: 700; color: var(--accent-primary); }
        .stat-label { font-size: 0.9rem; color: var(--text-muted); }
        
        /* Featured Section */
        .featured-section, .simulations-section { padding: 5rem 2rem; }
        .section-container { max-width: 1200px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 3rem; }
        .section-badge { display: inline-block; padding: 0.4rem 0.8rem; background: rgba(99, 102, 241, 0.15); border-radius: 4px; font-size: 0.8rem; color: var(--accent-primary); font-weight: 600; margin-bottom: 1rem; }
        .section-header h2 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .section-header p { color: var(--text-muted); font-size: 1.1rem; }
        .featured-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 3rem; display: flex; gap: 3rem; align-items: center; }
        .featured-icon { font-size: 5rem; background: var(--bg-elevated); padding: 2rem; border-radius: 24px; }
        .featured-content h3 { font-size: 1.75rem; margin-bottom: 1rem; }
        .featured-content p { color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.7; }
        .featured-tags { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
        .featured-tags span { padding: 0.4rem 0.8rem; background: var(--bg-elevated); border-radius: 6px; font-size: 0.85rem; color: var(--text-muted); }
        
        /* Sim Grid */
        .sim-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
        .sim-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 1.5rem; position: relative; transition: all 0.3s; }
        .sim-card:hover { border-color: var(--border-hover); transform: translateY(-4px); }
        .sim-card.coming-soon { opacity: 0.6; }
        .sim-icon { font-size: 2.5rem; margin-bottom: 1rem; }
        .sim-category { font-size: 0.8rem; color: var(--accent-primary); font-weight: 500; margin-bottom: 0.25rem; }
        .sim-card h3 { font-size: 1.25rem; margin-bottom: 0.25rem; }
        .sim-card p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem; }
        .sim-meta { display: flex; gap: 1rem; font-size: 0.8rem; color: var(--text-muted); }
        .sim-badge-soon, .sim-badge-featured { position: absolute; top: 1rem; right: 1rem; padding: 0.3rem 0.6rem; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
        .sim-badge-soon { background: var(--bg-elevated); color: var(--text-muted); }
        .sim-badge-featured { background: var(--success); color: white; }
        
        /* Footer */
        .footer { background: var(--bg-secondary); padding: 4rem 2rem 1rem; }
        .footer-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; padding-bottom: 3rem; border-bottom: 1px solid var(--border); }
        .footer-brand p { color: var(--text-muted); margin-top: 0.5rem; font-size: 0.9rem; }
        .footer-links { display: flex; gap: 4rem; }
        .footer-col h4 { font-size: 0.9rem; margin-bottom: 1rem; color: var(--text-muted); }
        .footer-col a { display: block; color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem; text-decoration: none; }
        .footer-bottom { text-align: center; padding-top: 1.5rem; }
        .footer-bottom p { color: var(--text-muted); font-size: 0.85rem; }
        
        /* Auth Page */
        .auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding-top: 80px; }
        .auth-container { width: 100%; max-width: 420px; padding: 2rem; }
        .auth-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 2.5rem; }
        .auth-card h2 { font-size: 1.75rem; margin-bottom: 0.5rem; }
        .auth-subtitle { color: var(--text-muted); margin-bottom: 2rem; }
        .auth-error { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.9rem; }
        .form-group { margin-bottom: 1.25rem; }
        .form-group label { display: block; font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem; }
        .form-group input { width: 100%; padding: 0.85rem 1rem; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 10px; color: var(--text-primary); font-size: 1rem; }
        .form-group input:focus { outline: none; border-color: var(--accent-primary); }
        .auth-divider { text-align: center; margin: 1.5rem 0; color: var(--text-muted); font-size: 0.9rem; }
        .btn-google { width: 100%; padding: 0.85rem; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 10px; color: var(--text-primary); font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 0.75rem; }
        .google-icon { font-weight: 700; font-size: 1.1rem; }
        .auth-toggle { text-align: center; margin-top: 1.5rem; color: var(--text-muted); font-size: 0.9rem; }
        .auth-toggle button { background: none; border: none; color: var(--accent-primary); font-size: 0.9rem; }
        
        /* Dashboard - LIGHT THEME */
        .dashboard-page { 
          min-height: 100vh; 
          padding-top: 65px; 
          background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
          color: #1e293b;
        }
        .dashboard-page .navbar { background: rgba(255, 255, 255, 0.95); border-bottom: 1px solid #e2e8f0; }
        .dashboard-page .nav-link { color: #475569; }
        .dashboard-page .nav-link:hover { color: #1e293b; }
        .dashboard-page .user-name { color: #475569; }
        .dashboard-page .nav-link-small { color: #64748b; }
        
        .dashboard-layout { display: flex; max-width: 1400px; margin: 0 auto; }
        .sidebar { 
          width: 280px; 
          padding: 2rem; 
          border-right: 1px solid #e2e8f0; 
          min-height: calc(100vh - 65px); 
          background: #ffffff;
        }
        .sidebar-section { margin-bottom: 2rem; }
        .sidebar-section h3 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin-bottom: 1rem; font-weight: 600; }
        .sidebar-btn { 
          width: 100%; 
          padding: 0.85rem 1rem; 
          background: #f8fafc; 
          border: 1px solid #e2e8f0; 
          border-radius: 10px; 
          color: #1e293b; 
          font-size: 0.9rem; 
          text-align: left; 
          margin-bottom: 0.5rem; 
          transition: all 0.2s; 
          font-weight: 500;
        }
        .sidebar-btn:hover { border-color: #6366f1; background: #f0f0ff; }
        .stat-item { display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #e2e8f0; font-size: 0.9rem; }
        .stat-item span { color: #64748b; }
        .stat-item strong { color: #1e293b; font-weight: 700; }
        .dashboard-main { flex: 1; padding: 2rem; }
        .welcome-card { 
          background: linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%); 
          border: 1px solid #c7d2fe; 
          border-radius: 20px; 
          padding: 2rem; 
          margin-bottom: 2rem; 
        }
        .welcome-card h1 { font-size: 1.75rem; margin-bottom: 0.5rem; color: #1e293b; }
        .welcome-card p { color: #475569; }
        .dashboard-section { margin-bottom: 2rem; }
        .dashboard-section h2 { font-size: 1.25rem; margin-bottom: 1rem; color: #1e293b; }
        .scores-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .score-item { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
          border-radius: 12px; 
          padding: 1rem; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          box-shadow: 0 2px 4px rgba(0,0,0,0.04);
        }
        .score-scenario { font-weight: 600; color: #1e293b; text-transform: capitalize; }
        .score-date { font-size: 0.85rem; color: #64748b; }
        .score-result { text-align: right; }
        .score-grade { font-size: 1.5rem; font-weight: 700; color: #4f46e5; margin-right: 0.75rem; }
        .score-points { color: #64748b; font-weight: 500; }
        .no-scores { color: #64748b; font-style: italic; }
        .featured-sim-card { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
          border-radius: 16px; 
          padding: 1.5rem; 
          display: flex; 
          gap: 1.5rem; 
          cursor: pointer; 
          transition: all 0.2s; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .featured-sim-card:hover { border-color: #6366f1; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15); }
        .featured-sim-icon { font-size: 2.5rem; background: #f8fafc; padding: 1rem; border-radius: 14px; }
        .featured-sim-content h3 { margin-bottom: 0.25rem; color: #1e293b; }
        .featured-sim-content p { color: #64748b; font-size: 0.9rem; margin-bottom: 0.5rem; }
        .featured-sim-cta { color: #4f46e5; font-size: 0.9rem; font-weight: 600; }
        
        /* Catalog - LIGHT THEME */
        .catalog-page { 
          min-height: 100vh; 
          padding-top: 65px; 
          background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
          color: #1e293b;
        }
        .catalog-page .navbar { background: rgba(255, 255, 255, 0.95); border-bottom: 1px solid #e2e8f0; }
        .catalog-page .nav-link { color: #475569; }
        .catalog-page .nav-link:hover { color: #1e293b; }
        .catalog-page .user-name { color: #475569; }
        
        .catalog-container { max-width: 1400px; margin: 0 auto; padding: 2rem; }
        .catalog-header { text-align: center; margin-bottom: 3rem; }
        .catalog-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #1e293b; }
        .catalog-header p { color: #64748b; }
        .catalog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 1.5rem; }
        .catalog-card { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
          border-radius: 20px; 
          overflow: hidden; 
          display: flex; 
          flex-direction: column; 
          transition: all 0.3s; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .catalog-card:hover { border-color: #6366f1; transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
        .catalog-card.locked { opacity: 0.75; }
        .catalog-card-header { padding: 1.5rem; display: flex; justify-content: space-between; align-items: flex-start; }
        .catalog-icon { font-size: 3rem; }
        .catalog-badges { display: flex; gap: 0.5rem; }
        .badge-featured { padding: 0.25rem 0.6rem; background: #10b981; color: white; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
        .badge-soon { padding: 0.25rem 0.6rem; background: #f1f5f9; color: #64748b; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
        .badge-pro { padding: 0.25rem 0.6rem; background: #8b5cf6; color: white; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
        .catalog-card-body { padding: 0 1.5rem 1.5rem; flex: 1; }
        .catalog-category { font-size: 0.8rem; color: #4f46e5; font-weight: 600; }
        .catalog-card-body h3 { font-size: 1.4rem; margin: 0.25rem 0; color: #1e293b; }
        .catalog-subtitle { color: #475569; font-size: 0.95rem; margin-bottom: 0.75rem; }
        .catalog-desc { color: #64748b; font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem; }
        .catalog-skills { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .skill-tag { padding: 0.25rem 0.6rem; background: #f1f5f9; border-radius: 4px; font-size: 0.75rem; color: #475569; font-weight: 500; }
        .catalog-card-footer { padding: 1.25rem 1.5rem; border-top: 1px solid #e2e8f0; background: #f8fafc; }
        .catalog-meta { display: flex; gap: 1rem; font-size: 0.8rem; color: #64748b; margin-bottom: 1rem; }
        .catalog-card-footer button { width: 100%; }
        
        /* Pricing */
        .pricing-page { min-height: 100vh; padding-top: 80px; }
        .pricing-container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .pricing-header { text-align: center; margin-bottom: 3rem; }
        .pricing-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .pricing-header p { color: var(--text-muted); margin-bottom: 1.5rem; }
        .billing-toggle { display: inline-flex; background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px; padding: 0.25rem; }
        .billing-toggle button { padding: 0.6rem 1.25rem; background: transparent; border: none; color: var(--text-muted); border-radius: 8px; font-size: 0.9rem; transition: all 0.2s; }
        .billing-toggle button.active { background: var(--accent-primary); color: white; }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .pricing-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 2rem; position: relative; }
        .pricing-card.popular { border-color: var(--accent-primary); }
        .popular-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--accent-primary); color: white; padding: 0.35rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
        .pricing-card h3 { font-size: 1.5rem; margin-bottom: 0.25rem; }
        .plan-desc { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem; }
        .plan-price { margin-bottom: 1.5rem; }
        .plan-price .price { font-size: 3rem; font-weight: 700; }
        .plan-price .period { color: var(--text-muted); }
        .plan-features { list-style: none; margin-bottom: 2rem; }
        .plan-features li { padding: 0.5rem 0; color: var(--text-secondary); font-size: 0.95rem; }
        
        /* Simulation Pages - LIGHT THEME */
        .sim-page { 
          min-height: 100vh; 
          padding-top: 65px; 
          background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
          color: #1e293b;
        }
        .sim-page .navbar { background: rgba(255, 255, 255, 0.95); border-bottom: 1px solid #e2e8f0; }
        .sim-page .nav-link { color: #475569; }
        .sim-page .nav-link:hover { color: #1e293b; }
        .sim-page .user-name { color: #475569; }
        
        .sim-select-container, .brief-container { max-width: 900px; margin: 0 auto; padding: 2rem; }
        .back-link { background: none; border: none; color: #4f46e5; font-family: inherit; font-size: 0.95rem; cursor: pointer; margin-bottom: 2rem; padding: 0; font-weight: 500; }
        .sim-select-header { text-align: center; margin-bottom: 3rem; }
        .sim-select-icon { font-size: 4rem; margin-bottom: 1rem; display: block; }
        .sim-select-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #1e293b; }
        .sim-select-header p { color: #64748b; }
        .scenarios-title { font-size: 1.25rem; margin-bottom: 1.5rem; color: #475569; }
        .scenarios-grid { display: flex; flex-direction: column; gap: 1rem; }
        .scenario-card { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
          border-radius: 16px; 
          padding: 1.5rem; 
          display: flex; 
          gap: 1.5rem; 
          align-items: flex-start; 
          text-align: left; 
          cursor: pointer; 
          transition: all 0.2s; 
          font-family: inherit; 
          color: #1e293b; 
          width: 100%; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .scenario-card:hover { border-color: #6366f1; background: #fafaff; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1); }
        .scenario-icon { font-size: 2.5rem; background: #f8fafc; padding: 1rem; border-radius: 14px; }
        .scenario-info { flex: 1; }
        .scenario-info h3 { font-size: 1.2rem; margin-bottom: 0.2rem; color: #1e293b; }
        .scenario-sub { color: #4f46e5; font-size: 0.9rem; margin-bottom: 0.5rem; font-weight: 500; }
        .scenario-desc { color: #64748b; font-size: 0.9rem; margin-bottom: 0.5rem; }
        .scenario-badge { display: inline-block; padding: 0.25rem 0.5rem; background: #eef2ff; border-radius: 4px; font-size: 0.75rem; color: #4f46e5; margin-right: 0.5rem; font-weight: 500; }
        .scenario-meta { text-align: right; font-size: 0.85rem; color: #64748b; }
        .scenario-meta .difficulty { font-weight: 600; display: block; margin-bottom: 0.25rem; }
        
        /* Brief - LIGHT THEME */
        .brief-header { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; }
        .brief-icon { font-size: 3rem; background: #f8fafc; padding: 1.25rem; border-radius: 18px; border: 1px solid #e2e8f0; }
        .brief-header h1 { font-size: 2rem; margin-bottom: 0.25rem; color: #1e293b; }
        .brief-company { color: #4f46e5; font-weight: 500; }
        .brief-content { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
          border-radius: 18px; 
          padding: 2rem; 
          margin-bottom: 2rem; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .brief-section { margin-bottom: 1.5rem; }
        .brief-section h3 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: #4f46e5; margin-bottom: 0.5rem; font-weight: 600; }
        .brief-section p { color: #475569; line-height: 1.7; }
        .mechanics-list { color: #475569; padding-left: 1.5rem; margin-top: 0.5rem; }
        .mechanics-list li { margin-bottom: 0.5rem; }
        .mechanics-list strong { color: #1e293b; }
        .brief-objectives h3 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: #4f46e5; margin-bottom: 1rem; font-weight: 600; }
        .objectives-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .objective { 
          background: #f8fafc; 
          border: 1px solid #e2e8f0;
          border-radius: 12px; 
          padding: 1rem; 
          display: flex; 
          flex-direction: column; 
          gap: 0.25rem; 
          text-align: center; 
        }
        .objective span:first-child { font-size: 1.25rem; }
        .objective strong { font-size: 0.7rem; color: #64748b; font-weight: 600; text-transform: uppercase; }
        .objective span:last-child { font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #1e293b; }
        .brief-actions { display: flex; gap: 1rem; justify-content: center; }
        
        /* How to Play Modal - LIGHT THEME */
        .how-to-play-modal { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
          border-radius: 24px; 
          padding: 2.5rem; 
          max-width: 600px; 
          width: 100%; 
          max-height: 80vh; 
          overflow-y: auto; 
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }
        .how-to-play-modal h2 { margin-bottom: 1.5rem; color: #1e293b; }
        .how-to-content h3 { color: #4f46e5; font-size: 1rem; margin: 1.5rem 0 0.5rem; }
        .how-to-content p, .how-to-content ul { color: #475569; font-size: 0.95rem; line-height: 1.7; }
        .how-to-content ul { padding-left: 1.5rem; }
        .how-to-content li { margin-bottom: 0.5rem; }
        .how-to-content strong { color: #1e293b; }
        
        /* ==========================================
           LIGHT THEME FOR SIMULATION GAMEPLAY
           ========================================== */
        
        /* Game Playing - LIGHT THEME */
        .sim-playing { 
          padding: 1.5rem; 
          background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%); 
          min-height: 100vh; 
          color: #1e293b;
        }
        .sim-playing .navbar { background: rgba(255, 255, 255, 0.95); border-bottom: 1px solid #e2e8f0; }
        .sim-playing .nav-link { color: #475569; }
        .sim-playing .nav-link:hover { color: #1e293b; }
        .sim-playing .user-name { color: #475569; }
        
        .game-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-top: 50px; }
        .game-title { display: flex; align-items: center; gap: 1rem; }
        .game-icon { font-size: 2rem; background: #ffffff; padding: 0.75rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .game-title h2 { font-size: 1.4rem; margin-bottom: 0.15rem; color: #1e293b; }
        .game-title span { color: #64748b; font-size: 0.9rem; }
        .week-badge { background: var(--accent-primary); color: white; padding: 0.6rem 1.25rem; border-radius: 50px; font-weight: 600; }
        
        /* Enhanced Dashboard - LIGHT THEME */
        .game-dashboard { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem; }
        .sim-playing .metric { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
          border-radius: 14px; 
          padding: 0.85rem; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .sim-playing .m-icon { font-size: 1.1rem; display: block; margin-bottom: 0.3rem; }
        .sim-playing .m-label { font-size: 0.7rem; color: #64748b; text-transform: uppercase; display: block; letter-spacing: 0.05em; font-weight: 600; }
        .sim-playing .m-value { font-family: 'JetBrains Mono', monospace; font-size: 1.1rem; font-weight: 700; color: #1e293b; }
        .sim-playing .m-bar { height: 6px; background: #e2e8f0; border-radius: 3px; margin-top: 0.4rem; overflow: hidden; }
        .sim-playing .m-bar div { height: 100%; border-radius: 3px; transition: width 0.5s; }
        
        /* Game Actions - LIGHT THEME */
        .sim-playing .game-actions { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
          border-radius: 18px; 
          padding: 1.5rem; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }
        .sim-playing .game-actions > h3 { font-size: 1.1rem; margin-bottom: 1.25rem; color: #4f46e5; }
        .sim-playing .action-section { margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #e2e8f0; }
        .sim-playing .action-section h4 { font-size: 0.9rem; color: #475569; margin-bottom: 0.75rem; font-weight: 600; }
        .action-row { display: flex; align-items: center; gap: 1rem; }
        .sim-playing .action-btn { 
          padding: 0.6rem 1.25rem; 
          background: #f1f5f9; 
          border: 1px solid #e2e8f0; 
          border-radius: 10px; 
          color: #1e293b; 
          font-family: inherit; 
          font-weight: 500;
          cursor: pointer; 
          transition: all 0.2s; 
        }
        .sim-playing .action-btn:hover:not(:disabled) { background: #e2e8f0; border-color: var(--accent-primary); }
        .sim-playing .action-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .sim-playing .action-label { font-family: 'JetBrains Mono', monospace; font-weight: 700; min-width: 120px; text-align: center; color: #1e293b; }
        
        /* Meeting Options - LIGHT THEME */
        .meeting-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
        .sim-playing .meeting-btn { 
          background: #f8fafc; 
          border: 2px solid #e2e8f0; 
          border-radius: 12px; 
          padding: 1rem; 
          text-align: left; 
          cursor: pointer; 
          transition: all 0.2s; 
          display: flex; 
          flex-direction: column; 
          gap: 0.25rem; 
        }
        .sim-playing .meeting-btn:hover:not(:disabled) { border-color: #6366f1; background: #f0f0ff; }
        .sim-playing .meeting-btn.active { border-color: #10b981; background: #ecfdf5; }
        .sim-playing .meeting-btn:disabled { opacity: 0.7; cursor: default; }
        .meeting-icon { font-size: 1.5rem; }
        .sim-playing .meeting-name { font-weight: 700; font-size: 0.9rem; color: #1e293b; }
        .sim-playing .meeting-desc { font-size: 0.8rem; color: #64748b; line-height: 1.4; }
        .sim-playing .meeting-done { color: #059669; font-size: 0.8rem; font-weight: 700; margin-top: 0.25rem; }
        
        /* Quick Actions - LIGHT THEME */
        .quick-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .sim-playing .quick-btn { 
          padding: 0.75rem 1.25rem; 
          background: #ecfdf5; 
          border: 2px solid #a7f3d0; 
          border-radius: 10px; 
          color: #047857; 
          font-family: inherit; 
          font-weight: 600;
          cursor: pointer; 
          transition: all 0.2s; 
          font-size: 0.9rem; 
        }
        .sim-playing .quick-btn:hover:not(:disabled) { background: #d1fae5; border-color: #059669; }
        .sim-playing .quick-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .sim-playing .quick-btn.crunch { background: #fef2f2; border-color: #fecaca; color: #dc2626; }
        .sim-playing .quick-btn.crunch:hover { background: #fee2e2; border-color: #f87171; }
        .sim-playing .quick-btn.proto { background: #f5f3ff; border-color: #c4b5fd; color: #7c3aed; }
        .sim-playing .quick-btn.proto:hover { background: #ede9fe; border-color: #8b5cf6; }
        .sim-playing .quick-btn.schedule { background: #fffbeb; border-color: #fcd34d; color: #b45309; }
        .sim-playing .quick-btn.schedule:hover { background: #fef3c7; border-color: #f59e0b; }
        
        .sim-playing .warning-banner { 
          background: #fffbeb; 
          border: 2px solid #fcd34d; 
          border-radius: 10px; 
          padding: 0.75rem 1rem; 
          color: #92400e; 
          font-size: 0.9rem; 
          font-weight: 500;
          margin-bottom: 1rem; 
        }
        
        .sim-playing .btn-advance { 
          width: 100%; 
          margin-top: 1rem; 
          padding: 1rem; 
          font-size: 1rem; 
          background: #4f46e5;
          border: none;
          color: white;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .sim-playing .btn-advance:hover { background: #4338ca; }
        
        /* Event Modal - LIGHT THEME */
        .sim-playing .event-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 200; padding: 1rem; backdrop-filter: blur(4px); }
        .sim-playing .event-modal { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
          border-radius: 24px; 
          padding: 2.5rem; 
          max-width: 480px; 
          width: 100%; 
          text-align: center; 
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }
        .sim-playing .event-icon { font-size: 3.5rem; margin-bottom: 1rem; display: block; }
        .sim-playing .event-modal h2 { font-size: 1.5rem; margin-bottom: 0.75rem; color: #1e293b; }
        .sim-playing .event-modal p { color: #475569; line-height: 1.7; margin-bottom: 2rem; }
        .sim-playing .event-options { display: flex; flex-direction: column; gap: 0.6rem; }
        .sim-playing .event-option { 
          padding: 1rem 1.25rem; 
          background: #f8fafc; 
          border: 2px solid #e2e8f0; 
          border-radius: 12px; 
          color: #1e293b; 
          font-family: inherit; 
          font-size: 0.95rem; 
          font-weight: 500;
          cursor: pointer; 
          text-align: left; 
          transition: all 0.2s; 
        }
        .sim-playing .event-option:hover { background: #f0f0ff; border-color: #6366f1; transform: translateX(6px); }
        
        /* End Screen - LIGHT THEME */
        .sim-ended { 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          min-height: 100vh; 
          padding: 2rem; 
          background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
        }
        .end-card { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
          border-radius: 24px; 
          padding: 3rem; 
          max-width: 550px; 
          width: 100%; 
          text-align: center; 
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
        }
        .end-icon { font-size: 3rem; margin-bottom: 1rem; display: block; }
        .end-card h1 { font-size: 1.75rem; margin-bottom: 0.25rem; color: #1e293b; }
        .end-card > p { color: #64748b; margin-bottom: 2rem; }
        .score-display { margin-bottom: 2rem; }
        .grade { font-size: 6rem; font-weight: 800; line-height: 1; }
        .score { font-family: 'JetBrains Mono', monospace; font-size: 1.5rem; color: #64748b; display: block; }
        .results { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 2rem; text-align: left; }
        .result { 
          padding: 0.85rem 1rem; 
          background: #f8fafc; 
          border-radius: 10px; 
          display: flex; 
          align-items: center; 
          gap: 0.75rem; 
          font-size: 0.95rem; 
          color: #1e293b;
        }
        .result.pass { border-left: 4px solid #10b981; }
        .result.fail { border-left: 4px solid #ef4444; }
        .result.pass span { color: #059669; font-weight: 700; }
        .result.fail span { color: #dc2626; font-weight: 700; }
        .end-actions { display: flex; flex-direction: column; gap: 0.75rem; }
        .end-actions .btn-primary { background: #4f46e5; border: none; color: white; }
        .end-actions .btn-primary:hover { background: #4338ca; }
        .end-actions .btn-secondary { background: #f1f5f9; border: 1px solid #e2e8f0; color: #475569; }
        .end-actions .btn-secondary:hover { background: #e2e8f0; }
        .quick-btn.proto { background: rgba(139, 92, 246, 0.1); border-color: rgba(139, 92, 246, 0.25); color: #c4b5fd; }
        .quick-btn.proto:hover { background: rgba(139, 92, 246, 0.2); }
        .quick-btn.schedule { background: rgba(245, 158, 11, 0.1); border-color: rgba(245, 158, 11, 0.25); color: #fcd34d; }
        .quick-btn.schedule:hover { background: rgba(245, 158, 11, 0.2); }
        
        .warning-banner { background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 10px; padding: 0.75rem 1rem; color: #fcd34d; font-size: 0.9rem; margin-bottom: 1rem; }
        
        .btn-advance { width: 100%; margin-top: 1rem; padding: 1rem; font-size: 1rem; }
        
        /* Event Modal - base styles (overridden by .sim-playing for light theme) */
        .event-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; z-index: 200; padding: 1rem; backdrop-filter: blur(4px); }
        .event-modal { background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 2.5rem; max-width: 480px; width: 100%; text-align: center; }
        .event-icon { font-size: 3.5rem; margin-bottom: 1rem; display: block; }
        .event-modal h2 { font-size: 1.5rem; margin-bottom: 0.75rem; }
        .event-modal p { color: var(--text-secondary); line-height: 1.7; margin-bottom: 2rem; }
        .event-options { display: flex; flex-direction: column; gap: 0.6rem; }
        .event-option { padding: 1rem 1.25rem; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 12px; color: var(--text-primary); font-family: inherit; font-size: 0.95rem; cursor: pointer; text-align: left; transition: all 0.2s; }
        .event-option:hover { background: rgba(99, 102, 241, 0.15); border-color: var(--accent-primary); transform: translateX(6px); }
        
        /* End Screen styles moved to light theme section above */
        
        @media (max-width: 768px) {
          .hero-title { font-size: 2.75rem; }
          .hero-cta { flex-direction: column; }
          .featured-card { flex-direction: column; text-align: center; }
          .sidebar { display: none; }
          .dashboard-main { margin-left: 0; }
          .catalog-grid { grid-template-columns: 1fr; }
          .objectives-grid { grid-template-columns: repeat(2, 1fr); }
          .game-dashboard { grid-template-columns: repeat(2, 1fr); }
          .action-row { flex-wrap: wrap; justify-content: center; }
          .meeting-options { grid-template-columns: 1fr; }
          .quick-actions { flex-direction: column; }
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
