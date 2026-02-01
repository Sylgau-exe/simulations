import React, { useState, useEffect, useRef } from 'react';

// ============================================
// BILINGUAL TRANSLATIONS - FRANÇAIS / ENGLISH
// ============================================

const TRANSLATIONS = {
  nav: {
    home: { en: 'Home', fr: 'Accueil' },
    simulations: { en: 'Simulations', fr: 'Simulations' },
    pricing: { en: 'Pricing', fr: 'Tarifs' },
    contact: { en: 'Contact', fr: 'Contact' },
    login: { en: 'Log In', fr: 'Connexion' },
    logout: { en: 'Logout', fr: 'Déconnexion' },
    dashboard: { en: 'Dashboard', fr: 'Tableau de bord' },
    getStarted: { en: 'Get Started', fr: 'Commencer' },
    startFree: { en: 'Start Free', fr: 'Essai gratuit' },
  },
  landing: {
    badge: { en: '🎯 PMP-Aligned Project Management Training', fr: '🎯 Formation en gestion de projet alignée PMP' },
    heroTitle1: { en: 'Master Project Management', fr: 'Maîtrisez la gestion de projet' },
    heroTitle2: { en: 'Through Real-World Simulations', fr: 'par des simulations réalistes' },
    heroSubtitle: { 
      en: 'Practice scheduling, budgeting, risk mitigation, and stakeholder management in realistic scenarios. Build PMP-ready skills without real-world consequences.',
      fr: 'Pratiquez la planification, la budgétisation, la gestion des risques et des parties prenantes dans des scénarios réalistes. Développez des compétences alignées PMP sans conséquences réelles.'
    },
    startTrial: { en: 'Start PM Simulation Free', fr: 'Démarrer une simulation GP gratuite' },
    browseSimulations: { en: 'View PM Scenarios', fr: 'Voir les scénarios GP' },
    simulations: { en: 'Simulations', fr: 'Simulations' },
    scenarios: { en: 'Industry Scenarios', fr: 'Scénarios industriels' },
    learners: { en: 'PM Professionals Trained', fr: 'Professionnels GP formés' },
    whyChoose: { en: 'Why Project Managers Choose BizSimHub', fr: 'Pourquoi les gestionnaires de projet choisissent BizSimHub' },
    feature1Title: { en: 'PMP-Aligned Learning', fr: 'Apprentissage aligné PMP' },
    feature1Desc: { en: 'Practice the triple constraint, risk registers, stakeholder analysis, and earned value management in hands-on scenarios.', fr: 'Pratiquez la triple contrainte, les registres de risques, l\'analyse des parties prenantes et la gestion de la valeur acquise.' },
    feature2Title: { en: 'Safe-to-Fail Environment', fr: 'Environnement sans risque' },
    feature2Desc: { en: 'Make scheduling mistakes, blow budgets, and miss deadlines—then learn what went wrong without career consequences.', fr: 'Faites des erreurs de planification, dépassez les budgets, manquez des échéances—puis apprenez ce qui n\'a pas fonctionné sans conséquences.' },
    feature3Title: { en: 'Track Your PM Growth', fr: 'Suivez votre progression GP' },
    feature3Desc: { en: 'Detailed scoring shows your decision-making patterns across scope, schedule, budget, quality, and team dynamics.', fr: 'Un pointage détaillé montre vos patterns de décision en périmètre, calendrier, budget, qualité et dynamique d\'équipe.' },
    feature4Title: { en: 'Real Industry Contexts', fr: 'Contextes industriels réels' },
    feature4Desc: { en: 'Tech startups, live entertainment, construction, and R&D—each with authentic PM challenges.', fr: 'Startups tech, spectacle vivant, construction et R&D—chacun avec des défis GP authentiques.' },
    readyToStart: { en: 'Ready to Sharpen Your PM Skills?', fr: 'Prêt à affûter vos compétences GP?' },
    joinLearners: { en: 'Join project managers and PM students building real-world decision-making skills.', fr: 'Rejoignez les gestionnaires de projet et étudiants qui développent leurs compétences décisionnelles.' },
    startLearning: { en: 'Start Your First Simulation', fr: 'Démarrer votre première simulation' },
    // Founder credentials section (real)
    founderTitle: { en: 'Developed by a PM Professional', fr: 'Développé par un professionnel GP' },
    founderName: { en: 'Sylvain Gau', fr: 'Sylvain Gau' },
    founderCredentials: { 
      en: 'PMP & ACP Certified | McGill University Faculty Lecturer | Outstanding Teaching Award 2022',
      fr: 'Certifié PMP et ACP | Chargé de cours à l\'Université McGill | Prix d\'excellence en enseignement 2022'
    },
    founderBio: {
      en: 'With 15+ years leading projects for Cirque du Soleil, Formula One, and the Beijing Olympics, I\'ve trained thousands of project managers. BizSimHub brings that real-world experience to you.',
      fr: 'Avec plus de 15 ans à diriger des projets pour le Cirque du Soleil, la Formule Un et les Jeux olympiques de Pékin, j\'ai formé des milliers de gestionnaires de projet. BizSimHub vous apporte cette expérience concrète.'
    },
    // PM outcomes section
    outcomesTitle: { en: 'What You\'ll Practice', fr: 'Ce que vous pratiquerez' },
    outcome1: { en: 'Schedule Optimization & Deadline Management', fr: 'Optimisation du calendrier et gestion des échéances' },
    outcome2: { en: 'Budget Control & Resource Allocation', fr: 'Contrôle budgétaire et allocation des ressources' },
    outcome3: { en: 'Risk Identification & Mitigation Strategies', fr: 'Identification des risques et stratégies d\'atténuation' },
    outcome4: { en: 'Stakeholder Communication & Expectation Management', fr: 'Communication avec les parties prenantes et gestion des attentes' },
    outcome5: { en: 'Team Leadership & Morale Management', fr: 'Leadership d\'équipe et gestion du moral' },
    outcome6: { en: 'Scope Control & Change Management', fr: 'Contrôle du périmètre et gestion du changement' },
  },
  pricing: {
    title: { en: 'Simple Pricing', fr: 'Tarification simple' },
    subtitle: { en: 'Start free, upgrade when ready', fr: 'Commencez gratuitement, passez au supérieur quand vous êtes prêt' },
    mostPopular: { en: 'Most Popular', fr: 'Plus populaire' },
    currentPlan: { en: 'Current Plan', fr: 'Plan actuel' },
    upgradeNow: { en: 'Upgrade Now', fr: 'Passer au supérieur' },
    contactSales: { en: 'Contact Sales', fr: 'Contacter les ventes' },
    free: { en: 'Free', fr: 'Gratuit' },
    professional: { en: 'Professional', fr: 'Professionnel' },
    enterprise: { en: 'Enterprise', fr: 'Entreprise' },
    freeDesc: { en: 'Perfect for trying out', fr: 'Parfait pour essayer' },
    proDesc: { en: 'For serious learners', fr: 'Pour les apprenants sérieux' },
    entDesc: { en: 'For teams and institutions', fr: 'Pour les équipes et institutions' },
  },
  dashboard: {
    welcome: { en: 'Welcome', fr: 'Bienvenue' },
    readyToContinue: { en: 'Ready to continue your learning journey?', fr: 'Prêt à continuer votre parcours d\'apprentissage?' },
    quickActions: { en: 'Quick Actions', fr: 'Actions rapides' },
    playProjectApex: { en: 'Play Project Apex', fr: 'Jouer à Projet Apex' },
    browseSimulations: { en: 'Browse Simulations', fr: 'Parcourir les simulations' },
    yourStats: { en: 'Your Stats', fr: 'Vos statistiques' },
    simulationsPlayed: { en: 'Simulations Played', fr: 'Simulations jouées' },
    bestGrade: { en: 'Best Grade', fr: 'Meilleure note' },
    highScore: { en: 'High Score', fr: 'Meilleur score' },
    recentScores: { en: 'Recent Scores', fr: 'Scores récents' },
    featuredSimulation: { en: 'Featured Simulation', fr: 'Simulation en vedette' },
    noScoresYet: { en: 'No scores yet. Start playing to track your progress!', fr: 'Aucun score pour l\'instant. Commencez à jouer pour suivre vos progrès!' },
    projectApexTitle: { en: 'Project Apex', fr: 'Projet Apex' },
    projectApexDesc: { en: 'Master project management with our enhanced causal model simulation.', fr: 'Maîtrisez la gestion de projet avec notre simulation à modèle causal amélioré.' },
    playNow: { en: 'Play Now →', fr: 'Jouer maintenant →' },
    unknown: { en: 'Unknown', fr: 'Inconnu' },
    recent: { en: 'Recent', fr: 'Récent' },
  },
  results: {
    simulationComplete: { en: 'Simulation Complete!', fr: 'Simulation terminée!' },
    overallGrade: { en: 'Overall Grade', fr: 'Note globale' },
    // Mission Recap
    missionRecap: { en: '🎯 Mission Recap', fr: '🎯 Récapitulatif de mission' },
    missionIntro: { en: 'Here\'s how you performed against the original project brief:', fr: 'Voici votre performance par rapport au mandat initial:' },
    target: { en: 'Target:', fr: 'Cible:' },
    actual: { en: 'Actual:', fr: 'Réel:' },
    deliverFeatures: { en: 'Deliver', fr: 'Livrer' },
    features: { en: 'features', fr: 'fonctionnalités' },
    completeInWeeks: { en: 'Complete in', fr: 'Compléter en' },
    weeks: { en: 'weeks', fr: 'semaines' },
    stayUnder: { en: 'Stay under', fr: 'Rester sous' },
    maintainQuality: { en: 'Maintain 70%+ quality', fr: 'Maintenir 70%+ qualité' },
    keepMorale: { en: 'Keep morale above 50%', fr: 'Garder le moral au-dessus de 50%' },
    onTime: { en: 'On time', fr: 'À temps' },
    weeksOver: { en: 'weeks over', fr: 'semaines de retard' },
    underBudget: { en: 'under', fr: 'sous le budget' },
    overBudget: { en: 'Over budget', fr: 'Dépassement de budget' },
    spent: { en: 'spent', fr: 'dépensé' },
    metStandard: { en: 'Met standard', fr: 'Standard atteint' },
    belowStandard: { en: 'Below standard', fr: 'Sous le standard' },
    teamHappy: { en: 'Team is happy', fr: 'Équipe satisfaite' },
    teamBurnedOut: { en: 'Team burned out', fr: 'Équipe épuisée' },
    // Score Breakdown
    scoreBreakdown: { en: '📊 Score Breakdown', fr: '📊 Détail du pointage' },
    scope: { en: 'SCOPE', fr: 'PÉRIMÈTRE' },
    schedule: { en: 'SCHEDULE', fr: 'CALENDRIER' },
    budget: { en: 'BUDGET', fr: 'BUDGET' },
    quality: { en: 'QUALITY', fr: 'QUALITÉ' },
    team: { en: 'TEAM', fr: 'ÉQUIPE' },
    excellent: { en: 'Excellent', fr: 'Excellent' },
    partial: { en: 'Partial', fr: 'Partiel' },
    daysLate: { en: 'days late', fr: 'jours de retard' },
    veryGood: { en: 'Very Good', fr: 'Très bien' },
    good: { en: 'Good', fr: 'Bon' },
    needsWork: { en: 'Needs work', fr: 'À améliorer' },
    goodMorale: { en: 'Good morale', fr: 'Bon moral' },
    lowMorale: { en: 'Low morale', fr: 'Moral bas' },
    // Performance Analysis
    performanceAnalysis: { en: '📝 Performance Analysis', fr: '📝 Analyse de performance' },
    whatWentWell: { en: 'What Went Well', fr: 'Ce qui a bien fonctionné' },
    areasForImprovement: { en: 'Areas for Improvement', fr: 'Points à améliorer' },
    pmProTips: { en: 'PM Pro Tips', fr: 'Conseils de pro GP' },
    // Analysis content
    excellentBudget: { en: 'Excellent budget management - stayed within financial constraints', fr: 'Excellente gestion budgétaire - resté dans les limites financières' },
    maintainedQuality: { en: 'Maintained high quality standards throughout the project', fr: 'Maintenu des standards de qualité élevés tout au long du projet' },
    deliveredOnTime: { en: 'Delivered on schedule - strong time management skills', fr: 'Livré dans les délais - bonnes compétences en gestion du temps' },
    completedScope: { en: 'Completed all required scope - nothing left behind', fr: 'Complété tout le périmètre requis - rien laissé de côté' },
    keptMoraleHealthy: { en: 'Kept team morale healthy - good leadership', fr: 'Maintenu un bon moral d\'équipe - bon leadership' },
    minimalScheduleChanges: { en: 'Minimal schedule changes - provided stability to the team', fr: 'Changements de calendrier minimaux - stabilité pour l\'équipe' },
    usedPrototyping: { en: 'Used prototyping to reduce uncertainty - smart risk management', fr: 'Utilisé le prototypage pour réduire l\'incertitude - gestion intelligente des risques' },
    completedSimulation: { en: 'You completed the simulation - every experience is a learning opportunity!', fr: 'Vous avez complété la simulation - chaque expérience est une opportunité d\'apprentissage!' },
    budgetTip: { en: 'Budget: Consider more careful resource allocation. Track spending weekly and cut non-essential costs early.', fr: 'Budget: Considérez une allocation plus prudente des ressources. Suivez les dépenses hebdomadairement.' },
    scheduleTip: { en: 'Schedule: Try adding buffer time for unknowns. Use the Extend Deadline feature strategically before it\'s too late.', fr: 'Calendrier: Ajoutez du temps tampon pour les imprévus. Utilisez l\'extension de délai stratégiquement.' },
    scopeTip: { en: 'Scope: Prioritize critical features first. Consider crunch mode or hiring when behind, but watch morale.', fr: 'Périmètre: Priorisez les fonctionnalités critiques. Considérez le mode crunch ou l\'embauche si en retard.' },
    qualityTip: { en: 'Quality: Schedule regular Quality Reviews. Avoid excessive crunch which degrades quality.', fr: 'Qualité: Planifiez des revues qualité régulières. Évitez le crunch excessif qui dégrade la qualité.' },
    teamTip: { en: 'Team: Hold regular Team Building and 1-on-1 meetings. Avoid back-to-back crunch periods.', fr: 'Équipe: Tenez des réunions de team building et 1-on-1 régulières. Évitez les périodes de crunch consécutives.' },
    planningTip: { en: 'Planning: Too many schedule changes hurt team confidence. Try to set realistic deadlines upfront.', fr: 'Planification: Trop de changements de calendrier nuisent à la confiance. Fixez des échéances réalistes dès le départ.' },
    outstandingPerformance: { en: 'Outstanding performance! Try a harder scenario to challenge yourself further.', fr: 'Performance exceptionnelle! Essayez un scénario plus difficile pour vous dépasser.' },
    ironTriangle: { en: 'Iron Triangle: When scope is fixed, you can only trade time for money. Consider which constraint matters most to stakeholders.', fr: 'Triangle de fer: Quand le périmètre est fixé, vous ne pouvez qu\'échanger temps contre argent. Considérez quelle contrainte compte le plus.' },
    sustainablePace: { en: 'Sustainable Pace: Crunch mode provides short-term gains but long-term pain. A burned-out team delivers poor quality.', fr: 'Rythme soutenable: Le mode crunch donne des gains à court terme mais des problèmes à long terme. Une équipe épuisée livre de la mauvaise qualité.' },
    riskReduction: { en: 'Risk Reduction: Prototyping helps surface problems early when they\'re cheap to fix. Consider it for uncertain projects.', fr: 'Réduction des risques: Le prototypage aide à révéler les problèmes tôt quand ils sont peu coûteux à corriger.' },
    technicalDebt: { en: 'Technical Debt: Rushing to complete features without quality leads to rework. Sometimes less scope at higher quality is better.', fr: 'Dette technique: Se précipiter pour compléter les fonctionnalités sans qualité mène à du retravail.' },
    keyInsightA: { en: 'You\'ve mastered the basics! Focus on optimizing team happiness while maintaining performance.', fr: 'Vous maîtrisez les bases! Concentrez-vous sur le bonheur de l\'équipe tout en maintenant la performance.' },
    keyInsightB: { en: 'Good foundation! Work on balancing the triple constraint - time, cost, and scope.', fr: 'Bonne fondation! Travaillez sur l\'équilibre de la triple contrainte - temps, coût et périmètre.' },
    keyInsightC: { en: 'You\'re learning! Try to identify problems earlier and take corrective action sooner.', fr: 'Vous apprenez! Essayez d\'identifier les problèmes plus tôt et d\'agir plus rapidement.' },
    keyInsightD: { en: 'Every PM has tough projects. Review what went wrong and try a different approach next time.', fr: 'Tout GP a des projets difficiles. Analysez ce qui n\'a pas fonctionné et essayez une approche différente.' },
    keyInsight: { en: 'Key Insight:', fr: 'Point clé:' },
    // Achievements
    achievements: { en: '🏅 Achievements', fr: '🏅 Réalisations' },
    // Final Score
    finalScore: { en: 'Final Score', fr: 'Score final' },
    points: { en: 'points', fr: 'points' },
    // Actions
    playAgain: { en: '🔄 Play Again', fr: '🔄 Rejouer' },
    tryNewIndustry: { en: '🎮 Try New Industry', fr: '🎮 Essayer une autre industrie' },
    backToDashboard: { en: '📊 Back to Dashboard', fr: '📊 Retour au tableau de bord' },
    printReport: { en: '🖨️ Print Report', fr: '🖨️ Imprimer le rapport' },
    copySummary: { en: '📋 Copy Summary', fr: '📋 Copier le résumé' },
    copiedToClipboard: { en: 'Results copied to clipboard!', fr: 'Résultats copiés dans le presse-papiers!' },
  },
  footer: {
    product: { en: 'Product', fr: 'Produit' },
    company: { en: 'Company', fr: 'Entreprise' },
    about: { en: 'About', fr: 'À propos' },
    forEducators: { en: 'For Educators', fr: 'Pour les éducateurs' },
    madeWith: { en: 'Made with ❤️ in Montreal', fr: 'Fait avec ❤️ à Montréal' },
    allRights: { en: 'All rights reserved.', fr: 'Tous droits réservés.' },
  },
  common: {
    comingSoon: { en: 'Coming Soon', fr: 'Bientôt' },
    back: { en: 'Back', fr: 'Retour' },
  },
};

const t = (key, lang) => {
  const keys = key.split('.');
  let result = TRANSLATIONS;
  for (const k of keys) {
    result = result?.[k];
  }
  return result?.[lang] || result?.['en'] || key;
};

// ============================================
// CSS ANIMATION COMPONENTS (No external dependencies)
// ============================================

// Confetti animation component
const Confetti = () => {
  const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
  return (
    <div className="confetti-container">
      {[...Array(50)].map((_, i) => (
        <div 
          key={i} 
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)]
          }}
        />
      ))}
    </div>
  );
};

// Success checkmark animation
const SuccessAnimation = () => (
  <div className="success-animation">
    <div className="success-circle">
      <svg className="checkmark" viewBox="0 0 50 50">
        <path d="M14 27 L22 35 L38 16" />
      </svg>
    </div>
  </div>
);

// Sad face animation
const SadAnimation = () => (
  <div className="sad-animation">
    <div className="sad-face">
      <div className="sad-eyes">
        <div className="sad-eye"></div>
        <div className="sad-eye"></div>
      </div>
      <div className="sad-mouth"></div>
    </div>
  </div>
);

// Gantt Chart Mascot - reacts to project health
const GanttMascot = ({ mood = 'normal' }) => (
  <div className={`gantt-mascot ${mood}`}>
    <svg viewBox="0 0 120 100" className="gantt-svg">
      {/* Chart background */}
      <rect x="10" y="10" width="100" height="80" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2"/>
      
      {/* Grid lines */}
      <g stroke="#e2e8f0" strokeWidth="1">
        <line x1="35" y1="10" x2="35" y2="90"/>
        <line x1="60" y1="10" x2="60" y2="90"/>
        <line x1="85" y1="10" x2="85" y2="90"/>
        <line x1="10" y1="30" x2="110" y2="30"/>
        <line x1="10" y1="50" x2="110" y2="50"/>
        <line x1="10" y1="70" x2="110" y2="70"/>
      </g>
      
      {/* Gantt bars */}
      <g className="gantt-bars">
        <rect x="20" y="18" width="45" height="8" rx="2" fill="#3b82f6" className="bar b1"/>
        <rect x="40" y="38" width="50" height="8" rx="2" fill="#8b5cf6" className="bar b2"/>
        <rect x="55" y="58" width="40" height="8" rx="2" fill="#10b981" className="bar b3"/>
        <rect x="70" y="78" width="30" height="8" rx="2" fill="#f59e0b" className="bar b4"/>
      </g>
      
      {/* Deadline line */}
      <line x1="90" y1="10" x2="90" y2="90" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2" className="deadline"/>
      <text x="92" y="18" fontSize="6" fill="#ef4444" fontWeight="bold" className="deadline-text">DUE</text>
      
      {/* Face */}
      <g className="gantt-face">
        <g className="gantt-eyes">
          <circle cx="45" cy="50" r="4" fill="#1e293b"/>
          <circle cx="65" cy="50" r="4" fill="#1e293b"/>
          <circle cx="46" cy="49" r="1.5" fill="white"/>
          <circle cx="66" cy="49" r="1.5" fill="white"/>
        </g>
        <path className="gantt-mouth" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </g>
      
      {/* Explosion marks for stressed */}
      <g className="explosion">
        <text x="100" y="25" fontSize="12">💥</text>
        <text x="5" y="80" fontSize="10">⚡</text>
      </g>
    </svg>
    <div className="mascot-tooltip">
      {mood === 'normal' && "Looking good!"}
      {mood === 'concerned' && "Hmm, keep an eye on this..."}
      {mood === 'stressed' && "We might need to talk..."}
      {mood === 'success' && "Nailed it! 🎯"}
    </div>
  </div>
);

// Risk Radar Component - Visual risk assessment
const RiskRadar = ({ risks }) => {
  const { budget, schedule, scope, quality, team, stakeholder } = risks;
  
  // Convert risk values (0-100) to radar coordinates
  const centerX = 60, centerY = 60, radius = 45;
  const angles = [0, 60, 120, 180, 240, 300].map(a => (a - 90) * Math.PI / 180);
  const values = [budget, schedule, scope, quality, team, stakeholder];
  
  const points = values.map((v, i) => {
    const r = (v / 100) * radius;
    return `${centerX + r * Math.cos(angles[i])},${centerY + r * Math.sin(angles[i])}`;
  }).join(' ');
  
  const labels = ['💰', '📅', '📦', '⭐', '👥', '🤝'];
  
  return (
    <div className="risk-radar">
      <svg viewBox="0 0 120 120">
        {/* Background circles */}
        {[0.25, 0.5, 0.75, 1].map((scale, i) => (
          <circle
            key={i}
            cx={centerX}
            cy={centerY}
            r={radius * scale}
            fill="none"
            stroke="#2a2a40"
            strokeWidth="1"
          />
        ))}
        
        {/* Axis lines */}
        {angles.map((angle, i) => (
          <line
            key={i}
            x1={centerX}
            y1={centerY}
            x2={centerX + radius * Math.cos(angle)}
            y2={centerY + radius * Math.sin(angle)}
            stroke="#2a2a40"
            strokeWidth="1"
          />
        ))}
        
        {/* Risk area polygon */}
        <polygon
          points={points}
          fill="rgba(99, 102, 241, 0.3)"
          stroke="#6366f1"
          strokeWidth="2"
        />
        
        {/* Risk dots */}
        {values.map((v, i) => {
          const r = (v / 100) * radius;
          const color = v > 70 ? '#10b981' : v > 40 ? '#f59e0b' : '#ef4444';
          return (
            <circle
              key={i}
              cx={centerX + r * Math.cos(angles[i])}
              cy={centerY + r * Math.sin(angles[i])}
              r="4"
              fill={color}
              stroke="#ffffff"
              strokeWidth="1"
            />
          );
        })}
        
        {/* Labels */}
        {labels.map((label, i) => {
          const r = radius + 12;
          return (
            <text
              key={i}
              x={centerX + r * Math.cos(angles[i])}
              y={centerY + r * Math.sin(angles[i]) + 4}
              textAnchor="middle"
              fontSize="12"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// Weekly Summary Component
const WeeklySummary = ({ week, events, decisions, lang }) => (
  <div className="weekly-summary">
    <div className="summary-header">
      <span className="summary-week">Week {week} Summary</span>
    </div>
    <div className="summary-content">
      {events > 0 && (
        <div className="summary-item">
          <span className="summary-icon">🚨</span>
          <span>{events} event{events > 1 ? 's' : ''} handled</span>
        </div>
      )}
      {decisions > 0 && (
        <div className="summary-item">
          <span className="summary-icon">✅</span>
          <span>{decisions} decision{decisions > 1 ? 's' : ''} made</span>
        </div>
      )}
    </div>
  </div>
);

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
    Promise.resolve({ stats: { total_plays: 0, unique_players: 0, average_score: 0 } }),
  
  // Admin APIs
  getAdminOverview: () => 
    api.request('/admin/overview'),
  getAdminUsers: (params = {}) => 
    api.request(`/admin/users?${new URLSearchParams(params).toString()}`),
  getAdminAnalytics: () => 
    api.request('/admin/analytics'),
  getAdminRevenue: () => 
    api.request('/admin/revenue'),
  toggleAdmin: (userId, isAdmin) => 
    api.request('/admin/toggle-admin', { method: 'POST', body: JSON.stringify({ userId, isAdmin }) }),
  toggleTester: (userId, isTester) => 
    api.request('/admin/toggle-tester', { method: 'POST', body: JSON.stringify({ userId, isTester }) })
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
    tier: 'free',
    freePreview: true,
    previewWeeks: 3
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
    popular: false,
    isOneTime: false
  },
  {
    id: 'pro',
    name: 'Pro Monthly',
    price: 19,
    priceAnnual: 190,
    period: 'month',
    description: 'For active learners',
    features: ['All simulations', 'All 4 industry scenarios', 'Detailed analytics', 'Certificates', 'Priority support', 'Cancel anytime'],
    cta: 'Subscribe Now',
    popular: false,
    isOneTime: false
  },
  {
    id: 'pro_lifetime',
    name: 'Pro Lifetime',
    price: 149,
    priceAnnual: 149,
    period: 'one-time',
    description: 'Best value - pay once, own forever',
    features: ['All simulations', 'All 4 industry scenarios', 'Detailed analytics', 'Certificates', 'Priority support', 'Lifetime updates', 'No recurring fees'],
    cta: 'Get Lifetime Access',
    popular: true,
    isOneTime: true
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
    popular: false,
    hidden: true,
    isOneTime: false
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
    projectName: 'SaaS Platform',
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
  
  // Normalize progress so scenarios complete in roughly their intended duration
  // Dividing by team size prevents large teams from finishing too fast
  // The 0.11 multiplier is tuned for ~10-12 week completion at good morale
  return (effectiveCapacity / team.size) * 0.11;
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
  // Language state - persisted in localStorage
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bizsimhub-lang') || 'en';
    }
    return 'en';
  });
  
  const [currentPage, setCurrentPage] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [resetToken, setResetToken] = useState(null);
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
  
  // NEW: Paywall modal for free users
  const [showPaywall, setShowPaywall] = useState(false);
  const FREE_TRIAL_WEEKS = 3; // Allow free users to play until week 3
  
  // NEW: Brief tab for HBP-style intro
  const [briefTab, setBriefTab] = useState('brief');

  // Toast helper
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Save language preference
  useEffect(() => {
    localStorage.setItem('bizsimhub-lang', lang);
  }, [lang]);

  // Check for password reset token in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('reset_token');
    if (token) {
      setResetToken(token);
      setAuthMode('reset');
      setCurrentPage('auth');
    }
  }, []);

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
      
      // Submit to HubSpot for new Google OAuth users
      const isNewUser = params.get('newUser') === 'true';
      const email = params.get('email');
      const name = params.get('name') || '';
      
      if (isNewUser && email) {
        const HUBSPOT_PORTAL_ID = '342933870';
        const HUBSPOT_FORM_GUID = '2bc1e72b-901a-45dd-9ea6-ea442fd0a125';
        
        const hubspotData = {
          fields: [
            { name: 'email', value: email },
            { name: 'firstname', value: name.split(' ')[0] || '' },
            { name: 'lastname', value: name.split(' ').slice(1).join(' ') || '' }
          ],
          context: {
            pageUri: window.location.href,
            pageName: 'Google OAuth Registration'
          }
        };

        fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(hubspotData)
        }).catch(err => console.log('HubSpot tracking:', err));
      }
      
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
      
      // HubSpot: Track payment conversion
      if (window._hsq) {
        window._hsq.push(['trackCustomBehavioralEvent', {
          name: 'pe_payment_complete',
          properties: { 
            session_id: params.get('session_id'),
            source: params.get('utm_source') || 'direct',
            medium: params.get('utm_medium') || 'organic',
            campaign: params.get('utm_campaign') || 'none'
          }
        }]);
      }
      
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
      
      // HubSpot: Create contact via Forms API
      const HUBSPOT_PORTAL_ID = '342933870';
      const HUBSPOT_FORM_GUID = '2bc1e72b-901a-45dd-9ea6-ea442fd0a125';
      
      const hubspotData = {
        fields: [
          { name: 'email', value: email },
          { name: 'firstname', value: name.split(' ')[0] },
          { name: 'lastname', value: name.split(' ').slice(1).join(' ') || '' }
        ],
        context: {
          pageUri: window.location.href,
          pageName: 'Registration'
        }
      };
      
      // Add UTM parameters if present
      const params = new URLSearchParams(window.location.search);
      if (params.get('utm_source')) {
        hubspotData.fields.push({ name: 'utm_source', value: params.get('utm_source') });
      }
      if (params.get('utm_medium')) {
        hubspotData.fields.push({ name: 'utm_medium', value: params.get('utm_medium') });
      }
      if (params.get('utm_campaign')) {
        hubspotData.fields.push({ name: 'utm_campaign', value: params.get('utm_campaign') });
      }
      
      // Submit to HubSpot (fire and forget - don't block registration)
      fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hubspotData)
      }).catch(err => console.log('HubSpot tracking:', err));
      
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
    
    // HubSpot: Track checkout initiation
    if (window._hsq) {
      window._hsq.push(['trackCustomBehavioralEvent', {
        name: 'pe_checkout_started',
        properties: { 
          plan: planId,
          billing_cycle: billingCycle,
          email: currentUser.email
        }
      }]);
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
    // Check paywall for free users
    const userTier = currentUser?.subscription_tier?.toLowerCase() || 'free';
    const isPaidUser = userTier === 'pro' || userTier === 'professional' || userTier === 'enterprise';
    const isTester = currentUser?.is_tester === true;
    
    if (!isPaidUser && !isTester && gameState.week >= FREE_TRIAL_WEEKS) {
      setShowPaywall(true);
      return;
    }
    
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
          {/* Language Toggle */}
          <button 
            onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '20px',
              color: '#e2e8f0',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              marginRight: '8px',
            }}
          >
            {lang === 'en' ? '🇬🇧 EN' : '🇫🇷 FR'}
          </button>
          {!currentUser ? (
            <>
              <button className="nav-link" onClick={() => setCurrentPage('pricing')}>{t('nav.pricing', lang)}</button>
              <a href="/contact.html" className="nav-link">{t('nav.contact', lang)}</a>
              <button className="nav-link" onClick={() => { setCurrentPage('auth'); setAuthMode('login'); }}>{t('nav.login', lang)}</button>
              <button className="nav-btn-primary" onClick={() => { setCurrentPage('auth'); setAuthMode('signup'); }}>{t('nav.getStarted', lang)}</button>
            </>
          ) : (
            <>
              <button className="nav-link" onClick={() => setCurrentPage('dashboard')}>{t('nav.dashboard', lang)}</button>
              <button className="nav-link" onClick={() => setCurrentPage('catalog')}>{t('nav.simulations', lang)}</button>
              <button className="nav-link" onClick={() => setCurrentPage('pricing')}>{t('nav.pricing', lang)}</button>
              <a href="/contact.html" className="nav-link">{t('nav.contact', lang)}</a>
              {currentUser.is_admin && (
                <button className="nav-link admin-link" onClick={() => setCurrentPage('admin')} title="Admin Panel">⚙️</button>
              )}
              <div className="nav-user">
                <span className="user-avatar">{currentUser.name?.charAt(0)}</span>
                <span className="user-name">{currentUser.name}</span>
                <button className="nav-link-small" onClick={handleLogout}>{t('nav.logout', lang)}</button>
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
          <div className="hero-badge">{t('landing.badge', lang)}</div>
          <h1 className="hero-title">{t('landing.heroTitle1', lang)} <span className="gradient-text">{t('landing.heroTitle2', lang)}</span></h1>
          <p className="hero-subtitle">{t('landing.heroSubtitle', lang)}</p>
          <div className="hero-cta">
            <button className="btn-primary-lg" onClick={() => { setCurrentPage('auth'); setAuthMode('signup'); }}>{t('landing.startTrial', lang)}</button>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">4</span><span className="stat-label">{t('landing.scenarios', lang)}</span></div>
            <div className="stat"><span className="stat-num">1000+</span><span className="stat-label">{t('landing.learners', lang)}</span></div>
            <div className="stat"><span className="stat-num">PMP</span><span className="stat-label">{lang === 'en' ? 'Aligned' : 'Aligné'}</span></div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">{lang === 'en' ? 'Flagship Simulation' : 'Simulation phare'}</span>
            <h2>Project Apex</h2>
            <p>{lang === 'en' ? 'HBP-inspired causal model simulation for project managers' : 'Simulation à modèle causal inspirée HBP pour gestionnaires de projet'}</p>
          </div>
          <div className="featured-card">
            <div className="featured-icon">🎯</div>
            <div className="featured-content">
              <h3>{lang === 'en' ? 'Practice Real PM Decision-Making' : 'Pratiquez la prise de décision GP réelle'}</h3>
              <p>{lang === 'en' 
                ? 'Navigate scope creep, technical debt, team burnout, and stakeholder pressure. Every decision creates cascading effects—just like real projects. Practice risk mitigation, schedule recovery, and resource reallocation in a safe environment.'
                : 'Naviguez la dérive du périmètre, la dette technique, l\'épuisement de l\'équipe et la pression des parties prenantes. Chaque décision crée des effets en cascade—comme dans les vrais projets. Pratiquez l\'atténuation des risques, la récupération du calendrier et la réallocation des ressources dans un environnement sécuritaire.'
              }</p>
              <div className="featured-tags">
                <span>{lang === 'en' ? 'Scope Management' : 'Gestion du périmètre'}</span>
                <span>{lang === 'en' ? 'Schedule Control' : 'Contrôle du calendrier'}</span>
                <span>{lang === 'en' ? 'Risk Response' : 'Réponse aux risques'}</span>
                <span>{lang === 'en' ? 'Team Dynamics' : 'Dynamique d\'équipe'}</span>
              </div>
              <button className="btn-primary" onClick={() => currentUser ? startSimulation('project-apex') : setCurrentPage('auth')}>
                {currentUser 
                  ? (lang === 'en' ? 'Start PM Simulation' : 'Démarrer la simulation GP')
                  : (lang === 'en' ? 'Try PM Simulation Free' : 'Essayer la simulation GP gratuitement')
                }
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="simulations-section">
        <div className="section-container">
          <div className="section-header">
            <h2>{lang === 'en' ? 'Practice in 4 Industry Contexts' : 'Pratiquez dans 4 contextes industriels'}</h2>
            <p>{lang === 'en' ? 'Each scenario presents unique PM challenges and decision points' : 'Chaque scénario présente des défis GP uniques et des points de décision'}</p>
          </div>
          <div className="sim-grid">
            <div className="sim-card">
              <div className="sim-icon">💻</div>
              <div className="sim-category">{lang === 'en' ? 'Technology' : 'Technologie'}</div>
              <h3>{lang === 'en' ? 'Tech Startup' : 'Startup Tech'}</h3>
              <p>{lang === 'en' ? 'Launch a SaaS platform while managing technical debt, team scaling, and stakeholder expectations.' : 'Lancez une plateforme SaaS tout en gérant la dette technique, la croissance de l\'équipe et les attentes des parties prenantes.'}</p>
              <div className="sim-meta"><span>{lang === 'en' ? 'Standard' : 'Standard'}</span><span>12 {lang === 'en' ? 'weeks' : 'semaines'}</span></div>
              <div className="sim-badge-featured">{lang === 'en' ? 'Available Now' : 'Disponible maintenant'}</div>
            </div>
            <div className="sim-card">
              <div className="sim-icon">🎭</div>
              <div className="sim-category">{lang === 'en' ? 'Entertainment' : 'Divertissement'}</div>
              <h3>{lang === 'en' ? 'Live Show Production' : 'Production de spectacle'}</h3>
              <p>{lang === 'en' ? 'Produce a touring show managing creative talent, safety requirements, and opening night deadlines.' : 'Produisez un spectacle de tournée en gérant les talents créatifs, les exigences de sécurité et les échéances de première.'}</p>
              <div className="sim-meta"><span>{lang === 'en' ? 'Advanced' : 'Avancé'}</span><span>10 {lang === 'en' ? 'weeks' : 'semaines'}</span></div>
              <div className="sim-badge-featured">{lang === 'en' ? 'Available Now' : 'Disponible maintenant'}</div>
            </div>
            <div className="sim-card">
              <div className="sim-icon">🏗️</div>
              <div className="sim-category">{lang === 'en' ? 'Construction' : 'Construction'}</div>
              <h3>{lang === 'en' ? 'Commercial Building' : 'Bâtiment commercial'}</h3>
              <p>{lang === 'en' ? 'Build a 12-story mixed-use development navigating permits, weather, and subcontractor coordination.' : 'Construisez un immeuble de 12 étages à usage mixte en naviguant les permis, la météo et la coordination des sous-traitants.'}</p>
              <div className="sim-meta"><span>{lang === 'en' ? 'Standard' : 'Standard'}</span><span>14 {lang === 'en' ? 'weeks' : 'semaines'}</span></div>
              <div className="sim-badge-featured">{lang === 'en' ? 'Available Now' : 'Disponible maintenant'}</div>
            </div>
            <div className="sim-card">
              <div className="sim-icon">🔬</div>
              <div className="sim-category">{lang === 'en' ? 'Research & Development' : 'Recherche et développement'}</div>
              <h3>{lang === 'en' ? 'R&D Innovation' : 'Innovation R&D'}</h3>
              <p>{lang === 'en' ? 'Lead a quantum sensor project with high uncertainty where prototyping is essential to manage risk.' : 'Dirigez un projet de capteur quantique à haute incertitude où le prototypage est essentiel pour gérer les risques.'}</p>
              <div className="sim-meta"><span>{lang === 'en' ? 'Expert' : 'Expert'}</span><span>16 {lang === 'en' ? 'weeks' : 'semaines'}</span></div>
              <div className="sim-badge-featured">{lang === 'en' ? 'Available Now' : 'Disponible maintenant'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* PM Outcomes Section */}
      <section className="outcomes-section" style={{ padding: '4rem 2rem', background: 'var(--bg-primary)' }}>
        <div className="section-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{t('landing.outcomesTitle', lang)}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '1.5rem' }}>📅</span>
              <span>{t('landing.outcome1', lang)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '1.5rem' }}>💰</span>
              <span>{t('landing.outcome2', lang)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '1.5rem' }}>⚠️</span>
              <span>{t('landing.outcome3', lang)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '1.5rem' }}>👥</span>
              <span>{t('landing.outcome4', lang)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '1.5rem' }}>🎯</span>
              <span>{t('landing.outcome5', lang)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '1.5rem' }}>📋</span>
              <span>{t('landing.outcome6', lang)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Credentials Section */}
      <section className="founder-section" style={{ padding: '4rem 2rem', background: 'var(--bg-secondary)' }}>
        <div className="section-container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>{t('landing.founderTitle', lang)}</h2>
          <div style={{ 
            background: 'var(--bg-card)', 
            border: '1px solid var(--border)', 
            borderRadius: '16px', 
            padding: '2rem',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '2rem',
                flexShrink: 0
              }}>
                👨‍🏫
              </div>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{t('landing.founderName', lang)}</h3>
                <p style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: '500' }}>
                  {t('landing.founderCredentials', lang)}
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {t('landing.founderBio', lang)}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>PMP®</span>
                  <span style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>PMI-ACP®</span>
                  <span style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>McGill University</span>
                  <span style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>MBA, HEC Montréal</span>
                </div>
              </div>
            </div>
          </div>
          <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {lang === 'en' 
              ? 'Questions? Reach out at contact@bizsimhub.com' 
              : 'Questions? Contactez-nous à contact@bizsimhub.com'}
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section-landing" style={{ padding: '5rem 2rem', background: 'var(--bg-secondary)' }}>
        <div className="section-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{lang === 'en' ? 'Simple Pricing' : 'Tarification simple'}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{lang === 'en' ? 'Start free, upgrade when ready' : 'Commencez gratuitement, passez au supérieur quand vous êtes prêt'}</p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Free Plan */}
            <div style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border)', 
              borderRadius: '16px', 
              padding: '2rem', 
              width: '300px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{lang === 'en' ? 'Free' : 'Gratuit'}</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {lang === 'en' ? 'Perfect for trying out' : 'Parfait pour essayer'}
              </p>
              <div style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                $0 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/{lang === 'en' ? 'forever' : 'toujours'}</span>
              </div>
              <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>✓ 1 simulation (Project Apex)</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>{lang === 'en' ? '✓ Basic scenarios' : '✓ Scénarios de base'}</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>{lang === 'en' ? '✓ Score tracking' : '✓ Suivi des scores'}</li>
                <li style={{ padding: '0.5rem 0' }}>{lang === 'en' ? '✓ Community support' : '✓ Support communautaire'}</li>
              </ul>
              <button 
                className="btn-secondary btn-full"
                onClick={() => { setCurrentPage('auth'); setAuthMode('signup'); }}
              >
                {lang === 'en' ? 'Get Started Free' : 'Commencer gratuitement'}
              </button>
            </div>
            
            {/* Pro Plan */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
              border: '2px solid var(--accent-primary)', 
              borderRadius: '16px', 
              padding: '2rem', 
              width: '300px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{ 
                position: 'absolute', 
                top: '-12px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                background: 'var(--accent-primary)',
                color: 'white',
                padding: '4px 16px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                {lang === 'en' ? 'Most Popular' : 'Plus populaire'}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{lang === 'en' ? 'Professional' : 'Professionnel'}</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {lang === 'en' ? 'For serious learners' : 'Pour les apprenants sérieux'}
              </p>
              <div style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                $19 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/{lang === 'en' ? 'month' : 'mois'}</span>
              </div>
              <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>{lang === 'en' ? '✓ All simulations' : '✓ Toutes les simulations'}</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>{lang === 'en' ? '✓ All scenarios' : '✓ Tous les scénarios'}</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>{lang === 'en' ? '✓ Detailed analytics' : '✓ Analyses détaillées'}</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>{lang === 'en' ? '✓ Certificates' : '✓ Certificats'}</li>
                <li style={{ padding: '0.5rem 0' }}>{lang === 'en' ? '✓ Priority support' : '✓ Support prioritaire'}</li>
              </ul>
              <button 
                className="btn-primary btn-full"
                onClick={() => { setCurrentPage('auth'); setAuthMode('signup'); }}
              >
                {lang === 'en' ? 'Start Free Trial' : 'Commencer l\'essai gratuit'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <span className="logo-icon">🎓</span>
            <span className="logo-text">BizSim<span className="logo-accent">Hub</span></span>
            <p>{t('footer.madeWith', lang)}</p>
            <div className="social-links" style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <a href="https://www.linkedin.com/company/sylvain-pmo-consulting" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', fontSize: '20px', transition: 'color 0.2s' }} title="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://x.com/Sylgau" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', fontSize: '20px', transition: 'color 0.2s' }} title="X (Twitter)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61586908877730" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', fontSize: '20px', transition: 'color 0.2s' }} title="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/sylv.ainpmo/" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', fontSize: '20px', transition: 'color 0.2s' }} title="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-col"><h4>{t('footer.product', lang)}</h4><a href="#" onClick={() => setCurrentPage('catalog')}>{t('nav.simulations', lang)}</a><a href="#">{t('footer.forEducators', lang)}</a></div>
            <div className="footer-col"><h4>{t('footer.company', lang)}</h4><a href="#">{t('footer.about', lang)}</a><a href="/contact.html">{t('nav.contact', lang)}</a></div>
            <div className="footer-col"><h4>Legal</h4><a href="#">Privacy</a><a href="#">Terms</a></div>
          </div>
        </div>
        <div className="footer-bottom"><p>© 2025 BizSimHub. {t('footer.allRights', lang)}</p></div>
      </footer>
    </div>
  );

  const renderAuth = () => (
    <div className="auth-page">
      {renderNavbar()}
      <div className="auth-container">
        <div className="auth-card">
          {/* Forgot Password Mode */}
          {authMode === 'forgot' ? (
            <>
              <h2>{lang === 'en' ? 'Reset Password' : 'Réinitialiser le mot de passe'}</h2>
              <p className="auth-subtitle">{lang === 'en' ? 'Enter your email to receive a reset link' : 'Entrez votre courriel pour recevoir un lien'}</p>
              
              {authError && <div className="auth-error">{authError}</div>}
              {authSuccess && <div className="auth-success">{authSuccess}</div>}
              
              <form onSubmit={async (e) => {
                e.preventDefault();
                setAuthLoading(true);
                setAuthError('');
                setAuthSuccess('');
                try {
                  const res = await fetch(`${API_BASE}/auth/forgot-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: e.target.email.value })
                  });
                  const data = await res.json();
                  if (res.ok) {
                    setAuthSuccess(lang === 'en' ? 'If an account exists, you will receive a reset link shortly.' : 'Si un compte existe, vous recevrez un lien sous peu.');
                  } else {
                    setAuthError(data.error || 'Failed to send reset email');
                  }
                } catch (err) {
                  setAuthError('Failed to send reset email');
                } finally {
                  setAuthLoading(false);
                }
              }}>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="you@example.com" required />
                </div>
                <button type="submit" className="btn-primary btn-full" disabled={authLoading}>
                  {authLoading ? (lang === 'en' ? 'Sending...' : 'Envoi...') : (lang === 'en' ? 'Send Reset Link' : 'Envoyer le lien')}
                </button>
              </form>
              
              <p className="auth-toggle">
                <button onClick={() => { setAuthMode('login'); setAuthError(''); setAuthSuccess(''); }}>
                  ← {lang === 'en' ? 'Back to Sign In' : 'Retour à la connexion'}
                </button>
              </p>
            </>
          ) : authMode === 'reset' ? (
            /* Reset Password Mode (from email link) */
            <>
              <h2>{lang === 'en' ? 'Create New Password' : 'Créer un nouveau mot de passe'}</h2>
              <p className="auth-subtitle">{lang === 'en' ? 'Enter your new password below' : 'Entrez votre nouveau mot de passe'}</p>
              
              {authError && <div className="auth-error">{authError}</div>}
              {authSuccess && <div className="auth-success">{authSuccess}</div>}
              
              <form onSubmit={async (e) => {
                e.preventDefault();
                const password = e.target.password.value;
                const confirmPassword = e.target.confirmPassword.value;
                
                if (password !== confirmPassword) {
                  setAuthError(lang === 'en' ? 'Passwords do not match' : 'Les mots de passe ne correspondent pas');
                  return;
                }
                
                setAuthLoading(true);
                setAuthError('');
                try {
                  const res = await fetch(`${API_BASE}/auth/reset-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: resetToken, password })
                  });
                  const data = await res.json();
                  if (res.ok) {
                    setAuthSuccess(lang === 'en' ? 'Password reset successful! You can now sign in.' : 'Mot de passe réinitialisé! Vous pouvez maintenant vous connecter.');
                    setResetToken(null);
                    // Clear URL params
                    window.history.replaceState({}, document.title, window.location.pathname);
                    setTimeout(() => {
                      setAuthMode('login');
                      setAuthSuccess('');
                    }, 2000);
                  } else {
                    setAuthError(data.error || 'Failed to reset password');
                  }
                } catch (err) {
                  setAuthError('Failed to reset password');
                } finally {
                  setAuthLoading(false);
                }
              }}>
                <div className="form-group">
                  <label>{lang === 'en' ? 'New Password' : 'Nouveau mot de passe'}</label>
                  <input type="password" name="password" placeholder="••••••••" required minLength={6} />
                </div>
                <div className="form-group">
                  <label>{lang === 'en' ? 'Confirm Password' : 'Confirmer le mot de passe'}</label>
                  <input type="password" name="confirmPassword" placeholder="••••••••" required minLength={6} />
                </div>
                <button type="submit" className="btn-primary btn-full" disabled={authLoading}>
                  {authLoading ? (lang === 'en' ? 'Resetting...' : 'Réinitialisation...') : (lang === 'en' ? 'Reset Password' : 'Réinitialiser')}
                </button>
              </form>
            </>
          ) : (
            /* Normal Login/Signup Mode */
            <>
              <h2>{authMode === 'login' ? (lang === 'en' ? 'Welcome' : 'Bienvenue') : (lang === 'en' ? 'Create Account' : 'Créer un compte')}</h2>
              <p className="auth-subtitle">{authMode === 'login' ? (lang === 'en' ? 'Sign in to continue learning' : 'Connectez-vous pour continuer') : (lang === 'en' ? 'Start your learning journey' : 'Commencez votre parcours')}</p>
              
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
                    <label>{lang === 'en' ? 'Full Name' : 'Nom complet'}</label>
                    <input type="text" name="name" placeholder="John Doe" required />
                  </div>
                )}
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="you@example.com" required />
                </div>
                <div className="form-group">
                  <label>{lang === 'en' ? 'Password' : 'Mot de passe'}</label>
                  <input type="password" name="password" placeholder="••••••••" required minLength={6} />
                  {authMode === 'login' && (
                    <button 
                      type="button" 
                      className="forgot-password-link"
                      onClick={() => { setAuthMode('forgot'); setAuthError(''); }}
                    >
                      {lang === 'en' ? 'Forgot password?' : 'Mot de passe oublié?'}
                    </button>
                  )}
                </div>
                <button type="submit" className="btn-primary btn-full" disabled={authLoading}>
                  {authLoading ? (lang === 'en' ? 'Please wait...' : 'Patientez...') : authMode === 'login' ? (lang === 'en' ? 'Sign In' : 'Connexion') : (lang === 'en' ? 'Create Account' : 'Créer le compte')}
                </button>
              </form>
              
              <div className="auth-divider"><span>{lang === 'en' ? 'or' : 'ou'}</span></div>
              
              <button className="btn-google" onClick={() => window.location.href = `${API_BASE}/auth/google`}>
                <span className="google-icon">G</span>
                {lang === 'en' ? 'Continue with Google' : 'Continuer avec Google'}
              </button>
              
              <p className="auth-toggle">
                {authMode === 'login' ? (lang === 'en' ? "Don't have an account? " : "Pas de compte? ") : (lang === 'en' ? 'Already have an account? ' : 'Déjà un compte? ')}
                <button onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setAuthError(''); }}>
                  {authMode === 'login' ? (lang === 'en' ? 'Sign Up' : "S'inscrire") : (lang === 'en' ? 'Sign In' : 'Connexion')}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // ============================================
  // ADMIN DASHBOARD
  // ============================================
  
  const [adminTab, setAdminTab] = useState('overview');
  const [adminSearch, setAdminSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ name: '', email: '', password: '', plan: 'free' });
  
  // Admin data state (fetched from API)
  const [adminData, setAdminData] = useState({
    overview: {
      totalUsers: 0,
      activeUsers: 0,
      totalRevenue: 0,
      monthlyRevenue: 0,
      completionRate: 0,
      avgSessionTime: '0 min',
      newUsersToday: 0,
      activeNow: 0,
      subscriptions: { free: 0, pro: 0, enterprise: 0 },
      recentActivity: []
    },
    users: [],
    revenue: {
      mrr: 0,
      arr: 0,
      growth: 0,
      churnRate: 0,
      ltv: 0,
      subscriptions: { free: 0, professional: 0, enterprise: 0 },
      recentTransactions: []
    },
    analytics: {
      popularSimulations: [],
      weeklyActivity: [
        { day: 'Mon', users: 0, sessions: 0 },
        { day: 'Tue', users: 0, sessions: 0 },
        { day: 'Wed', users: 0, sessions: 0 },
        { day: 'Thu', users: 0, sessions: 0 },
        { day: 'Fri', users: 0, sessions: 0 },
        { day: 'Sat', users: 0, sessions: 0 },
        { day: 'Sun', users: 0, sessions: 0 },
      ],
      gradeDistribution: { A: 0, B: 0, C: 0, D: 0, F: 0 }
    },
    content: {
      simulations: SIMULATIONS.map(s => ({
        id: s.id,
        name: s.title,
        status: s.available ? 'published' : 'draft',
        plays: 0,
        rating: null,
        lastUpdated: new Date().toISOString().split('T')[0]
      }))
    },
    system: {
      uptime: 99.9,
      avgResponseTime: 150,
      errorRate: 0.01,
      activeConnections: 0,
      cpuUsage: 25,
      memoryUsage: 45,
      recentErrors: []
    }
  });
  
  // Fetch admin data when admin page is accessed
  const fetchAdminData = async () => {
    if (!currentUser) return;
    
    setAdminLoading(true);
    setAdminError(null);
    
    try {
      // Fetch all admin data in parallel
      const [overviewRes, usersRes, analyticsRes, revenueRes] = await Promise.allSettled([
        api.getAdminOverview(),
        api.getAdminUsers(),
        api.getAdminAnalytics(),
        api.getAdminRevenue()
      ]);
      
      setAdminData(prev => ({
        ...prev,
        overview: overviewRes.status === 'fulfilled' ? overviewRes.value.overview : prev.overview,
        users: usersRes.status === 'fulfilled' ? usersRes.value.users : prev.users,
        analytics: analyticsRes.status === 'fulfilled' ? analyticsRes.value.analytics : prev.analytics,
        revenue: revenueRes.status === 'fulfilled' ? revenueRes.value.revenue : prev.revenue,
      }));
      
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setAdminError('Failed to load admin data. Please try again.');
    } finally {
      setAdminLoading(false);
    }
  };
  
  // Fetch admin data when entering admin page or changing tabs
  useEffect(() => {
    if (currentPage === 'admin' && currentUser) {
      fetchAdminData();
    }
  }, [currentPage, currentUser]);

  // Toggle admin status for a user
  const handleToggleAdmin = async (userId, currentIsAdmin) => {
    try {
      const result = await api.toggleAdmin(userId, !currentIsAdmin);
      if (result.success) {
        // Update local state
        setAdminData(prev => ({
          ...prev,
          users: prev.users.map(u => 
            u.id === userId ? { ...u, isAdmin: !currentIsAdmin } : u
          )
        }));
        showToast(result.message, 'success');
      }
    } catch (error) {
      showToast(error.message || 'Failed to update admin status', 'error');
    }
  };

  // Toggle tester status for a user
  const handleToggleTester = async (userId, currentIsTester) => {
    try {
      const result = await api.toggleTester(userId, !currentIsTester);
      if (result.success) {
        // Update local state
        setAdminData(prev => ({
          ...prev,
          users: prev.users.map(u => 
            u.id === userId ? { ...u, isTester: !currentIsTester } : u
          )
        }));
        showToast(result.message, 'success');
      }
    } catch (error) {
      showToast(error.message || 'Failed to update tester status', 'error');
    }
  };

  // Delete user
  const handleDeleteUser = async (userId, userName) => {
    const confirmed = window.confirm(
      lang === 'en' 
        ? `Are you sure you want to delete "${userName}"? This action cannot be undone.`
        : `Êtes-vous sûr de vouloir supprimer "${userName}"? Cette action est irréversible.`
    );
    
    if (!confirmed) return;
    
    try {
      const res = await fetch(`${API_BASE}/admin/delete-user`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${api.getToken()}`
        },
        body: JSON.stringify({ userId })
      });
      
      const result = await res.json();
      
      if (res.ok && result.success) {
        // Remove user from local state
        setAdminData(prev => ({
          ...prev,
          users: prev.users.filter(u => u.id !== userId)
        }));
        showToast(lang === 'en' ? 'User deleted successfully' : 'Utilisateur supprimé', 'success');
      } else {
        showToast(result.error || 'Failed to delete user', 'error');
      }
    } catch (error) {
      showToast('Failed to delete user', 'error');
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    
    if (!newUserForm.email || !newUserForm.name) {
      showToast(lang === 'en' ? 'Name and email are required' : 'Nom et courriel requis', 'error');
      return;
    }
    
    try {
      const res = await fetch(`${API_BASE}/admin/add-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${api.getToken()}`
        },
        body: JSON.stringify(newUserForm)
      });
      
      const result = await res.json();
      
      if (res.ok && result.success) {
        // Add user to local state
        setAdminData(prev => ({
          ...prev,
          users: [result.user, ...prev.users]
        }));
        
        // Show success with temporary password if generated
        if (result.temporaryPassword) {
          showToast(`User created! Temp password: ${result.temporaryPassword}`, 'success');
        } else {
          showToast(lang === 'en' ? 'User created successfully' : 'Utilisateur créé', 'success');
        }
        
        // Reset form and close modal
        setNewUserForm({ name: '', email: '', password: '', plan: 'free' });
        setShowAddUserModal(false);
        
        // Refresh user list
        fetchAdminUsers();
      } else {
        showToast(result.error || 'Failed to create user', 'error');
      }
    } catch (error) {
      showToast('Failed to create user', 'error');
    }
  };

  const renderAdminDashboard = () => {
    const filteredUsers = adminData.users.filter(u => 
      u.name?.toLowerCase().includes(adminSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(adminSearch.toLowerCase())
    );

    return (
      <div className="admin-page">
        {renderNavbar()}
        
        {/* Loading overlay */}
        {adminLoading && (
          <div className="admin-loading-overlay">
            <div className="admin-loading-spinner">
              <div className="spinner"></div>
              <p>Loading admin data...</p>
            </div>
          </div>
        )}
        
        {/* Error banner */}
        {adminError && (
          <div className="admin-error-banner">
            <span>⚠️ {adminError}</span>
            <button onClick={fetchAdminData}>Retry</button>
          </div>
        )}
        
        <div className="admin-layout">
          {/* Sidebar */}
          <aside className="admin-sidebar">
            <div className="admin-sidebar-header">
              <span className="admin-logo">⚙️</span>
              <h2>Admin Panel</h2>
            </div>
            <nav className="admin-nav">
              <button className={`admin-nav-btn ${adminTab === 'overview' ? 'active' : ''}`} onClick={() => setAdminTab('overview')}>
                <span>📊</span> Overview
              </button>
              <button className={`admin-nav-btn ${adminTab === 'users' ? 'active' : ''}`} onClick={() => setAdminTab('users')}>
                <span>👥</span> Users
              </button>
              <button className={`admin-nav-btn ${adminTab === 'analytics' ? 'active' : ''}`} onClick={() => setAdminTab('analytics')}>
                <span>📈</span> Analytics
              </button>
              <button className={`admin-nav-btn ${adminTab === 'revenue' ? 'active' : ''}`} onClick={() => setAdminTab('revenue')}>
                <span>💰</span> Revenue
              </button>
              <button className={`admin-nav-btn ${adminTab === 'content' ? 'active' : ''}`} onClick={() => setAdminTab('content')}>
                <span>📚</span> Content
              </button>
              <button className={`admin-nav-btn ${adminTab === 'system' ? 'active' : ''}`} onClick={() => setAdminTab('system')}>
                <span>🔧</span> System
              </button>
            </nav>
            <div className="admin-sidebar-footer">
              <button className="admin-back-btn" onClick={() => setCurrentPage('dashboard')}>
                ← Back to App
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="admin-main">
            {/* Overview Tab */}
            {adminTab === 'overview' && (
              <div className="admin-content">
                <div className="admin-header">
                  <div>
                    <h1>Dashboard Overview</h1>
                    <p>{lang === 'en' ? 'Welcome! Here\'s what\'s happening with BizSimHub today.' : 'Bienvenue! Voici ce qui se passe avec BizSimHub aujourd\'hui.'}</p>
                  </div>
                  <button className="admin-btn refresh-btn" onClick={fetchAdminData} disabled={adminLoading}>
                    {adminLoading ? '↻ Loading...' : '↻ Refresh'}
                  </button>
                </div>

                {/* Key Metrics */}
                <div className="admin-metrics-grid">
                  <div className="admin-metric-card">
                    <div className="metric-icon blue">👥</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.overview.totalUsers.toLocaleString()}</span>
                      <span className="metric-label">Total Users</span>
                    </div>
                    <span className="metric-badge green">+{adminData.overview.newUsersToday} today</span>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon green">💰</div>
                    <div className="metric-info">
                      <span className="metric-value">${adminData.overview.monthlyRevenue.toLocaleString()}</span>
                      <span className="metric-label">Monthly Revenue</span>
                    </div>
                    <span className="metric-badge green">+23% MoM</span>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon purple">🎯</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.overview.completionRate}%</span>
                      <span className="metric-label">Completion Rate</span>
                    </div>
                    <span className="metric-badge neutral">Avg</span>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon orange">⚡</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.overview.activeNow}</span>
                      <span className="metric-label">Active Now</span>
                    </div>
                    <span className="metric-badge blue">Live</span>
                  </div>
                </div>

                {/* Quick Stats Row */}
                <div className="admin-stats-row">
                  <div className="admin-stat-card">
                    <h3>Active Users (30d)</h3>
                    <div className="stat-big">{adminData.overview.activeUsers.toLocaleString()}</div>
                    <div className="stat-bar">
                      <div className="stat-bar-fill" style={{width: `${(adminData.overview.activeUsers / adminData.overview.totalUsers) * 100}%`}}></div>
                    </div>
                    <span className="stat-sub">{Math.round((adminData.overview.activeUsers / adminData.overview.totalUsers) * 100)}% of total users</span>
                  </div>
                  <div className="admin-stat-card">
                    <h3>Avg Session Time</h3>
                    <div className="stat-big">{adminData.overview.avgSessionTime}</div>
                    <span className="stat-sub">Per user session</span>
                  </div>
                  <div className="admin-stat-card">
                    <h3>Total Revenue (All Time)</h3>
                    <div className="stat-big">${adminData.overview.totalRevenue.toLocaleString()}</div>
                    <span className="stat-sub">Since launch</span>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="admin-section">
                  <h3>Recent Activity</h3>
                  <div className="activity-list">
                    <div className="activity-item">
                      <span className="activity-icon">🎉</span>
                      <div className="activity-content">
                        <strong>Michael Brown</strong> completed Project Apex with Grade A
                        <span className="activity-time">5 minutes ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <span className="activity-icon">💳</span>
                      <div className="activity-content">
                        <strong>Lisa Thompson</strong> upgraded to Professional plan
                        <span className="activity-time">23 minutes ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <span className="activity-icon">👤</span>
                      <div className="activity-content">
                        <strong>New user registered:</strong> alex@company.com
                        <span className="activity-time">1 hour ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <span className="activity-icon">🎯</span>
                      <div className="activity-content">
                        <strong>Enterprise Scale</strong> simulation reached 1,500 plays
                        <span className="activity-time">2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {adminTab === 'users' && (
              <div className="admin-content">
                <div className="admin-header">
                  <h1>User Management</h1>
                  <p>Manage and monitor all platform users</p>
                </div>

                {/* User Stats */}
                <div className="admin-user-stats">
                  <div className="user-stat">
                    <span className="user-stat-value">{adminData.users.filter(u => u.status === 'active').length}</span>
                    <span className="user-stat-label">Active</span>
                  </div>
                  <div className="user-stat">
                    <span className="user-stat-value">{adminData.users.filter(u => u.plan === 'Professional').length}</span>
                    <span className="user-stat-label">Professional</span>
                  </div>
                  <div className="user-stat">
                    <span className="user-stat-value">{adminData.users.filter(u => u.plan === 'Lifetime').length}</span>
                    <span className="user-stat-label">Lifetime</span>
                  </div>
                  <div className="user-stat">
                    <span className="user-stat-value">{adminData.users.filter(u => u.plan === 'Enterprise').length}</span>
                    <span className="user-stat-label">Enterprise</span>
                  </div>
                  <div className="user-stat">
                    <span className="user-stat-value">{adminData.users.filter(u => u.status === 'churned').length}</span>
                    <span className="user-stat-label">Churned</span>
                  </div>
                </div>

                {/* Search & Filter */}
                <div className="admin-toolbar">
                  <div className="search-box">
                    <span>🔍</span>
                    <input 
                      type="text" 
                      placeholder="Search users by name or email..." 
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                    />
                  </div>
                  <div className="toolbar-actions">
                    <select className="admin-select">
                      <option>All Plans</option>
                      <option>Free</option>
                      <option>Professional</option>
                      <option>Lifetime</option>
                      <option>Enterprise</option>
                    </select>
                    <select className="admin-select">
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Churned</option>
                    </select>
                    <button className="admin-btn primary" onClick={() => setShowAddUserModal(true)}>+ Add User</button>
                  </div>
                </div>

                {/* Users Table */}
                <div className="admin-table-container">
                  {filteredUsers.length > 0 ? (
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Plan</th>
                          <th>Status</th>
                          <th>Simulations</th>
                          <th>Last Active</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map(user => (
                          <tr key={user.id}>
                            <td>
                              <div className="user-cell">
                                <div className="user-avatar">{(user.name || user.email || '?').charAt(0).toUpperCase()}</div>
                                <div className="user-info">
                                  <strong>
                                    {user.name || 'Unknown'}
                                    {user.isAdmin && <span className="admin-badge">Admin</span>}
                                    {user.isTester && <span className="tester-badge">Tester</span>}
                                  </strong>
                                  <span>{user.email}</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className={`plan-badge ${user.isTester ? 'tester' : (user.plan || 'free').toLowerCase()}`}>
                                {user.isTester ? 'Tester' : (user.plan || 'Free')}
                              </span>
                            </td>
                            <td>
                              <span className={`status-badge ${user.status || 'active'}`}>{user.status || 'active'}</span>
                            </td>
                            <td>
                              <span className="sim-count">{user.completions || 0}/{user.simulations || 0}</span>
                              <span className="sim-label">completed</span>
                            </td>
                            <td className="last-active">{user.lastActive || 'Never'}</td>
                            <td>
                              <div className="action-btns">
                                <button className="action-btn" title="View" onClick={() => setSelectedUser(user)}>👁</button>
                                <button 
                                  className={`action-btn ${user.isTester ? 'tester-active' : ''}`} 
                                  title={user.isTester ? 'Remove Tester' : 'Make Tester'}
                                  onClick={() => handleToggleTester(user.id, user.isTester)}
                                >
                                  🧪
                                </button>
                                <button 
                                  className={`action-btn ${user.isAdmin ? 'admin-active' : ''}`} 
                                  title={user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                                  onClick={() => handleToggleAdmin(user.id, user.isAdmin)}
                                >
                                  👑
                                </button>
                                <button className="action-btn danger" title="Delete" onClick={() => handleDeleteUser(user.id, user.name)}>🗑</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">👥</div>
                      <p>{adminSearch ? 'No users match your search' : 'No users yet'}</p>
                    </div>
                  )}
                </div>

                {/* User Detail Modal */}
                {selectedUser && (
                  <div className="admin-modal-overlay" onClick={() => setSelectedUser(null)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                      <div className="modal-header">
                        <h2>User Details</h2>
                        <button className="modal-close" onClick={() => setSelectedUser(null)}>×</button>
                      </div>
                      <div className="modal-body">
                        <div className="user-detail-header">
                          <div className="user-avatar large">{(selectedUser.name || selectedUser.email || '?').charAt(0).toUpperCase()}</div>
                          <div>
                            <h3>{selectedUser.name || 'Unknown'}</h3>
                            <p>{selectedUser.email}</p>
                          </div>
                        </div>
                        <div className="user-detail-grid">
                          <div className="detail-item">
                            <label>Plan</label>
                            <span className={`plan-badge ${(selectedUser.plan || 'free').toLowerCase()}`}>{selectedUser.plan || 'Free'}</span>
                          </div>
                          <div className="detail-item">
                            <label>Status</label>
                            <span className={`status-badge ${selectedUser.status || 'active'}`}>{selectedUser.status || 'active'}</span>
                          </div>
                          <div className="detail-item">
                            <label>Admin</label>
                            <span className={`status-badge ${selectedUser.isAdmin ? 'active' : 'inactive'}`}>
                              {selectedUser.isAdmin ? '✓ Yes' : 'No'}
                            </span>
                          </div>
                          <div className="detail-item">
                            <label>Joined</label>
                            <span>{selectedUser.joined || 'N/A'}</span>
                          </div>
                          <div className="detail-item">
                            <label>Last Active</label>
                            <span>{selectedUser.lastActive || 'Never'}</span>
                          </div>
                          <div className="detail-item">
                            <label>Simulations Played</label>
                            <span>{selectedUser.simulations || 0}</span>
                          </div>
                          <div className="detail-item">
                            <label>Completions</label>
                            <span>{selectedUser.completions || 0}</span>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button 
                          className={`admin-btn ${selectedUser.isAdmin ? 'danger' : 'primary'}`}
                          onClick={() => {
                            handleToggleAdmin(selectedUser.id, selectedUser.isAdmin);
                            setSelectedUser(prev => ({ ...prev, isAdmin: !prev.isAdmin }));
                          }}
                        >
                          {selectedUser.isAdmin ? '👑 Remove Admin' : '👑 Make Admin'}
                        </button>
                        <button className="admin-btn">Send Email</button>
                        <button className="admin-btn danger">Suspend User</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Add User Modal */}
                {showAddUserModal && (
                  <div className="admin-modal-overlay" onClick={() => setShowAddUserModal(false)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                      <div className="modal-header">
                        <h2>Add New User</h2>
                        <button className="modal-close" onClick={() => setShowAddUserModal(false)}>×</button>
                      </div>
                      <form onSubmit={handleAddUser}>
                        <div className="modal-body">
                          <div className="form-group">
                            <label>Name *</label>
                            <input 
                              type="text" 
                              value={newUserForm.name}
                              onChange={e => setNewUserForm(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="John Doe"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Email *</label>
                            <input 
                              type="email" 
                              value={newUserForm.email}
                              onChange={e => setNewUserForm(prev => ({ ...prev, email: e.target.value }))}
                              placeholder="john@example.com"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Password (leave empty for auto-generated)</label>
                            <input 
                              type="text" 
                              value={newUserForm.password}
                              onChange={e => setNewUserForm(prev => ({ ...prev, password: e.target.value }))}
                              placeholder="Auto-generate if blank"
                            />
                          </div>
                          <div className="form-group">
                            <label>Plan</label>
                            <select 
                              value={newUserForm.plan}
                              onChange={e => setNewUserForm(prev => ({ ...prev, plan: e.target.value }))}
                            >
                              <option value="free">Free</option>
                              <option value="pro">Pro ($19/mo)</option>
                              <option value="pro_lifetime">Pro Lifetime ($149)</option>
                              <option value="enterprise">Enterprise</option>
                            </select>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="admin-btn" onClick={() => setShowAddUserModal(false)}>Cancel</button>
                          <button type="submit" className="admin-btn primary">Create User</button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab */}
            {adminTab === 'analytics' && (
              <div className="admin-content">
                <div className="admin-header">
                  <h1>Analytics</h1>
                  <p>Platform performance and user engagement metrics</p>
                </div>

                {/* Weekly Activity Chart */}
                <div className="admin-chart-section">
                  <h3>Weekly Activity</h3>
                  <div className="bar-chart">
                    {adminData.analytics.weeklyActivity.map((day, i) => (
                      <div key={i} className="bar-group">
                        <div className="bar-container">
                          <div className="bar users" style={{height: `${(day.users / 600) * 100}%`}} title={`${day.users} users`}></div>
                          <div className="bar sessions" style={{height: `${(day.sessions / 1000) * 100}%`}} title={`${day.sessions} sessions`}></div>
                        </div>
                        <span className="bar-label">{day.day}</span>
                      </div>
                    ))}
                  </div>
                  <div className="chart-legend">
                    <span><i className="legend-dot users"></i> Users</span>
                    <span><i className="legend-dot sessions"></i> Sessions</span>
                  </div>
                </div>

                {/* Popular Simulations */}
                <div className="admin-section">
                  <h3>Popular Simulations</h3>
                  {adminData.analytics.popularSimulations?.length > 0 ? (
                    <div className="sim-rankings">
                      {adminData.analytics.popularSimulations.map((sim, i) => (
                        <div key={sim.id || i} className="sim-rank-item">
                          <span className="rank">#{i + 1}</span>
                          <div className="sim-rank-info">
                            <strong>{sim.name}</strong>
                            <div className="sim-rank-stats">
                              <span>🎮 {(sim.plays || 0).toLocaleString()} plays</span>
                              <span>✅ {(sim.completions || 0).toLocaleString()} completions</span>
                              <span>⭐ {sim.avgScore || 0} avg score</span>
                            </div>
                          </div>
                          <div className="completion-rate">
                            {sim.plays > 0 ? Math.round((sim.completions / sim.plays) * 100) : 0}%
                            <span>completion</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">📊</div>
                      <p>No simulation data yet</p>
                    </div>
                  )}
                </div>

                {/* Grade Distribution */}
                <div className="admin-section">
                  <h3>Grade Distribution</h3>
                  <div className="grade-chart">
                    {Object.entries(adminData.analytics.gradeDistribution).map(([grade, pct]) => (
                      <div key={grade} className="grade-bar-item">
                        <span className="grade-label">{grade}</span>
                        <div className="grade-bar-container">
                          <div className={`grade-bar grade-${grade.toLowerCase()}`} style={{width: `${pct}%`}}></div>
                        </div>
                        <span className="grade-pct">{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Revenue Tab */}
            {adminTab === 'revenue' && (
              <div className="admin-content">
                <div className="admin-header">
                  <h1>Revenue</h1>
                  <p>Financial metrics and subscription analytics</p>
                </div>

                {/* Revenue Metrics */}
                <div className="admin-metrics-grid">
                  <div className="admin-metric-card">
                    <div className="metric-icon green">📈</div>
                    <div className="metric-info">
                      <span className="metric-value">${adminData.revenue.mrr.toLocaleString()}</span>
                      <span className="metric-label">Monthly Recurring Revenue</span>
                    </div>
                    <span className="metric-badge green">+{adminData.revenue.growth}%</span>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon blue">📊</div>
                    <div className="metric-info">
                      <span className="metric-value">${adminData.revenue.arr.toLocaleString()}</span>
                      <span className="metric-label">Annual Recurring Revenue</span>
                    </div>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon purple">👤</div>
                    <div className="metric-info">
                      <span className="metric-value">${adminData.revenue.ltv}</span>
                      <span className="metric-label">Customer LTV</span>
                    </div>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon orange">📉</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.revenue.churnRate}%</span>
                      <span className="metric-label">Churn Rate</span>
                    </div>
                  </div>
                </div>

                {/* Subscription Breakdown */}
                <div className="admin-section">
                  <h3>Subscription Breakdown</h3>
                  <div className="subscription-breakdown">
                    {(() => {
                      const total = adminData.overview.totalUsers || 1;
                      const free = adminData.revenue.subscriptions?.free || 0;
                      const pro = adminData.revenue.subscriptions?.professional || 0;
                      const enterprise = adminData.revenue.subscriptions?.enterprise || 0;
                      return (
                        <>
                          <div className="sub-item free">
                            <div className="sub-info">
                              <span className="sub-plan">Free</span>
                              <span className="sub-count">{free.toLocaleString()} users</span>
                            </div>
                            <div className="sub-bar">
                              <div className="sub-bar-fill" style={{width: `${(free / total) * 100}%`}}></div>
                            </div>
                            <span className="sub-pct">{Math.round((free / total) * 100)}%</span>
                          </div>
                          <div className="sub-item professional">
                            <div className="sub-info">
                              <span className="sub-plan">Professional</span>
                              <span className="sub-count">{pro.toLocaleString()} users</span>
                            </div>
                            <div className="sub-bar">
                              <div className="sub-bar-fill" style={{width: `${(pro / total) * 100}%`}}></div>
                            </div>
                            <span className="sub-pct">{Math.round((pro / total) * 100)}%</span>
                          </div>
                          <div className="sub-item enterprise">
                            <div className="sub-info">
                              <span className="sub-plan">Enterprise</span>
                              <span className="sub-count">{enterprise.toLocaleString()} users</span>
                            </div>
                            <div className="sub-bar">
                              <div className="sub-bar-fill" style={{width: `${(enterprise / total) * 100}%`}}></div>
                            </div>
                            <span className="sub-pct">{Math.round((enterprise / total) * 100)}%</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="admin-section">
                  <h3>Recent Transactions</h3>
                  {adminData.revenue.recentTransactions?.length > 0 ? (
                    <div className="transactions-list">
                      {adminData.revenue.recentTransactions.map(txn => (
                        <div key={txn.id} className={`transaction-item ${txn.status}`}>
                          <div className="txn-info">
                            <strong>{txn.user}</strong>
                            <span>{txn.plan} Plan</span>
                          </div>
                          <div className="txn-amount">${txn.amount}</div>
                          <div className="txn-date">{txn.date}</div>
                          <span className={`txn-status ${txn.status}`}>{txn.status}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">💳</div>
                      <p>No transactions yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Content Tab */}
            {adminTab === 'content' && (
              <div className="admin-content">
                <div className="admin-header">
                  <h1>Content Management</h1>
                  <p>Manage simulations, scenarios, and learning content</p>
                </div>

                <div className="admin-toolbar">
                  <div className="search-box">
                    <span>🔍</span>
                    <input type="text" placeholder="Search content..." />
                  </div>
                  <div className="toolbar-actions">
                    <button className="admin-btn primary">+ New Simulation</button>
                  </div>
                </div>

                <div className="content-grid">
                  {adminData.content.simulations.map(sim => (
                    <div key={sim.id} className="content-card">
                      <div className="content-header">
                        <h4>{sim.name}</h4>
                        <span className={`content-status ${sim.status}`}>{sim.status}</span>
                      </div>
                      <div className="content-stats">
                        <span>🎮 {sim.plays.toLocaleString()} plays</span>
                        {sim.rating && <span>⭐ {sim.rating}</span>}
                      </div>
                      <div className="content-meta">
                        Last updated: {sim.lastUpdated}
                      </div>
                      <div className="content-actions">
                        <button className="admin-btn small">Edit</button>
                        <button className="admin-btn small">Preview</button>
                        {sim.status === 'draft' && <button className="admin-btn small primary">Publish</button>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Tab */}
            {adminTab === 'system' && (
              <div className="admin-content">
                <div className="admin-header">
                  <h1>System Health</h1>
                  <p>Monitor platform performance and system status</p>
                </div>

                {/* System Metrics */}
                <div className="admin-metrics-grid">
                  <div className="admin-metric-card">
                    <div className="metric-icon green">✅</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.system.uptime}%</span>
                      <span className="metric-label">Uptime</span>
                    </div>
                    <span className="metric-badge green">Healthy</span>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon blue">⚡</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.system.avgResponseTime}ms</span>
                      <span className="metric-label">Avg Response Time</span>
                    </div>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon orange">⚠️</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.system.errorRate}%</span>
                      <span className="metric-label">Error Rate</span>
                    </div>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon purple">🔌</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.system.activeConnections}</span>
                      <span className="metric-label">Active Connections</span>
                    </div>
                  </div>
                </div>

                {/* Resource Usage */}
                <div className="admin-section">
                  <h3>Resource Usage</h3>
                  <div className="resource-grid">
                    <div className="resource-item">
                      <div className="resource-header">
                        <span>CPU Usage</span>
                        <span>{adminData.system.cpuUsage}%</span>
                      </div>
                      <div className="resource-bar">
                        <div className="resource-fill cpu" style={{width: `${adminData.system.cpuUsage}%`}}></div>
                      </div>
                    </div>
                    <div className="resource-item">
                      <div className="resource-header">
                        <span>Memory Usage</span>
                        <span>{adminData.system.memoryUsage}%</span>
                      </div>
                      <div className="resource-bar">
                        <div className="resource-fill memory" style={{width: `${adminData.system.memoryUsage}%`}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Errors */}
                <div className="admin-section">
                  <h3>Recent Errors</h3>
                  <div className="errors-list">
                    {adminData.system.recentErrors.map((err, i) => (
                      <div key={i} className="error-item">
                        <span className="error-time">{err.time}</span>
                        <span className="error-type">{err.type}</span>
                        <span className="error-msg">{err.message}</span>
                        <span className="error-count">×{err.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="admin-section">
                  <h3>Quick Actions</h3>
                  <div className="system-actions">
                    <button className="admin-btn">🔄 Clear Cache</button>
                    <button className="admin-btn">📊 Export Logs</button>
                    <button className="admin-btn">🔧 Run Diagnostics</button>
                    <button className="admin-btn danger">🚨 Maintenance Mode</button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="dashboard-page">
      {renderNavbar()}
      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>{t('dashboard.quickActions', lang)}</h3>
            <button className="sidebar-btn" onClick={() => startSimulation('project-apex')}>▶️ {t('dashboard.playProjectApex', lang)}</button>
            <button className="sidebar-btn" onClick={() => setCurrentPage('catalog')}>📚 {t('dashboard.browseSimulations', lang)}</button>
          </div>
          <div className="sidebar-section">
            <h3>{t('dashboard.yourStats', lang)}</h3>
            <div className="stat-item"><span>{t('dashboard.simulationsPlayed', lang)}</span><strong>{userScores.scores?.length || 0}</strong></div>
            <div className="stat-item"><span>{t('dashboard.bestGrade', lang)}</span><strong>{userScores.bestScores?.[0]?.grade || '-'}</strong></div>
            <div className="stat-item"><span>{t('dashboard.highScore', lang)}</span><strong>{userScores.bestScores?.[0]?.score || 0}</strong></div>
          </div>
        </aside>
        <main className="dashboard-main">
          <div className="welcome-card">
            <h1>{t('dashboard.welcome', lang)}, {currentUser?.name?.split(' ')[0]}!</h1>
            <p>{t('dashboard.readyToContinue', lang)}</p>
          </div>
          
          <div className="dashboard-section">
            <h2>{t('dashboard.recentScores', lang)}</h2>
            {userScores.scores?.length > 0 ? (
              <div className="scores-list">
                {userScores.scores.slice(0, 5).map((score, idx) => {
                  const dateStr = score.created_at ? new Date(score.created_at).toLocaleDateString() : '';
                  const isValidDate = dateStr && dateStr !== 'Invalid Date';
                  return (
                    <div key={idx} className="score-item">
                      <div className="score-info">
                        <span className="score-scenario">{score.scenario_id?.replace('_', ' ') || t('dashboard.unknown', lang)}</span>
                        <span className="score-date">{isValidDate ? dateStr : t('dashboard.recent', lang)}</span>
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
              <p className="no-scores">{t('dashboard.noScoresYet', lang)}</p>
            )}
          </div>
          
          <div className="dashboard-section">
            <h2>{t('dashboard.featuredSimulation', lang)}</h2>
            <div className="featured-sim-card" onClick={() => startSimulation('project-apex')}>
              <div className="featured-sim-icon">🎯</div>
              <div className="featured-sim-content">
                <h3>{t('dashboard.projectApexTitle', lang)}</h3>
                <p>{t('dashboard.projectApexDesc', lang)}</p>
                <span className="featured-sim-cta">{t('dashboard.playNow', lang)}</span>
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
          <h1>{lang === 'en' ? 'Simulation Library' : 'Bibliothèque de simulations'}</h1>
          <p>{lang === 'en' ? 'Choose your learning adventure' : 'Choisissez votre aventure d\'apprentissage'}</p>
        </div>
        
        {/* Pricing Cards Section */}
        <div className="pricing-section-inline" style={{ marginBottom: '3rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
            {lang === 'en' ? 'Choose Your Plan' : 'Choisissez votre plan'}
          </h2>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Free Plan */}
            <div style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border)', 
              borderRadius: '16px', 
              padding: '2rem', 
              width: '280px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{lang === 'en' ? 'Free' : 'Gratuit'}</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {lang === 'en' ? 'Perfect for trying out' : 'Parfait pour essayer'}
              </p>
              <div style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>
                $0 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/{lang === 'en' ? 'forever' : 'toujours'}</span>
              </div>
              <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>✓ 1 simulation (Project Apex)</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>{lang === 'en' ? '✓ Basic scenarios' : '✓ Scénarios de base'}</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>{lang === 'en' ? '✓ Score tracking' : '✓ Suivi des scores'}</li>
                <li style={{ padding: '0.5rem 0' }}>{lang === 'en' ? '✓ Community support' : '✓ Support communautaire'}</li>
              </ul>
              <button 
                className="btn-secondary btn-full"
                onClick={() => { setCurrentPage('auth'); setAuthMode('signup'); }}
              >
                {lang === 'en' ? 'Get Started Free' : 'Commencer gratuitement'}
              </button>
            </div>
            
            {/* Pro Plan */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
              border: '2px solid var(--accent-primary)', 
              borderRadius: '16px', 
              padding: '2rem', 
              width: '280px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{ 
                position: 'absolute', 
                top: '-12px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                background: 'var(--accent-primary)',
                color: 'white',
                padding: '4px 16px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                {lang === 'en' ? 'Most Popular' : 'Plus populaire'}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{lang === 'en' ? 'Professional' : 'Professionnel'}</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {lang === 'en' ? 'For serious learners' : 'Pour les apprenants sérieux'}
              </p>
              <div style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>
                $19 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/{lang === 'en' ? 'month' : 'mois'}</span>
              </div>
              <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>{lang === 'en' ? '✓ All simulations' : '✓ Toutes les simulations'}</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>{lang === 'en' ? '✓ All scenarios' : '✓ Tous les scénarios'}</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>{lang === 'en' ? '✓ Detailed analytics' : '✓ Analyses détaillées'}</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>{lang === 'en' ? '✓ Certificates' : '✓ Certificats'}</li>
                <li style={{ padding: '0.5rem 0' }}>{lang === 'en' ? '✓ Priority support' : '✓ Support prioritaire'}</li>
              </ul>
              <button 
                className="btn-primary btn-full"
                onClick={() => currentUser ? handleCheckout('pro') : setCurrentPage('auth')}
              >
                {lang === 'en' ? 'Upgrade Now' : 'Passer au supérieur'}
              </button>
            </div>
          </div>
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
          <h1>{lang === 'en' ? 'Simple, Transparent Pricing' : 'Tarification simple et transparente'}</h1>
          <p>{lang === 'en' ? 'Choose the plan that fits your learning goals' : 'Choisissez le plan qui correspond à vos objectifs'}</p>
        </div>
        <div className="pricing-grid">
          {PRICING_PLANS.filter(plan => !plan.hidden).map(plan => (
            <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">{lang === 'en' ? 'Best Value' : 'Meilleur rapport'}</div>}
              <h3>{plan.name}</h3>
              <p className="plan-desc">{plan.description}</p>
              <div className="plan-price">
                <span className="price">${plan.price}</span>
                <span className="period">
                  {plan.period === 'forever' ? (lang === 'en' ? '/forever' : '/pour toujours') : 
                   plan.period === 'one-time' ? (lang === 'en' ? ' one-time' : ' unique') : 
                   (lang === 'en' ? '/month' : '/mois')}
                </span>
              </div>
              {plan.isOneTime && (
                <div className="savings-badge">
                  {lang === 'en' ? '💰 Save $79+ vs 8 months subscription' : '💰 Économisez 79$+ vs 8 mois d\'abonnement'}
                </div>
              )}
              <ul className="plan-features">
                {plan.features.map(f => <li key={f}>✓ {f}</li>)}
              </ul>
              <button 
                className={`btn-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => plan.id !== 'free' && handleCheckout(plan.id)}
                disabled={checkoutLoading === plan.id || plan.id === 'free'}
              >
                {checkoutLoading === plan.id ? (lang === 'en' ? 'Loading...' : 'Chargement...') : 
                 (lang === 'en' ? plan.cta : 
                   plan.id === 'free' ? 'Plan actuel' :
                   plan.id === 'pro' ? 'S\'abonner' :
                   plan.id === 'pro_lifetime' ? 'Obtenir l\'accès à vie' : plan.cta)}
              </button>
            </div>
          ))}
        </div>
        <div className="pricing-footer">
          <p>{lang === 'en' ? '🔒 Secure payment powered by Stripe' : '🔒 Paiement sécurisé par Stripe'}</p>
          <p>{lang === 'en' ? '✉️ Questions? Contact us at support@bizsimhub.com' : '✉️ Questions? Contactez-nous à support@bizsimhub.com'}</p>
        </div>
      </div>
    </div>
  );

  // ENHANCED SIMULATION RENDERING
  const renderSimulation = () => {
    if (simPhase === 'select') {
      return (
        <div className="sim-select-page">
          {renderNavbar()}
          
          {/* Background shapes */}
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
          
          <div className="sim-select-container">
            <button className="back-link" onClick={() => setCurrentPage('catalog')}>← {lang === 'en' ? 'Back to Library' : 'Retour à la bibliothèque'}</button>
            
            {/* Main Title */}
            <div className="sim-select-header">
              <h1>{lang === 'en' ? 'Choose Your Industry' : 'Choisissez votre industrie'}</h1>
              <p>{lang === 'en' ? 'Each scenario offers unique PM challenges and learning opportunities' : 'Chaque scénario offre des défis uniques et des opportunités d\'apprentissage'}</p>
            </div>
            
            {/* Industry Cards Grid */}
            <div className="industry-cards-grid">
              {Object.values(APEX_SCENARIOS).map(scenario => {
                const gradientColors = {
                  tech_startup: { from: '#3b82f6', to: '#60a5fa' },
                  live_show: { from: '#ec4899', to: '#f472b6' },
                  construction: { from: '#f59e0b', to: '#fbbf24' },
                  rd_innovation: { from: '#10b981', to: '#34d399' }
                };
                const colors = gradientColors[scenario.id] || gradientColors.tech_startup;
                
                // French translations for scenarios
                const scenarioTranslations = {
                  tech_startup: {
                    title: 'Startup Tech',
                    subtitle: 'Lancement de produit logiciel',
                    description: 'Vous êtes gestionnaire de projet chez Nexus Technologies. Livrez une nouvelle plateforme SaaS tout en gérant la dynamique d\'équipe et les défis techniques.'
                  },
                  live_show: {
                    title: 'Spectacle vivant',
                    subtitle: 'Production de spectacle en tournée',
                    description: 'Producteur exécutif chez Stellar Productions. Lancez un spectacle de tournée ambitieux tout en gérant les talents créatifs et les exigences de sécurité.'
                  },
                  construction: {
                    title: 'Construction',
                    subtitle: 'Projet de bâtiment commercial',
                    description: 'Gestionnaire de projet chez UrbanCore Construction. Construisez un immeuble de 12 étages à usage mixte tout en gérant les permis, les inspections et les sous-traitants.'
                  },
                  rd_innovation: {
                    title: 'Innovation R&D',
                    subtitle: 'Développement de nouvelle technologie',
                    description: 'Dirigez un projet R&D de pointe avec une grande incertitude. Le prototypage est essentiel pour révéler les problèmes tôt.'
                  }
                };
                
                const tr = scenarioTranslations[scenario.id];
                const title = lang === 'fr' && tr ? tr.title : scenario.title;
                const subtitle = lang === 'fr' && tr ? tr.subtitle : scenario.subtitle;
                const description = lang === 'fr' && tr ? tr.description : scenario.description;
                const difficulty = lang === 'fr' ? 
                  (scenario.difficulty === 'Standard' ? 'Standard' : 
                   scenario.difficulty === 'Advanced' ? 'Avancé' : 
                   scenario.difficulty === 'Expert' ? 'Expert' : scenario.difficulty) 
                  : scenario.difficulty;
                
                return (
                  <div key={scenario.id} className="industry-card">
                    {/* Gradient Header */}
                    <div className="industry-card-header" style={{ background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)` }}>
                      <span className="industry-icon">{scenario.icon}</span>
                    </div>
                    
                    {/* Card Body */}
                    <div className="industry-card-body">
                      <h3>{title}</h3>
                      <p className="industry-subtitle" style={{ color: colors.from }}>{subtitle}</p>
                      
                      <div className="industry-challenge">
                        <span className="challenge-label">{lang === 'en' ? 'Challenge:' : 'Défi:'}</span>
                        <p>{description}</p>
                      </div>
                      
                      {/* Meta Info */}
                      <div className="industry-meta">
                        <span>📅 {scenario.initial.weeks} {lang === 'en' ? 'weeks' : 'semaines'}</span>
                        <span>💰 ${(scenario.initial.budget / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="industry-meta">
                        <span>👥 {scenario.initial.teamSize} {lang === 'en' ? 'team members' : 'membres'}</span>
                      </div>
                      
                      {/* Difficulty Badge */}
                      <div className="industry-badge" style={{ backgroundColor: `${colors.from}20`, color: colors.from }}>
                        {difficulty}
                      </div>
                    </div>
                    
                    {/* Card Footer */}
                    <div className="industry-card-footer">
                      <button 
                        className="industry-start-btn" 
                        style={{ background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)` }}
                        onClick={() => selectScenario(scenario)}
                      >
                        {lang === 'en' ? 'Start Simulation →' : 'Démarrer →'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Bottom Info */}
            <div className="sim-select-footer">
              <p>🎓 {lang === 'en' ? 'All scenarios are PMP/PMBOK aligned for certification preparation' : 'Tous les scénarios sont alignés PMP/PMBOK pour la préparation à la certification'}</p>
              
              <div className="sim-stats-bar">
                <div className="sim-stat">
                  <span className="sim-stat-num">4</span>
                  <span className="sim-stat-label">{lang === 'en' ? 'Industries' : 'Industries'}</span>
                </div>
                <div className="sim-stat">
                  <span className="sim-stat-num">1000+</span>
                  <span className="sim-stat-label">{lang === 'en' ? 'PMs Trained' : 'PMs formés'}</span>
                </div>
                <div className="sim-stat">
                  <span className="sim-stat-num purple">PMP</span>
                  <span className="sim-stat-label">{lang === 'en' ? 'Aligned' : 'Aligné'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (simPhase === 'brief') {
      // Generate scenario-specific brief content
      const getProjectBrief = () => {
        const briefs = {
          tech_startup: {
            context: `You are a senior project manager at ${selectedScenario.company}, a fast-growing technology company specializing in cloud-based business solutions. The company has identified a significant market opportunity for a new SaaS platform that will compete with established players.`,
            challenge: `Your CEO has tasked you with assembling and leading a product development team to deliver this platform. Market analysis suggests that competitors are working on similar solutions, putting pressure on you and your team to deliver a high-quality product that can capture market share.`,
            deliverables: [
              { level: 1, name: 'Core Platform', desc: 'Basic user management, authentication, and data storage', tasks: 3 },
              { level: 2, name: 'Standard Features', desc: 'Dashboard, reporting, and API integrations', tasks: 4 },
              { level: 3, name: 'Advanced Features', desc: 'Analytics, automation, and multi-tenant support', tasks: 3 },
              { level: 4, name: 'Premium Features', desc: 'AI-powered insights and enterprise security', tasks: 2 }
            ]
          },
          live_show: {
            context: `You are the Executive Producer at ${selectedScenario.company}, a world-renowned live entertainment company. The company has greenlit an ambitious new touring show that combines acrobatics, music, and cutting-edge technology.`,
            challenge: `Your artistic director has a bold vision for "${selectedScenario.projectName}" but the technical and creative demands are significant. You must manage a diverse team of performers, technicians, and designers while ensuring safety standards are met and the show is ready for its premiere.`,
            deliverables: [
              { level: 1, name: 'Foundation Acts', desc: 'Opening sequence and core ensemble performances', tasks: 2 },
              { level: 2, name: 'Feature Acts', desc: 'Aerial sequences and specialty performances', tasks: 2 },
              { level: 3, name: 'Technical Integration', desc: 'Lighting, sound, and projection mapping', tasks: 2 },
              { level: 4, name: 'Grand Finale', desc: 'Climactic sequence with full cast integration', tasks: 2 }
            ]
          },
          construction: {
            context: `You are the Project Manager at ${selectedScenario.company}, a commercial construction company with a strong reputation for quality. The company has won the contract to build a new mixed-use development in a prime urban location.`,
            challenge: `The "${selectedScenario.projectName}" project involves a 12-story building with retail, office, and residential spaces. You must navigate permitting, weather challenges, subcontractor coordination, and safety requirements while meeting stakeholder expectations.`,
            deliverables: [
              { level: 1, name: 'Foundation & Parking', desc: 'Underground parking and structural foundation', tasks: 3 },
              { level: 2, name: 'Core Structure', desc: 'Floors 1-6 with retail and office space', tasks: 4 },
              { level: 3, name: 'Upper Floors', desc: 'Floors 7-10 residential units', tasks: 3 },
              { level: 4, name: 'Penthouse & Systems', desc: 'Floors 11-12 and building systems integration', tasks: 2 }
            ]
          },
          rd_innovation: {
            context: `You are the Lead Project Manager at ${selectedScenario.company}, a cutting-edge research and development laboratory. The company has secured funding to develop a breakthrough quantum sensing technology with applications in medical imaging and security.`,
            challenge: `The "${selectedScenario.projectName}" project is highly innovative with significant technical uncertainty. Your team of scientists and engineers must push the boundaries of current technology while managing the risks inherent in R&D work. Prototyping will be essential to surface problems early.`,
            deliverables: [
              { level: 1, name: 'Proof of Concept', desc: 'Demonstrate basic quantum sensing capability', tasks: 2 },
              { level: 2, name: 'Prototype Alpha', desc: 'Functional prototype with core features', tasks: 3 },
              { level: 3, name: 'Prototype Beta', desc: 'Refined prototype with improved accuracy', tasks: 3 },
              { level: 4, name: 'Production Ready', desc: 'Manufacturable design with documentation', tasks: 2 }
            ]
          }
        };
        return briefs[selectedScenario.id] || briefs.tech_startup;
      };

      const brief = getProjectBrief();
      const totalTasks = brief.deliverables.reduce((sum, d) => sum + d.tasks, 0);

      return (
        <div className="sim-page">
          {renderNavbar()}
          <div className="brief-container hbp-style">
            <button className="back-link" onClick={() => { setSimPhase('select'); setBriefTab('brief'); }}>← {lang === 'en' ? 'Back to Scenarios' : 'Retour aux scénarios'}</button>
            
            <div className="brief-header">
              <div className="brief-icon">{selectedScenario.icon}</div>
              <div>
                <h1>{selectedScenario.projectName}</h1>
                <p className="brief-company">{selectedScenario.company}</p>
              </div>
            </div>

            {/* HBP-Style Tabs */}
            <div className="brief-tabs">
              <button 
                className={`brief-tab ${briefTab === 'brief' ? 'active' : ''}`}
                onClick={() => setBriefTab('brief')}
              >
                {lang === 'en' ? 'Project Brief' : 'Dossier du projet'}
              </button>
              <button 
                className={`brief-tab ${briefTab === 'objectives' ? 'active' : ''}`}
                onClick={() => setBriefTab('objectives')}
              >
                {lang === 'en' ? 'Scenario Objectives' : 'Objectifs du scénario'}
              </button>
              <button 
                className={`brief-tab ${briefTab === 'managing' ? 'active' : ''}`}
                onClick={() => setBriefTab('managing')}
              >
                {lang === 'en' ? 'Managing Your Project' : 'Gérer votre projet'}
              </button>
            </div>

            <div className="brief-tab-content">
              {/* Project Brief Tab */}
              {briefTab === 'brief' && (
                <div className="tab-panel">
                  <h2>{lang === 'en' ? 'Project Brief' : 'Dossier du projet'}: <span className="highlight">{selectedScenario.title}</span></h2>
                  
                  <p className="brief-paragraph">{brief.context}</p>
                  <p className="brief-paragraph">{brief.challenge}</p>

                  <h3>{lang === 'en' ? 'Project Deliverables' : 'Livrables du projet'}</h3>
                  <p>{lang === 'en' 
                    ? `Your project consists of ${selectedScenario.initial.scope} ${selectedScenario.deliverable} organized into progressive levels. Each level builds on the previous, allowing you to adjust scope mid-course if desired.`
                    : `Votre projet consiste en ${selectedScenario.initial.scope} ${selectedScenario.deliverable} organisés en niveaux progressifs. Chaque niveau s'appuie sur le précédent, vous permettant d'ajuster le périmètre en cours de route si désiré.`
                  }</p>
                  
                  <div className="deliverables-list">
                    {brief.deliverables.map((d, i) => (
                      <div key={i} className="deliverable-item">
                        <div className="deliverable-icon">📋</div>
                        <div className="deliverable-content">
                          <strong>LEVEL {d.level}: {d.name.toUpperCase()}</strong>
                          <p>{d.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Scenario Objectives Tab */}
              {briefTab === 'objectives' && (
                <div className="tab-panel">
                  <h2>{lang === 'en' ? 'Scenario Objectives' : 'Objectifs du scénario'}: <span className="highlight">{selectedScenario.title}</span></h2>
                  
                  <p className="brief-paragraph">
                    {lang === 'en' 
                      ? 'Management expects you to deliver this project meeting the targets below. You will be evaluated on your ability to balance scope, schedule, budget, quality, and team wellbeing. Meeting all targets demonstrates strong project management capability.'
                      : 'La direction s\'attend à ce que vous livriez ce projet en atteignant les objectifs ci-dessous. Vous serez évalué sur votre capacité à équilibrer le périmètre, le calendrier, le budget, la qualité et le bien-être de l\'équipe. Atteindre tous les objectifs démontre une forte capacité de gestion de projet.'
                    }
                  </p>

                  <div className="objectives-section">
                    <h3>{lang === 'en' ? 'Specific Objectives' : 'Objectifs spécifiques'}</h3>

                    <div className="objective-block">
                      <h4>{lang === 'en' ? 'Target Scope' : 'Périmètre cible'}: <span className="highlight">{selectedScenario.initial.scope} {selectedScenario.deliverable}</span></h4>
                      <p>
                        {lang === 'en'
                          ? 'You will receive up to 200 points for delivering the full scope. Partial completion will result in proportionally fewer points. Exceeding scope expectations may earn bonus points but watch the budget.'
                          : 'Vous recevrez jusqu\'à 200 points pour livrer le périmètre complet. Une complétion partielle donnera proportionnellement moins de points. Dépasser les attentes de périmètre peut donner des points bonus mais surveillez le budget.'
                        }
                      </p>
                    </div>

                    <div className="objective-block">
                      <h4>{lang === 'en' ? 'Target Schedule' : 'Calendrier cible'}: <span className="highlight">{lang === 'en' ? 'Week' : 'Semaine'} {selectedScenario.initial.weeks}</span></h4>
                      <p>
                        {lang === 'en'
                          ? 'This schedule allows you to meet stakeholder expectations and market timing. You will receive 200 points for meeting your schedule goal and lose 40 points for each week you exceed the deadline.'
                          : 'Ce calendrier vous permet de répondre aux attentes des parties prenantes et au timing du marché. Vous recevrez 200 points si vous respectez votre objectif de calendrier et perdrez 40 points pour chaque semaine de dépassement.'
                        }
                      </p>
                    </div>

                    <div className="objective-block">
                      <h4>{lang === 'en' ? 'Target Budget' : 'Budget cible'}: <span className="highlight">${(selectedScenario.initial.budget / 1000).toFixed(0)}K</span></h4>
                      <p>
                        {lang === 'en'
                          ? 'This budget supports the project at planned staffing levels. You will receive up to 200 points for staying within budget. Coming in under budget will maximize your score.'
                          : 'Ce budget supporte le projet aux niveaux de dotation prévus. Vous recevrez jusqu\'à 200 points si vous restez dans le budget. Terminer sous le budget maximisera votre score.'
                        }
                      </p>
                    </div>

                    <div className="objective-block">
                      <h4>{lang === 'en' ? 'Target Quality' : 'Qualité cible'}: <span className="highlight">{selectedScenario.initial.quality}%+</span></h4>
                      <p>
                        {lang === 'en'
                          ? 'Deliver a high-quality product that meets stakeholder standards. Quality is worth 200 points and can be improved through quality reviews and avoiding shortcuts.'
                          : 'Livrez un produit de haute qualité qui répond aux standards des parties prenantes. La qualité vaut 200 points et peut être améliorée par des revues de qualité et en évitant les raccourcis.'
                        }
                      </p>
                    </div>

                    <div className="objective-block">
                      <h4>{lang === 'en' ? 'Team Process' : 'Processus d\'équipe'}: <span className="highlight">100 points</span></h4>
                      <p>
                        {lang === 'en'
                          ? 'Maintain healthy team dynamics throughout the project. This score reflects average morale, with bonuses for schedule consistency and prototype usage.'
                          : 'Maintenez une dynamique d\'équipe saine tout au long du projet. Ce score reflète le moral moyen, avec des bonus pour la cohérence du calendrier et l\'utilisation de prototypes.'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="scoring-summary">
                    <h4>📊 {lang === 'en' ? 'Total Possible Score: 1000 points' : 'Score total possible: 1000 points'}</h4>
                    <div className="score-breakdown">
                      <span>{lang === 'en' ? 'Scope' : 'Périmètre'}: 200</span>
                      <span>{lang === 'en' ? 'Schedule' : 'Calendrier'}: 200</span>
                      <span>{lang === 'en' ? 'Budget' : 'Budget'}: 200</span>
                      <span>{lang === 'en' ? 'Quality' : 'Qualité'}: 200</span>
                      <span>{lang === 'en' ? 'Team Process' : 'Processus d\'équipe'}: 100</span>
                      <span>{lang === 'en' ? 'Bonuses: up to 100' : 'Bonus: jusqu\'à 100'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Managing Your Project Tab */}
              {briefTab === 'managing' && (
                <div className="tab-panel">
                  <h2>{lang === 'en' ? 'Managing Your Project' : 'Gérer votre projet'}: <span className="highlight">{selectedScenario.title}</span></h2>
                  
                  <p className="brief-paragraph">
                    {lang === 'en'
                      ? 'Each week you will have opportunities to adjust project parameters and make decisions. Understanding the causal relationships in your project will help you make better choices.'
                      : 'Chaque semaine, vous aurez l\'opportunité d\'ajuster les paramètres du projet et de prendre des décisions. Comprendre les relations causales dans votre projet vous aidera à faire de meilleurs choix.'
                    }
                  </p>

                  <div className="managing-section">
                    <h3>{lang === 'en' ? '1. The Causal Model' : '1. Le modèle causal'}</h3>
                    <p>{lang === 'en' 
                      ? 'This simulation uses interconnected systems where your decisions have cascading effects:'
                      : 'Cette simulation utilise des systèmes interconnectés où vos décisions ont des effets en cascade:'
                    }</p>
                    
                    <div className="causal-relationships">
                      <div className="causal-item">
                        <span className="causal-icon">😰</span>
                        <div>
                          <strong>{lang === 'en' ? 'Stress → Morale → Productivity' : 'Stress → Moral → Productivité'}</strong>
                          <p>{lang === 'en' 
                            ? 'Unrealistic deadlines, overtime, and team changes increase stress. High stress lowers morale, which directly reduces your team\'s output.'
                            : 'Les échéances irréalistes, les heures supplémentaires et les changements d\'équipe augmentent le stress. Un stress élevé diminue le moral, ce qui réduit directement la production de votre équipe.'
                          }</p>
                        </div>
                      </div>
                      <div className="causal-item">
                        <span className="causal-icon">🧠</span>
                        <div>
                          <strong>{lang === 'en' ? 'Knowledge Building' : 'Développement des connaissances'}</strong>
                          <p>{lang === 'en'
                            ? 'Your team starts with limited project knowledge. Coaching meetings and experience reduce mistake rates over time. Losing team members causes knowledge loss.'
                            : 'Votre équipe commence avec des connaissances limitées du projet. Les réunions de coaching et l\'expérience réduisent le taux d\'erreurs avec le temps. Perdre des membres de l\'équipe cause une perte de connaissances.'
                          }</p>
                        </div>
                      </div>
                      <div className="causal-item">
                        <span className="causal-icon">📅</span>
                        <div>
                          <strong>{lang === 'en' ? 'Schedule Consistency' : 'Cohérence du calendrier'}</strong>
                          <p>{lang === 'en'
                            ? 'Frequent deadline changes erode team trust. Each change after week 2 incurs morale and stress penalties. Consistency is rewarded with bonus points.'
                            : 'Les changements fréquents d\'échéance érodent la confiance de l\'équipe. Chaque changement après la semaine 2 entraîne des pénalités de moral et de stress. La cohérence est récompensée par des points bonus.'
                          }</p>
                        </div>
                      </div>
                      {selectedScenario.hasPrototyping && (
                        <div className="causal-item">
                          <span className="causal-icon">🔬</span>
                          <div>
                            <strong>{lang === 'en' ? 'Prototyping Value' : 'Valeur du prototypage'}</strong>
                            <p>{lang === 'en'
                              ? 'Building prototypes early surfaces problems before they become expensive. Events that would cause major issues are mitigated by prior prototype work.'
                              : 'Construire des prototypes tôt révèle les problèmes avant qu\'ils ne deviennent coûteux. Les événements qui causeraient des problèmes majeurs sont atténués par le travail de prototypage antérieur.'
                            }</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="managing-section">
                    <h3>{lang === 'en' ? '2. Weekly Actions' : '2. Actions hebdomadaires'}</h3>
                    <p>{lang === 'en' 
                      ? 'Each week you can take several actions to manage your project:'
                      : 'Chaque semaine, vous pouvez prendre plusieurs actions pour gérer votre projet:'
                    }</p>
                    
                    <div className="actions-grid">
                      <div className="action-item">
                        <strong>👥 {lang === 'en' ? 'Team Management' : 'Gestion de l\'équipe'}</strong>
                        <p>{lang === 'en'
                          ? 'Hire or release team members. New hires increase capacity but cause temporary stress and knowledge dilution.'
                          : 'Embauchez ou libérez des membres de l\'équipe. Les nouvelles embauches augmentent la capacité mais causent du stress temporaire et une dilution des connaissances.'
                        }</p>
                      </div>
                      <div className="action-item">
                        <strong>📅 {lang === 'en' ? 'Schedule Adjustment' : 'Ajustement du calendrier'}</strong>
                        <p>{lang === 'en'
                          ? 'Extend your deadline if needed. Early adjustments are less costly than late ones.'
                          : 'Prolongez votre échéance si nécessaire. Les ajustements précoces coûtent moins cher que les tardifs.'
                        }</p>
                      </div>
                      <div className="action-item">
                        <strong>🎯 {lang === 'en' ? 'Meetings' : 'Réunions'}</strong>
                        <p>{lang === 'en'
                          ? 'Choose from coaching (builds knowledge), standups (reduces mistakes), or status reviews (stakeholder alignment).'
                          : 'Choisissez parmi le coaching (développe les connaissances), les standups (réduit les erreurs) ou les revues de statut (alignement des parties prenantes).'
                        }</p>
                      </div>
                      <div className="action-item">
                        <strong>⭐ {lang === 'en' ? 'Quality Review' : 'Revue de qualité'}</strong>
                        <p>{lang === 'en'
                          ? 'Invest time in improving deliverable quality. Costs budget but ensures better outcomes.'
                          : 'Investissez du temps pour améliorer la qualité des livrables. Coûte du budget mais assure de meilleurs résultats.'
                        }</p>
                      </div>
                      <div className="action-item">
                        <strong>⚡ {lang === 'en' ? 'Crunch Mode' : 'Mode intensif'}</strong>
                        <p>{lang === 'en'
                          ? 'Push the team to work overtime. Increases short-term output at the cost of stress and morale.'
                          : 'Poussez l\'équipe à faire des heures supplémentaires. Augmente la production à court terme au prix du stress et du moral.'
                        }</p>
                      </div>
                      {selectedScenario.hasPrototyping && (
                        <div className="action-item">
                          <strong>🔬 {lang === 'en' ? 'Build Prototype' : 'Construire un prototype'}</strong>
                          <p>{lang === 'en'
                            ? 'Invest in early testing to reduce future risks. Costs time and budget but provides significant protection.'
                            : 'Investissez dans des tests précoces pour réduire les risques futurs. Coûte du temps et du budget mais offre une protection significative.'
                          }</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="managing-section">
                    <h3>{lang === 'en' ? '3. Events & Decisions' : '3. Événements et décisions'}</h3>
                    <p>
                      {lang === 'en'
                        ? 'Throughout the project, you\'ll encounter events triggered by project conditions—not random chance. For example, high stress may cause team members to leave. Low quality triggers technical debt crises. Your choices in these moments significantly impact project outcomes.'
                        : 'Tout au long du projet, vous rencontrerez des événements déclenchés par les conditions du projet — pas par le hasard. Par exemple, un stress élevé peut causer le départ de membres de l\'équipe. Une qualité faible déclenche des crises de dette technique. Vos choix dans ces moments impactent significativement les résultats du projet.'
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="brief-actions">
              <button className="btn-primary btn-lg" onClick={beginSimulation}>{lang === 'en' ? 'Begin Simulation →' : 'Commencer la simulation →'}</button>
            </div>
          </div>
        </div>
      );
    }

    if (simPhase === 'playing' && gameState) {
      const scenario = selectedScenario;
      const budgetRemaining = gameState.budget.total - gameState.budget.spent;
      const budgetPercent = (budgetRemaining / gameState.budget.total) * 100;
      const budgetSpentPercent = 100 - budgetPercent;
      const scopePercent = (gameState.scope.completed / gameState.scope.totalFeatures) * 100;
      const weeksRemaining = gameState.schedule.deadline - gameState.week + 1;
      const schedulePercent = ((gameState.week - 1) / gameState.totalWeeks) * 100;
      
      // Calculate effective productivity for display
      const effectiveProductivity = calculateProductivityFromMorale(gameState.team.productivity, gameState.team.morale);
      
      // Determine if there's a critical situation
      const hasCriticalEvent = gameState.gamePhase === 'event' && gameState.currentEvent;
      const isScheduleBehind = weeksRemaining <= 2;
      const isBudgetLow = budgetPercent < 25;
      
      return (
        <div className="sim-playing">
          {renderNavbar()}
          
          {/* Floating background shapes */}
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
          
          <div className="game-container">
            {/* Header */}
            <div className="game-header">
              <div className="game-title">
                <div className="game-icon">{scenario.icon}</div>
                <div>
                  <h2>{scenario.projectName}</h2>
                  <span>{scenario.company}</span>
                </div>
              </div>
              <div className="week-badge">Week {gameState.week} of {gameState.totalWeeks}</div>
            </div>
            
            {/* Stats Cards Row */}
            <div className="stats-row">
              {/* Budget Card */}
              <div className="stat-card">
                <div className="stat-card-header">
                  <span className="stat-icon">💰</span>
                  <span className="stat-title">BUDGET</span>
                </div>
                <div className="stat-value">${(budgetRemaining / 1000).toFixed(0)}K</div>
                <div className={`stat-status ${budgetPercent > 30 ? 'good' : budgetPercent > 15 ? 'warn' : 'bad'}`}>
                  {budgetPercent > 30 ? '▼' : '▲'} {Math.round(budgetPercent)}% remaining
                </div>
                <div className="stat-progress-bar">
                  <div className="stat-progress-fill" style={{ width: `${budgetSpentPercent}%`, background: budgetPercent > 30 ? '#f59e0b' : '#ef4444' }}></div>
                </div>
              </div>
              
              {/* Schedule Card */}
              <div className="stat-card">
                <div className="stat-card-header">
                  <span className="stat-icon">📅</span>
                  <span className="stat-title">SCHEDULE</span>
                </div>
                <div className="stat-value">{Math.round(schedulePercent)}%</div>
                <div className={`stat-status ${weeksRemaining > 3 ? 'good' : weeksRemaining > 1 ? 'warn' : 'bad'}`}>
                  {isScheduleBehind ? '⚠' : '✓'} {weeksRemaining} weeks left
                </div>
                <div className="stat-progress-bar">
                  <div className="stat-progress-fill" style={{ width: `${schedulePercent}%`, background: '#3b82f6' }}></div>
                </div>
              </div>
              
              {/* Team Morale Card */}
              <div className="stat-card">
                <div className="stat-card-header">
                  <span className="stat-icon">👥</span>
                  <span className="stat-title">TEAM MORALE</span>
                </div>
                <div className="stat-value">{Math.round(gameState.team.morale)}%</div>
                <div className={`stat-status ${gameState.team.morale > 60 ? 'good' : gameState.team.morale > 40 ? 'warn' : 'bad'}`}>
                  {gameState.team.morale > 60 ? '↑' : '↓'} {gameState.team.size} team members
                </div>
                <div className="stat-progress-bar">
                  <div className="stat-progress-fill" style={{ width: `${gameState.team.morale}%`, background: gameState.team.morale > 60 ? '#10b981' : '#f59e0b' }}></div>
                </div>
              </div>
              
              {/* Quality Card */}
              <div className="stat-card">
                <div className="stat-card-header">
                  <span className="stat-icon">⭐</span>
                  <span className="stat-title">QUALITY SCORE</span>
                </div>
                <div className="stat-value">{gameState.scope.quality >= 90 ? 'A' : gameState.scope.quality >= 80 ? 'B+' : gameState.scope.quality >= 70 ? 'B' : gameState.scope.quality >= 60 ? 'C' : 'D'}</div>
                <div className="stat-status neutral">({Math.round(gameState.scope.quality)}/100)</div>
                <div className="stat-progress-bar">
                  <div className="stat-progress-fill" style={{ width: `${gameState.scope.quality}%`, background: '#8b5cf6' }}></div>
                </div>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="game-main">
              {/* Left Panel - Weekly Decisions */}
              <div className="decisions-panel">
                <h3>📋 This Week's Decisions</h3>
                
                {/* Team Management */}
                <div className="decision-card">
                  <div className="decision-header">
                    <span className="decision-title">Team Management</span>
                  </div>
                  <p className="decision-desc">Adjust your team size based on workload</p>
                  <div className="decision-actions">
                    <button className="decision-btn" onClick={() => handleAction({ type: 'fire' })} disabled={gameState.team.size <= 2}>
                      − Remove
                    </button>
                    <span className="team-count">{gameState.team.size}</span>
                    <button className="decision-btn" onClick={() => handleAction({ type: 'hire', cost: scenario.weeklyCostPerPerson * 2 })}>
                      + Hire
                    </button>
                  </div>
                </div>
                
                {/* Resource Focus Sliders */}
                <div className="decision-card">
                  <div className="decision-header">
                    <span className="decision-title">Weekly Focus</span>
                    <span className="decision-badge">Strategy</span>
                  </div>
                  <p className="decision-desc">Where should the team concentrate this week?</p>
                  
                  <div className="focus-sliders">
                    <div className="focus-row">
                      <span className="focus-label">🚀 Speed</span>
                      <div className="focus-bar">
                        <div className="focus-fill speed" style={{ width: `${100 - gameState.scope.quality * 0.3}%` }}></div>
                      </div>
                      <span className="focus-value">{Math.round(100 - gameState.scope.quality * 0.3)}%</span>
                    </div>
                    <div className="focus-row">
                      <span className="focus-label">⭐ Quality</span>
                      <div className="focus-bar">
                        <div className="focus-fill quality" style={{ width: `${gameState.scope.quality * 0.8}%` }}></div>
                      </div>
                      <span className="focus-value">{Math.round(gameState.scope.quality * 0.8)}%</span>
                    </div>
                    <div className="focus-row">
                      <span className="focus-label">💡 Innovation</span>
                      <div className="focus-bar">
                        <div className="focus-fill innovation" style={{ width: `${gameState.team.knowledge * 0.6}%` }}></div>
                      </div>
                      <span className="focus-value">{Math.round(gameState.team.knowledge * 0.6)}%</span>
                    </div>
                  </div>
                  
                  <div className="focus-tip">
                    💡 Tip: Balance speed and quality based on project phase
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="decision-card">
                  <div className="decision-header">
                    <span className="decision-title">Resource Allocation</span>
                  </div>
                  <div className="quick-action-grid">
                    <button className="quick-action-btn quality" onClick={() => handleAction({ type: 'quality_review', cost: 10000 })}>
                      <span>🔍</span>
                      <span>Quality Review</span>
                    </button>
                    <button className="quick-action-btn crunch" onClick={() => handleAction({ type: 'crunch', cost: 15000 })}>
                      <span>🔥</span>
                      <span>Crunch Mode</span>
                    </button>
                    {scenario.hasPrototyping && gameState.prototypesBuilt < gameState.maxPrototypes && (
                      <button className="quick-action-btn proto" onClick={() => handleAction({ type: 'build_prototype' })}>
                        <span>🔬</span>
                        <span>Prototype</span>
                      </button>
                    )}
                    <button className="quick-action-btn schedule" onClick={() => handleAction({ type: 'extend_deadline' })}>
                      <span>📅</span>
                      <span>Extend +1wk</span>
                    </button>
                  </div>
                </div>
                
                {/* Meetings */}
                <div className="decision-card">
                  <div className="decision-header">
                    <span className="decision-title">Meetings This Week</span>
                  </div>
                  <div className="meetings-grid">
                    {Object.values(MEETING_TYPES).map(meeting => (
                      <button 
                        key={meeting.id}
                        className={`meeting-chip ${gameState.meetings[meeting.id] ? 'done' : ''}`}
                        onClick={() => handleAction({ type: `meeting_${meeting.id}` })}
                        disabled={gameState.meetings[meeting.id]}
                      >
                        {meeting.icon} {meeting.name}
                        {gameState.meetings[meeting.id] && ' ✓'}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Weekly Progress Summary */}
                <div className="progress-summary">
                  <div className="progress-header">
                    <span>📋 Week {gameState.week} Progress</span>
                  </div>
                  <div className="progress-stats">
                    <div className="progress-stat">
                      <span className="progress-label">Tasks Done</span>
                      <span className="progress-value">{Math.round(scopePercent)}%</span>
                    </div>
                    <div className="progress-stat">
                      <span className="progress-label">Meetings</span>
                      <span className="progress-value">{Object.values(gameState.meetings).filter(Boolean).length}/{Object.keys(MEETING_TYPES).length}</span>
                    </div>
                    <div className="progress-stat">
                      <span className="progress-label">Actions</span>
                      <span className="progress-value">{(gameState.weeklyActions || 0)}</span>
                    </div>
                  </div>
                  <div className="progress-tip">
                    {gameState.team.morale < 50 ? '💡 Consider team building to boost morale' :
                     budgetPercent < 30 ? '💡 Watch your spending this week' :
                     weeksRemaining <= 3 ? '💡 Focus on completing critical tasks' :
                     '💡 Good progress! Keep it up!'}
                  </div>
                </div>
                
                {/* Advance Button */}
                <button className="btn-primary btn-advance" onClick={advanceWeek}>
                  Advance to Week {gameState.week + 1} →
                </button>
              </div>
              
              {/* Right Panel */}
              <div className="info-panel">
                {/* Risk Radar Visualization - TOP for visibility */}
                <div className="radar-card">
                  <h4>📡 Risk Radar</h4>
                  <RiskRadar risks={{
                    budget: Math.min(100, budgetPercent + 20),
                    schedule: Math.min(100, (weeksRemaining / gameState.totalWeeks) * 100 + 20),
                    scope: Math.min(100, scopePercent + 10),
                    quality: gameState.scope.quality,
                    team: gameState.team.morale,
                    stakeholder: Math.min(100, (gameState.scope.quality + gameState.team.morale) / 2)
                  }} />
                  <div className="radar-legend">
                    <span className="legend-item good">● Safe</span>
                    <span className="legend-item warn">● Watch</span>
                    <span className="legend-item bad">● Risk</span>
                  </div>
                </div>
                
                {/* Active Event or Status */}
                {hasCriticalEvent ? (
                  <div className="alert-card critical">
                    <div className="alert-header">🚨 CRITICAL EVENT</div>
                    <h4>{gameState.currentEvent.title}</h4>
                    <p>{gameState.currentEvent.description}</p>
                    <button className="alert-respond-btn" onClick={() => {}}>
                      Respond Now
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Live Metrics */}
                    <div className="metrics-card">
                      <h4>📊 Live Metrics</h4>
                      <div className="metric-row">
                        <span className="metric-name">Budget Used</span>
                        <span className="metric-bar-container">
                          <span className="metric-bar" style={{ width: `${budgetSpentPercent}%`, background: budgetPercent > 30 ? '#f59e0b' : '#ef4444' }}></span>
                        </span>
                        <span className="metric-pct">{Math.round(budgetSpentPercent)}%</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-name">Timeline</span>
                        <span className="metric-bar-container">
                          <span className="metric-bar" style={{ width: `${schedulePercent}%`, background: '#3b82f6' }}></span>
                        </span>
                        <span className="metric-pct">{Math.round(schedulePercent)}%</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-name">Team Morale</span>
                        <span className="metric-bar-container">
                          <span className="metric-bar" style={{ width: `${gameState.team.morale}%`, background: gameState.team.morale > 60 ? '#10b981' : '#f59e0b' }}></span>
                        </span>
                        <span className={`metric-pct ${gameState.team.morale < 50 ? 'bad' : ''}`}>{Math.round(gameState.team.morale)}%</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-name">Quality</span>
                        <span className="metric-bar-container">
                          <span className="metric-bar" style={{ width: `${gameState.scope.quality}%`, background: '#8b5cf6' }}></span>
                        </span>
                        <span className="metric-pct">{gameState.scope.quality >= 80 ? 'B+' : gameState.scope.quality >= 70 ? 'B' : 'C'}</span>
                      </div>
                    </div>
                    
                    {/* Stakeholder Messages */}
                    <div className="stakeholder-card">
                      <h4>💬 Stakeholder Updates</h4>
                      <div className="message-list">
                        {gameState.team.morale < 60 && (
                          <div className="message urgent">
                            <span className="msg-icon">👥</span>
                            <div className="msg-content">
                              <span className="msg-from">Team Lead</span>
                              <span className="msg-text">Team morale is low. Consider a team building activity.</span>
                            </div>
                            <span className="msg-badge urgent">!</span>
                          </div>
                        )}
                        {budgetPercent < 30 && (
                          <div className="message warning">
                            <span className="msg-icon">💰</span>
                            <div className="msg-content">
                              <span className="msg-from">Finance</span>
                              <span className="msg-text">Budget running low. Review spending priorities.</span>
                            </div>
                          </div>
                        )}
                        {weeksRemaining <= 3 && (
                          <div className="message info">
                            <span className="msg-icon">📅</span>
                            <div className="msg-content">
                              <span className="msg-from">Sponsor</span>
                              <span className="msg-text">Deadline approaching. Status update requested.</span>
                            </div>
                          </div>
                        )}
                        {gameState.team.morale >= 60 && budgetPercent >= 30 && weeksRemaining > 3 && (
                          <div className="message success">
                            <span className="msg-icon">✅</span>
                            <div className="msg-content">
                              <span className="msg-from">PMO</span>
                              <span className="msg-text">Project on track. Keep up the good work!</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
                
                {/* Active Risks */}
                <div className="risks-card">
                  <h4>⚠️ Active Risks</h4>
                  <div className="risk-list">
                    {gameState.team.stress > 60 && (
                      <div className="risk-item high">
                        <span className="risk-level">HIGH</span>
                        <span className="risk-text">Team burnout risk</span>
                      </div>
                    )}
                    {budgetPercent < 20 && (
                      <div className="risk-item high">
                        <span className="risk-level">HIGH</span>
                        <span className="risk-text">Budget overrun</span>
                      </div>
                    )}
                    {weeksRemaining <= 2 && scopePercent < 80 && (
                      <div className="risk-item high">
                        <span className="risk-level">HIGH</span>
                        <span className="risk-text">Schedule slip</span>
                      </div>
                    )}
                    {gameState.scope.quality < 70 && (
                      <div className="risk-item med">
                        <span className="risk-level">MED</span>
                        <span className="risk-text">Quality concerns</span>
                      </div>
                    )}
                    {gameState.team.knowledge < 50 && (
                      <div className="risk-item low">
                        <span className="risk-level">LOW</span>
                        <span className="risk-text">Knowledge gaps</span>
                      </div>
                    )}
                    {gameState.team.stress <= 60 && budgetPercent >= 20 && (weeksRemaining > 2 || scopePercent >= 80) && gameState.scope.quality >= 70 && gameState.team.knowledge >= 50 && (
                      <div className="risk-item none">
                        <span className="risk-text">No critical risks identified</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Upcoming Milestones */}
                <div className="milestones-card">
                  <h4>🎯 Milestones</h4>
                  <div className="milestone-list">
                    <div className={`milestone-item ${gameState.week >= 3 ? 'complete' : gameState.week >= 2 ? 'current' : ''}`}>
                      <span className="milestone-marker">{gameState.week >= 3 ? '✓' : ''}</span>
                      <span className="milestone-name">Planning Complete</span>
                      <span className="milestone-week">W3</span>
                    </div>
                    <div className={`milestone-item ${gameState.week >= Math.floor(gameState.totalWeeks * 0.5) ? 'complete' : gameState.week >= Math.floor(gameState.totalWeeks * 0.4) ? 'current' : ''}`}>
                      <span className="milestone-marker">{gameState.week >= Math.floor(gameState.totalWeeks * 0.5) ? '✓' : ''}</span>
                      <span className="milestone-name">MVP Ready</span>
                      <span className="milestone-week">W{Math.floor(gameState.totalWeeks * 0.5)}</span>
                    </div>
                    <div className={`milestone-item ${gameState.week >= Math.floor(gameState.totalWeeks * 0.75) ? 'complete' : gameState.week >= Math.floor(gameState.totalWeeks * 0.65) ? 'current' : ''}`}>
                      <span className="milestone-marker">{gameState.week >= Math.floor(gameState.totalWeeks * 0.75) ? '✓' : ''}</span>
                      <span className="milestone-name">Beta Testing</span>
                      <span className="milestone-week">W{Math.floor(gameState.totalWeeks * 0.75)}</span>
                    </div>
                    <div className={`milestone-item ${gameState.week >= gameState.totalWeeks ? 'complete' : gameState.week >= gameState.totalWeeks - 1 ? 'current' : ''}`}>
                      <span className="milestone-marker">{gameState.week >= gameState.totalWeeks ? '✓' : ''}</span>
                      <span className="milestone-name">Launch</span>
                      <span className="milestone-week">W{gameState.totalWeeks}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Timeline */}
            <div className="timeline-panel">
              <div className="timeline-header">
                <h4>📈 Project Timeline</h4>
                <span className="timeline-status">
                  {weeksRemaining > 3 ? '🟢 On Track' : weeksRemaining > 1 ? '🟡 Approaching Deadline' : '🔴 Critical'}
                </span>
              </div>
              <div className="timeline-bar">
                <div className="timeline-progress" style={{ width: `${schedulePercent}%` }}></div>
                {/* Milestone markers */}
                <div className="timeline-milestone" style={{ left: `${(3 / gameState.totalWeeks) * 100}%` }} title="Planning">
                  <span className={gameState.week >= 3 ? 'done' : ''}>📋</span>
                </div>
                <div className="timeline-milestone" style={{ left: `${(Math.floor(gameState.totalWeeks * 0.5) / gameState.totalWeeks) * 100}%` }} title="MVP">
                  <span className={gameState.week >= Math.floor(gameState.totalWeeks * 0.5) ? 'done' : ''}>🎯</span>
                </div>
                <div className="timeline-milestone" style={{ left: `${(Math.floor(gameState.totalWeeks * 0.75) / gameState.totalWeeks) * 100}%` }} title="Beta">
                  <span className={gameState.week >= Math.floor(gameState.totalWeeks * 0.75) ? 'done' : ''}>🧪</span>
                </div>
                <div className="timeline-milestone deadline" style={{ left: '100%' }} title="Launch">
                  <span>🚀</span>
                </div>
                <div className="timeline-marker current" style={{ left: `${schedulePercent}%` }}></div>
              </div>
              <div className="timeline-weeks">
                {Array.from({ length: gameState.totalWeeks }, (_, i) => (
                  <span key={i} className={`week-mark ${i + 1 === gameState.week ? 'current' : i + 1 < gameState.week ? 'past' : ''}`}>
                    W{i + 1}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Event Modal with CSS Animation */}
          {gameState.gamePhase === 'event' && gameState.currentEvent && (
            <div className="event-overlay">
              <div className="event-modal enhanced">
                <div className="event-modal-header critical">
                  <span className="event-type">⚠️ CRITICAL EVENT</span>
                  <h2>{gameState.currentEvent.title}</h2>
                </div>
                
                <div className="event-modal-body">
                  <div className="event-description">
                    <p>{gameState.currentEvent.description}</p>
                  </div>
                  
                  {/* Impact Analysis */}
                  <div className="impact-analysis">
                    <h5>📊 Potential Impact:</h5>
                    <div className="impact-cards">
                      <div className="impact-card">
                        <span className="impact-label">Budget</span>
                        <span className="impact-value warn">Variable</span>
                      </div>
                      <div className="impact-card">
                        <span className="impact-label">Schedule</span>
                        <span className="impact-value warn">At Risk</span>
                      </div>
                      <div className="impact-card">
                        <span className="impact-label">Team</span>
                        <span className="impact-value">Depends</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decision Options with Consequence Preview */}
                  <div className="event-options-grid">
                    {gameState.currentEvent.options.map((option, idx) => {
                      const colors = ['#10b981', '#f59e0b', '#ef4444', '#6366f1'];
                      const icons = ['✅', '⚠️', '🔥', '💡'];
                      const riskLabels = ['Safe Choice', 'Moderate Risk', 'High Risk', 'Strategic'];
                      return (
                        <button 
                          key={option.id} 
                          className="event-option-card enhanced" 
                          onClick={() => handleEventChoice(option)}
                          style={{ borderColor: colors[idx % 4] }}
                        >
                          <div className="option-header">
                            <span className="option-icon">{icons[idx % 4]}</span>
                            <span className="option-risk" style={{ color: colors[idx % 4] }}>{riskLabels[idx % 4]}</span>
                          </div>
                          <span className="option-label">{option.label}</span>
                          <div className="option-consequences">
                            {option.effects && (
                              <>
                                {option.effects.budget && <span className={option.effects.budget > 0 ? 'negative' : 'positive'}>💰 {option.effects.budget > 0 ? '-' : '+'}${Math.abs(option.effects.budget / 1000)}K</span>}
                                {option.effects.morale && <span className={option.effects.morale < 0 ? 'negative' : 'positive'}>😊 {option.effects.morale > 0 ? '+' : ''}{option.effects.morale}%</span>}
                                {option.effects.quality && <span className={option.effects.quality < 0 ? 'negative' : 'positive'}>⭐ {option.effects.quality > 0 ? '+' : ''}{option.effects.quality}%</span>}
                              </>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="event-footer">
                  <span>⏱️ Choose wisely - every decision has consequences!</span>
                </div>
              </div>
            </div>
          )}

          {/* Paywall Modal for Free Users */}
          {showPaywall && (
            <div className="event-overlay">
              <div className="event-modal paywall-modal">
                <span className="event-icon">🔒</span>
                <h2>You're Doing Great!</h2>
                <p>
                  You've completed Week {FREE_TRIAL_WEEKS} of the simulation. 
                  Your project is {Math.round((gameState.scope.completed / gameState.scope.totalFeatures) * 100)}% complete 
                  and the team is counting on you!
                </p>
                <p className="paywall-hook">
                  <strong>Upgrade to Professional</strong> to continue your journey and see how your decisions 
                  play out. Will you deliver on time? Will the stakeholders be happy?
                </p>
                <div className="paywall-price">
                  <span className="price-tag">$19</span>
                  <span className="price-period">/month</span>
                </div>
                <div className="paywall-features">
                  <div>✓ Unlimited simulation plays</div>
                  <div>✓ All scenarios unlocked</div>
                  <div>✓ Detailed analytics</div>
                  <div>✓ Certificates of completion</div>
                </div>
                <div className="paywall-actions">
                  <button className="btn-primary paywall-upgrade" onClick={() => { setShowPaywall(false); setCurrentPage('pricing'); }}>
                    Upgrade Now →
                  </button>
                  <button className="btn-secondary paywall-later" onClick={() => { setShowPaywall(false); setSimPhase('select'); setGameState(null); }}>
                    Maybe Later
                  </button>
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
      const isGreatScore = grade.startsWith('A') || grade === 'B+';
      const isPoorScore = grade === 'F' || grade === 'D';
      
      // Calculate individual scores for breakdown
      const scopeScore = Math.round((gameState.scope.completed / gameState.scope.totalFeatures) * 100);
      const scheduleScore = scheduleOnTarget ? 100 - ((gameState.week - gameState.schedule.deadline) * 10) : Math.max(50, 100 - (gameState.week - gameState.schedule.deadline) * 15);
      const budgetScore = Math.round(budgetOnTarget ? 100 - ((gameState.budget.spent / gameState.budget.total - 0.8) * 50) : Math.max(40, 100 - ((gameState.budget.spent / gameState.budget.total - 1) * 100)));
      const qualityScore = Math.round(gameState.scope.quality);
      const teamScore = Math.round(gameState.moraleHistory.reduce((a, b) => a + b, 0) / gameState.moraleHistory.length);
      
      // Achievements
      const achievements = [
        { id: 'budget', name: 'Budget Master', icon: '💰', desc: 'Under budget', unlocked: budgetOnTarget && gameState.budget.spent < gameState.budget.total * 0.9 },
        { id: 'stakeholder', name: 'Stakeholder Pro', icon: '🤝', desc: 'High satisfaction', unlocked: qualityGood && scheduleOnTarget },
        { id: 'scope', name: 'Scope Guardian', icon: '🎯', desc: '100% scope', unlocked: scopeComplete },
        { id: 'crisis', name: 'Crisis Handler', icon: '🚨', desc: 'Managed events', unlocked: gameState.eventHistory?.length >= 2 },
        { id: 'perfect', name: 'Perfect Score', icon: '⭐', desc: 'All green', unlocked: budgetOnTarget && scheduleOnTarget && scopeComplete && qualityGood },
        { id: 'speed', name: 'Speed Demon', icon: '⚡', desc: 'Early finish', unlocked: gameState.week < gameState.schedule.deadline - 1 },
      ];
      
      return (
        <div className="sim-ended">
          {/* CSS Confetti animation for great scores */}
          {isGreatScore && <Confetti />}
          
          {/* Floating shapes */}
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
          
          <div className="results-container">
            {/* Header */}
            <div className="results-header">
              <div className="results-animation">
                {isGreatScore ? (
                  <SuccessAnimation />
                ) : isPoorScore ? (
                  <SadAnimation />
                ) : (
                  <div className="trophy-icon">🏆</div>
                )}
              </div>
              <h1>{t('results.simulationComplete', lang)}</h1>
              <p className="results-subtitle">{selectedScenario.projectName} • {selectedScenario.company}</p>
              
              {/* Main Grade */}
              <div className="grade-display">
                <span className="main-grade" style={{
                  color: grade.startsWith('A') ? '#10b981' : grade.startsWith('B') ? '#6366f1' : grade === 'C' ? '#f59e0b' : '#ef4444'
                }}>{grade}</span>
                <span className="grade-label">{t('results.overallGrade', lang)}</span>
              </div>
            </div>
            
            {/* Mission Recap - Original Objectives vs Results */}
            <div className="mission-recap">
              <h3>{t('results.missionRecap', lang)}</h3>
              <p className="mission-intro">{t('results.missionIntro', lang)}</p>
              
              <div className="objectives-grid">
                <div className="objective-card">
                  <div className="objective-header">
                    <span className="objective-icon">📦</span>
                    <span className="objective-name">{t('results.scope', lang)}</span>
                  </div>
                  <div className="objective-target">
                    <span className="target-label">{t('results.target', lang)}</span>
                    <span className="target-value">{t('results.deliverFeatures', lang)} {gameState.scope.totalFeatures} {t('results.features', lang)}</span>
                  </div>
                  <div className="objective-result">
                    <span className="result-label">{t('results.actual', lang)}</span>
                    <span className={`result-value ${scopeComplete ? 'good' : 'bad'}`}>
                      {Math.round(gameState.scope.completed)} {t('results.features', lang)} ({scopeScore}%)
                    </span>
                  </div>
                </div>
                
                <div className="objective-card">
                  <div className="objective-header">
                    <span className="objective-icon">📅</span>
                    <span className="objective-name">{t('results.schedule', lang)}</span>
                  </div>
                  <div className="objective-target">
                    <span className="target-label">{t('results.target', lang)}</span>
                    <span className="target-value">{t('results.completeInWeeks', lang)} {gameState.totalWeeks} {t('results.weeks', lang)}</span>
                  </div>
                  <div className="objective-result">
                    <span className="result-label">{t('results.actual', lang)}</span>
                    <span className={`result-value ${scheduleOnTarget ? 'good' : 'bad'}`}>
                      {scheduleOnTarget ? t('results.onTime', lang) : `${Math.abs(gameState.totalWeeks - gameState.week + (gameState.scheduleChanges || 0))} ${t('results.weeksOver', lang)}`}
                    </span>
                  </div>
                </div>
                
                <div className="objective-card">
                  <div className="objective-header">
                    <span className="objective-icon">💰</span>
                    <span className="objective-name">{t('results.budget', lang)}</span>
                  </div>
                  <div className="objective-target">
                    <span className="target-label">{t('results.target', lang)}</span>
                    <span className="target-value">{t('results.stayUnder', lang)} ${(gameState.budget.total / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="objective-result">
                    <span className="result-label">{t('results.actual', lang)}</span>
                    <span className={`result-value ${budgetOnTarget ? 'good' : 'bad'}`}>
                      ${(gameState.budget.spent / 1000).toFixed(0)}K {t('results.spent', lang)} ({budgetOnTarget ? `${Math.round(100 - (gameState.budget.spent / gameState.budget.total) * 100)}% ${t('results.underBudget', lang)}` : t('results.overBudget', lang)})
                    </span>
                  </div>
                </div>
                
                <div className="objective-card">
                  <div className="objective-header">
                    <span className="objective-icon">⭐</span>
                    <span className="objective-name">{t('results.quality', lang)}</span>
                  </div>
                  <div className="objective-target">
                    <span className="target-label">{t('results.target', lang)}</span>
                    <span className="target-value">{t('results.maintainQuality', lang)}</span>
                  </div>
                  <div className="objective-result">
                    <span className="result-label">{t('results.actual', lang)}</span>
                    <span className={`result-value ${qualityGood ? 'good' : 'bad'}`}>
                      {qualityScore}% ({qualityGood ? t('results.metStandard', lang) : t('results.belowStandard', lang)})
                    </span>
                  </div>
                </div>
                
                <div className="objective-card">
                  <div className="objective-header">
                    <span className="objective-icon">👥</span>
                    <span className="objective-name">{t('results.team', lang)}</span>
                  </div>
                  <div className="objective-target">
                    <span className="target-label">{t('results.target', lang)}</span>
                    <span className="target-value">{t('results.keepMorale', lang)}</span>
                  </div>
                  <div className="objective-result">
                    <span className="result-label">{t('results.actual', lang)}</span>
                    <span className={`result-value ${teamScore >= 50 ? 'good' : 'bad'}`}>
                      {teamScore}% ({teamScore >= 50 ? t('results.teamHappy', lang) : t('results.teamBurnedOut', lang)})
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Score Breakdown Cards */}
            <div className="score-breakdown">
              <h3>{t('results.scoreBreakdown', lang)}</h3>
              <div className="breakdown-grid">
                <div className="breakdown-card">
                  <div className="breakdown-header">
                    <span className="breakdown-icon">📦</span>
                    <span className="breakdown-title">{t('results.scope', lang)}</span>
                  </div>
                  <div className="breakdown-value">{scopeScore}%</div>
                  <div className="breakdown-bar">
                    <div className="breakdown-fill" style={{ width: `${scopeScore}%`, background: scopeScore >= 80 ? '#10b981' : '#f59e0b' }}></div>
                  </div>
                  <span className="breakdown-status">{scopeComplete ? t('results.excellent', lang) : t('results.partial', lang)}</span>
                </div>
                
                <div className="breakdown-card">
                  <div className="breakdown-header">
                    <span className="breakdown-icon">📅</span>
                    <span className="breakdown-title">{t('results.schedule', lang)}</span>
                  </div>
                  <div className="breakdown-value">{Math.min(100, Math.max(0, scheduleScore))}%</div>
                  <div className="breakdown-bar">
                    <div className="breakdown-fill" style={{ width: `${Math.min(100, Math.max(0, scheduleScore))}%`, background: scheduleOnTarget ? '#10b981' : '#ef4444' }}></div>
                  </div>
                  <span className="breakdown-status">{scheduleOnTarget ? t('results.onTime', lang) : `${gameState.week - gameState.schedule.deadline} ${t('results.daysLate', lang)}`}</span>
                </div>
                
                <div className="breakdown-card">
                  <div className="breakdown-header">
                    <span className="breakdown-icon">💰</span>
                    <span className="breakdown-title">{t('results.budget', lang)}</span>
                  </div>
                  <div className="breakdown-value">{Math.min(100, Math.max(0, budgetScore))}%</div>
                  <div className="breakdown-bar">
                    <div className="breakdown-fill" style={{ width: `${Math.min(100, Math.max(0, budgetScore))}%`, background: budgetOnTarget ? '#10b981' : '#ef4444' }}></div>
                  </div>
                  <span className="breakdown-status">{budgetOnTarget ? `${Math.round((1 - gameState.budget.spent / gameState.budget.total) * 100)}% ${t('results.underBudget', lang)}` : t('results.overBudget', lang)}</span>
                </div>
                
                <div className="breakdown-card">
                  <div className="breakdown-header">
                    <span className="breakdown-icon">⭐</span>
                    <span className="breakdown-title">{t('results.quality', lang)}</span>
                  </div>
                  <div className="breakdown-value">{qualityScore}%</div>
                  <div className="breakdown-bar">
                    <div className="breakdown-fill" style={{ width: `${qualityScore}%`, background: qualityGood ? '#10b981' : '#f59e0b' }}></div>
                  </div>
                  <span className="breakdown-status">{qualityGood ? t('results.veryGood', lang) : t('results.needsWork', lang)}</span>
                </div>
                
                <div className="breakdown-card">
                  <div className="breakdown-header">
                    <span className="breakdown-icon">👥</span>
                    <span className="breakdown-title">{t('results.team', lang)}</span>
                  </div>
                  <div className="breakdown-value">{teamScore}%</div>
                  <div className="breakdown-bar">
                    <div className="breakdown-fill" style={{ width: `${teamScore}%`, background: teamScore >= 60 ? '#10b981' : '#f59e0b' }}></div>
                  </div>
                  <span className="breakdown-status">{teamScore >= 60 ? t('results.goodMorale', lang) : t('results.lowMorale', lang)}</span>
                </div>
              </div>
            </div>
            
            {/* Performance Analysis */}
            <div className="analysis-section">
              <h3>{t('results.performanceAnalysis', lang)}</h3>
              
              {/* What Went Well */}
              <div className="analysis-card good">
                <div className="analysis-header">
                  <span className="analysis-icon">✅</span>
                  <span className="analysis-title">{t('results.whatWentWell', lang)}</span>
                </div>
                <ul className="analysis-list">
                  {budgetOnTarget && <li>{t('results.excellentBudget', lang)}</li>}
                  {qualityGood && <li>{t('results.maintainedQuality', lang)}</li>}
                  {scheduleOnTarget && <li>{t('results.deliveredOnTime', lang)}</li>}
                  {scopeComplete && <li>{t('results.completedScope', lang)}</li>}
                  {teamScore >= 60 && <li>{t('results.keptMoraleHealthy', lang)}</li>}
                  {gameState.scheduleChanges <= 1 && <li>{t('results.minimalScheduleChanges', lang)}</li>}
                  {gameState.prototypesBuilt > 0 && <li>{t('results.usedPrototyping', lang)}</li>}
                  {!budgetOnTarget && !qualityGood && !scheduleOnTarget && !scopeComplete && teamScore < 60 && (
                    <li>{t('results.completedSimulation', lang)}</li>
                  )}
                </ul>
              </div>
              
              {/* Areas for Improvement */}
              <div className="analysis-card improve">
                <div className="analysis-header">
                  <span className="analysis-icon">💡</span>
                  <span className="analysis-title">{t('results.areasForImprovement', lang)}</span>
                </div>
                <ul className="analysis-list">
                  {!budgetOnTarget && <li>{t('results.budgetTip', lang)}</li>}
                  {!scheduleOnTarget && <li>{t('results.scheduleTip', lang)}</li>}
                  {!scopeComplete && <li>{t('results.scopeTip', lang)}</li>}
                  {!qualityGood && <li>{t('results.qualityTip', lang)}</li>}
                  {teamScore < 60 && <li>{t('results.teamTip', lang)}</li>}
                  {gameState.scheduleChanges > 2 && <li>{t('results.planningTip', lang)}</li>}
                  {budgetOnTarget && qualityGood && scheduleOnTarget && scopeComplete && teamScore >= 60 && (
                    <li>{t('results.outstandingPerformance', lang)}</li>
                  )}
                </ul>
              </div>
              
              {/* PM Tips */}
              <div className="analysis-card tips">
                <div className="analysis-header">
                  <span className="analysis-icon">🎓</span>
                  <span className="analysis-title">{t('results.pmProTips', lang)}</span>
                </div>
                <ul className="analysis-list">
                  {!scheduleOnTarget && !budgetOnTarget && (
                    <li>{t('results.ironTriangle', lang)}</li>
                  )}
                  {teamScore < 50 && (
                    <li>{t('results.sustainablePace', lang)}</li>
                  )}
                  {gameState.prototypesBuilt === 0 && selectedScenario?.hasPrototyping && (
                    <li>{t('results.riskReduction', lang)}</li>
                  )}
                  {!qualityGood && scopeComplete && (
                    <li>{t('results.technicalDebt', lang)}</li>
                  )}
                  <li><strong>{t('results.keyInsight', lang)}</strong> {
                    grade.startsWith('A') ? t('results.keyInsightA', lang) :
                    grade.startsWith('B') ? t('results.keyInsightB', lang) :
                    grade === 'C' ? t('results.keyInsightC', lang) :
                    t('results.keyInsightD', lang)
                  }</li>
                </ul>
              </div>
            </div>
            
            {/* Achievements */}
            <div className="achievements-section">
              <h3>{t('results.achievements', lang)}</h3>
              <div className="achievements-grid">
                {achievements.map(achievement => (
                  <div key={achievement.id} className={`achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}`}>
                    <span className="achievement-icon">{achievement.icon}</span>
                    <span className="achievement-name">{achievement.name}</span>
                    {!achievement.unlocked && <span className="lock-icon">🔒</span>}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Final Score */}
            <div className="final-score-card">
              <span className="final-label">{t('results.finalScore', lang)}</span>
              <span className="final-value">{finalScore}</span>
              <span className="final-max">/ 1000 {t('results.points', lang)}</span>
            </div>
            
            {/* Actions */}
            <div className="results-actions">
              <button className="btn-primary-lg" onClick={beginSimulation}>
                {t('results.playAgain', lang)}
              </button>
              <button className="btn-secondary-lg" onClick={() => { setSimPhase('select'); setGameState(null); }}>
                {t('results.tryNewIndustry', lang)}
              </button>
              <button className="btn-secondary-lg" onClick={() => setCurrentPage('dashboard')}>
                {t('results.backToDashboard', lang)}
              </button>
            </div>
            
            {/* Print/Save Actions */}
            <div className="results-secondary-actions">
              <button className="btn-print" onClick={() => window.print()}>
                {t('results.printReport', lang)}
              </button>
              <button className="btn-print" onClick={() => {
                const text = lang === 'fr' 
                  ? `Résultats BizSimHub - ${selectedScenario.projectName}
Note: ${grade} | Score: ${finalScore}/1000
Périmètre: ${scopeScore}% | Calendrier: ${scheduleOnTarget ? 'À temps' : 'En retard'} | Budget: ${budgetOnTarget ? 'Respecté' : 'Dépassé'}
Qualité: ${qualityScore}% | Moral équipe: ${teamScore}%`
                  : `BizSimHub Results - ${selectedScenario.projectName}
Grade: ${grade} | Score: ${finalScore}/1000
Scope: ${scopeScore}% | Schedule: ${scheduleOnTarget ? 'On Time' : 'Late'} | Budget: ${budgetOnTarget ? 'On Target' : 'Over'}
Quality: ${qualityScore}% | Team Morale: ${teamScore}%`;
                navigator.clipboard.writeText(text);
                alert(t('results.copiedToClipboard', lang));
              }}>
                {t('results.copySummary', lang)}
              </button>
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
        .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; padding: 0 2rem; }
        .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at top, rgba(99, 102, 241, 0.15) 0%, transparent 60%); }
        .hero-content { position: relative; text-align: center; padding: 2rem; max-width: 700px; z-index: 2; }
        .hero-animation { 
          position: absolute; 
          right: 5%; 
          top: 50%; 
          transform: translateY(-50%); 
          opacity: 0.9;
          z-index: 1;
          display: none;
        }
        /* CSS Rocket Animation */
        .rocket-container {
          position: relative;
          width: 200px;
          height: 200px;
        }
        .rocket {
          font-size: 6rem;
          animation: rocketFloat 3s ease-in-out infinite;
          filter: drop-shadow(0 20px 40px rgba(99, 102, 241, 0.3));
          display: block;
          text-align: center;
        }
        @keyframes rocketFloat {
          0%, 100% { transform: translateY(0) rotate(-45deg); }
          50% { transform: translateY(-20px) rotate(-45deg); }
        }
        .rocket-trail {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 80px;
          background: linear-gradient(to bottom, #f59e0b, #ef4444, transparent);
          border-radius: 50%;
          filter: blur(10px);
          opacity: 0.8;
          animation: trailPulse 0.5s ease-in-out infinite alternate;
        }
        @keyframes trailPulse {
          0% { height: 60px; opacity: 0.6; }
          100% { height: 100px; opacity: 1; }
        }
        @media (min-width: 1200px) {
          .hero-animation { display: block; }
          .hero { justify-content: flex-start; padding-left: 10%; }
          .hero-content { text-align: left; }
          .hero-cta { justify-content: flex-start; }
          .hero-stats { justify-content: flex-start; }
        }
        .hero-badge { display: inline-block; padding: 0.5rem 1rem; background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 50px; font-size: 0.9rem; color: var(--accent-primary); margin-bottom: 1.5rem; }
        .hero-title { font-size: 4rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; }
        .gradient-text { background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-subtitle { font-size: 1.25rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto 2rem; line-height: 1.7; }
        @media (min-width: 1200px) { .hero-subtitle { margin: 0 0 2rem; } }
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
        .auth-success { background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #6ee7b7; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.9rem; }
        .forgot-password-link { background: none; border: none; color: var(--accent-primary); font-size: 0.85rem; padding: 0; margin-top: 0.5rem; cursor: pointer; display: block; text-align: right; }
        .forgot-password-link:hover { text-decoration: underline; }
        .form-group { margin-bottom: 1.25rem; }
        .form-group label { display: block; font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem; }
        .form-group input { width: 100%; padding: 0.85rem 1rem; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 10px; color: var(--text-primary); font-size: 1rem; }
        .form-group input:focus { outline: none; border-color: var(--accent-primary); }
        .form-group select { width: 100%; padding: 0.85rem 1rem; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 10px; color: var(--text-primary); font-size: 1rem; cursor: pointer; }
        .form-group select:focus { outline: none; border-color: var(--accent-primary); }
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
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%); 
          border: none;
          border-radius: 24px; 
          padding: 2.5rem; 
          margin-bottom: 2rem;
          position: relative;
          overflow: hidden;
          color: white;
        }
        .welcome-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%);
          animation: shimmer 8s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20%, 20%); }
        }
        .welcome-card h1 { font-size: 1.75rem; margin-bottom: 0.5rem; color: white; position: relative; z-index: 1; }
        .welcome-card p { color: rgba(255,255,255,0.9); position: relative; z-index: 1; }
        .dashboard-section { margin-bottom: 2rem; }
        .dashboard-section h2 { font-size: 1.25rem; margin-bottom: 1rem; color: #1e293b; }
        .scores-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .score-item { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
          border-radius: 16px; 
          padding: 1rem 1.25rem; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          transition: all 0.3s ease;
        }
        .score-item:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border-color: #c7d2fe;
        }
        .score-scenario { font-weight: 600; color: #1e293b; text-transform: capitalize; }
        .score-date { font-size: 0.85rem; color: #64748b; }
        .score-result { text-align: right; }
        .score-grade { font-size: 1.5rem; font-weight: 700; color: #4f46e5; margin-right: 0.75rem; }
        .score-points { color: #64748b; font-weight: 500; }
        .no-scores { color: #64748b; font-style: italic; }
        .featured-sim-card { 
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border: 1px solid #e2e8f0; 
          border-radius: 20px; 
          padding: 1.5rem; 
          display: flex; 
          gap: 1.5rem; 
          cursor: pointer; 
          transition: all 0.4s ease; 
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          position: relative;
          overflow: hidden;
        }
        .featured-sim-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .featured-sim-card:hover { 
          border-color: #6366f1; 
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(99, 102, 241, 0.15);
        }
        .featured-sim-card:hover::before { opacity: 1; }
        .featured-sim-icon { 
          font-size: 2.5rem; 
          background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
          padding: 1rem; 
          border-radius: 16px;
          position: relative;
          z-index: 1;
        }
        .featured-sim-content { position: relative; z-index: 1; }
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
        .savings-badge { 
          background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
          color: white; 
          padding: 0.5rem 1rem; 
          border-radius: 8px; 
          font-size: 0.85rem; 
          font-weight: 600; 
          margin-bottom: 1rem;
          text-align: center;
        }
        .pricing-footer {
          text-align: center;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
        }
        .pricing-footer p {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        
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
        
        /* NEW: Industry Selection Page - Dark Theme */
        .sim-select-page {
          min-height: 100vh;
          padding-top: 65px;
          background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%);
          color: #ffffff;
          position: relative;
          overflow: hidden;
        }
        .sim-select-page .navbar { background: rgba(20, 20, 40, 0.95); border-bottom: 1px solid rgba(99, 102, 241, 0.2); }
        .sim-select-page .nav-link { color: #9ca3af; }
        .sim-select-page .nav-link:hover { color: #ffffff; }
        .sim-select-page .user-name { color: #9ca3af; }
        .sim-select-page .logo-text { color: #ffffff; }
        .sim-select-page .back-link { color: #8b5cf6; }
        
        .sim-select-page .sim-select-container { max-width: 1300px; margin: 0 auto; padding: 2rem; position: relative; z-index: 1; }
        
        .sim-select-page .sim-select-header { text-align: center; margin-bottom: 2.5rem; }
        .sim-select-page .sim-select-header h1 { font-size: 2.5rem; font-weight: 700; color: #ffffff; margin-bottom: 0.5rem; }
        .sim-select-page .sim-select-header p { color: #9ca3af; font-size: 1.1rem; }
        
        /* Industry Cards Grid */
        .industry-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        @media (max-width: 1200px) {
          .industry-cards-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 700px) {
          .industry-cards-grid { grid-template-columns: 1fr; }
        }
        
        /* Industry Card */
        .industry-card {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.4s ease;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }
        .industry-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(99, 102, 241, 0.2);
          border-color: rgba(99, 102, 241, 0.4);
        }
        
        /* Card Header with Gradient */
        .industry-card-header {
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .industry-icon {
          font-size: 3.5rem;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        }
        
        /* Card Body */
        .industry-card-body {
          padding: 1.25rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .industry-card-body h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }
        .industry-subtitle {
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 1rem;
        }
        .industry-challenge {
          margin-bottom: 1rem;
          flex: 1;
        }
        .challenge-label {
          font-size: 0.8rem;
          color: #9ca3af;
          display: block;
          margin-bottom: 0.25rem;
        }
        .industry-challenge p {
          font-size: 0.85rem;
          color: #d1d5db;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Meta Info */
        .industry-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }
        
        /* Difficulty Badge */
        .industry-badge {
          display: inline-block;
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          margin-top: 0.75rem;
          width: fit-content;
        }
        
        /* Card Footer */
        .industry-card-footer {
          padding: 1rem 1.25rem 1.25rem;
        }
        .industry-start-btn {
          width: 100%;
          padding: 0.85rem 1.5rem;
          border: none;
          border-radius: 10px;
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .industry-start-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.4);
        }
        
        /* Footer Info */
        .sim-select-footer {
          text-align: center;
        }
        .sim-select-footer > p {
          color: #9ca3af;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
        }
        .sim-stats-bar {
          display: inline-flex;
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 16px;
          padding: 1rem 2.5rem;
          gap: 3rem;
        }
        .sim-stat {
          text-align: center;
        }
        .sim-stat-num {
          display: block;
          font-size: 1.75rem;
          font-weight: 700;
          color: #ffffff;
        }
        .sim-stat-num.purple {
          color: #8b5cf6;
        }
        .sim-stat-label {
          font-size: 0.8rem;
          color: #9ca3af;
        }
        
        .sim-select-container, .brief-container { max-width: 900px; margin: 0 auto; padding: 2rem; }
        .back-link { background: none; border: none; color: #4f46e5; font-family: inherit; font-size: 0.95rem; cursor: pointer; margin-bottom: 2rem; padding: 0; font-weight: 500; }
        .sim-select-header { text-align: center; margin-bottom: 3rem; }
        .sim-select-icon { font-size: 4rem; margin-bottom: 1rem; display: block; }
        .sim-select-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #1e293b; }
        .sim-select-header p { color: #64748b; }
        .scenarios-title { font-size: 1.25rem; margin-bottom: 1.5rem; color: #475569; }
        .scenarios-grid { display: flex; flex-direction: column; gap: 1rem; }
        .scenario-card { 
          background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
          border: 1px solid #e2e8f0; 
          border-radius: 20px; 
          padding: 1.5rem; 
          display: flex; 
          gap: 1.5rem; 
          align-items: flex-start; 
          text-align: left; 
          cursor: pointer; 
          transition: all 0.4s ease; 
          font-family: inherit; 
          color: #1e293b; 
          width: 100%; 
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          position: relative;
          overflow: hidden;
        }
        .scenario-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .scenario-card:hover { 
          border-color: #6366f1; 
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 12px 40px rgba(99, 102, 241, 0.15);
        }
        .scenario-card:hover::before { opacity: 1; }
        .scenario-icon { 
          font-size: 2.5rem; 
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 1rem; 
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
          position: relative;
          z-index: 1;
        }
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
        
        /* HBP-Style Tabbed Brief */
        .brief-container.hbp-style { max-width: 1000px; }
        .brief-tabs {
          display: flex;
          gap: 0;
          border-bottom: 2px solid #e2e8f0;
          margin-bottom: 2rem;
        }
        .brief-tab {
          padding: 1rem 1.5rem;
          background: none;
          border: none;
          font-size: 1rem;
          font-weight: 500;
          color: #64748b;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          margin-bottom: -2px;
          transition: all 0.2s;
        }
        .brief-tab:hover { color: #1e293b; }
        .brief-tab.active {
          color: #2563eb;
          border-bottom-color: #2563eb;
        }
        .brief-tab-content {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 2.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .tab-panel h2 {
          font-size: 1.75rem;
          color: #1e293b;
          margin-bottom: 1.5rem;
        }
        .tab-panel h2 .highlight { color: #2563eb; }
        .tab-panel h3 {
          font-size: 1.25rem;
          color: #1e293b;
          margin: 2rem 0 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }
        .tab-panel h4 {
          font-size: 1.1rem;
          color: #1e293b;
          margin: 1.5rem 0 0.5rem;
        }
        .tab-panel h4 .highlight { color: #2563eb; font-weight: 600; }
        .brief-paragraph {
          color: #475569;
          line-height: 1.8;
          margin-bottom: 1.25rem;
          font-size: 1rem;
        }
        .deliverables-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .deliverable-item {
          display: flex;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        }
        .deliverable-icon { font-size: 1.5rem; opacity: 0.7; }
        .deliverable-content strong {
          display: block;
          color: #1e293b;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }
        .deliverable-content p {
          color: #64748b;
          font-size: 0.95rem;
          margin: 0;
        }
        .objectives-section { margin-top: 1.5rem; }
        .objective-block {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1rem;
        }
        .objective-block h4 { margin-top: 0; }
        .objective-block p {
          color: #64748b;
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .scoring-summary {
          background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
          border: 1px solid #c7d2fe;
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 2rem;
        }
        .scoring-summary h4 { margin: 0 0 1rem; color: #4338ca; }
        .score-breakdown {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .score-breakdown span {
          background: white;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          font-size: 0.85rem;
          color: #4338ca;
          font-weight: 500;
        }
        .managing-section { margin-bottom: 2rem; }
        .causal-relationships {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }
        .causal-item {
          display: flex;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        }
        .causal-icon { font-size: 1.5rem; }
        .causal-item strong {
          display: block;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }
        .causal-item p {
          color: #64748b;
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.5;
        }
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-top: 1rem;
        }
        .action-item {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1rem 1.25rem;
        }
        .action-item strong {
          display: block;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }
        .action-item p {
          color: #64748b;
          font-size: 0.9rem;
          margin: 0;
        }
        @media (max-width: 768px) {
          .brief-tabs { flex-wrap: wrap; }
          .brief-tab { flex: 1; text-align: center; padding: 0.75rem; font-size: 0.9rem; }
          .actions-grid { grid-template-columns: 1fr; }
        }
        
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
          background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%); 
          min-height: 100vh; 
          color: #ffffff;
          position: relative;
          overflow-x: hidden;
        }
        .sim-playing .navbar { background: rgba(20, 20, 40, 0.95); border-bottom: 1px solid rgba(99, 102, 241, 0.2); backdrop-filter: blur(10px); }
        .sim-playing .nav-link { color: #9ca3af; }
        .sim-playing .nav-link:hover { color: #ffffff; }
        .sim-playing .user-name { color: #9ca3af; }
        .sim-playing .logo-text { color: #ffffff; }
        
        /* Floating Background Shapes */
        .floating-shapes {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
          animation: float 25s ease-in-out infinite;
        }
        .shape-1 {
          width: 600px;
          height: 600px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          top: -200px;
          right: -200px;
          animation-delay: 0s;
        }
        .shape-2 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%);
          bottom: 0%;
          left: -150px;
          animation-delay: -8s;
        }
        .shape-3 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
          top: 50%;
          right: 10%;
          animation-delay: -16s;
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -40px) scale(1.05); }
          66% { transform: translate(-30px, 30px) scale(0.95); }
        }

        /* NEW GAME CONTAINER */
        .game-container {
          max-width: 1400px;
          margin: 0 auto;
          padding-top: 60px;
          position: relative;
          z-index: 1;
        }
        
        .game-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; position: relative; z-index: 1; }
        .game-title { display: flex; align-items: center; gap: 1rem; }
        .game-icon { 
          font-size: 2rem; 
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%); 
          padding: 0.75rem; 
          border-radius: 16px; 
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          border: 1px solid rgba(99, 102, 241, 0.2);
        }
        .game-title h2 { font-size: 1.4rem; margin-bottom: 0.15rem; color: #ffffff; }
        .game-title span { color: #9ca3af; font-size: 0.9rem; }
        .week-badge { 
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); 
          color: white; 
          padding: 0.6rem 1.5rem; 
          border-radius: 50px; 
          font-weight: 700;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
          animation: pulse-badge 3s ease-in-out infinite;
        }
        @keyframes pulse-badge {
          0%, 100% { box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4); }
          50% { box-shadow: 0 4px 30px rgba(99, 102, 241, 0.6); }
        }
        
        /* STATS ROW - Horizontal Cards */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 900px) {
          .stats-row { grid-template-columns: repeat(2, 1fr); }
        }
        
        .stat-card {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 16px;
          padding: 1.25rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(99, 102, 241, 0.2);
          border-color: rgba(99, 102, 241, 0.3);
        }
        .stat-card-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .stat-icon { font-size: 1.2rem; }
        .stat-title {
          font-size: 0.7rem;
          font-weight: 600;
          color: #9ca3af;
          letter-spacing: 0.1em;
        }
        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
          margin-bottom: 0.25rem;
        }
        .stat-status {
          font-size: 0.8rem;
          margin-bottom: 0.75rem;
        }
        .stat-status.good { color: #10b981; }
        .stat-status.warn { color: #f59e0b; }
        .stat-status.bad { color: #ef4444; }
        .stat-status.neutral { color: #9ca3af; }
        .stat-progress-bar {
          height: 6px;
          background: #2a2a40;
          border-radius: 3px;
          overflow: hidden;
        }
        .stat-progress-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.5s ease;
        }
        
        /* MAIN CONTENT - Two Column */
        .game-main {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 900px) {
          .game-main { grid-template-columns: 1fr; }
        }
        
        /* DECISIONS PANEL */
        .decisions-panel {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 4px 30px rgba(0,0,0,0.3);
        }
        .decisions-panel h3 {
          font-size: 1.1rem;
          color: #8b5cf6;
          margin-bottom: 1.25rem;
        }
        
        .decision-card {
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%);
          border: 1px solid #3a3a50;
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1rem;
        }
        .decision-header {
          margin-bottom: 0.5rem;
        }
        .decision-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffffff;
        }
        .decision-desc {
          font-size: 0.8rem;
          color: #9ca3af;
          margin-bottom: 0.75rem;
        }
        .decision-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          justify-content: center;
        }
        .decision-btn {
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #3a3a55 0%, #2a2a45 100%);
          border: 1px solid #4a4a60;
          border-radius: 8px;
          color: #ffffff;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .decision-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #4a4a65 0%, #3a3a55 100%);
          border-color: #6366f1;
        }
        .decision-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .team-count {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          min-width: 50px;
          text-align: center;
        }
        
        /* Decision Header with Badge */
        .decision-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .decision-badge {
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          background: rgba(99, 102, 241, 0.2);
          color: #8b5cf6;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        /* FOCUS SLIDERS */
        .focus-sliders {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .focus-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .focus-label {
          font-size: 0.75rem;
          color: #9ca3af;
          width: 85px;
          flex-shrink: 0;
        }
        .focus-bar {
          flex: 1;
          height: 8px;
          background: #2a2a40;
          border-radius: 4px;
          overflow: hidden;
        }
        .focus-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease;
        }
        .focus-fill.speed { background: linear-gradient(90deg, #3b82f6, #60a5fa); }
        .focus-fill.quality { background: linear-gradient(90deg, #8b5cf6, #a78bfa); }
        .focus-fill.innovation { background: linear-gradient(90deg, #10b981, #34d399); }
        .focus-value {
          font-size: 0.75rem;
          font-weight: 600;
          color: #ffffff;
          width: 35px;
          text-align: right;
        }
        .focus-tip {
          font-size: 0.7rem;
          color: #6b7280;
          padding: 0.5rem;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 6px;
          text-align: center;
        }
        
        /* PROGRESS SUMMARY */
        .progress-summary {
          background: linear-gradient(135deg, #1a1a2e 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1rem;
        }
        .progress-header {
          font-size: 0.85rem;
          font-weight: 600;
          color: #8b5cf6;
          margin-bottom: 0.75rem;
        }
        .progress-stats {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .progress-stat {
          text-align: center;
        }
        .progress-label {
          display: block;
          font-size: 0.65rem;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }
        .progress-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
        }
        .progress-tip {
          font-size: 0.7rem;
          color: #9ca3af;
          padding: 0.5rem;
          background: rgba(139, 92, 246, 0.1);
          border-radius: 6px;
          text-align: center;
          border-left: 3px solid #8b5cf6;
        }
        
        /* QUICK ACTIONS GRID */
        .quick-action-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }
        .quick-action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 0.75rem;
          border-radius: 10px;
          border: 1px solid #3a3a50;
          background: #1e1e32;
          cursor: pointer;
          transition: all 0.2s;
        }
        .quick-action-btn span:first-child { font-size: 1.25rem; }
        .quick-action-btn span:last-child { font-size: 0.75rem; color: #9ca3af; }
        .quick-action-btn.quality { border-color: rgba(16, 185, 129, 0.3); }
        .quick-action-btn.quality:hover { background: rgba(16, 185, 129, 0.15); border-color: #10b981; }
        .quick-action-btn.crunch { border-color: rgba(239, 68, 68, 0.3); }
        .quick-action-btn.crunch:hover { background: rgba(239, 68, 68, 0.15); border-color: #ef4444; }
        .quick-action-btn.proto { border-color: rgba(139, 92, 246, 0.3); }
        .quick-action-btn.proto:hover { background: rgba(139, 92, 246, 0.15); border-color: #8b5cf6; }
        .quick-action-btn.schedule { border-color: rgba(245, 158, 11, 0.3); }
        .quick-action-btn.schedule:hover { background: rgba(245, 158, 11, 0.15); border-color: #f59e0b; }
        
        /* MEETINGS GRID */
        .meetings-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .meeting-chip {
          padding: 0.5rem 0.75rem;
          background: #252540;
          border: 1px solid #3a3a50;
          border-radius: 20px;
          color: #d1d5db;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .meeting-chip:hover:not(:disabled) {
          background: #2a2a50;
          border-color: #6366f1;
        }
        .meeting-chip.done {
          background: rgba(16, 185, 129, 0.2);
          border-color: #10b981;
          color: #10b981;
        }
        .meeting-chip:disabled { opacity: 0.6; cursor: default; }
        
        /* INFO PANEL */
        .info-panel {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: calc(100vh - 280px);
          overflow-y: auto;
        }
        .status-card, .team-panel, .alert-card, .metrics-card, .stakeholder-card, .risks-card, .milestones-card {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 16px;
          padding: 1.25rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .status-card h4, .team-panel h4, .metrics-card h4, .stakeholder-card h4, .risks-card h4, .milestones-card h4, .radar-card h4 { 
          font-size: 0.9rem; 
          color: #9ca3af; 
          margin-bottom: 1rem; 
        }
        
        /* RISK RADAR */
        .radar-card {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 16px;
          padding: 1rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .risk-radar {
          display: flex;
          justify-content: center;
          margin-bottom: 0.5rem;
        }
        .risk-radar svg {
          width: 140px;
          height: 140px;
        }
        .radar-legend {
          display: flex;
          justify-content: center;
          gap: 1rem;
          font-size: 0.7rem;
        }
        .legend-item { color: #9ca3af; }
        .legend-item.good { color: #10b981; }
        .legend-item.warn { color: #f59e0b; }
        .legend-item.bad { color: #ef4444; }
        
        .status-items {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .status-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid #2a2a40;
        }
        .status-item:last-child { border-bottom: none; }
        .status-item span { font-size: 0.85rem; color: #9ca3af; }
        .status-value { font-weight: 600; color: #ffffff !important; }
        .status-value.bad { color: #ef4444 !important; }
        
        /* METRICS CARD */
        .metric-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .metric-row:last-child { margin-bottom: 0; }
        .metric-name {
          font-size: 0.75rem;
          color: #9ca3af;
          width: 80px;
          flex-shrink: 0;
        }
        .metric-bar-container {
          flex: 1;
          height: 6px;
          background: #2a2a40;
          border-radius: 3px;
          overflow: hidden;
        }
        .metric-bar {
          height: 100%;
          border-radius: 3px;
          transition: width 0.5s ease;
        }
        .metric-pct {
          font-size: 0.75rem;
          font-weight: 600;
          color: #ffffff;
          width: 35px;
          text-align: right;
        }
        .metric-pct.bad { color: #ef4444; }
        
        /* STAKEHOLDER MESSAGES */
        .message-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .message {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem;
          background: #252540;
          border-radius: 10px;
          border-left: 3px solid #3a3a50;
          position: relative;
        }
        .message.urgent { border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1); }
        .message.warning { border-left-color: #f59e0b; background: rgba(245, 158, 11, 0.1); }
        .message.info { border-left-color: #3b82f6; }
        .message.success { border-left-color: #10b981; background: rgba(16, 185, 129, 0.1); }
        .msg-icon { font-size: 1.25rem; }
        .msg-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .msg-from {
          font-size: 0.7rem;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .msg-text {
          font-size: 0.8rem;
          color: #d1d5db;
          line-height: 1.4;
        }
        .msg-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
        }
        .msg-badge.urgent { background: #ef4444; color: white; }
        
        /* RISKS CARD */
        .risk-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .risk-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 0.75rem;
          background: #252540;
          border-radius: 8px;
        }
        .risk-level {
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .risk-item.high .risk-level { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
        .risk-item.med .risk-level { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
        .risk-item.low .risk-level { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
        .risk-item.none { justify-content: center; }
        .risk-item.none .risk-text { color: #10b981; font-style: italic; }
        .risk-text {
          font-size: 0.8rem;
          color: #d1d5db;
        }
        
        /* MILESTONES CARD */
        .milestone-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .milestone-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 0.75rem;
          background: #252540;
          border-radius: 8px;
          opacity: 0.6;
        }
        .milestone-item.complete { opacity: 1; }
        .milestone-item.current { 
          opacity: 1; 
          border: 1px solid #6366f1;
          background: rgba(99, 102, 241, 0.1);
        }
        .milestone-marker {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3a3a50;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          color: #10b981;
        }
        .milestone-item.complete .milestone-marker { background: #10b981; }
        .milestone-item.current .milestone-marker { background: #6366f1; border: 2px solid #8b5cf6; }
        .milestone-name {
          flex: 1;
          font-size: 0.8rem;
          color: #d1d5db;
        }
        .milestone-item.complete .milestone-name { color: #10b981; }
        .milestone-week {
          font-size: 0.7rem;
          font-weight: 600;
          color: #6b7280;
        }
        .milestone-item.current .milestone-week { color: #8b5cf6; }
        
        /* TEAM BUBBLES */
        .team-bubbles {
          display: flex;
          justify-content: space-around;
          gap: 0.5rem;
        }
        .team-bubble {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.75rem;
        }
        .team-bubble span { font-size: 0.7rem; }
        .team-bubble small { font-size: 0.65rem; opacity: 0.8; }
        .team-bubble.dev { background: linear-gradient(135deg, #3b82f6, #60a5fa); }
        .team-bubble.qa { background: linear-gradient(135deg, #10b981, #34d399); }
        .team-bubble.pm { background: linear-gradient(135deg, #8b5cf6, #a78bfa); }
        .team-bubble.other { background: linear-gradient(135deg, #f59e0b, #fbbf24); }
        
        /* ALERT CARD */
        .alert-card.critical {
          background: linear-gradient(135deg, #3a1a1a 0%, #2a1515 100%);
          border-color: rgba(239, 68, 68, 0.4);
        }
        .alert-header {
          font-size: 0.75rem;
          font-weight: 700;
          color: #ef4444;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }
        .alert-card h4 { color: #ffffff; margin-bottom: 0.5rem; }
        .alert-card p { font-size: 0.85rem; color: #d1d5db; margin-bottom: 1rem; }
        .alert-respond-btn {
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }
        
        /* TIMELINE */
        .timeline-panel {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 16px;
          padding: 1.25rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .timeline-panel h4 { font-size: 0.9rem; color: #9ca3af; margin: 0; }
        .timeline-status {
          font-size: 0.75rem;
          font-weight: 500;
          color: #d1d5db;
        }
        .timeline-bar {
          height: 12px;
          background: #2a2a40;
          border-radius: 6px;
          position: relative;
          margin-bottom: 1rem;
        }
        .timeline-progress {
          height: 100%;
          background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 6px;
          transition: width 0.5s ease;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.4);
        }
        .timeline-marker {
          position: absolute;
          top: -4px;
          width: 20px;
          height: 20px;
          background: #ffffff;
          border: 3px solid #8b5cf6;
          border-radius: 50%;
          transform: translateX(-50%);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          z-index: 10;
        }
        .timeline-milestone {
          position: absolute;
          top: -8px;
          transform: translateX(-50%);
          z-index: 5;
        }
        .timeline-milestone span {
          font-size: 1rem;
          opacity: 0.4;
          transition: all 0.3s;
        }
        .timeline-milestone span.done {
          opacity: 1;
        }
        .timeline-milestone.deadline span {
          opacity: 1;
          font-size: 1.1rem;
        }
        .timeline-weeks {
          display: flex;
          justify-content: space-between;
        }
        .week-mark {
          font-size: 0.65rem;
          color: #6b7280;
        }
        .week-mark.past { color: #9ca3af; }
        .week-mark.current { color: #8b5cf6; font-weight: 700; }
        
        /* ADVANCE BUTTON */
        .btn-advance {
          width: 100%;
          margin-top: 1rem;
          padding: 1rem;
          font-size: 1rem;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none;
          color: white;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
        }
        .btn-advance:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(99, 102, 241, 0.5);
        }
        
        /* ENHANCED EVENT MODAL */
        .event-modal.enhanced {
          background: linear-gradient(135deg, #1a1a2e 0%, #252540 100%);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 24px;
          padding: 0;
          max-width: 600px;
          overflow: hidden;
          box-shadow: 0 25px 80px rgba(0,0,0,0.5), 0 0 60px rgba(239, 68, 68, 0.1);
        }
        .event-modal-header {
          padding: 1.5rem 2rem;
          text-align: center;
        }
        .event-modal-header.critical {
          background: linear-gradient(135deg, #3a1a1a 0%, #2a1515 100%);
          border-bottom: 1px solid rgba(239, 68, 68, 0.2);
        }
        .event-type {
          font-size: 0.75rem;
          font-weight: 700;
          color: #ef4444;
          letter-spacing: 0.15em;
          display: block;
          margin-bottom: 0.5rem;
        }
        .event-modal-header h2 {
          font-size: 1.5rem;
          color: #ffffff;
          margin: 0;
        }
        .event-modal-body {
          padding: 1.5rem 2rem;
        }
        .event-description p {
          color: #d1d5db;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .impact-analysis h5 {
          font-size: 0.85rem;
          color: #9ca3af;
          margin-bottom: 0.75rem;
        }
        .impact-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .impact-card {
          background: #252540;
          border: 1px solid #3a3a50;
          border-radius: 10px;
          padding: 0.75rem;
          text-align: center;
        }
        .impact-label {
          display: block;
          font-size: 0.7rem;
          color: #9ca3af;
          margin-bottom: 0.25rem;
        }
        .impact-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffffff;
        }
        .impact-value.warn { color: #f59e0b; }
        
        .event-options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        .event-option-card {
          padding: 1rem;
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%);
          border: 2px solid #3a3a50;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }
        .event-option-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .event-option-card.enhanced {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .option-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .option-icon {
          font-size: 1.25rem;
        }
        .option-risk {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .option-label {
          font-size: 0.9rem;
          font-weight: 500;
          display: block;
          color: #ffffff;
        }
        .option-consequences {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.25rem;
        }
        .option-consequences span {
          font-size: 0.7rem;
          padding: 0.2rem 0.4rem;
          background: #2a2a40;
          border-radius: 4px;
        }
        .option-consequences span.positive { color: #10b981; background: rgba(16, 185, 129, 0.15); }
        .option-consequences span.negative { color: #ef4444; background: rgba(239, 68, 68, 0.15); }
        
        .event-footer {
          padding: 1rem 2rem;
          background: #1a1a28;
          text-align: center;
          font-size: 0.8rem;
          color: #9ca3af;
        }
        
        .metric-card {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 20px;
          padding: 0.75rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          position: relative;
          transition: all 0.3s ease;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
        }
        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(99, 102, 241, 0.2);
          border-color: rgba(99, 102, 241, 0.4);
        }
        
        .gauge-container {
          position: relative;
          width: 72px;
          height: 72px;
        }
        .gauge-container.mini {
          width: 65px;
          height: 65px;
        }
        
        .gauge {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        
        .gauge-bg {
          fill: none;
          stroke: #2a2a40;
          stroke-width: 7;
        }
        
        .gauge-fill {
          fill: none;
          stroke-width: 7;
          stroke-linecap: round;
          transition: stroke-dasharray 0.6s ease, stroke 0.3s ease;
          filter: drop-shadow(0 0 6px currentColor);
        }
        
        .gauge-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1px;
        }
        
        .gauge-icon {
          font-size: 1.1rem;
          line-height: 1;
        }
        .gauge-icon.large {
          font-size: 1.6rem;
        }
        
        .gauge-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 700;
          color: #ffffff;
        }
        .gauge-value.large {
          font-size: 1.1rem;
        }
        
        .metric-label {
          font-size: 0.65rem;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .team-display, .proto-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 2px;
        }
        
        /* Status Glow Effects */
        .status-glow {
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 35px;
          height: 3px;
          border-radius: 2px;
        }
        .status-glow.good {
          background: #10b981;
          box-shadow: 0 0 10px #10b981, 0 0 20px rgba(16, 185, 129, 0.5);
          animation: glow-good 2s ease-in-out infinite;
        }
        .status-glow.warn {
          background: #f59e0b;
          box-shadow: 0 0 10px #f59e0b, 0 0 20px rgba(245, 158, 11, 0.5);
          animation: glow-warn 1.5s ease-in-out infinite;
        }
        .status-glow.bad {
          background: #ef4444;
          box-shadow: 0 0 10px #ef4444, 0 0 20px rgba(239, 68, 68, 0.5);
          animation: glow-bad 1s ease-in-out infinite;
        }
        .status-glow.neutral {
          background: #94a3b8;
          box-shadow: 0 0 6px rgba(148, 163, 184, 0.3);
        }
        
        @keyframes glow-good {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; box-shadow: 0 0 15px #10b981, 0 0 30px rgba(16, 185, 129, 0.6); }
        }
        @keyframes glow-warn {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; box-shadow: 0 0 15px #f59e0b, 0 0 30px rgba(245, 158, 11, 0.6); }
        }
        @keyframes glow-bad {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; box-shadow: 0 0 15px #ef4444, 0 0 30px rgba(239, 68, 68, 0.6); }
        }
        
        /* ========== GANTT MASCOT ========== */
        .gantt-mascot {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 100;
          transition: all 0.3s ease;
        }
        .gantt-svg {
          width: 100px;
          height: 85px;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));
          transition: transform 0.3s ease;
        }
        .gantt-mascot:hover .gantt-svg {
          transform: scale(1.1);
        }
        .gantt-mascot:hover .mascot-tooltip {
          opacity: 1;
          transform: translateX(0);
        }
        .mascot-tooltip {
          position: absolute;
          bottom: 100%;
          right: 0;
          background: rgba(0,0,0,0.85);
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          margin-bottom: 8px;
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.3s ease;
          pointer-events: none;
        }
        .mascot-tooltip::after {
          content: '';
          position: absolute;
          bottom: -6px;
          right: 20px;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid rgba(0,0,0,0.85);
        }
        
        /* Gantt bars animation */
        .gantt-mascot .bar {
          transition: all 0.5s ease;
        }
        
        /* Normal state */
        .gantt-mascot.normal .gantt-mouth { d: path("M50 60 Q55 65 60 60"); }
        .gantt-mascot.normal .explosion { opacity: 0; }
        
        /* Concerned state */
        .gantt-mascot.concerned .bar.b1 { width: 55px; }
        .gantt-mascot.concerned .bar.b2 { width: 60px; x: 35px; }
        .gantt-mascot.concerned .bar.b3 { width: 50px; }
        .gantt-mascot.concerned .gantt-mouth { d: path("M48 62 Q55 60 62 62"); }
        .gantt-mascot.concerned .explosion { opacity: 0; }
        .gantt-mascot.concerned .gantt-svg { animation: mascotWobble 2s ease-in-out infinite; }
        
        /* Stressed state */
        .gantt-mascot.stressed .bar {
          animation: barChaos 0.3s infinite;
        }
        .gantt-mascot.stressed .bar.b1 { width: 70px; fill: #ef4444; }
        .gantt-mascot.stressed .bar.b2 { width: 75px; x: 30px; fill: #ef4444; animation-delay: -0.1s; }
        .gantt-mascot.stressed .bar.b3 { width: 60px; fill: #f59e0b; animation-delay: -0.2s; }
        .gantt-mascot.stressed .bar.b4 { width: 40px; fill: #ef4444; }
        .gantt-mascot.stressed .gantt-mouth { d: path("M48 64 Q55 58 62 64"); }
        .gantt-mascot.stressed .deadline { animation: deadlinePanic 0.2s infinite; stroke: #ef4444; }
        .gantt-mascot.stressed .deadline-text { animation: deadlinePanic 0.2s infinite; }
        .gantt-mascot.stressed .explosion { opacity: 1; animation: explode 0.3s infinite; }
        .gantt-mascot.stressed .gantt-eyes circle:not([fill="white"]) { animation: eyePanic 0.3s infinite; }
        .gantt-mascot.stressed .gantt-svg { animation: mascotShake 0.2s infinite; }
        
        /* Success state */
        .gantt-mascot.success .bar { fill: #10b981; }
        .gantt-mascot.success .gantt-mouth { d: path("M46 58 Q55 68 64 58"); }
        .gantt-mascot.success .deadline { stroke: #10b981; }
        .gantt-mascot.success .deadline-text { fill: #10b981; }
        .gantt-mascot.success .explosion { opacity: 0; }
        .gantt-mascot.success .gantt-svg { animation: mascotBounce 1s ease-in-out infinite; }
        
        @keyframes barChaos {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        @keyframes deadlinePanic {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(2px); }
        }
        @keyframes explode {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes eyePanic {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(1px); }
        }
        @keyframes mascotWobble {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes mascotShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        @keyframes mascotBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        /* Hide on mobile for space */
        @media (max-width: 600px) {
          .gantt-mascot { display: none; }
        }
        
        .proto-card {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.15) 100%);
          border-color: rgba(139, 92, 246, 0.4);
        }
        
        /* Game Actions - Enhanced DARK THEME */
        .sim-playing .game-actions { 
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 24px; 
          padding: 1.5rem; 
          box-shadow: 0 8px 40px rgba(0,0,0,0.4);
          position: relative;
          z-index: 1;
        }
        .sim-playing .game-actions > h3 { font-size: 1.1rem; margin-bottom: 1.25rem; color: #8b5cf6; }
        .sim-playing .action-section { margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(99, 102, 241, 0.15); }
        .sim-playing .action-section h4 { font-size: 0.9rem; color: #9ca3af; margin-bottom: 0.75rem; font-weight: 600; }
        .action-row { display: flex; align-items: center; gap: 1rem; }
        .sim-playing .action-btn { 
          padding: 0.6rem 1.25rem; 
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%); 
          border: 1px solid #3a3a50; 
          border-radius: 10px; 
          color: #ffffff; 
          font-family: inherit; 
          font-weight: 500;
          cursor: pointer; 
          transition: all 0.2s; 
        }
        .sim-playing .action-btn:hover:not(:disabled) { background: linear-gradient(135deg, #2a2a50 0%, #252545 100%); border-color: var(--accent-primary); box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2); }
        .sim-playing .action-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .sim-playing .action-label { font-family: 'JetBrains Mono', monospace; font-weight: 700; min-width: 120px; text-align: center; color: #ffffff; }
        
        /* Meeting Options - Enhanced DARK THEME */
        .meeting-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
        .sim-playing .meeting-btn { 
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%);
          border: 2px solid #3a3a50; 
          border-radius: 16px; 
          padding: 1rem; 
          text-align: left; 
          cursor: pointer; 
          transition: all 0.3s ease; 
          display: flex; 
          flex-direction: column; 
          gap: 0.25rem;
          position: relative;
          overflow: hidden;
        }
        .sim-playing .meeting-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .sim-playing .meeting-btn:hover:not(:disabled) { 
          border-color: #6366f1; 
          background: linear-gradient(135deg, #2a2a50 0%, #252545 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.25);
        }
        .sim-playing .meeting-btn:hover:not(:disabled)::before { opacity: 1; }
        .sim-playing .meeting-btn.active { 
          border-color: #10b981; 
          background: linear-gradient(135deg, #1a3a2e 0%, #1e3a32 100%);
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
        }
        .sim-playing .meeting-btn.active::before { 
          opacity: 1;
          background: linear-gradient(90deg, #10b981, #059669);
        }
        .sim-playing .meeting-btn:disabled { opacity: 0.7; cursor: default; }
        .meeting-icon { font-size: 1.5rem; }
        .sim-playing .meeting-name { font-weight: 700; font-size: 0.9rem; color: #ffffff; }
        .sim-playing .meeting-desc { font-size: 0.8rem; color: #9ca3af; line-height: 1.4; }
        .sim-playing .meeting-done { color: #10b981; font-size: 0.8rem; font-weight: 700; margin-top: 0.25rem; }
        
        /* Quick Actions - Enhanced DARK THEME */
        .quick-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .sim-playing .quick-btn { 
          padding: 0.75rem 1.25rem; 
          background: linear-gradient(135deg, #1a3a2e 0%, #1e3a32 100%);
          border: 2px solid rgba(16, 185, 129, 0.3); 
          border-radius: 12px; 
          color: #10b981; 
          font-family: inherit; 
          font-weight: 600;
          cursor: pointer; 
          transition: all 0.3s ease; 
          font-size: 0.9rem;
          position: relative;
          overflow: hidden;
        }
        .sim-playing .quick-btn::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(16, 185, 129, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.4s ease, height 0.4s ease;
        }
        .sim-playing .quick-btn:hover:not(:disabled)::after {
          width: 200px;
          height: 200px;
        }
        .sim-playing .quick-btn:hover:not(:disabled) { 
          background: linear-gradient(135deg, #1e4035 0%, #224038 100%);
          border-color: #10b981;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
        }
        .sim-playing .quick-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .sim-playing .quick-btn.crunch { 
          background: linear-gradient(135deg, #3a1a1a 0%, #3a1e1e 100%);
          border-color: rgba(239, 68, 68, 0.3); 
          color: #ef4444; 
        }
        .sim-playing .quick-btn.crunch:hover:not(:disabled) { 
          background: linear-gradient(135deg, #4a2020 0%, #4a2424 100%);
          border-color: #ef4444;
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
        }
        .sim-playing .quick-btn.proto { 
          background: linear-gradient(135deg, #2a1a3a 0%, #2e1e3a 100%);
          border-color: rgba(139, 92, 246, 0.3); 
          color: #a78bfa; 
        }
        .sim-playing .quick-btn.proto:hover:not(:disabled) { 
          background: linear-gradient(135deg, #3a2050 0%, #3e2454 100%);
          border-color: #8b5cf6;
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3);
        }
        .sim-playing .quick-btn.schedule { 
          background: linear-gradient(135deg, #3a2a1a 0%, #3a2e1e 100%);
          border-color: rgba(245, 158, 11, 0.3); 
          color: #fbbf24; 
        }
        .sim-playing .quick-btn.schedule:hover:not(:disabled) { 
          background: linear-gradient(135deg, #4a3520 0%, #4a3924 100%);
          border-color: #f59e0b;
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.3);
        }
        
        .sim-playing .warning-banner { 
          background: linear-gradient(135deg, #3a2a1a 0%, #3a2e1e 100%); 
          border: 2px solid rgba(245, 158, 11, 0.4); 
          border-radius: 10px; 
          padding: 0.75rem 1rem; 
          color: #fbbf24; 
          font-size: 0.9rem; 
          font-weight: 500;
          margin-bottom: 1rem; 
        }
        
        .sim-playing .btn-advance { 
          width: 100%; 
          margin-top: 1rem; 
          padding: 1rem; 
          font-size: 1rem; 
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none;
          color: white;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
        }
        .sim-playing .btn-advance:hover { background: linear-gradient(135deg, #5558e8 0%, #7c4fe3 100%); transform: translateY(-2px); box-shadow: 0 6px 25px rgba(99, 102, 241, 0.5); }
        
        /* Event Modal - LIGHT THEME */
        .sim-playing .event-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 200; padding: 1rem; backdrop-filter: blur(8px); }
        .sim-playing .event-modal { 
          background: linear-gradient(135deg, #1a1a2e 0%, #252540 100%); 
          border: 1px solid rgba(99, 102, 241, 0.3); 
          border-radius: 24px; 
          padding: 2.5rem; 
          max-width: 520px; 
          width: 100%; 
          text-align: center; 
          box-shadow: 0 25px 80px rgba(0,0,0,0.5), 0 0 60px rgba(99, 102, 241, 0.15);
        }
        .sim-playing .event-icon { font-size: 3.5rem; margin-bottom: 1rem; display: block; }
        .sim-playing .event-modal h2 { font-size: 1.5rem; margin-bottom: 0.75rem; color: #ffffff; }
        .sim-playing .event-modal p { color: #d1d5db; line-height: 1.7; margin-bottom: 2rem; }
        .sim-playing .event-options { display: flex; flex-direction: column; gap: 0.6rem; }
        .sim-playing .event-option { 
          padding: 1rem 1.25rem; 
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%); 
          border: 2px solid #3a3a50; 
          border-radius: 12px; 
          color: #ffffff; 
          font-family: inherit; 
          font-size: 0.95rem; 
          font-weight: 500;
          cursor: pointer; 
          text-align: left; 
          transition: all 0.3s ease; 
        }
        .sim-playing .event-option:hover { background: linear-gradient(135deg, #2a2a45 0%, #1e1e38 100%); border-color: #6366f1; transform: translateX(6px); box-shadow: 0 4px 20px rgba(99, 102, 241, 0.2); }
        
        /* CSS Alert Bell Animation */
        .alert-bell {
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          box-shadow: 0 4px 30px rgba(239, 68, 68, 0.5);
          animation: bellRing 0.5s ease-in-out infinite alternate;
          z-index: 10;
          border: 3px solid rgba(255,255,255,0.2);
        }
        @keyframes bellRing {
          0% { transform: translateX(-50%) rotate(-10deg); }
          100% { transform: translateX(-50%) rotate(10deg); }
        }
        .sim-playing .event-modal {
          position: relative;
          overflow: visible;
        }
        
        /* Paywall Modal Styles */
        .paywall-modal {
          max-width: 440px !important;
        }
        .paywall-modal .event-icon {
          font-size: 4rem;
          margin-bottom: 0.5rem;
        }
        .paywall-modal h2 {
          color: #6366f1 !important;
        }
        .paywall-hook {
          background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%);
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1.5rem !important;
        }
        .paywall-price {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.25rem;
          margin-bottom: 1rem;
        }
        .price-tag {
          font-size: 3rem;
          font-weight: 800;
          color: #6366f1;
        }
        .price-period {
          font-size: 1.25rem;
          color: #64748b;
        }
        .paywall-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          text-align: left;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          color: #475569;
        }
        .paywall-features div {
          padding: 0.25rem 0;
        }
        .paywall-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .paywall-upgrade {
          padding: 1rem 2rem !important;
          font-size: 1.1rem !important;
          font-weight: 600;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
          border: none !important;
          border-radius: 12px;
          color: white;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .paywall-upgrade:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
        }
        .paywall-later {
          padding: 0.75rem 1.5rem;
          background: transparent !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 8px;
          color: #64748b;
          cursor: pointer;
          font-size: 0.9rem;
        }
        .paywall-later:hover {
          background: #f8fafc !important;
        }
        
        /* End Screen - LIGHT THEME with CSS Animations */
        .sim-ended { 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          min-height: 100vh; 
          padding: 2rem; 
          background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%);
          position: relative;
          overflow: hidden;
        }
        
        /* CSS Confetti */
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 100;
          overflow: hidden;
        }
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -20px;
          animation: confettiFall linear forwards;
        }
        .confetti-piece:nth-child(odd) { border-radius: 50%; }
        .confetti-piece:nth-child(even) { border-radius: 2px; transform: rotate(45deg); }
        @keyframes confettiFall {
          0% { top: -20px; opacity: 1; transform: rotate(0deg) translateX(0); }
          100% { top: 110vh; opacity: 0; transform: rotate(720deg) translateX(100px); }
        }
        
        /* CSS Success Checkmark */
        .success-animation {
          width: 100px;
          height: 100px;
          margin: 0 auto;
        }
        .success-circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: scaleIn 0.5s ease-out;
          box-shadow: 0 10px 40px rgba(16, 185, 129, 0.4);
        }
        @keyframes scaleIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .checkmark {
          width: 50px;
          height: 50px;
          stroke: white;
          stroke-width: 4;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          animation: drawCheck 0.6s ease-out 0.3s forwards;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
        
        /* CSS Sad Face Animation */
        .sad-animation {
          width: 100px;
          height: 100px;
          margin: 0 auto;
        }
        .sad-face {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #fecaca 0%, #ef4444 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          animation: sadBounce 1s ease-in-out infinite;
          box-shadow: 0 10px 40px rgba(239, 68, 68, 0.3);
        }
        @keyframes sadBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .sad-eyes {
          display: flex;
          gap: 20px;
          margin-bottom: 8px;
        }
        .sad-eye {
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          position: relative;
        }
        .sad-eye::after {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          background: #1e293b;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .sad-mouth {
          width: 30px;
          height: 15px;
          border: 4px solid white;
          border-top: none;
          border-radius: 0 0 30px 30px;
          transform: rotate(180deg);
        }
        
        /* End animation container */
        .end-animation, .results-animation {
          margin-bottom: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100px;
        }
        .trophy-icon {
          font-size: 4rem;
          animation: bounce 1s ease infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        /* NEW RESULTS CONTAINER */
        .results-container {
          max-width: 800px;
          width: 100%;
          padding: 2rem;
          position: relative;
          z-index: 10;
          animation: slideUp 0.5s ease-out;
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .results-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .results-header h1 {
          font-size: 2rem;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }
        .results-subtitle {
          color: #9ca3af;
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }
        
        /* Grade Display */
        .grade-display {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 20px;
          padding: 1.5rem 3rem;
          display: inline-block;
        }
        .main-grade {
          font-size: 5rem;
          font-weight: 800;
          line-height: 1;
          display: block;
        }
        .grade-label {
          font-size: 0.85rem;
          color: #9ca3af;
          display: block;
          margin-top: 0.5rem;
        }
        
        /* Mission Recap */
        .mission-recap {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .mission-recap h3 {
          font-size: 1rem;
          color: #9ca3af;
          margin-bottom: 0.5rem;
        }
        .mission-intro {
          font-size: 0.85rem;
          color: #6b7280;
          margin-bottom: 1.25rem;
        }
        .objectives-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.75rem;
        }
        @media (max-width: 800px) {
          .objectives-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 500px) {
          .objectives-grid { grid-template-columns: 1fr; }
        }
        .objective-card {
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%);
          border: 1px solid #3a3a50;
          border-radius: 12px;
          padding: 1rem;
        }
        .objective-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #3a3a50;
        }
        .objective-icon { font-size: 1rem; }
        .objective-name {
          font-size: 0.75rem;
          font-weight: 600;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .objective-target, .objective-result {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          margin-bottom: 0.5rem;
        }
        .objective-result { margin-bottom: 0; }
        .target-label, .result-label {
          font-size: 0.65rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .target-value {
          font-size: 0.8rem;
          color: #9ca3af;
        }
        .result-value {
          font-size: 0.85rem;
          font-weight: 600;
        }
        .result-value.good { color: #10b981; }
        .result-value.bad { color: #ef4444; }
        
        /* Score Breakdown */
        .score-breakdown {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .score-breakdown h3 {
          font-size: 1rem;
          color: #9ca3af;
          margin-bottom: 1.25rem;
        }
        .breakdown-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
        }
        @media (max-width: 700px) {
          .breakdown-grid { grid-template-columns: repeat(2, 1fr); }
        }
        
        .breakdown-card {
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%);
          border: 1px solid #3a3a50;
          border-radius: 12px;
          padding: 1rem;
          text-align: center;
        }
        .breakdown-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          margin-bottom: 0.5rem;
        }
        .breakdown-icon { font-size: 1rem; }
        .breakdown-title {
          font-size: 0.75rem;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .breakdown-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        .breakdown-bar {
          height: 4px;
          background: #2a2a40;
          border-radius: 2px;
          margin-bottom: 0.5rem;
        }
        .breakdown-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.5s ease;
        }
        .breakdown-status {
          font-size: 0.7rem;
          color: #6b7280;
        }
        
        /* Performance Analysis */
        .analysis-section {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .analysis-section h3 {
          font-size: 1rem;
          color: #9ca3af;
          margin-bottom: 1.25rem;
        }
        .analysis-card {
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1rem;
          border-left: 4px solid #3a3a50;
        }
        .analysis-card:last-child { margin-bottom: 0; }
        .analysis-card.good { border-left-color: #10b981; background: rgba(16, 185, 129, 0.05); }
        .analysis-card.improve { border-left-color: #f59e0b; background: rgba(245, 158, 11, 0.05); }
        .analysis-card.tips { border-left-color: #6366f1; background: rgba(99, 102, 241, 0.05); }
        .analysis-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .analysis-icon { font-size: 1.1rem; }
        .analysis-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffffff;
        }
        .analysis-card.good .analysis-title { color: #10b981; }
        .analysis-card.improve .analysis-title { color: #f59e0b; }
        .analysis-card.tips .analysis-title { color: #8b5cf6; }
        .analysis-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .analysis-list li {
          font-size: 0.85rem;
          color: #d1d5db;
          line-height: 1.6;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-left: 1.25rem;
          position: relative;
        }
        .analysis-list li:last-child { border-bottom: none; }
        .analysis-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #6b7280;
        }
        .analysis-card.good .analysis-list li::before { color: #10b981; }
        .analysis-card.improve .analysis-list li::before { color: #f59e0b; }
        .analysis-card.tips .analysis-list li::before { color: #8b5cf6; }
        .analysis-list li strong {
          color: #ffffff;
        }
        
        /* Achievements */
        .achievements-section {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .achievements-section h3 {
          font-size: 1rem;
          color: #9ca3af;
          margin-bottom: 1rem;
        }
        .achievements-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
        }
        .achievement-badge {
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%);
          border: 1px solid #3a3a50;
          border-radius: 10px;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
        }
        .achievement-badge.unlocked {
          border-color: #10b981;
          background: rgba(16, 185, 129, 0.1);
        }
        .achievement-badge.locked {
          opacity: 0.5;
        }
        .achievement-icon { font-size: 1.25rem; }
        .achievement-name {
          font-size: 0.8rem;
          font-weight: 500;
          color: #d1d5db;
        }
        .lock-icon {
          font-size: 0.7rem;
          position: absolute;
          top: -4px;
          right: -4px;
        }
        
        /* Final Score Card */
        .final-score-card {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 16px;
          padding: 1.25rem;
          text-align: center;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 30px rgba(99, 102, 241, 0.4);
        }
        .final-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.8);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: block;
        }
        .final-value {
          font-size: 3rem;
          font-weight: 800;
          color: #ffffff;
        }
        .final-max {
          font-size: 1rem;
          color: rgba(255,255,255,0.7);
        }
        
        /* Results Actions */
        .results-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-primary-lg {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
        }
        .btn-primary-lg:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(99, 102, 241, 0.5);
        }
        .btn-secondary-lg {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%);
          border: 1px solid #3a3a50;
          border-radius: 12px;
          color: #d1d5db;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }
        .btn-secondary-lg:hover {
          border-color: #6366f1;
          background: linear-gradient(135deg, #2a2a50 0%, #252545 100%);
        }
        
        /* Secondary Actions (Print/Share) */
        .results-secondary-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1rem;
        }
        .btn-print {
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: 1px solid #3a3a50;
          border-radius: 8px;
          color: #9ca3af;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        .btn-print:hover {
          border-color: #6366f1;
          color: #ffffff;
          background: rgba(99, 102, 241, 0.1);
        }
        
        /* Print Styles */
        @media print {
          body {
            background: white !important;
            color: black !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .app {
            background: white !important;
          }
          .sim-end {
            background: white !important;
            padding: 0 !important;
          }
          .floating-shapes, 
          .navbar,
          .results-actions,
          .results-secondary-actions,
          .btn-print,
          .btn-primary-lg,
          .btn-secondary-lg {
            display: none !important;
          }
          .results-container {
            max-width: 100% !important;
            padding: 0 !important;
          }
          .results-header {
            margin-bottom: 1rem !important;
          }
          .results-header h1 {
            color: #1a1a2e !important;
            font-size: 1.5rem !important;
          }
          .results-subtitle {
            color: #666 !important;
          }
          .grade-display {
            background: #f3f4f6 !important;
            border: 2px solid #e5e7eb !important;
            padding: 1rem 2rem !important;
          }
          .main-grade {
            font-size: 3rem !important;
          }
          .grade-label {
            color: #666 !important;
          }
          .mission-recap,
          .score-breakdown,
          .analysis-section,
          .achievements-section {
            background: #f9fafb !important;
            border: 1px solid #e5e7eb !important;
            page-break-inside: avoid;
            margin-bottom: 1rem !important;
            padding: 1rem !important;
          }
          .mission-recap h3,
          .score-breakdown h3,
          .analysis-section h3,
          .achievements-section h3 {
            color: #374151 !important;
            font-size: 0.9rem !important;
          }
          .mission-intro,
          .section-intro {
            color: #6b7280 !important;
          }
          .objectives-grid,
          .breakdown-grid {
            gap: 0.5rem !important;
          }
          .objective-card,
          .breakdown-card {
            background: white !important;
            border: 1px solid #e5e7eb !important;
            padding: 0.75rem !important;
          }
          .objective-name,
          .breakdown-title {
            color: #374151 !important;
          }
          .target-value {
            color: #6b7280 !important;
          }
          .result-value.good {
            color: #059669 !important;
          }
          .result-value.bad {
            color: #dc2626 !important;
          }
          .breakdown-value {
            font-size: 1.25rem !important;
          }
          .breakdown-bar {
            background: #e5e7eb !important;
          }
          .analysis-card {
            background: white !important;
            border: 1px solid #e5e7eb !important;
            page-break-inside: avoid;
          }
          .analysis-card.good {
            border-left: 4px solid #059669 !important;
          }
          .analysis-card.improve {
            border-left: 4px solid #d97706 !important;
          }
          .analysis-card.tips {
            border-left: 4px solid #4f46e5 !important;
          }
          .analysis-title {
            color: #374151 !important;
          }
          .analysis-card.good .analysis-title { color: #059669 !important; }
          .analysis-card.improve .analysis-title { color: #d97706 !important; }
          .analysis-card.tips .analysis-title { color: #4f46e5 !important; }
          .analysis-list li {
            color: #374151 !important;
            border-bottom-color: #e5e7eb !important;
          }
          .analysis-list li strong {
            color: #111827 !important;
          }
          .final-score-card {
            background: #4f46e5 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            page-break-inside: avoid;
          }
          .achievement-badge {
            background: white !important;
            border: 1px solid #e5e7eb !important;
          }
          .achievement-badge.locked {
            opacity: 0.5 !important;
          }
          
          /* Add print header */
          .results-container::before {
            content: "BizSimHub - Performance Report";
            display: block;
            text-align: center;
            font-size: 0.75rem;
            color: #9ca3af;
            margin-bottom: 0.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #e5e7eb;
          }
          
          /* Add print footer */
          .results-container::after {
            content: "Generated by BizSimHub.com - PM Training Simulations";
            display: block;
            text-align: center;
            font-size: 0.7rem;
            color: #9ca3af;
            margin-top: 1rem;
            padding-top: 0.5rem;
            border-top: 1px solid #e5e7eb;
          }
        }
        
        /* Legacy end-card (keep for fallback) */
        .end-card { 
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 28px; 
          padding: 2.5rem; 
          max-width: 550px; 
          width: 100%; 
          text-align: center; 
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(99, 102, 241, 0.1);
          position: relative;
          z-index: 10;
        }
        
        .end-icon { font-size: 3rem; margin-bottom: 1rem; display: block; }
        .end-card h1 { font-size: 1.75rem; margin-bottom: 0.25rem; color: #ffffff; }
        .end-card > p { color: #9ca3af; margin-bottom: 2rem; }
        .score-display { margin-bottom: 2rem; }
        .grade { font-size: 6rem; font-weight: 800; line-height: 1; }
        .score { font-family: 'JetBrains Mono', monospace; font-size: 1.5rem; color: #9ca3af; display: block; }
        .results { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 2rem; text-align: left; }
        .result { 
          padding: 0.85rem 1rem; 
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%); 
          border-radius: 10px; 
          display: flex; 
          align-items: center; 
          gap: 0.75rem; 
          font-size: 0.95rem; 
          color: #ffffff;
        }
        .result.pass { border-left: 4px solid #10b981; }
        .result.fail { border-left: 4px solid #ef4444; }
        .result.pass span { color: #10b981; font-weight: 700; }
        .result.fail span { color: #ef4444; font-weight: 700; }
        .end-actions { display: flex; flex-direction: column; gap: 0.75rem; }
        .end-actions .btn-primary { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border: none; color: white; box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4); }
        .end-actions .btn-primary:hover { background: linear-gradient(135deg, #5558e8 0%, #7c4fe3 100%); }
        .end-actions .btn-secondary { background: linear-gradient(135deg, #252540 0%, #1e1e32 100%); border: 1px solid #3a3a50; color: #d1d5db; }
        .end-actions .btn-secondary:hover { background: linear-gradient(135deg, #2a2a50 0%, #252545 100%); border-color: #6366f1; }
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

        /* ========== ADMIN DASHBOARD STYLES ========== */
        .admin-link {
          font-size: 1.2rem !important;
          padding: 0.25rem 0.5rem !important;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .admin-link:hover { opacity: 1; }

        .admin-page {
          min-height: 100vh;
          background: #f8fafc;
        }

        .admin-layout {
          display: flex;
          min-height: calc(100vh - 65px);
        }

        /* Admin Sidebar */
        .admin-sidebar {
          width: 260px;
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
          color: white;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 65px;
          height: calc(100vh - 65px);
        }

        .admin-sidebar-header {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .admin-sidebar-header .admin-logo { font-size: 1.5rem; }
        .admin-sidebar-header h2 { font-size: 1.1rem; font-weight: 700; margin: 0; }

        .admin-nav {
          flex: 1;
          padding: 1rem 0;
        }

        .admin-nav-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1.5rem;
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.7);
          font-size: 0.95rem;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }
        .admin-nav-btn:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }
        .admin-nav-btn.active {
          background: rgba(99, 102, 241, 0.3);
          color: white;
          border-left: 3px solid #6366f1;
        }
        .admin-nav-btn span { font-size: 1.1rem; }

        .admin-sidebar-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .admin-back-btn {
          width: 100%;
          padding: 0.75rem;
          background: rgba(255,255,255,0.1);
          border: none;
          border-radius: 8px;
          color: rgba(255,255,255,0.8);
          font-size: 0.9rem;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
        }
        .admin-back-btn:hover { background: rgba(255,255,255,0.2); color: white; }

        /* Admin Main Content */
        .admin-main {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
        }

        .admin-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .admin-header {
          margin-bottom: 2rem;
        }
        .admin-header h1 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 0.5rem;
        }
        .admin-header p {
          color: #64748b;
          margin: 0;
        }

        /* Admin Metrics Grid */
        .admin-metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .admin-metric-card {
          background: white;
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          position: relative;
        }

        .metric-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }
        .metric-icon.blue { background: #dbeafe; }
        .metric-icon.green { background: #dcfce7; }
        .metric-icon.purple { background: #f3e8ff; }
        .metric-icon.orange { background: #ffedd5; }

        .metric-info {
          flex: 1;
        }
        .metric-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
        }
        .metric-label {
          font-size: 0.85rem;
          color: #64748b;
        }

        .metric-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .metric-badge.green { background: #dcfce7; color: #16a34a; }
        .metric-badge.blue { background: #dbeafe; color: #2563eb; }
        .metric-badge.neutral { background: #f1f5f9; color: #64748b; }

        /* Admin Stats Row */
        .admin-stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .admin-stat-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .admin-stat-card h3 {
          font-size: 0.9rem;
          color: #64748b;
          font-weight: 500;
          margin: 0 0 0.75rem;
        }
        .stat-big {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }
        .stat-bar {
          height: 6px;
          background: #e2e8f0;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        .stat-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          border-radius: 3px;
        }
        .stat-sub {
          font-size: 0.8rem;
          color: #94a3b8;
        }

        /* Admin Section */
        .admin-section {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .admin-section h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 1rem;
        }

        /* Activity List */
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem;
          background: #f8fafc;
          border-radius: 10px;
        }
        .activity-icon { font-size: 1.25rem; }
        .activity-content {
          flex: 1;
          font-size: 0.9rem;
          color: #475569;
        }
        .activity-content strong { color: #1e293b; }
        .activity-time {
          display: block;
          font-size: 0.8rem;
          color: #94a3b8;
          margin-top: 0.25rem;
        }

        /* Admin Toolbar */
        .admin-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 0.6rem 1rem;
          min-width: 300px;
        }
        .search-box input {
          border: none;
          outline: none;
          font-size: 0.9rem;
          flex: 1;
          font-family: inherit;
        }

        .toolbar-actions {
          display: flex;
          gap: 0.75rem;
        }

        .admin-select {
          padding: 0.6rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.9rem;
          font-family: inherit;
          background: white;
          cursor: pointer;
        }

        .admin-btn {
          padding: 0.6rem 1.25rem;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.9rem;
          font-family: inherit;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
        }
        .admin-btn:hover { background: #f8fafc; border-color: #cbd5e1; }
        .admin-btn.primary {
          background: #6366f1;
          color: white;
          border-color: #6366f1;
        }
        .admin-btn.primary:hover { background: #4f46e5; }
        .admin-btn.danger {
          color: #dc2626;
          border-color: #fecaca;
        }
        .admin-btn.danger:hover { background: #fef2f2; }
        .admin-btn.small { padding: 0.4rem 0.75rem; font-size: 0.8rem; }
        
        /* Admin Loading & Error States */
        .admin-loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        .admin-loading-spinner {
          text-align: center;
        }
        .admin-loading-spinner .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e2e8f0;
          border-top-color: #6366f1;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 1rem;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .admin-loading-spinner p {
          color: #64748b;
          font-size: 0.9rem;
        }
        .admin-error-banner {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 0.75rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0;
        }
        .admin-error-banner button {
          background: #dc2626;
          color: white;
          border: none;
          padding: 0.4rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
        }
        .admin-error-banner button:hover {
          background: #b91c1c;
        }
        .refresh-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .refresh-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }
        .admin-header h1 {
          font-size: 1.75rem;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }
        .admin-header p {
          color: #64748b;
          font-size: 0.95rem;
        }
        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #64748b;
        }
        .empty-state .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .admin-badge {
          display: inline-block;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          margin-left: 0.5rem;
          vertical-align: middle;
          text-transform: uppercase;
        }
        .tester-badge {
          display: inline-block;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          margin-left: 0.5rem;
          vertical-align: middle;
          text-transform: uppercase;
        }
        .action-btn.admin-active {
          background: #fef3c7;
          border-color: #f59e0b;
        }
        .action-btn.admin-active:hover {
          background: #fde68a;
        }
        .action-btn.tester-active {
          background: #d1fae5;
          border-color: #10b981;
        }
        .action-btn.tester-active:hover {
          background: #a7f3d0;
        }

        /* Admin Table */
        .admin-table-container {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        .admin-table th {
          text-align: left;
          padding: 1rem 1.25rem;
          background: #f8fafc;
          font-size: 0.8rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #e2e8f0;
        }
        .admin-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #f1f5f9;
          font-size: 0.9rem;
        }
        .admin-table tr:hover { background: #fafbfc; }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .user-avatar.large {
          width: 64px;
          height: 64px;
          font-size: 1.5rem;
        }
        .user-info strong {
          display: block;
          color: #1e293b;
        }
        .user-info span {
          font-size: 0.8rem;
          color: #94a3b8;
        }

        .plan-badge {
          display: inline-block;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .plan-badge.free { background: #f1f5f9; color: #64748b; }
        .plan-badge.tester { background: #d1fae5; color: #059669; }
        .plan-badge.professional { background: #dbeafe; color: #2563eb; }
        .plan-badge.lifetime { background: #fef3c7; color: #b45309; }
        .plan-badge.enterprise { background: #f3e8ff; color: #7c3aed; }

        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .status-badge.active { background: #dcfce7; color: #16a34a; }
        .status-badge.inactive { background: #fef3c7; color: #d97706; }
        .status-badge.lifetime { background: #fef3c7; color: #b45309; }
        .status-badge.churned { background: #fee2e2; color: #dc2626; }

        .sim-count {
          font-weight: 600;
          color: #1e293b;
        }
        .sim-label {
          font-size: 0.75rem;
          color: #94a3b8;
          margin-left: 0.25rem;
        }
        .last-active { color: #64748b; }

        .action-btns {
          display: flex;
          gap: 0.5rem;
        }
        .action-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 8px;
          background: #f1f5f9;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
        }
        .action-btn:hover { background: #e2e8f0; }
        .action-btn.danger:hover { background: #fee2e2; }

        /* User Stats */
        .admin-user-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .user-stat {
          text-align: center;
        }
        .user-stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
        }
        .user-stat-label {
          font-size: 0.8rem;
          color: #64748b;
        }

        /* Admin Modal */
        .admin-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }
        .admin-modal {
          background: white;
          border-radius: 20px;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }
        .modal-header h2 {
          margin: 0;
          font-size: 1.25rem;
        }
        .modal-close {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 8px;
          background: #f1f5f9;
          font-size: 1.25rem;
          cursor: pointer;
        }
        .modal-body { padding: 1.5rem; }
        .modal-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid #e2e8f0;
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
        }

        .user-detail-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .user-detail-header h3 { margin: 0; }
        .user-detail-header p { margin: 0; color: #64748b; }

        .user-detail-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .detail-item label {
          display: block;
          font-size: 0.8rem;
          color: #64748b;
          margin-bottom: 0.25rem;
        }
        .detail-item span {
          font-weight: 500;
          color: #1e293b;
        }

        /* Bar Chart */
        .bar-chart {
          display: flex;
          align-items: flex-end;
          gap: 1rem;
          height: 200px;
          padding: 1rem 0;
        }
        .bar-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .bar-container {
          flex: 1;
          width: 100%;
          display: flex;
          gap: 4px;
          align-items: flex-end;
          justify-content: center;
        }
        .bar {
          width: 20px;
          border-radius: 4px 4px 0 0;
          transition: height 0.3s ease;
        }
        .bar.users { background: #6366f1; }
        .bar.sessions { background: #10b981; }
        .bar-label {
          font-size: 0.8rem;
          color: #64748b;
        }
        .chart-legend {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-top: 1rem;
        }
        .legend-dot {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 3px;
          margin-right: 0.5rem;
        }
        .legend-dot.users { background: #6366f1; }
        .legend-dot.sessions { background: #10b981; }

        /* Sim Rankings */
        .sim-rankings {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .sim-rank-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 12px;
        }
        .rank {
          font-size: 1.1rem;
          font-weight: 700;
          color: #6366f1;
          min-width: 40px;
        }
        .sim-rank-info { flex: 1; }
        .sim-rank-info strong {
          display: block;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }
        .sim-rank-stats {
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          color: #64748b;
        }
        .completion-rate {
          text-align: right;
          font-size: 1.25rem;
          font-weight: 700;
          color: #10b981;
        }
        .completion-rate span {
          display: block;
          font-size: 0.7rem;
          font-weight: 400;
          color: #94a3b8;
        }

        /* Grade Chart */
        .grade-chart {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .grade-bar-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .grade-label {
          width: 30px;
          font-weight: 700;
          color: #1e293b;
        }
        .grade-bar-container {
          flex: 1;
          height: 24px;
          background: #f1f5f9;
          border-radius: 6px;
          overflow: hidden;
        }
        .grade-bar {
          height: 100%;
          border-radius: 6px;
          transition: width 0.3s ease;
        }
        .grade-bar.grade-a { background: #10b981; }
        .grade-bar.grade-b { background: #6366f1; }
        .grade-bar.grade-c { background: #f59e0b; }
        .grade-bar.grade-d { background: #f97316; }
        .grade-bar.grade-f { background: #ef4444; }
        .grade-pct {
          width: 40px;
          text-align: right;
          font-weight: 500;
          color: #64748b;
        }

        /* Subscription Breakdown */
        .subscription-breakdown {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .sub-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .sub-info {
          min-width: 150px;
        }
        .sub-plan {
          display: block;
          font-weight: 600;
          color: #1e293b;
        }
        .sub-count {
          font-size: 0.8rem;
          color: #64748b;
        }
        .sub-bar {
          flex: 1;
          height: 20px;
          background: #f1f5f9;
          border-radius: 10px;
          overflow: hidden;
        }
        .sub-bar-fill {
          height: 100%;
          border-radius: 10px;
        }
        .sub-item.free .sub-bar-fill { background: #94a3b8; }
        .sub-item.professional .sub-bar-fill { background: #6366f1; }
        .sub-item.enterprise .sub-bar-fill { background: #8b5cf6; }
        .sub-pct {
          min-width: 50px;
          text-align: right;
          font-weight: 600;
          color: #1e293b;
        }

        /* Transactions */
        .transactions-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .transaction-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          background: #f8fafc;
          border-radius: 10px;
        }
        .transaction-item.failed { background: #fef2f2; }
        .txn-info { flex: 1; }
        .txn-info strong { display: block; color: #1e293b; }
        .txn-info span { font-size: 0.8rem; color: #64748b; }
        .txn-amount {
          font-weight: 700;
          color: #10b981;
        }
        .txn-date {
          font-size: 0.85rem;
          color: #64748b;
          min-width: 100px;
        }
        .txn-status {
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        .txn-status.succeeded { background: #dcfce7; color: #16a34a; }
        .txn-status.failed { background: #fee2e2; color: #dc2626; }

        /* Content Grid */
        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }
        .content-card {
          background: white;
          border-radius: 16px;
          padding: 1.25rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }
        .content-header h4 { margin: 0; color: #1e293b; }
        .content-status {
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        .content-status.published { background: #dcfce7; color: #16a34a; }
        .content-status.draft { background: #fef3c7; color: #d97706; }
        .content-status.review { background: #dbeafe; color: #2563eb; }
        .content-stats {
          display: flex;
          gap: 1rem;
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 0.5rem;
        }
        .content-meta {
          font-size: 0.8rem;
          color: #94a3b8;
          margin-bottom: 1rem;
        }
        .content-actions {
          display: flex;
          gap: 0.5rem;
        }

        /* Resource Usage */
        .resource-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .resource-item { }
        .resource-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }
        .resource-header span:first-child { color: #64748b; }
        .resource-header span:last-child { font-weight: 600; color: #1e293b; }
        .resource-bar {
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }
        .resource-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        .resource-fill.cpu { background: linear-gradient(90deg, #10b981, #34d399); }
        .resource-fill.memory { background: linear-gradient(90deg, #6366f1, #8b5cf6); }

        /* Errors List */
        .errors-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .error-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          background: #fef2f2;
          border-radius: 8px;
          font-size: 0.85rem;
        }
        .error-time {
          font-family: monospace;
          color: #64748b;
        }
        .error-type {
          font-weight: 600;
          color: #dc2626;
          min-width: 80px;
        }
        .error-msg {
          flex: 1;
          color: #475569;
        }
        .error-count {
          font-weight: 600;
          color: #dc2626;
        }

        .system-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        /* Admin Responsive */
        @media (max-width: 1200px) {
          .admin-metrics-grid { grid-template-columns: repeat(2, 1fr); }
          .admin-stats-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 900px) {
          .admin-layout { flex-direction: column; }
          .admin-sidebar {
            width: 100%;
            height: auto;
            position: relative;
            top: 0;
          }
          .admin-nav {
            display: flex;
            overflow-x: auto;
            padding: 0.5rem;
          }
          .admin-nav-btn {
            padding: 0.5rem 1rem;
            white-space: nowrap;
          }
          .admin-sidebar-footer { display: none; }
        }
        @media (max-width: 600px) {
          .admin-metrics-grid { grid-template-columns: 1fr; }
          .admin-toolbar { flex-direction: column; }
          .search-box { min-width: 100%; }
          .toolbar-actions { width: 100%; justify-content: space-between; }
        }
      `}</style>
      
      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
      
      {currentPage === 'landing' && renderLanding()}
      {currentPage === 'auth' && renderAuth()}
      {currentPage === 'dashboard' && renderDashboard()}
      {currentPage === 'catalog' && renderCatalog()}
      {currentPage === 'pricing' && renderPricing()}
      {currentPage === 'simulation' && renderSimulation()}
      {currentPage === 'admin' && renderAdminDashboard()}
    </div>
  );
}
