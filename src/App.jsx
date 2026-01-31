import React, { useState, useEffect, useRef } from 'react';

// ============================================
// BILINGUAL TRANSLATIONS - FRANÇAIS / ENGLISH
// Complete translation system for BizSimHub
// ============================================

const TRANSLATIONS = {
  // ============================================
  // NAVIGATION
  // ============================================
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
    adminPanel: { en: 'Admin Panel', fr: 'Panneau admin' },
  },

  // ============================================
  // LANDING PAGE
  // ============================================
  landing: {
    badge: { en: '🎓 Business Education Platform', fr: '🎓 Plateforme de formation en affaires' },
    heroTitle1: { en: 'Master Business Skills', fr: 'Maîtrisez les compétences d\'affaires' },
    heroTitle2: { en: 'Through Experiential Learning', fr: 'par l\'apprentissage expérientiel' },
    heroSubtitle: { 
      en: 'Engage with interactive simulations to develop critical business skills in a safe space. Practice project management, strategy, and leadership without real-world risks.',
      fr: 'Engagez-vous dans des simulations interactives pour développer des compétences essentielles en affaires dans un environnement sécuritaire. Pratiquez la gestion de projet, la stratégie et le leadership sans risques réels.'
    },
    startTrial: { en: 'Start Your Free Trial Now!', fr: 'Commencez votre essai gratuit!' },
    browseSimulations: { en: 'Browse Simulations', fr: 'Parcourir les simulations' },
    simulations: { en: 'Simulations', fr: 'Simulations' },
    scenarios: { en: 'Scenarios', fr: 'Scénarios' },
    learners: { en: 'Learners', fr: 'Apprenants' },
    industries: { en: 'Industries', fr: 'Industries' },
    whyChoose: { en: 'Why Choose BizSimHub?', fr: 'Pourquoi choisir BizSimHub?' },
    feature1Title: { en: 'Learn by Doing', fr: 'Apprendre en faisant' },
    feature1Desc: { en: 'No more boring lectures. Make real decisions and see immediate consequences in realistic scenarios.', fr: 'Fini les cours ennuyeux. Prenez de vraies décisions et voyez les conséquences immédiates dans des scénarios réalistes.' },
    feature2Title: { en: 'Risk-Free Practice', fr: 'Pratique sans risque' },
    feature2Desc: { en: 'Make mistakes safely. Learn what works and what doesn\'t without real-world consequences.', fr: 'Faites des erreurs en toute sécurité. Apprenez ce qui fonctionne sans conséquences réelles.' },
    feature3Title: { en: 'Track Progress', fr: 'Suivez vos progrès' },
    feature3Desc: { en: 'Detailed analytics show your improvement over time with personalized insights.', fr: 'Des analyses détaillées montrent votre amélioration avec des insights personnalisés.' },
    feature4Title: { en: 'Industry Scenarios', fr: 'Scénarios industriels' },
    feature4Desc: { en: 'Practice in Tech, Entertainment, Construction, and R&D contexts.', fr: 'Pratiquez en Tech, Divertissement, Construction et R&D.' },
    readyToStart: { en: 'Ready to Start?', fr: 'Prêt à commencer?' },
    joinLearners: { en: 'Join thousands of professionals improving their skills.', fr: 'Rejoignez des milliers de professionnels qui améliorent leurs compétences.' },
    startLearning: { en: 'Start Learning Free', fr: 'Commencer gratuitement' },
    testimonialTitle: { en: 'What Professionals Say', fr: 'Ce que disent les professionnels' },
    featured: { en: 'Featured', fr: 'En vedette' },
    projectApex: { en: 'Project Apex', fr: 'Projet Apex' },
    flagshipSimulation: { en: 'Our flagship project management simulation', fr: 'Notre simulation phare de gestion de projet' },
    masterPM: { en: 'Master Project Management', fr: 'Maîtrisez la gestion de projet' },
    playNow: { en: 'Play Now', fr: 'Jouer maintenant' },
    tryFreeNow: { en: 'Try Free Now', fr: 'Essayer gratuitement' },
    simulationLibrary: { en: 'Simulation Library', fr: 'Bibliothèque de simulations' },
    comprehensiveSims: { en: 'Comprehensive business simulations for every skill', fr: 'Des simulations complètes pour chaque compétence' },
  },

  // ============================================
  // PRICING
  // ============================================
  pricing: {
    title: { en: 'Simple Pricing', fr: 'Tarification simple' },
    subtitle: { en: 'Start free, upgrade when ready', fr: 'Commencez gratuitement, passez au supérieur quand vous êtes prêt' },
    choosePlan: { en: 'Choose Your Plan', fr: 'Choisissez votre plan' },
    chooseYourPlan: { en: 'Choose the plan that fits your learning goals', fr: 'Choisissez le plan qui correspond à vos objectifs' },
    mostPopular: { en: 'Most Popular', fr: 'Plus populaire' },
    currentPlan: { en: 'Current Plan', fr: 'Plan actuel' },
    upgradeNow: { en: 'Upgrade Now', fr: 'Passer au supérieur' },
    contactSales: { en: 'Contact Sales', fr: 'Contacter les ventes' },
    getStartedFree: { en: 'Get Started Free', fr: 'Commencer gratuitement' },
    startFreeTrial: { en: 'Start Free Trial', fr: 'Commencer l\'essai gratuit' },
    monthly: { en: 'Monthly', fr: 'Mensuel' },
    annual: { en: 'Annual', fr: 'Annuel' },
    perMonth: { en: '/month', fr: '/mois' },
    free: { en: 'Free', fr: 'Gratuit' },
    professional: { en: 'Professional', fr: 'Professionnel' },
    enterprise: { en: 'Enterprise', fr: 'Entreprise' },
    freeDesc: { en: 'Perfect for trying out', fr: 'Parfait pour essayer' },
    proDesc: { en: 'For serious learners', fr: 'Pour les apprenants sérieux' },
    entDesc: { en: 'For teams and institutions', fr: 'Pour les équipes et institutions' },
    // Features
    feat1Sim: { en: '1 simulation (Project Apex)', fr: '1 simulation (Projet Apex)' },
    featBasicScenarios: { en: 'Basic scenarios', fr: 'Scénarios de base' },
    featScoreTracking: { en: 'Score tracking', fr: 'Suivi des scores' },
    featCommunitySupport: { en: 'Community support', fr: 'Support communautaire' },
    featAllSimulations: { en: 'All simulations', fr: 'Toutes les simulations' },
    featAllScenarios: { en: 'All scenarios', fr: 'Tous les scénarios' },
    featDetailedAnalytics: { en: 'Detailed analytics', fr: 'Analyses détaillées' },
    featCertificates: { en: 'Certificates', fr: 'Certificats' },
    featPrioritySupport: { en: 'Priority support', fr: 'Support prioritaire' },
    featEverythingPro: { en: 'Everything in Professional', fr: 'Tout dans Professionnel' },
    featUnlimitedTeam: { en: 'Unlimited team members', fr: 'Membres d\'équipe illimités' },
    featAdminDashboard: { en: 'Admin dashboard', fr: 'Tableau de bord admin' },
    featCustomBranding: { en: 'Custom branding', fr: 'Image de marque personnalisée' },
    featLmsIntegration: { en: 'LMS integration', fr: 'Intégration LMS' },
    featDedicatedManager: { en: 'Dedicated account manager', fr: 'Gestionnaire de compte dédié' },
    featCustomDev: { en: 'Custom simulation development', fr: 'Développement de simulations sur mesure' },
  },

  // ============================================
  // DASHBOARD
  // ============================================
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
    noScoresYet: { en: 'No scores yet', fr: 'Pas encore de scores' },
    playFirst: { en: 'Play your first simulation!', fr: 'Jouez votre première simulation!' },
    recent: { en: 'Recent', fr: 'Récent' },
    unknown: { en: 'Unknown', fr: 'Inconnu' },
  },

  // ============================================
  // SIMULATIONS CATALOG
  // ============================================
  simulations: {
    catalog: { en: 'Simulation Library', fr: 'Bibliothèque de simulations' },
    catalogSubtitle: { en: 'Choose your learning adventure', fr: 'Choisissez votre aventure d\'apprentissage' },
    available: { en: 'Available', fr: 'Disponible' },
    availableNow: { en: 'Available Now', fr: 'Disponible maintenant' },
    comingSoon: { en: 'Coming Soon', fr: 'Bientôt disponible' },
    pro: { en: 'PRO', fr: 'PRO' },
    startSimulation: { en: 'Start Simulation', fr: 'Commencer la simulation' },
    scenarios: { en: 'scenarios', fr: 'scénarios' },
    minutes: { en: 'min', fr: 'min' },
    chooseScenario: { en: 'Choose Your Scenario', fr: 'Choisissez votre scénario' },
    difficulty: { en: 'Difficulty', fr: 'Difficulté' },
    duration: { en: 'Duration', fr: 'Durée' },
    weeks: { en: 'weeks', fr: 'semaines' },
  },

  // ============================================
  // SCENARIO DATA
  // ============================================
  scenarios: {
    // Tech Startup
    techStartup: {
      title: { en: 'Tech Startup', fr: 'Startup Tech' },
      subtitle: { en: 'Software Product Launch', fr: 'Lancement de produit logiciel' },
      difficulty: { en: 'Standard', fr: 'Standard' },
      description: { 
        en: 'You are the Project Manager at Nexus Technologies. Deliver a new SaaS platform while managing team dynamics and technical challenges.',
        fr: 'Vous êtes le chef de projet chez Nexus Technologies. Livrez une nouvelle plateforme SaaS tout en gérant la dynamique d\'équipe et les défis techniques.'
      },
      company: { en: 'Nexus Technologies', fr: 'Nexus Technologies' },
      projectName: { en: 'SaaS Platform', fr: 'Plateforme SaaS' },
    },
    // Live Show
    liveShow: {
      title: { en: 'Live Entertainment', fr: 'Spectacle vivant' },
      subtitle: { en: 'Touring Show Production', fr: 'Production de tournée' },
      difficulty: { en: 'Advanced', fr: 'Avancé' },
      description: { 
        en: 'Executive Producer at Stellar Productions. Launch an ambitious touring show while managing creative talent and safety requirements.',
        fr: 'Producteur exécutif chez Stellar Productions. Lancez un spectacle de tournée ambitieux tout en gérant les talents créatifs et les exigences de sécurité.'
      },
      company: { en: 'Stellar Productions', fr: 'Stellar Productions' },
      projectName: { en: 'AURORA - A Journey of Light', fr: 'AURORA - Un voyage de lumière' },
    },
    // Construction
    construction: {
      title: { en: 'Construction', fr: 'Construction' },
      subtitle: { en: 'Commercial Building Project', fr: 'Projet de bâtiment commercial' },
      difficulty: { en: 'Standard', fr: 'Standard' },
      description: { 
        en: 'Project Manager at UrbanCore Construction. Build a 12-story mixed-use building while managing permits, weather, and safety.',
        fr: 'Chef de projet chez UrbanCore Construction. Construisez un immeuble de 12 étages à usage mixte tout en gérant les permis, la météo et la sécurité.'
      },
      company: { en: 'UrbanCore Construction', fr: 'UrbanCore Construction' },
      projectName: { en: 'Metropolitan Tower', fr: 'Tour Métropolitaine' },
    },
    // R&D Innovation
    rdInnovation: {
      title: { en: 'R&D Innovation', fr: 'Innovation R&D' },
      subtitle: { en: 'New Technology Development', fr: 'Développement de nouvelles technologies' },
      difficulty: { en: 'Expert', fr: 'Expert' },
      description: { 
        en: 'Lead a cutting-edge R&D project with high uncertainty. Prototyping is essential to surface problems early.',
        fr: 'Dirigez un projet de R&D de pointe avec une grande incertitude. Le prototypage est essentiel pour détecter les problèmes tôt.'
      },
      company: { en: 'FutureTech Labs', fr: 'FutureTech Labs' },
      projectName: { en: 'Quantum Sensor Array', fr: 'Réseau de capteurs quantiques' },
    },
  },

  // ============================================
  // PROJECT DELIVERABLES (Scope Levels)
  // ============================================
  deliverables: {
    tech_startup: {
      level1: { name: { en: 'Core Platform', fr: 'Plateforme de base' }, desc: { en: 'Basic user management, authentication, and data storage', fr: 'Gestion des utilisateurs, authentification et stockage de données' }},
      level2: { name: { en: 'Standard Features', fr: 'Fonctionnalités standard' }, desc: { en: 'Dashboard, reporting, and API integrations', fr: 'Tableau de bord, rapports et intégrations API' }},
      level3: { name: { en: 'Advanced Features', fr: 'Fonctionnalités avancées' }, desc: { en: 'Analytics, automation, and multi-tenant support', fr: 'Analytique, automatisation et support multi-locataires' }},
      level4: { name: { en: 'Premium Features', fr: 'Fonctionnalités premium' }, desc: { en: 'AI-powered insights and enterprise security', fr: 'Insights alimentés par l\'IA et sécurité entreprise' }},
    },
    live_show: {
      level1: { name: { en: 'Foundation Acts', fr: 'Actes de fondation' }, desc: { en: 'Opening sequence and core ensemble performances', fr: 'Séquence d\'ouverture et performances de l\'ensemble principal' }},
      level2: { name: { en: 'Feature Acts', fr: 'Actes principaux' }, desc: { en: 'Aerial sequences and specialty performances', fr: 'Séquences aériennes et performances spécialisées' }},
      level3: { name: { en: 'Technical Integration', fr: 'Intégration technique' }, desc: { en: 'Lighting, sound, and projection mapping', fr: 'Éclairage, son et mapping de projection' }},
      level4: { name: { en: 'Grand Finale', fr: 'Grande finale' }, desc: { en: 'Climactic sequence with full cast integration', fr: 'Séquence climax avec intégration de toute la distribution' }},
    },
    construction: {
      level1: { name: { en: 'Foundation & Parking', fr: 'Fondations et stationnement' }, desc: { en: 'Underground parking and structural foundation', fr: 'Stationnement souterrain et fondations structurelles' }},
      level2: { name: { en: 'Core Structure', fr: 'Structure principale' }, desc: { en: 'Floors 1-6 with retail and office space', fr: 'Étages 1-6 avec espaces commerciaux et bureaux' }},
      level3: { name: { en: 'Upper Floors', fr: 'Étages supérieurs' }, desc: { en: 'Floors 7-10 residential units', fr: 'Étages 7-10 unités résidentielles' }},
    },
    rd_innovation: {
      level1: { name: { en: 'Proof of Concept', fr: 'Preuve de concept' }, desc: { en: 'Demonstrate basic quantum sensing capability', fr: 'Démontrer la capacité de base de détection quantique' }},
      level2: { name: { en: 'Prototype Alpha', fr: 'Prototype Alpha' }, desc: { en: 'Functional prototype with core features', fr: 'Prototype fonctionnel avec fonctionnalités de base' }},
      level3: { name: { en: 'Prototype Beta', fr: 'Prototype Bêta' }, desc: { en: 'Refined prototype with improved accuracy', fr: 'Prototype affiné avec précision améliorée' }},
      level4: { name: { en: 'Production Ready', fr: 'Prêt pour la production' }, desc: { en: 'Manufacturable design with documentation', fr: 'Conception fabricable avec documentation' }},
    },
  },

  // ============================================
  // EVENTS (Causal Events)
  // ============================================
  events: {
    // Tech Startup Events
    scope_creep: {
      title: { en: 'Scope Creep Alert', fr: 'Alerte de dérive du périmètre' },
      description: { en: 'The product owner wants to add 2 new features. Your response affects both scope and team stress.', fr: 'Le propriétaire du produit veut ajouter 2 nouvelles fonctionnalités. Votre réponse affecte le périmètre et le stress de l\'équipe.' },
      options: {
        accept: { en: 'Accept all changes (+2 scope, +stress)', fr: 'Accepter tous les changements (+2 périmètre, +stress)' },
        negotiate: { en: 'Negotiate to add 1 feature', fr: 'Négocier pour ajouter 1 fonctionnalité' },
        decline: { en: 'Decline and stay focused (+morale)', fr: 'Refuser et rester concentré (+moral)' },
      }
    },
    tech_debt: {
      title: { en: 'Technical Debt Crisis', fr: 'Crise de dette technique' },
      description: { en: 'QA discovered critical technical debt. Addressing it now prevents larger problems later.', fr: 'L\'assurance qualité a découvert une dette technique critique. La traiter maintenant évite des problèmes plus importants plus tard.' },
      options: {
        fix_now: { en: 'Full refactor (schedule hit, quality gain)', fr: 'Refactorisation complète (impact sur le calendrier, gain de qualité)' },
        patch: { en: 'Quick patch', fr: 'Correctif rapide' },
        defer: { en: 'Document for v2 (risk)', fr: 'Documenter pour v2 (risque)' },
      }
    },
    dev_resignation: {
      title: { en: 'Lead Developer Resigns', fr: 'Le développeur principal démissionne' },
      description: { en: 'Your lead developer accepted a FAANG offer. This will cause knowledge loss.', fr: 'Votre développeur principal a accepté une offre FAANG. Cela causera une perte de connaissances.' },
      options: {
        counter: { en: 'Counter-offer (expensive, retain knowledge)', fr: 'Contre-offre (coûteux, conserver les connaissances)' },
        transition: { en: 'Knowledge transfer period', fr: 'Période de transfert de connaissances' },
        contractor: { en: 'Hire contractor (no knowledge loss)', fr: 'Embaucher un contractuel (pas de perte de connaissances)' },
      }
    },
    team_conflict: {
      title: { en: 'Architecture Disagreement', fr: 'Désaccord d\'architecture' },
      description: { en: 'Senior devs debate microservices vs monolith. Unresolved conflict will hurt productivity.', fr: 'Les développeurs seniors débattent microservices vs monolithe. Un conflit non résolu nuira à la productivité.' },
      options: {
        mediate: { en: 'Architecture review workshop (+knowledge)', fr: 'Atelier de révision d\'architecture (+connaissances)' },
        decide: { en: 'Executive decision (fast, some resentment)', fr: 'Décision exécutive (rapide, certains ressentiments)' },
        hybrid: { en: 'Hybrid approach (compromise)', fr: 'Approche hybride (compromis)' },
      }
    },
    // Live Show Events
    star_injury: {
      title: { en: 'Lead Performer Injury', fr: 'Blessure de l\'artiste principal' },
      description: { en: 'Your star acrobat suffered a minor injury. How you handle this affects team trust.', fr: 'Votre acrobate vedette a subi une blessure mineure. Votre gestion affecte la confiance de l\'équipe.' },
      options: {
        rest: { en: 'Full recovery time (+morale, +trust)', fr: 'Temps de récupération complet (+moral, +confiance)' },
        modified: { en: 'Modified choreography', fr: 'Chorégraphie modifiée' },
        understudy: { en: 'Promote understudy (risky)', fr: 'Promouvoir la doublure (risqué)' },
      }
    },
    creative_conflict: {
      title: { en: 'Creative Vision Clash', fr: 'Conflit de vision créative' },
      description: { en: 'Director and choreographer disagree on Act 3. Unresolved, this will fester.', fr: 'Le directeur et le chorégraphe sont en désaccord sur l\'Acte 3. Non résolu, cela va s\'envenimer.' },
      options: {
        director: { en: "Back director's vision", fr: 'Soutenir la vision du directeur' },
        choreographer: { en: 'Support choreographer', fr: 'Soutenir le chorégraphe' },
        workshop: { en: 'Creative workshop (+knowledge)', fr: 'Atelier créatif (+connaissances)' },
      }
    },
    rigging_issue: {
      title: { en: 'Rigging Safety Concern', fr: 'Problème de sécurité du gréement' },
      description: { en: 'Aerial rigging may not meet safety standards. A prototype/tech rehearsal would have caught this earlier.', fr: 'Le gréement aérien pourrait ne pas respecter les normes de sécurité. Un prototype/répétition technique aurait détecté cela plus tôt.' },
      options: {
        redesign: { en: 'Full redesign (safest)', fr: 'Refonte complète (plus sûr)' },
        reinforce: { en: 'Reinforce current design', fr: 'Renforcer la conception actuelle' },
        simplify: { en: 'Simplify aerial sequences', fr: 'Simplifier les séquences aériennes' },
      }
    },
    // Construction Events
    weather_delay: {
      title: { en: 'Severe Weather Alert', fr: 'Alerte météo sévère' },
      description: { en: 'Major storm forecast for 10 days. Your choice affects both schedule and team safety.', fr: 'Tempête majeure prévue pendant 10 jours. Votre choix affecte le calendrier et la sécurité de l\'équipe.' },
      options: {
        pause: { en: 'Pause outdoor work (safe)', fr: 'Suspendre les travaux extérieurs (sûr)' },
        interior: { en: 'Interior work only', fr: 'Travaux intérieurs uniquement' },
        push: { en: 'Continue with caution (risky)', fr: 'Continuer avec prudence (risqué)' },
      }
    },
    permit_issue: {
      title: { en: 'Permit Inspection Failed', fr: 'Échec de l\'inspection du permis' },
      description: { en: 'Inspector flagged electrical issues. A prototype/mockup inspection would have caught this earlier.', fr: 'L\'inspecteur a signalé des problèmes électriques. Une inspection de prototype/maquette aurait détecté cela plus tôt.' },
      options: {
        rework: { en: 'Full rework (+quality)', fr: 'Reprise complète (+qualité)' },
        appeal: { en: 'Appeal decision', fr: 'Faire appel de la décision' },
        expedite: { en: 'Hire specialist (expensive)', fr: 'Embaucher un spécialiste (coûteux)' },
      }
    },
    safety_incident: {
      title: { en: 'Safety Near-Miss', fr: 'Quasi-accident de sécurité' },
      description: { en: 'Scaffold bracket failed. OSHA will investigate. This affects team morale and stress significantly.', fr: 'Un support d\'échafaudage a cédé. L\'OSHA enquêtera. Cela affecte significativement le moral et le stress de l\'équipe.' },
      options: {
        full_audit: { en: 'Full safety audit (+trust)', fr: 'Audit de sécurité complet (+confiance)' },
        targeted: { en: 'Targeted inspection', fr: 'Inspection ciblée' },
        minimal: { en: 'Document and continue (risky)', fr: 'Documenter et continuer (risqué)' },
      }
    },
    materials_shortage: {
      title: { en: 'Materials Shortage', fr: 'Pénurie de matériaux' },
      description: { en: 'Supply chain issue: steel delivery delayed 3 weeks. Prototyping/early ordering would have mitigated this.', fr: 'Problème de chaîne d\'approvisionnement: livraison d\'acier retardée de 3 semaines. Le prototypage/commande anticipée aurait atténué cela.' },
      options: {
        wait: { en: 'Wait for delivery', fr: 'Attendre la livraison' },
        alternative: { en: 'Source alternative supplier', fr: 'Trouver un fournisseur alternatif' },
        redesign: { en: 'Redesign with available materials', fr: 'Reconcevoir avec les matériaux disponibles' },
      }
    },
    // R&D Events
    tech_failure: {
      title: { en: 'Core Technology Failure', fr: 'Défaillance de la technologie de base' },
      description: { en: 'The main sensor approach isn\'t working as expected. Prototypes would have revealed this earlier.', fr: 'L\'approche principale du capteur ne fonctionne pas comme prévu. Les prototypes auraient révélé cela plus tôt.' },
      options: {
        pivot: { en: 'Pivot to backup approach', fr: 'Pivoter vers l\'approche de secours' },
        iterate: { en: 'Iterate on current design', fr: 'Itérer sur la conception actuelle' },
        parallel: { en: 'Run parallel approaches', fr: 'Exécuter des approches parallèles' },
      }
    },
    breakthrough: {
      title: { en: 'Unexpected Breakthrough', fr: 'Percée inattendue' },
      description: { en: 'A team member discovered a shortcut. How you capitalize on it matters.', fr: 'Un membre de l\'équipe a découvert un raccourci. La façon dont vous en tirez parti compte.' },
      options: {
        focus: { en: 'Focus resources on breakthrough', fr: 'Concentrer les ressources sur la percée' },
        validate: { en: 'Build prototype to validate', fr: 'Construire un prototype pour valider' },
        patent: { en: 'Document for patent first', fr: 'Documenter d\'abord pour le brevet' },
      }
    },
    competitor_announcement: {
      title: { en: 'Competitor Announcement', fr: 'Annonce d\'un concurrent' },
      description: { en: 'A competitor announced a similar product launching in 8 weeks. Time pressure increases.', fr: 'Un concurrent a annoncé un produit similaire dans 8 semaines. La pression du temps augmente.' },
      options: {
        accelerate: { en: 'Accelerate timeline (-3 weeks)', fr: 'Accélérer le calendrier (-3 semaines)' },
        differentiate: { en: 'Pivot to differentiation (+scope)', fr: 'Pivoter vers la différenciation (+périmètre)' },
        stay_course: { en: 'Stay the course (quality focus)', fr: 'Maintenir le cap (focus qualité)' },
      }
    },
  },

  // ============================================
  // MEETINGS
  // ============================================
  meetings: {
    title: { en: 'Meetings This Week', fr: 'Réunions cette semaine' },
    done: { en: 'Done', fr: 'Fait' },
    coaching: {
      name: { en: 'One-on-One Coaching', fr: 'Coaching individuel' },
      description: { en: 'Build team knowledge and skills. Best early in project.', fr: 'Développer les connaissances et compétences de l\'équipe. Idéal en début de projet.' },
    },
    standup: {
      name: { en: 'Daily Standups', fr: 'Mêlées quotidiennes' },
      description: { en: 'Prevent coordination mistakes. Essential for larger teams.', fr: 'Prévenir les erreurs de coordination. Essentiel pour les grandes équipes.' },
    },
    status: {
      name: { en: 'Status Review', fr: 'Revue de statut' },
      description: { en: 'Team alignment and stakeholder communication.', fr: 'Alignement d\'équipe et communication avec les parties prenantes.' },
    },
  },

  // ============================================
  // GAME UI
  // ============================================
  game: {
    // Briefing tabs
    projectBrief: { en: 'Project Brief', fr: 'Dossier du projet' },
    scenarioObjectives: { en: 'Scenario Objectives', fr: 'Objectifs du scénario' },
    managingYourProject: { en: 'Managing Your Project', fr: 'Gérer votre projet' },
    // Navigation
    backToLibrary: { en: 'Back to Library', fr: 'Retour à la bibliothèque' },
    backToScenarios: { en: 'Back to Scenarios', fr: 'Retour aux scénarios' },
    chooseScenario: { en: 'Choose Your Scenario', fr: 'Choisissez votre scénario' },
    beginSimulation: { en: 'Begin Simulation', fr: 'Commencer la simulation' },
    // Scenario badges
    prototypingAvailable: { en: 'Prototyping Available', fr: 'Prototypage disponible' },
    highUncertainty: { en: 'High Uncertainty', fr: 'Haute incertitude' },
    focus: { en: 'Focus', fr: 'Focus' },
    // Time
    week: { en: 'Week', fr: 'Semaine' },
    weeks: { en: 'weeks', fr: 'semaines' },
    of: { en: 'of', fr: 'de' },
    weeksLeft: { en: 'Weeks Left', fr: 'Semaines restantes' },
    deadline: { en: 'Deadline', fr: 'Échéance' },
    // Metrics
    budget: { en: 'Budget', fr: 'Budget' },
    scope: { en: 'Scope', fr: 'Périmètre' },
    schedule: { en: 'Schedule', fr: 'Calendrier' },
    quality: { en: 'Quality', fr: 'Qualité' },
    teamSize: { en: 'Team Size', fr: 'Taille de l\'équipe' },
    morale: { en: 'Morale', fr: 'Moral' },
    stress: { en: 'Stress', fr: 'Stress' },
    knowledge: { en: 'Knowledge', fr: 'Connaissances' },
    productivity: { en: 'Productivity', fr: 'Productivité' },
    prototypes: { en: 'Prototypes', fr: 'Prototypes' },
    members: { en: 'members', fr: 'membres' },
    // Project info
    projectDeliverables: { en: 'Project Deliverables', fr: 'Livrables du projet' },
    specificObjectives: { en: 'Specific Objectives', fr: 'Objectifs spécifiques' },
    knowledgeBuilding: { en: 'Knowledge Building', fr: 'Développement des connaissances' },
    scheduleConsistency: { en: 'Schedule Consistency', fr: 'Cohérence du calendrier' },
    prototypingValue: { en: 'Prototyping Value', fr: 'Valeur du prototypage' },
    tasks: { en: 'tasks', fr: 'tâches' },
    // Weekly actions
    weeklyActions: { en: 'Weekly Actions', fr: 'Actions hebdomadaires' },
    advanceToWeek: { en: 'Advance to Week', fr: 'Passer à la semaine' },
    // Team Management
    teamManagement: { en: 'Team Management', fr: 'Gestion de l\'équipe' },
    fire: { en: 'Fire', fr: 'Licencier' },
    hire: { en: 'Hire', fr: 'Embaucher' },
    // Schedule
    scheduleAdjustment: { en: 'Schedule Adjustment', fr: 'Ajustement du calendrier' },
    weekExtension: { en: 'Week Extension', fr: 'Semaine d\'extension' },
    weeksExtension: { en: 'Weeks Extension', fr: 'Semaines d\'extension' },
    // Meetings
    meetings: { en: 'Meetings', fr: 'Réunions' },
    // Quick Actions
    quickActions: { en: 'Quick Actions', fr: 'Actions rapides' },
    qualityReview: { en: 'Quality Review', fr: 'Revue de qualité' },
    crunchMode: { en: 'Crunch Mode', fr: 'Mode intensif' },
    crunchDesc: { en: '-morale, +stress', fr: '-moral, +stress' },
    buildPrototype: { en: 'Build Prototype', fr: 'Construire un prototype' },
    extendDeadline: { en: 'Extend Deadline +1 week', fr: 'Prolonger le délai +1 semaine' },
    penalty: { en: 'penalty', fr: 'pénalité' },
    scheduleWarning: { en: 'Schedule changed {count} times. Team morale affected by uncertainty.', fr: 'Calendrier modifié {count} fois. Le moral de l\'équipe est affecté par l\'incertitude.' },
  },

  // ============================================
  // PAYWALL
  // ============================================
  paywall: {
    title: { en: 'You\'re Doing Great!', fr: 'Vous vous en sortez très bien!' },
    weekCompleted: { en: 'You\'ve completed Week {week} of the simulation.', fr: 'Vous avez terminé la semaine {week} de la simulation.' },
    projectProgress: { en: 'Your project is {percent}% complete and the team is counting on you!', fr: 'Votre projet est complété à {percent}% et l\'équipe compte sur vous!' },
    upgradeHook: { en: 'Upgrade to Professional to continue your journey and see how your decisions play out. Will you deliver on time? Will the stakeholders be happy?', fr: 'Passez au Professionnel pour continuer votre parcours et voir comment vos décisions se concrétisent. Allez-vous livrer à temps? Les parties prenantes seront-elles satisfaites?' },
    upgradeNow: { en: 'Upgrade Now', fr: 'Passer au supérieur' },
    maybeLater: { en: 'Maybe Later', fr: 'Peut-être plus tard' },
    unlimitedPlays: { en: 'Unlimited simulation plays', fr: 'Simulations illimitées' },
    allScenarios: { en: 'All scenarios unlocked', fr: 'Tous les scénarios débloqués' },
    detailedAnalytics: { en: 'Detailed analytics', fr: 'Analyses détaillées' },
    certificates: { en: 'Certificates of completion', fr: 'Certificats de complétion' },
  },

  // ============================================
  // RESULTS
  // ============================================
  results: {
    simulationComplete: { en: 'Simulation Complete!', fr: 'Simulation terminée!' },
    points: { en: 'points', fr: 'points' },
    budget: { en: 'Budget', fr: 'Budget' },
    schedule: { en: 'Schedule', fr: 'Calendrier' },
    scope: { en: 'Scope', fr: 'Périmètre' },
    quality: { en: 'Quality', fr: 'Qualité' },
    complete: { en: 'complete', fr: 'complété' },
    teamProcess: { en: 'Team Process', fr: 'Processus d\'équipe' },
    avgMorale: { en: 'avg morale', fr: 'moral moyen' },
    consistencyBonus: { en: 'Consistency Bonus', fr: 'Bonus de cohérence' },
    prototypeBonus: { en: 'Prototype Bonus', fr: 'Bonus de prototype' },
    pts: { en: 'pts', fr: 'pts' },
    playAgain: { en: 'Play Again', fr: 'Rejouer' },
    tryDifferent: { en: 'Try Different Scenario', fr: 'Essayer un autre scénario' },
    backToDashboard: { en: 'Back to Dashboard', fr: 'Retour au tableau de bord' },
  },

  // ============================================
  // MASCOT
  // ============================================
  mascot: {
    normal: { en: 'Looking good!', fr: 'Ça se présente bien!' },
    concerned: { en: 'Hmm, keep an eye on this...', fr: 'Hmm, gardez un œil là-dessus...' },
    stressed: { en: 'We might need to talk...', fr: 'On devrait peut-être en parler...' },
    success: { en: 'Nailed it! 🎯', fr: 'Parfait! 🎯' },
    due: { en: 'DUE', fr: 'ÉCHÉANCE' },
  },

  // ============================================
  // AUTHENTICATION
  // ============================================
  auth: {
    welcome: { en: 'Welcome', fr: 'Bienvenue' },
    createAccount: { en: 'Create Account', fr: 'Créer un compte' },
    signInContinue: { en: 'Sign in to continue learning', fr: 'Connectez-vous pour continuer à apprendre' },
    startJourney: { en: 'Start your learning journey', fr: 'Commencez votre parcours d\'apprentissage' },
    fullName: { en: 'Full Name', fr: 'Nom complet' },
    email: { en: 'Email', fr: 'Courriel' },
    password: { en: 'Password', fr: 'Mot de passe' },
    pleaseWait: { en: 'Please wait...', fr: 'Veuillez patienter...' },
    signIn: { en: 'Sign In', fr: 'Connexion' },
    signUp: { en: 'Sign Up', fr: 'Inscription' },
    or: { en: 'or', fr: 'ou' },
    continueGoogle: { en: 'Continue with Google', fr: 'Continuer avec Google' },
    noAccount: { en: "Don't have an account?", fr: 'Vous n\'avez pas de compte?' },
    haveAccount: { en: 'Already have an account?', fr: 'Vous avez déjà un compte?' },
  },

  // ============================================
  // ADMIN PANEL
  // ============================================
  admin: {
    title: { en: 'Admin Panel', fr: 'Panneau d\'administration' },
    overview: { en: 'Overview', fr: 'Aperçu' },
    users: { en: 'Users', fr: 'Utilisateurs' },
    analytics: { en: 'Analytics', fr: 'Analytique' },
    revenue: { en: 'Revenue', fr: 'Revenus' },
    content: { en: 'Content', fr: 'Contenu' },
    system: { en: 'System', fr: 'Système' },
    dashboardOverview: { en: 'Dashboard Overview', fr: 'Aperçu du tableau de bord' },
    totalUsers: { en: 'Total Users', fr: 'Utilisateurs totaux' },
    monthlyRevenue: { en: 'Monthly Revenue', fr: 'Revenus mensuels' },
    completionRate: { en: 'Completion Rate', fr: 'Taux de complétion' },
    activeNow: { en: 'Active Now', fr: 'Actifs maintenant' },
    live: { en: 'Live', fr: 'En direct' },
    avgSessionTime: { en: 'Avg Session Time', fr: 'Temps moyen de session' },
    perSession: { en: 'Per user session', fr: 'Par session utilisateur' },
    sinceLaunch: { en: 'Since launch', fr: 'Depuis le lancement' },
    recentActivity: { en: 'Recent Activity', fr: 'Activité récente' },
    userManagement: { en: 'User Management', fr: 'Gestion des utilisateurs' },
    manageUsers: { en: 'Manage and monitor all platform users', fr: 'Gérer et surveiller tous les utilisateurs' },
    active: { en: 'Active', fr: 'Actif' },
    churned: { en: 'Churned', fr: 'Désabonnés' },
    allPlans: { en: 'All Plans', fr: 'Tous les plans' },
    allStatus: { en: 'All Status', fr: 'Tous les statuts' },
    inactive: { en: 'Inactive', fr: 'Inactif' },
    user: { en: 'User', fr: 'Utilisateur' },
    plan: { en: 'Plan', fr: 'Plan' },
    status: { en: 'Status', fr: 'Statut' },
    simulations: { en: 'Simulations', fr: 'Simulations' },
    lastActive: { en: 'Last Active', fr: 'Dernière activité' },
    actions: { en: 'Actions', fr: 'Actions' },
    view: { en: 'View', fr: 'Voir' },
    makeTester: { en: 'Make Tester', fr: 'Faire testeur' },
    removeTester: { en: 'Remove Tester', fr: 'Retirer testeur' },
    makeAdmin: { en: 'Make Admin', fr: 'Faire admin' },
    removeAdmin: { en: 'Remove Admin', fr: 'Retirer admin' },
    delete: { en: 'Delete', fr: 'Supprimer' },
    noUsersMatch: { en: 'No users match your search', fr: 'Aucun utilisateur ne correspond' },
    noUsersYet: { en: 'No users yet', fr: 'Pas encore d\'utilisateurs' },
    userDetails: { en: 'User Details', fr: 'Détails de l\'utilisateur' },
    joined: { en: 'Joined', fr: 'Inscrit' },
    never: { en: 'Never', fr: 'Jamais' },
    simulationsPlayed: { en: 'Simulations Played', fr: 'Simulations jouées' },
    completions: { en: 'Completions', fr: 'Complétions' },
    sendEmail: { en: 'Send Email', fr: 'Envoyer un courriel' },
    suspendUser: { en: 'Suspend User', fr: 'Suspendre l\'utilisateur' },
    weeklyActivity: { en: 'Weekly Activity', fr: 'Activité hebdomadaire' },
    popularSimulations: { en: 'Popular Simulations', fr: 'Simulations populaires' },
    gradeDistribution: { en: 'Grade Distribution', fr: 'Distribution des notes' },
    noSimulationData: { en: 'No simulation data yet', fr: 'Pas encore de données de simulation' },
    mrr: { en: 'Monthly Recurring Revenue', fr: 'Revenus mensuels récurrents' },
    arr: { en: 'Annual Recurring Revenue', fr: 'Revenus annuels récurrents' },
    ltv: { en: 'Customer LTV', fr: 'Valeur vie client' },
    churnRate: { en: 'Churn Rate', fr: 'Taux de désabonnement' },
    subscriptionBreakdown: { en: 'Subscription Breakdown', fr: 'Répartition des abonnements' },
    recentTransactions: { en: 'Recent Transactions', fr: 'Transactions récentes' },
    noTransactions: { en: 'No transactions yet', fr: 'Pas encore de transactions' },
    contentManagement: { en: 'Content Management', fr: 'Gestion du contenu' },
    edit: { en: 'Edit', fr: 'Modifier' },
    preview: { en: 'Preview', fr: 'Aperçu' },
    publish: { en: 'Publish', fr: 'Publier' },
    systemHealth: { en: 'System Health', fr: 'Santé du système' },
    monitorPlatform: { en: 'Monitor platform performance and system status', fr: 'Surveiller les performances et l\'état du système' },
    uptime: { en: 'Uptime', fr: 'Disponibilité' },
    healthy: { en: 'Healthy', fr: 'En bonne santé' },
    avgResponseTime: { en: 'Avg Response Time', fr: 'Temps de réponse moyen' },
    errorRate: { en: 'Error Rate', fr: 'Taux d\'erreur' },
    activeConnections: { en: 'Active Connections', fr: 'Connexions actives' },
    resourceUsage: { en: 'Resource Usage', fr: 'Utilisation des ressources' },
    cpuUsage: { en: 'CPU Usage', fr: 'Utilisation CPU' },
    memoryUsage: { en: 'Memory Usage', fr: 'Utilisation mémoire' },
    recentErrors: { en: 'Recent Errors', fr: 'Erreurs récentes' },
    quickActions: { en: 'Quick Actions', fr: 'Actions rapides' },
    retry: { en: 'Retry', fr: 'Réessayer' },
    loading: { en: 'Loading admin data...', fr: 'Chargement des données admin...' },
    tester: { en: 'Tester', fr: 'Testeur' },
  },

  // ============================================
  // FOOTER
  // ============================================
  footer: {
    product: { en: 'Product', fr: 'Produit' },
    company: { en: 'Company', fr: 'Entreprise' },
    about: { en: 'About', fr: 'À propos' },
    forEducators: { en: 'For Educators', fr: 'Pour les éducateurs' },
    legal: { en: 'Legal', fr: 'Légal' },
    privacy: { en: 'Privacy', fr: 'Confidentialité' },
    terms: { en: 'Terms', fr: 'Conditions' },
    madeWith: { en: 'Made with ❤️ in Montreal', fr: 'Fait avec ❤️ à Montréal' },
    allRights: { en: 'All rights reserved.', fr: 'Tous droits réservés.' },
  },

  // ============================================
  // COMMON
  // ============================================
  common: {
    comingSoon: { en: 'Coming Soon', fr: 'Bientôt' },
    back: { en: 'Back', fr: 'Retour' },
    loading: { en: 'Loading...', fr: 'Chargement...' },
    error: { en: 'Error', fr: 'Erreur' },
    success: { en: 'Success', fr: 'Succès' },
    cancel: { en: 'Cancel', fr: 'Annuler' },
    save: { en: 'Save', fr: 'Enregistrer' },
    close: { en: 'Close', fr: 'Fermer' },
    yes: { en: 'Yes', fr: 'Oui' },
    no: { en: 'No', fr: 'Non' },
    unknown: { en: 'Unknown', fr: 'Inconnu' },
  },

  // ============================================
  // OTHER SIMULATIONS (Coming Soon)
  // ============================================
  otherSims: {
    marketDynamics: {
      title: { en: 'Market Dynamics', fr: 'Dynamique de marché' },
      subtitle: { en: 'Strategic Marketing Simulation', fr: 'Simulation de marketing stratégique' },
      category: { en: 'Marketing', fr: 'Marketing' },
      difficulty: { en: 'Intermediate', fr: 'Intermédiaire' },
    },
    supplyChain: {
      title: { en: 'Supply Chain Crisis', fr: 'Crise de la chaîne d\'approvisionnement' },
      subtitle: { en: 'Operations Management Simulation', fr: 'Simulation de gestion des opérations' },
      category: { en: 'Operations', fr: 'Opérations' },
      difficulty: { en: 'Advanced', fr: 'Avancé' },
    },
    startupJourney: {
      title: { en: 'Startup Journey', fr: 'Parcours de startup' },
      subtitle: { en: 'Entrepreneurship Simulation', fr: 'Simulation d\'entrepreneuriat' },
      category: { en: 'Entrepreneurship', fr: 'Entrepreneuriat' },
      difficulty: { en: 'Advanced', fr: 'Avancé' },
    },
  },
};

// Translation helper function
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
const GanttMascot = ({ mood = 'normal', lang = 'en' }) => (
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
      <text x="92" y="18" fontSize="6" fill="#ef4444" fontWeight="bold" className="deadline-text">{t('mascot.due', lang)}</text>
      
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
      {mood === 'normal' && t('mascot.normal', lang)}
      {mood === 'concerned' && t('mascot.concerned', lang)}
      {mood === 'stressed' && t('mascot.stressed', lang)}
      {mood === 'success' && t('mascot.success', lang)}
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
// SIMULATIONS CATALOG (with translation support)
// ============================================

const getSimulations = (lang) => [
  {
    id: 'project-apex',
    title: lang === 'fr' ? 'Projet Apex' : 'Project Apex',
    subtitle: lang === 'fr' ? 'Simulation de gestion de projet' : 'Project Management Simulation',
    description: lang === 'fr' 
      ? 'Maîtrisez l\'art de la gestion de projet en relevant des défis réels. Équilibrez le périmètre, le calendrier, le budget et la dynamique d\'équipe à travers plusieurs scénarios industriels.'
      : 'Master the art of project management by navigating real-world challenges. Balance scope, schedule, budget, and team dynamics across multiple industry scenarios.',
    icon: '🎯',
    category: lang === 'fr' ? 'Gestion de projet' : 'Project Management',
    difficulty: lang === 'fr' ? 'Intermédiaire' : 'Intermediate',
    duration: '45-60 min',
    scenarios: 5,
    skills: lang === 'fr' 
      ? ['Allocation des ressources', 'Gestion des risques', 'Leadership d\'équipe', 'Prise de décision']
      : ['Resource Allocation', 'Risk Management', 'Team Leadership', 'Decision Making'],
    featured: true,
    available: true,
    tier: 'free',
    freePreview: true,
    previewWeeks: 3
  },
  {
    id: 'market-dynamics',
    title: lang === 'fr' ? 'Dynamique de marché' : 'Market Dynamics',
    subtitle: lang === 'fr' ? 'Simulation de marketing stratégique' : 'Strategic Marketing Simulation',
    description: lang === 'fr'
      ? 'Dirigez une équipe marketing à travers les lancements de produits, les batailles concurrentielles et les changements de marché.'
      : 'Lead a marketing team through product launches, competitive battles, and market shifts.',
    icon: '📈',
    category: lang === 'fr' ? 'Marketing' : 'Marketing',
    difficulty: lang === 'fr' ? 'Intermédiaire' : 'Intermediate',
    duration: '30-45 min',
    scenarios: 4,
    skills: lang === 'fr' 
      ? ['Analyse de marché', 'Stratégie de marque', 'Gestion budgétaire']
      : ['Market Analysis', 'Brand Strategy', 'Budget Management'],
    available: false,
    tier: 'pro',
    comingSoon: true
  },
  {
    id: 'supply-chain-crisis',
    title: lang === 'fr' ? 'Crise de la chaîne d\'approvisionnement' : 'Supply Chain Crisis',
    subtitle: lang === 'fr' ? 'Simulation de gestion des opérations' : 'Operations Management Simulation',
    description: lang === 'fr'
      ? 'Naviguez les perturbations de la chaîne d\'approvisionnement mondiale, gérez les niveaux de stock et optimisez la logistique.'
      : 'Navigate global supply chain disruptions, manage inventory levels, and optimize logistics.',
    icon: '🚚',
    category: lang === 'fr' ? 'Opérations' : 'Operations',
    difficulty: lang === 'fr' ? 'Avancé' : 'Advanced',
    duration: '60-90 min',
    scenarios: 6,
    skills: lang === 'fr' 
      ? ['Planification logistique', 'Gestion des fournisseurs', 'Réponse aux crises']
      : ['Logistics Planning', 'Vendor Management', 'Crisis Response'],
    available: false,
    tier: 'pro',
    comingSoon: true
  },
  {
    id: 'startup-journey',
    title: lang === 'fr' ? 'Parcours de startup' : 'Startup Journey',
    subtitle: lang === 'fr' ? 'Simulation d\'entrepreneuriat' : 'Entrepreneurship Simulation',
    description: lang === 'fr'
      ? 'Construisez une startup de l\'idée à la croissance. Prenez des décisions critiques sur le financement, l\'embauche et l\'entrée sur le marché.'
      : 'Build a startup from idea to scale-up. Make critical decisions on funding, hiring, and market entry.',
    icon: '🚀',
    category: lang === 'fr' ? 'Entrepreneuriat' : 'Entrepreneurship',
    difficulty: lang === 'fr' ? 'Avancé' : 'Advanced',
    duration: '60-90 min',
    scenarios: 5,
    skills: lang === 'fr' 
      ? ['Collecte de fonds', 'Constitution d\'équipe', 'Stratégie produit']
      : ['Fundraising', 'Team Building', 'Product Strategy'],
    available: false,
    tier: 'pro',
    comingSoon: true
  }
];

const getPricingPlans = (lang) => [
  {
    id: 'free',
    name: t('pricing.free', lang),
    price: 0,
    priceAnnual: 0,
    period: 'forever',
    description: t('pricing.freeDesc', lang),
    features: [
      t('pricing.feat1Sim', lang),
      t('pricing.featBasicScenarios', lang),
      t('pricing.featScoreTracking', lang),
      t('pricing.featCommunitySupport', lang)
    ],
    cta: t('pricing.currentPlan', lang),
    popular: false
  },
  {
    id: 'pro',
    name: t('pricing.professional', lang),
    price: 19,
    priceAnnual: 190,
    period: lang === 'fr' ? 'mois' : 'month',
    description: t('pricing.proDesc', lang),
    features: [
      t('pricing.featAllSimulations', lang),
      t('pricing.featAllScenarios', lang),
      t('pricing.featDetailedAnalytics', lang),
      t('pricing.featCertificates', lang),
      t('pricing.featPrioritySupport', lang)
    ],
    cta: t('pricing.upgradeNow', lang),
    popular: true
  },
  {
    id: 'enterprise',
    name: t('pricing.enterprise', lang),
    price: 199,
    priceAnnual: 1990,
    period: lang === 'fr' ? 'mois' : 'month',
    description: t('pricing.entDesc', lang),
    features: [
      t('pricing.featEverythingPro', lang),
      t('pricing.featUnlimitedTeam', lang),
      t('pricing.featAdminDashboard', lang),
      t('pricing.featCustomBranding', lang),
      t('pricing.featLmsIntegration', lang),
      t('pricing.featDedicatedManager', lang),
      t('pricing.featCustomDev', lang)
    ],
    cta: t('pricing.contactSales', lang),
    popular: false,
    hidden: true
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

const getApexScenarios = (lang) => ({
  tech_startup: {
    id: 'tech_startup',
    title: t('scenarios.techStartup.title', lang),
    subtitle: t('scenarios.techStartup.subtitle', lang),
    icon: '💻',
    difficulty: t('scenarios.techStartup.difficulty', lang),
    difficultyColor: '#3b82f6',
    description: t('scenarios.techStartup.description', lang),
    company: t('scenarios.techStartup.company', lang),
    projectName: t('scenarios.techStartup.projectName', lang),
    deliverable: 'features',
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
      stress: 20,
      knowledge: 30,
    },
    weeklyCostPerPerson: 8000,
    causalEvents: [
      { 
        id: 'scope_creep', 
        title: t('events.scope_creep.title', lang), 
        description: t('events.scope_creep.description', lang),
        icon: '📈',
        triggerCondition: (state) => state.week >= 3 && state.scope.quality > 80,
        options: [
          { id: 'accept', label: t('events.scope_creep.options.accept', lang), effects: { scope: 2, budget: -30000, stress: 15, morale: -5 } },
          { id: 'negotiate', label: t('events.scope_creep.options.negotiate', lang), effects: { scope: 1, budget: -15000, stress: 5 } },
          { id: 'decline', label: t('events.scope_creep.options.decline', lang), effects: { morale: 8, quality: 2, stress: -5 } }
        ]
      },
      { 
        id: 'tech_debt', 
        title: t('events.tech_debt.title', lang), 
        description: t('events.tech_debt.description', lang),
        icon: '🔧',
        triggerCondition: (state) => state.week >= 4 && state.scope.quality < 75,
        options: [
          { id: 'fix_now', label: t('events.tech_debt.options.fix_now', lang), effects: { schedule: -1, quality: 15, budget: -20000, knowledge: 10 } },
          { id: 'patch', label: t('events.tech_debt.options.patch', lang), effects: { quality: 5, budget: -8000 } },
          { id: 'defer', label: t('events.tech_debt.options.defer', lang), effects: { quality: -15, stress: 10 } }
        ]
      },
      { 
        id: 'dev_resignation', 
        title: t('events.dev_resignation.title', lang), 
        description: t('events.dev_resignation.description', lang),
        icon: '🚪',
        triggerCondition: (state) => state.week >= 5 && state.team.stress > 50,
        options: [
          { id: 'counter', label: t('events.dev_resignation.options.counter', lang), effects: { budget: -45000, morale: 5, knowledge: 0 } },
          { id: 'transition', label: t('events.dev_resignation.options.transition', lang), effects: { team: -1, schedule: -1, morale: -5, knowledge: -15, stress: 15 } },
          { id: 'contractor', label: t('events.dev_resignation.options.contractor', lang), effects: { budget: -55000, productivity: -0.1 } }
        ]
      },
      { 
        id: 'team_conflict', 
        title: t('events.team_conflict.title', lang), 
        description: t('events.team_conflict.description', lang),
        icon: '🔥',
        triggerCondition: (state) => state.team.size > 5 && state.team.morale < 70,
        options: [
          { id: 'mediate', label: t('events.team_conflict.options.mediate', lang), effects: { budget: -8000, morale: 10, productivity: 0.1, knowledge: 8 } },
          { id: 'decide', label: t('events.team_conflict.options.decide', lang), effects: { morale: -10, productivity: 0.05 } },
          { id: 'hybrid', label: t('events.team_conflict.options.hybrid', lang), effects: { budget: -5000, morale: 5 } }
        ]
      }
    ]
  },

  live_show: {
    id: 'live_show',
    title: t('scenarios.liveShow.title', lang),
    subtitle: t('scenarios.liveShow.subtitle', lang),
    icon: '🎪',
    difficulty: t('scenarios.liveShow.difficulty', lang),
    difficultyColor: '#f59e0b',
    description: t('scenarios.liveShow.description', lang),
    company: t('scenarios.liveShow.company', lang),
    projectName: t('scenarios.liveShow.projectName', lang),
    deliverable: 'acts',
    pedagogicalFocus: 'people',
    hasPrototyping: true,
    hasUncertainty: true,
    initial: { 
      budget: 2500000, 
      weeks: 12, 
      scope: 8, 
      teamSize: 12, 
      quality: 80, 
      morale: 80,
      stress: 25,
      knowledge: 20,
    },
    weeklyCostPerPerson: 6000,
    causalEvents: [
      { 
        id: 'star_injury', 
        title: t('events.star_injury.title', lang), 
        description: t('events.star_injury.description', lang),
        icon: '🤕',
        triggerCondition: (state) => state.week >= 4 && state.team.stress > 40,
        options: [
          { id: 'rest', label: t('events.star_injury.options.rest', lang), effects: { schedule: -2, quality: 10, morale: 15, stress: -10 } },
          { id: 'modified', label: t('events.star_injury.options.modified', lang), effects: { quality: -5, budget: -20000 } },
          { id: 'understudy', label: t('events.star_injury.options.understudy', lang), effects: { morale: -10, quality: -10, stress: 10 } }
        ]
      },
      { 
        id: 'creative_conflict', 
        title: t('events.creative_conflict.title', lang), 
        description: t('events.creative_conflict.description', lang),
        icon: '🎭',
        triggerCondition: (state) => state.week >= 5 && state.team.morale < 75,
        options: [
          { id: 'director', label: t('events.creative_conflict.options.director', lang), effects: { morale: -15, quality: 5, stress: 5 } },
          { id: 'choreographer', label: t('events.creative_conflict.options.choreographer', lang), effects: { morale: -10, quality: 5, stress: 5 } },
          { id: 'workshop', label: t('events.creative_conflict.options.workshop', lang), effects: { budget: -30000, schedule: -1, quality: 15, morale: 10, knowledge: 12 } }
        ]
      },
      { 
        id: 'rigging_issue', 
        title: t('events.rigging_issue.title', lang), 
        description: t('events.rigging_issue.description', lang),
        icon: '⚠️',
        triggerCondition: (state) => state.week >= 6,
        prototypeModifier: true,
        options: [
          { id: 'redesign', label: t('events.rigging_issue.options.redesign', lang), effects: { budget: -150000, schedule: -2, quality: 15, stress: -10 } },
          { id: 'reinforce', label: t('events.rigging_issue.options.reinforce', lang), effects: { budget: -60000, quality: 5 } },
          { id: 'simplify', label: t('events.rigging_issue.options.simplify', lang), effects: { scope: -1, quality: -10, morale: -10 } }
        ]
      }
    ]
  },

  construction: {
    id: 'construction',
    title: t('scenarios.construction.title', lang),
    subtitle: t('scenarios.construction.subtitle', lang),
    icon: '🏗️',
    difficulty: t('scenarios.construction.difficulty', lang),
    difficultyColor: '#3b82f6',
    description: t('scenarios.construction.description', lang),
    company: t('scenarios.construction.company', lang),
    projectName: t('scenarios.construction.projectName', lang),
    deliverable: 'floors',
    pedagogicalFocus: 'risk',
    hasPrototyping: true,
    hasUncertainty: true,
    initial: { 
      budget: 8000000, 
      weeks: 16, 
      scope: 12, 
      teamSize: 25, 
      quality: 85, 
      morale: 70,
      stress: 30,
      knowledge: 40,
    },
    weeklyCostPerPerson: 4500,
    causalEvents: [
      { 
        id: 'weather_delay', 
        title: t('events.weather_delay.title', lang), 
        description: t('events.weather_delay.description', lang),
        icon: '🌧️',
        triggerCondition: (state) => state.week >= 4 && state.week <= 12,
        options: [
          { id: 'pause', label: t('events.weather_delay.options.pause', lang), effects: { schedule: -2, morale: 5, stress: -5 } },
          { id: 'interior', label: t('events.weather_delay.options.interior', lang), effects: { schedule: -1, budget: -50000, knowledge: 5 } },
          { id: 'push', label: t('events.weather_delay.options.push', lang), effects: { budget: -80000, quality: -5, morale: -10, stress: 15 } }
        ]
      },
      { 
        id: 'permit_issue', 
        title: t('events.permit_issue.title', lang), 
        description: t('events.permit_issue.description', lang),
        icon: '📋',
        triggerCondition: (state) => state.week >= 6,
        prototypeModifier: true,
        options: [
          { id: 'rework', label: t('events.permit_issue.options.rework', lang), effects: { schedule: -2, budget: -120000, quality: 10, knowledge: 8 } },
          { id: 'appeal', label: t('events.permit_issue.options.appeal', lang), effects: { schedule: -1, budget: -30000, stress: 10 } },
          { id: 'expedite', label: t('events.permit_issue.options.expedite', lang), effects: { budget: -180000 } }
        ]
      },
      { 
        id: 'safety_incident', 
        title: t('events.safety_incident.title', lang), 
        description: t('events.safety_incident.description', lang),
        icon: '🦺',
        triggerCondition: (state) => state.week >= 5 && state.team.stress > 45,
        options: [
          { id: 'full_audit', label: t('events.safety_incident.options.full_audit', lang), effects: { schedule: -1, budget: -60000, quality: 10, morale: 15, stress: -15, knowledge: 10 } },
          { id: 'targeted', label: t('events.safety_incident.options.targeted', lang), effects: { budget: -25000, quality: 5 } },
          { id: 'minimal', label: t('events.safety_incident.options.minimal', lang), effects: { quality: -10, morale: -15, stress: 20 } }
        ]
      },
      { 
        id: 'materials_shortage', 
        title: t('events.materials_shortage.title', lang), 
        description: t('events.materials_shortage.description', lang),
        icon: '📦',
        triggerCondition: (state) => state.week >= 7,
        prototypeModifier: true,
        options: [
          { id: 'wait', label: t('events.materials_shortage.options.wait', lang), effects: { schedule: -3, morale: -10, stress: 15 } },
          { id: 'alternative', label: t('events.materials_shortage.options.alternative', lang), effects: { budget: -200000, schedule: -1 } },
          { id: 'redesign', label: t('events.materials_shortage.options.redesign', lang), effects: { budget: -100000, quality: -5, knowledge: 5 } }
        ]
      }
    ]
  },

  rd_innovation: {
    id: 'rd_innovation',
    title: t('scenarios.rdInnovation.title', lang),
    subtitle: t('scenarios.rdInnovation.subtitle', lang),
    icon: '🔬',
    difficulty: t('scenarios.rdInnovation.difficulty', lang),
    difficultyColor: '#dc2626',
    description: t('scenarios.rdInnovation.description', lang),
    company: t('scenarios.rdInnovation.company', lang),
    projectName: t('scenarios.rdInnovation.projectName', lang),
    deliverable: 'milestones',
    pedagogicalFocus: 'prototyping',
    hasPrototyping: true,
    hasUncertainty: true,
    initial: { 
      budget: 3000000, 
      weeks: 14, 
      scope: 10, 
      teamSize: 8, 
      quality: 75,
      morale: 85,
      stress: 35,
      knowledge: 25,
    },
    weeklyCostPerPerson: 10000,
    causalEvents: [
      { 
        id: 'tech_failure', 
        title: t('events.tech_failure.title', lang), 
        description: t('events.tech_failure.description', lang),
        icon: '💥',
        triggerCondition: (state) => state.week >= 5,
        prototypeModifier: true,
        options: [
          { id: 'pivot', label: t('events.tech_failure.options.pivot', lang), effects: { scope: -2, budget: -200000, knowledge: 15, stress: -10 } },
          { id: 'iterate', label: t('events.tech_failure.options.iterate', lang), effects: { schedule: -3, budget: -150000, quality: -10, stress: 15 } },
          { id: 'parallel', label: t('events.tech_failure.options.parallel', lang), effects: { budget: -400000, team: 2, stress: 20 } }
        ]
      },
      { 
        id: 'breakthrough', 
        title: t('events.breakthrough.title', lang), 
        description: t('events.breakthrough.description', lang),
        icon: '💡',
        triggerCondition: (state) => state.week >= 6 && state.team.knowledge > 50,
        options: [
          { id: 'focus', label: t('events.breakthrough.options.focus', lang), effects: { quality: 15, morale: 15, knowledge: 10, stress: -10 } },
          { id: 'validate', label: t('events.breakthrough.options.validate', lang), effects: { budget: -50000, quality: 10, knowledge: 20 } },
          { id: 'patent', label: t('events.breakthrough.options.patent', lang), effects: { schedule: -1, morale: -5 } }
        ]
      },
      { 
        id: 'competitor_announcement', 
        title: t('events.competitor_announcement.title', lang), 
        description: t('events.competitor_announcement.description', lang),
        icon: '⚡',
        triggerCondition: (state) => state.week >= 7,
        options: [
          { id: 'accelerate', label: t('events.competitor_announcement.options.accelerate', lang), effects: { schedule: -3, stress: 25, morale: -10 } },
          { id: 'differentiate', label: t('events.competitor_announcement.options.differentiate', lang), effects: { scope: 2, budget: -100000, knowledge: 5 } },
          { id: 'stay_course', label: t('events.competitor_announcement.options.stay_course', lang), effects: { quality: 10, morale: 5 } }
        ]
      }
    ]
  }
});

// ============================================
// ENHANCED GAME MECHANICS - HBP CAUSAL MODEL
// ============================================

/*
 * MEETING TYPES (replacing simple "boost morale")
 * Based on HBP simulation's three meeting types with distinct effects
 */
const getMeetingTypes = (lang) => ({
  coaching: {
    id: 'coaching',
    name: t('meetings.coaching.name', lang),
    description: t('meetings.coaching.description', lang),
    hoursPerWeek: 2,
    costPerSession: 500,
    effects: {
      knowledge: 8,
      morale: 3,
      stress: -2,
    },
    icon: '🎓'
  },
  standup: {
    id: 'standup',
    name: t('meetings.standup.name', lang),
    description: t('meetings.standup.description', lang),
    hoursPerWeek: 1.25,
    costPerSession: 0,
    effects: {
      coordination: 10,
      productivity: 0.02,
    },
    icon: '📊'
  },
  status: {
    id: 'status',
    name: t('meetings.status.name', lang),
    description: t('meetings.status.description', lang),
    hoursPerWeek: 2,
    costPerSession: 300,
    effects: {
      morale: 5,
      stress: -5,
      stakeholder: 10,
    },
    icon: '📋'
  }
});

/*
 * PROTOTYPING MECHANIC
 * Prototypes cost time/money upfront but reduce severity of uncertainty events
 */
const PROTOTYPE_COST = {
  tech_startup: { budget: 15000, time: 0.5 },
  live_show: { budget: 50000, time: 1 },
  construction: { budget: 80000, time: 1 },
  rd_innovation: { budget: 100000, time: 1 },
};

/*
 * CAUSAL CALCULATIONS
 */

// Calculate stress level based on multiple factors
const calculateStress = (state, scenario) => {
  let stress = state.team.stress;
  
  const weeksRemaining = state.schedule.deadline - state.week;
  const workRemaining = state.scope.totalFeatures - state.scope.completed;
  const weeklyCapacity = calculateWeeklyCapacity(state.team, state);
  const weeksNeeded = workRemaining / (weeklyCapacity * state.scope.totalFeatures);
  
  if (weeksNeeded > weeksRemaining) {
    stress += Math.min(15, (weeksNeeded - weeksRemaining) * 5);
  }
  
  if (state.team.knowledge < 40 && state.week <= 4) {
    stress += 5;
  }
  
  if (weeksNeeded <= weeksRemaining && state.team.morale > 70) {
    stress -= 3;
  }
  
  return Math.max(0, Math.min(100, stress));
};

// Stress affects morale
const calculateMoraleFromStress = (currentMorale, stress) => {
  let moraleDelta = 0;
  
  if (stress > 60) {
    moraleDelta = -((stress - 60) * 0.3);
  } else if (stress < 30) {
    moraleDelta = 2;
  }
  
  return Math.max(10, Math.min(100, currentMorale + moraleDelta));
};

// Morale affects productivity
const calculateProductivityFromMorale = (baseProductivity, morale) => {
  if (morale >= 80) {
    return baseProductivity * 1.1;
  } else if (morale >= 60) {
    return baseProductivity;
  } else if (morale >= 40) {
    return baseProductivity * 0.85;
  } else {
    return baseProductivity * 0.65;
  }
};

// Knowledge affects mistake rate
const calculateMistakeRate = (knowledge, hasStandups) => {
  let baseRate = 0.15 - (knowledge * 0.001);
  
  if (hasStandups) {
    baseRate *= 0.7;
  }
  
  return Math.max(0.02, baseRate);
};

// Weekly capacity calculation (enhanced)
const calculateWeeklyCapacity = (team, state) => {
  const baseCapacity = team.size * team.productivity;
  const moraleAdjustedProductivity = calculateProductivityFromMorale(team.productivity, team.morale);
  const mistakeRate = calculateMistakeRate(state.team.knowledge, state.meetings?.standup);
  
  const effectiveCapacity = (team.size * moraleAdjustedProductivity * (team.morale / 100)) * (1 - mistakeRate);
  
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
  return { morale: -15, stress: 20 };
};

// Enhanced scoring (HBP-style with bonus for consistency)
const calculateScore = (state) => {
  const budgetScore = Math.max(0, ((state.budget.total - state.budget.spent) / state.budget.total) * 300);
  const scheduleBonus = state.week <= state.schedule.deadline ? 200 : Math.max(0, 200 - ((state.week - state.schedule.deadline) * 50));
  const scopeScore = (state.scope.completed / state.scope.totalFeatures) * 200;
  const qualityScore = (state.scope.quality / 100) * 200;
  const teamScore = (state.moraleHistory.reduce((a, b) => a + b, 0) / state.moraleHistory.length / 100) * 50;
  
  // Consistency bonus: reward not changing schedule
  const consistencyBonus = state.scheduleChanges <= 1 ? 50 : state.scheduleChanges <= 2 ? 25 : 0;
  
  // Prototype bonus
  const prototypeBonus = state.prototypesBuilt * 25;
  
  return Math.round(budgetScore + scheduleBonus + scopeScore + qualityScore + teamScore + consistencyBonus + prototypeBonus);
};

// Grade calculation
const getGrade = (score) => {
  if (score >= 900) return 'A+';
  if (score >= 850) return 'A';
  if (score >= 800) return 'A-';
  if (score >= 750) return 'B+';
  if (score >= 700) return 'B';
  if (score >= 650) return 'B-';
  if (score >= 600) return 'C+';
  if (score >= 550) return 'C';
  if (score >= 500) return 'C-';
  if (score >= 450) return 'D+';
  if (score >= 400) return 'D';
  return 'F';
};

// Get scope levels for a scenario (translated)
const getScopeLevels = (scenarioId, lang) => {
  const levels = {
    tech_startup: [
      { level: 1, name: t('deliverables.tech_startup.level1.name', lang), desc: t('deliverables.tech_startup.level1.desc', lang), tasks: 3 },
      { level: 2, name: t('deliverables.tech_startup.level2.name', lang), desc: t('deliverables.tech_startup.level2.desc', lang), tasks: 4 },
      { level: 3, name: t('deliverables.tech_startup.level3.name', lang), desc: t('deliverables.tech_startup.level3.desc', lang), tasks: 3 },
      { level: 4, name: t('deliverables.tech_startup.level4.name', lang), desc: t('deliverables.tech_startup.level4.desc', lang), tasks: 2 }
    ],
    live_show: [
      { level: 1, name: t('deliverables.live_show.level1.name', lang), desc: t('deliverables.live_show.level1.desc', lang), tasks: 2 },
      { level: 2, name: t('deliverables.live_show.level2.name', lang), desc: t('deliverables.live_show.level2.desc', lang), tasks: 2 },
      { level: 3, name: t('deliverables.live_show.level3.name', lang), desc: t('deliverables.live_show.level3.desc', lang), tasks: 2 },
      { level: 4, name: t('deliverables.live_show.level4.name', lang), desc: t('deliverables.live_show.level4.desc', lang), tasks: 2 }
    ],
    construction: [
      { level: 1, name: t('deliverables.construction.level1.name', lang), desc: t('deliverables.construction.level1.desc', lang), tasks: 3 },
      { level: 2, name: t('deliverables.construction.level2.name', lang), desc: t('deliverables.construction.level2.desc', lang), tasks: 4 },
      { level: 3, name: t('deliverables.construction.level3.name', lang), desc: t('deliverables.construction.level3.desc', lang), tasks: 3 }
    ],
    rd_innovation: [
      { level: 1, name: t('deliverables.rd_innovation.level1.name', lang), desc: t('deliverables.rd_innovation.level1.desc', lang), tasks: 2 },
      { level: 2, name: t('deliverables.rd_innovation.level2.name', lang), desc: t('deliverables.rd_innovation.level2.desc', lang), tasks: 3 },
      { level: 3, name: t('deliverables.rd_innovation.level3.name', lang), desc: t('deliverables.rd_innovation.level3.desc', lang), tasks: 3 },
      { level: 4, name: t('deliverables.rd_innovation.level4.name', lang), desc: t('deliverables.rd_innovation.level4.desc', lang), tasks: 2 }
    ]
  };
  return levels[scenarioId] || [];
};

// Free trial limit
const FREE_TRIAL_WEEKS = 3;

// ============================================
// MAIN APP COMPONENT
// ============================================

function App() {
  // Language state
  const [lang, setLang] = useState(() => localStorage.getItem('bizsimhub-lang') || 'en');
  
  // Page/navigation state
  const [currentPage, setCurrentPage] = useState('landing');
  
  // Auth state
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  
  // Subscription/billing state
  const [subscription, setSubscription] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [checkoutLoading, setCheckoutLoading] = useState(null);
  
  // User data
  const [userScores, setUserScores] = useState({ scores: [], bestScores: [] });
  
  // UI state
  const [toast, setToast] = useState(null);
  
  // Simulation state
  const [selectedSimulation, setSelectedSimulation] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [simPhase, setSimPhase] = useState('select');
  
  // Paywall modal for free users
  const [showPaywall, setShowPaywall] = useState(false);
  
  // Brief tab for HBP-style intro
  const [briefTab, setBriefTab] = useState('brief');

  // Get translated data
  const SIMULATIONS = getSimulations(lang);
  const PRICING_PLANS = getPricingPlans(lang);
  const APEX_SCENARIOS = getApexScenarios(lang);
  const MEETING_TYPES = getMeetingTypes(lang);

  // Toast helper
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Save language preference
  useEffect(() => {
    localStorage.setItem('bizsimhub-lang', lang);
  }, [lang]);

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
        showToast(lang === 'fr' ? '🎉 Connexion Google réussie!' : '🎉 Successfully signed in with Google!', 'success');
      }).catch(() => {
        api.setToken(null);
        showToast(lang === 'fr' ? 'Échec de l\'authentification. Veuillez réessayer.' : 'Authentication failed. Please try again.', 'error');
      });
      window.history.replaceState({}, '', window.location.pathname);
    }
    
    // Handle Google OAuth errors
    const authError = params.get('error');
    if (authError) {
      showToast(lang === 'fr' ? 'Échec de la connexion Google. Veuillez réessayer.' : 'Google sign-in failed. Please try again.', 'error');
      window.history.replaceState({}, '', window.location.pathname);
    }
    
    // Check for success redirect from Stripe
    if (params.get('session_id')) {
      showToast(lang === 'fr' ? '🎉 Paiement réussi! Votre abonnement est maintenant actif.' : '🎉 Payment successful! Your subscription is now active.', 'success');
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
      showToast(lang === 'fr' ? 'Bienvenue sur BizSimHub! 🎉' : 'Welcome to BizSimHub! 🎉', 'success');
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
      showToast(lang === 'fr' ? 'Échec du paiement. Veuillez réessayer.' : 'Failed to start checkout. Please try again.', 'error');
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const data = await api.createPortalSession();
      window.location.href = data.url;
    } catch (e) {
      showToast(lang === 'fr' ? 'Échec de l\'ouverture du portail d\'abonnement.' : 'Failed to open subscription portal.', 'error');
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

  // Initialize game state
  const createApexInitialState = (scenario) => ({
    week: 1,
    budget: { total: scenario.initial.budget, spent: 0 },
    schedule: { deadline: scenario.initial.weeks },
    scope: { 
      totalFeatures: scenario.initial.scope, 
      completed: 0, 
      quality: scenario.initial.quality 
    },
    team: { 
      size: scenario.initial.teamSize, 
      morale: scenario.initial.morale, 
      productivity: 0.8,
      stress: scenario.initial.stress,
      knowledge: scenario.initial.knowledge
    },
    gamePhase: 'action',
    currentEvent: null,
    usedEvents: [],
    moraleHistory: [scenario.initial.morale],
    decisions: [],
    meetings: { coaching: false, standup: false, status: false },
    prototypesBuilt: 0,
    maxPrototypes: scenario.hasPrototyping ? 3 : 0,
    scheduleChanges: 0
  });

  const beginSimulation = () => {
    setGameState(createApexInitialState(selectedScenario));
    setSimPhase('playing');
  };

  // Action handler
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
            stress: prev.team.stress + 8,
            knowledge: Math.max(prev.team.knowledge - 3, 10)
          };
          newState.budget = { ...prev.budget, spent: prev.budget.spent + action.cost };
          break;
          
        case 'fire':
          newState.team = { 
            ...prev.team, 
            size: Math.max(2, prev.team.size - 1),
            morale: Math.max(0, prev.team.morale - 12),
            stress: prev.team.stress + 10,
            knowledge: Math.max(prev.team.knowledge - 8, 10)
          };
          break;
          
        case 'meeting_coaching':
          if (!prev.meetings.coaching) {
            newState.meetings = { ...prev.meetings, coaching: true };
            newState.team = {
              ...prev.team,
              knowledge: Math.min(100, prev.team.knowledge + 8),
              morale: Math.min(100, prev.team.morale + 3),
              stress: Math.max(0, prev.team.stress - 2)
            };
            newState.budget = { ...prev.budget, spent: prev.budget.spent + (500 * prev.team.size) };
          }
          break;
          
        case 'meeting_standup':
          if (!prev.meetings.standup) {
            newState.meetings = { ...prev.meetings, standup: true };
            newState.team = { ...prev.team, productivity: prev.team.productivity + 0.02 };
          }
          break;
          
        case 'meeting_status':
          if (!prev.meetings.status) {
            newState.meetings = { ...prev.meetings, status: true };
            newState.team = {
              ...prev.team,
              morale: Math.min(100, prev.team.morale + 5),
              stress: Math.max(0, prev.team.stress - 5)
            };
            newState.budget = { ...prev.budget, spent: prev.budget.spent + 300 };
          }
          break;
          
        case 'quality_review':
          newState.scope = { ...prev.scope, quality: Math.min(100, prev.scope.quality + 5) };
          newState.budget = { ...prev.budget, spent: prev.budget.spent + action.cost };
          newState.team = { ...prev.team, knowledge: Math.min(100, prev.team.knowledge + 3) };
          break;
          
        case 'crunch':
          const crunchProgress = calculateWeeklyProgress(prev.team, prev.scope, prev) * 0.3;
          newState.scope = { 
            ...prev.scope, 
            completed: Math.min(prev.scope.totalFeatures, prev.scope.completed + crunchProgress * prev.scope.totalFeatures),
            quality: Math.max(50, prev.scope.quality - 3)
          };
          newState.team = { 
            ...prev.team, 
            morale: Math.max(0, prev.team.morale - 15),
            stress: Math.min(100, prev.team.stress + 20)
          };
          newState.budget = { ...prev.budget, spent: prev.budget.spent + action.cost };
          break;
          
        case 'build_prototype':
          if (prev.prototypesBuilt < prev.maxPrototypes && PROTOTYPE_COST[scenario.id]) {
            newState.prototypesBuilt = prev.prototypesBuilt + 1;
            newState.budget = { ...prev.budget, spent: prev.budget.spent + PROTOTYPE_COST[scenario.id].budget };
            newState.team = { ...prev.team, knowledge: Math.min(100, prev.team.knowledge + 10) };
          }
          break;
          
        case 'extend_deadline':
          newState.schedule = { ...prev.schedule, deadline: prev.schedule.deadline + 1 };
          newState.scheduleChanges = prev.scheduleChanges + 1;
          if (prev.scheduleChanges > 1) {
            const penalty = calculateScheduleConsistencyPenalty(prev.scheduleChanges + 1);
            newState.team = {
              ...prev.team,
              morale: Math.max(0, prev.team.morale + penalty.morale),
              stress: Math.min(100, prev.team.stress + penalty.stress)
            };
          }
          break;
      }
      
      return newState;
    });
  };

  // Advance week
  const advanceWeek = () => {
    // Check paywall for free users
    const isPro = subscription?.status === 'active' || currentUser?.isTester || currentUser?.isAdmin;
    if (!isPro && gameState.week >= FREE_TRIAL_WEEKS) {
      setShowPaywall(true);
      return;
    }
    
    setGameState(prev => {
      const scenario = selectedScenario;
      const progress = calculateWeeklyProgress(prev.team, prev.scope, prev);
      const weeklyPersonnelCost = prev.team.size * scenario.weeklyCostPerPerson;
      
      // Calculate causal effects
      const newStress = calculateStress(prev, scenario);
      const newMorale = calculateMoraleFromStress(prev.team.morale, newStress);
      
      const newState = {
        ...prev,
        week: prev.week + 1,
        scope: {
          ...prev.scope,
          completed: Math.min(prev.scope.totalFeatures, prev.scope.completed + progress * prev.scope.totalFeatures)
        },
        budget: {
          ...prev.budget,
          spent: prev.budget.spent + weeklyPersonnelCost
        },
        team: {
          ...prev.team,
          morale: newMorale,
          stress: newStress
        },
        moraleHistory: [...prev.moraleHistory, newMorale],
        meetings: { coaching: false, standup: false, status: false }
      };
      
      // Check for causal events
      const triggeredEvent = scenario.causalEvents.find(event => 
        !prev.usedEvents.includes(event.id) && event.triggerCondition(newState)
      );
      
      if (triggeredEvent) {
        // Modify event if prototype was built
        if (triggeredEvent.prototypeModifier && prev.prototypesBuilt > 0) {
          const modifiedEvent = { ...triggeredEvent };
          modifiedEvent.options = modifiedEvent.options.map(opt => ({
            ...opt,
            effects: Object.fromEntries(
              Object.entries(opt.effects).map(([k, v]) => [k, typeof v === 'number' ? Math.round(v * 0.6) : v])
            )
          }));
          newState.currentEvent = modifiedEvent;
        } else {
          newState.currentEvent = triggeredEvent;
        }
        newState.gamePhase = 'event';
        newState.usedEvents = [...prev.usedEvents, triggeredEvent.id];
      }
      
      // Check for game end
      const isComplete = newState.scope.completed >= newState.scope.totalFeatures * 0.95;
      const deadlinePassed = newState.week > newState.schedule.deadline;
      const budgetExceeded = newState.budget.spent >= newState.budget.total;
      
      if (isComplete || deadlinePassed || budgetExceeded) {
        setSimPhase('ended');
        // Record score
        if (currentUser) {
          const finalScore = calculateScore(newState);
          api.recordScore('project-apex', {
            score: finalScore,
            grade: getGrade(finalScore),
            scenarioId: scenario.id,
            weeksUsed: newState.week,
            budgetUsed: newState.budget.spent
          });
        }
      }
      
      return newState;
    });
  };

  // Handle event choice
  const handleEventChoice = (option) => {
    setGameState(prev => {
      const newState = { ...prev };
      
      // Apply effects
      if (option.effects.budget) newState.budget = { ...prev.budget, spent: prev.budget.spent - option.effects.budget };
      if (option.effects.schedule) newState.schedule = { ...prev.schedule, deadline: Math.max(prev.week + 1, prev.schedule.deadline + option.effects.schedule) };
      if (option.effects.scope) newState.scope = { ...prev.scope, totalFeatures: prev.scope.totalFeatures + option.effects.scope };
      if (option.effects.quality) newState.scope = { ...newState.scope, quality: Math.max(0, Math.min(100, prev.scope.quality + option.effects.quality)) };
      if (option.effects.team) newState.team = { ...prev.team, size: Math.max(2, prev.team.size + option.effects.team) };
      if (option.effects.morale) newState.team = { ...newState.team, morale: Math.max(0, Math.min(100, prev.team.morale + option.effects.morale)) };
      if (option.effects.stress) newState.team = { ...newState.team, stress: Math.max(0, Math.min(100, prev.team.stress + option.effects.stress)) };
      if (option.effects.knowledge) newState.team = { ...newState.team, knowledge: Math.max(0, Math.min(100, prev.team.knowledge + option.effects.knowledge)) };
      if (option.effects.productivity) newState.team = { ...newState.team, productivity: Math.max(0.5, Math.min(1.5, prev.team.productivity + option.effects.productivity)) };
      
      newState.decisions = [...prev.decisions, { event: prev.currentEvent?.id, choice: option.id }];
      newState.currentEvent = null;
      newState.gamePhase = 'action';
      
      return newState;
    });
  };

  // Determine mascot mood
  const getMascotMood = (state) => {
    if (!state) return 'normal';
    const budgetPercent = (state.budget.spent / state.budget.total) * 100;
    const progressPercent = (state.scope.completed / state.scope.totalFeatures) * 100;
    const weekPercent = (state.week / state.schedule.deadline) * 100;
    
    if (state.team.stress > 70 || budgetPercent > weekPercent + 30 || state.team.morale < 40) return 'stressed';
    if (state.team.stress > 50 || progressPercent < weekPercent - 20) return 'concerned';
    if (progressPercent >= 100 && state.week <= state.schedule.deadline) return 'success';
    return 'normal';
  };

  // ============================================
  // RENDER NAVBAR
  // ============================================
  const renderNavbar = () => (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-left">
          <div className="logo" onClick={() => setCurrentPage(currentUser ? 'dashboard' : 'landing')}>
            <span className="logo-icon">📊</span>
            <span className="logo-text">BizSim<span className="logo-accent">Hub</span></span>
          </div>
        </div>
        
        <div className="nav-center">
          <button className="nav-link" onClick={() => setCurrentPage(currentUser ? 'dashboard' : 'landing')}>
            {t('nav.home', lang)}
          </button>
          <button className="nav-link" onClick={() => setCurrentPage('simulations')}>
            {t('nav.simulations', lang)}
          </button>
          <button className="nav-link" onClick={() => setCurrentPage('pricing')}>
            {t('nav.pricing', lang)}
          </button>
        </div>
        
        <div className="nav-right">
          {/* Language Toggle */}
          <button 
            className="lang-toggle" 
            onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
            title={lang === 'en' ? 'Français' : 'English'}
          >
            {lang === 'en' ? '🇫🇷 FR' : '🇬🇧 EN'}
          </button>
          
          {currentUser ? (
            <>
              {currentUser.isAdmin && (
                <button className="nav-link admin-link" onClick={() => setCurrentPage('admin')} title={t('admin.title', lang)}>⚙️</button>
              )}
              <button className="nav-link" onClick={() => setCurrentPage('dashboard')}>
                {t('nav.dashboard', lang)}
              </button>
              <button className="btn-secondary" onClick={handleLogout}>
                {t('nav.logout', lang)}
              </button>
            </>
          ) : (
            <>
              <button className="nav-link" onClick={() => { setCurrentPage('auth'); setAuthMode('login'); }}>
                {t('nav.login', lang)}
              </button>
              <button className="btn-primary" onClick={() => { setCurrentPage('auth'); setAuthMode('signup'); }}>
                {t('nav.getStarted', lang)}
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );

  // ============================================
  // RENDER LANDING PAGE
  // ============================================
  const renderLanding = () => (
    <div className="landing-page">
      {renderNavbar()}
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">{t('landing.badge', lang)}</span>
          <h1>
            {t('landing.heroTitle1', lang)}<br/>
            <span className="accent">{t('landing.heroTitle2', lang)}</span>
          </h1>
          <p className="hero-subtitle">{t('landing.heroSubtitle', lang)}</p>
          <div className="hero-buttons">
            <button className="btn-primary btn-lg" onClick={() => { setCurrentPage('auth'); setAuthMode('signup'); }}>
              {t('landing.startTrial', lang)}
            </button>
            <button className="btn-secondary btn-lg" onClick={() => setCurrentPage('simulations')}>
              {t('landing.browseSimulations', lang)}
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">4</span><span className="stat-label">{t('landing.simulations', lang)}</span></div>
            <div className="stat"><span className="stat-num">16+</span><span className="stat-label">{t('landing.scenarios', lang)}</span></div>
            <div className="stat"><span className="stat-num">1K+</span><span className="stat-label">{t('landing.learners', lang)}</span></div>
            <div className="stat"><span className="stat-num">4</span><span className="stat-label">{t('landing.industries', lang)}</span></div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        <div className="featured-content">
          <span className="section-badge">{t('landing.featured', lang)}</span>
          <h2>{t('landing.projectApex', lang)}</h2>
          <p>{t('landing.flagshipSimulation', lang)}</p>
          <div className="featured-card">
            <div className="featured-info">
              <h3>{t('landing.masterPM', lang)}</h3>
              <p>{SIMULATIONS[0].description}</p>
              <div className="scenario-tags">
                <span>{lang === 'fr' ? 'Startup Tech' : 'Tech Startup'}</span>
                <span>{lang === 'fr' ? 'Spectacle vivant' : 'Live Entertainment'}</span>
                <span>{lang === 'fr' ? 'Construction' : 'Construction'}</span>
                <span>{lang === 'fr' ? 'Innovation R&D' : 'R&D Innovation'}</span>
              </div>
              <button className="btn-primary" onClick={() => startSimulation('project-apex')}>
                {currentUser ? t('landing.playNow', lang) : t('landing.tryFreeNow', lang)}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Simulation Library */}
      <section className="library-section">
        <div className="library-content">
          <h2>{t('landing.simulationLibrary', lang)}</h2>
          <p>{t('landing.comprehensiveSims', lang)}</p>
          <div className="sim-grid">
            {SIMULATIONS.map(sim => (
              <div key={sim.id} className={`sim-card ${sim.comingSoon ? 'coming-soon' : ''}`}>
                <span className="sim-icon">{sim.icon}</span>
                {sim.comingSoon && <div className="sim-badge-soon">{t('simulations.comingSoon', lang)}</div>}
                {sim.featured && <div className="sim-badge-featured">{t('simulations.availableNow', lang)}</div>}
                <h3>{sim.title}</h3>
                <p>{sim.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-section">
        <h2>{t('landing.whyChoose', lang)}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🎮</span>
            <h3>{t('landing.feature1Title', lang)}</h3>
            <p>{t('landing.feature1Desc', lang)}</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🛡️</span>
            <h3>{t('landing.feature2Title', lang)}</h3>
            <p>{t('landing.feature2Desc', lang)}</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📊</span>
            <h3>{t('landing.feature3Title', lang)}</h3>
            <p>{t('landing.feature3Desc', lang)}</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🏢</span>
            <h3>{t('landing.feature4Title', lang)}</h3>
            <p>{t('landing.feature4Desc', lang)}</p>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="pricing-preview">
        <h2>{t('pricing.title', lang)}</h2>
        <p>{t('pricing.subtitle', lang)}</p>
        <div className="pricing-preview-cards">
          <div className="price-card-mini">
            <h3>{t('pricing.free', lang)}</h3>
            <p className="price-desc">{t('pricing.freeDesc', lang)}</p>
            <div className="price-amount">
              <span className="price-num">$0</span>
            </div>
            <ul>
              <li>✓ {t('pricing.feat1Sim', lang)}</li>
              <li>✓ {t('pricing.featBasicScenarios', lang)}</li>
              <li>✓ {t('pricing.featScoreTracking', lang)}</li>
            </ul>
            <button className="btn-secondary" onClick={() => { setCurrentPage('auth'); setAuthMode('signup'); }}>
              {t('pricing.getStartedFree', lang)}
            </button>
          </div>
          
          <div className="price-card-mini popular">
            <div className="popular-badge">{t('pricing.mostPopular', lang)}</div>
            <h3>{t('pricing.professional', lang)}</h3>
            <p className="price-desc">{t('pricing.proDesc', lang)}</p>
            <div className="price-amount">
              <span className="price-num">$19</span>
              <span className="price-period">{t('pricing.perMonth', lang)}</span>
            </div>
            <ul>
              <li>✓ {t('pricing.featAllSimulations', lang)}</li>
              <li>✓ {t('pricing.featAllScenarios', lang)}</li>
              <li>✓ {t('pricing.featDetailedAnalytics', lang)}</li>
              <li>✓ {t('pricing.featCertificates', lang)}</li>
            </ul>
            <button className="btn-primary" onClick={() => handleCheckout('pro')}>
              {t('pricing.startFreeTrial', lang)}
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>{t('landing.readyToStart', lang)}</h2>
        <p>{t('landing.joinLearners', lang)}</p>
        <button className="btn-primary btn-lg" onClick={() => { setCurrentPage('auth'); setAuthMode('signup'); }}>
          {t('landing.startLearning', lang)}
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-text">BizSim<span className="logo-accent">Hub</span></span>
            <div className="social-links">
              <a href="https://www.linkedin.com/company/sylvain-pmo-consulting" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', fontSize: '20px' }} title="LinkedIn">
                in
              </a>
              <a href="https://www.facebook.com/profile.php?id=61586908877730" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', fontSize: '20px' }} title="Facebook">
                f
              </a>
              <a href="https://www.instagram.com/sylv.ainpmo/" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', fontSize: '20px' }} title="Instagram">
                📷
              </a>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-col"><h4>{t('footer.product', lang)}</h4><a href="#">{t('nav.simulations', lang)}</a><a href="#">{t('nav.pricing', lang)}</a></div>
            <div className="footer-col"><h4>{t('footer.company', lang)}</h4><a href="#">{t('footer.about', lang)}</a><a href="#">{t('footer.forEducators', lang)}</a></div>
            <div className="footer-col"><h4>{t('footer.legal', lang)}</h4><a href="#">{t('footer.privacy', lang)}</a><a href="#">{t('footer.terms', lang)}</a></div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t('footer.madeWith', lang)}</p>
          <p>© 2025 BizSimHub. {t('footer.allRights', lang)}</p>
        </div>
      </footer>
    </div>
  );

  // ============================================
  // RENDER DASHBOARD
  // ============================================
  const renderDashboard = () => {
    const bestScore = userScores?.bestScores?.[0];
    const recentScores = userScores?.scores?.slice(0, 5) || [];
    
    return (
      <div className="dashboard-page">
        {renderNavbar()}
        <div className="dashboard-content">
          <div className="welcome-section">
            <h1>{t('dashboard.welcome', lang)}, {currentUser?.name?.split(' ')[0] || currentUser?.email}! 👋</h1>
            <p>{t('dashboard.readyToContinue', lang)}</p>
          </div>
          
          <div className="quick-actions">
            <h2>{t('dashboard.quickActions', lang)}</h2>
            <div className="action-buttons">
              <button className="action-card" onClick={() => startSimulation('project-apex')}>
                <span className="action-icon">🎯</span>
                <span>{t('dashboard.playProjectApex', lang)}</span>
              </button>
              <button className="action-card" onClick={() => setCurrentPage('simulations')}>
                <span className="action-icon">📚</span>
                <span>{t('dashboard.browseSimulations', lang)}</span>
              </button>
            </div>
          </div>
          
          <div className="stats-section">
            <h2>{t('dashboard.yourStats', lang)}</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-value">{userScores?.scores?.length || 0}</span>
                <span className="stat-name">{t('dashboard.simulationsPlayed', lang)}</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{bestScore?.grade || '-'}</span>
                <span className="stat-name">{t('dashboard.bestGrade', lang)}</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{bestScore?.score || 0}</span>
                <span className="stat-name">{t('dashboard.highScore', lang)}</span>
              </div>
            </div>
          </div>
          
          <div className="recent-section">
            <h2>{t('dashboard.recentScores', lang)}</h2>
            {recentScores.length > 0 ? (
              <div className="scores-list">
                {recentScores.map((score, i) => {
                  const dateStr = score.created_at ? new Date(score.created_at).toLocaleDateString() : '';
                  const isValidDate = dateStr && dateStr !== 'Invalid Date';
                  return (
                    <div key={i} className="score-item">
                      <span className="score-grade" style={{color: score.grade?.startsWith('A') ? '#10b981' : score.grade?.startsWith('B') ? '#6366f1' : '#f59e0b'}}>{score.grade}</span>
                      <span className="score-points">{score.score} pts</span>
                      <span className="score-scenario">{score.scenario_id?.replace('_', ' ') || t('dashboard.unknown', lang)}</span>
                      <span className="score-date">{isValidDate ? dateStr : t('dashboard.recent', lang)}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no-scores">
                <p>{t('dashboard.noScoresYet', lang)}</p>
                <p>{t('dashboard.playFirst', lang)}</p>
              </div>
            )}
          </div>
          
          <div className="featured-section-dash">
            <h2>{t('dashboard.featuredSimulation', lang)}</h2>
            <div className="featured-card-dash" onClick={() => startSimulation('project-apex')}>
              <span className="sim-icon">🎯</span>
              <div>
                <h3>{lang === 'fr' ? 'Projet Apex' : 'Project Apex'}</h3>
                <p>{SIMULATIONS[0].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // RENDER AUTH PAGE
  // ============================================
  const renderAuth = () => (
    <div className="auth-page">
      {renderNavbar()}
      <div className="auth-container">
        <div className="auth-card">
          <h2>{authMode === 'login' ? t('auth.welcome', lang) : t('auth.createAccount', lang)}</h2>
          <p className="auth-subtitle">{authMode === 'login' ? t('auth.signInContinue', lang) : t('auth.startJourney', lang)}</p>
          
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
                <label>{t('auth.fullName', lang)}</label>
                <input type="text" name="name" placeholder="John Doe" required />
              </div>
            )}
            <div className="form-group">
              <label>{t('auth.email', lang)}</label>
              <input type="email" name="email" placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label>{t('auth.password', lang)}</label>
              <input type="password" name="password" placeholder="••••••••" required minLength={6} />
            </div>
            <button type="submit" className="btn-primary btn-full" disabled={authLoading}>
              {authLoading ? t('auth.pleaseWait', lang) : authMode === 'login' ? t('auth.signIn', lang) : t('auth.createAccount', lang)}
            </button>
          </form>
          
          <div className="auth-divider"><span>{t('auth.or', lang)}</span></div>
          
          <button className="btn-google" onClick={() => window.location.href = `${API_BASE}/auth/google`}>
            <span className="google-icon">G</span>
            {t('auth.continueGoogle', lang)}
          </button>
          
          <p className="auth-toggle">
            {authMode === 'login' ? t('auth.noAccount', lang) + ' ' : t('auth.haveAccount', lang) + ' '}
            <button onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setAuthError(''); }}>
              {authMode === 'login' ? t('auth.signUp', lang) : t('auth.signIn', lang)}
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  // ============================================
  // RENDER SIMULATIONS CATALOG
  // ============================================
  const renderSimulations = () => (
    <div className="simulations-page">
      {renderNavbar()}
      <div className="simulations-content">
        <h1>{t('simulations.catalog', lang)}</h1>
        <p>{t('simulations.catalogSubtitle', lang)}</p>
        
        {/* Pricing banner for non-pro users */}
        {!subscription?.status && (
          <div className="pricing-banner">
            <span>💡</span>
            <p>{t('pricing.choosePlan', lang)}</p>
          </div>
        )}
        
        {/* Pricing mini cards */}
        {!subscription?.status && (
          <div className="pricing-mini">
            <div className="price-mini-card">
              <h3>{t('pricing.free', lang)}</h3>
              <p className="price-desc">{t('pricing.freeDesc', lang)}</p>
              <div className="price-amount"><span className="price-num">$0</span></div>
              <ul>
                <li>✓ {t('pricing.feat1Sim', lang)}</li>
                <li>✓ {t('pricing.featBasicScenarios', lang)}</li>
              </ul>
              <button className="btn-secondary" onClick={() => { setCurrentPage('auth'); setAuthMode('signup'); }}>
                {t('pricing.getStartedFree', lang)}
              </button>
            </div>
            
            <div className="price-mini-card popular">
              <div className="popular-badge">{t('pricing.mostPopular', lang)}</div>
              <h3>{t('pricing.professional', lang)}</h3>
              <p className="price-desc">{t('pricing.proDesc', lang)}</p>
              <div className="price-amount">
                <span className="price-num">$19</span>
                <span className="price-period">{t('pricing.perMonth', lang)}</span>
              </div>
              <ul>
                <li>✓ {t('pricing.featAllSimulations', lang)}</li>
                <li>✓ {t('pricing.featAllScenarios', lang)}</li>
              </ul>
              <button className="btn-primary" onClick={() => handleCheckout('pro')}>
                {t('pricing.upgradeNow', lang)}
              </button>
            </div>
          </div>
        )}
        
        {/* Simulation cards */}
        <div className="sim-catalog-grid">
          {SIMULATIONS.map(sim => (
            <div key={sim.id} className={`sim-catalog-card ${sim.comingSoon ? 'disabled' : ''}`}>
              <div className="sim-header">
                <span className="sim-icon">{sim.icon}</span>
                <div className="sim-badges">
                  {sim.featured && <span className="badge-featured">{t('simulations.available', lang)}</span>}
                  {sim.comingSoon && <span className="badge-soon">{t('simulations.comingSoon', lang)}</span>}
                  {sim.tier === 'pro' && <span className="badge-pro">{t('simulations.pro', lang)}</span>}
                </div>
              </div>
              <h3>{sim.title}</h3>
              <p className="sim-subtitle">{sim.subtitle}</p>
              <p className="sim-description">{sim.description}</p>
              <div className="sim-meta">
                <span>{sim.scenarios} {t('simulations.scenarios', lang)}</span>
                <span>{sim.duration}</span>
                <span>{sim.difficulty}</span>
              </div>
              <button 
                className="btn-primary" 
                disabled={sim.comingSoon}
                onClick={() => startSimulation(sim.id)}
              >
                {sim.comingSoon ? t('simulations.comingSoon', lang) : t('simulations.startSimulation', lang)}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============================================
  // RENDER PRICING PAGE
  // ============================================
  const renderPricing = () => (
    <div className="pricing-page">
      {renderNavbar()}
      <div className="pricing-content">
        <h1>{t('pricing.title', lang)}</h1>
        <p>{t('pricing.chooseYourPlan', lang)}</p>
        
        <div className="billing-toggle">
          <button className={billingCycle === 'monthly' ? 'active' : ''} onClick={() => setBillingCycle('monthly')}>
            {t('pricing.monthly', lang)}
          </button>
          <button className={billingCycle === 'annual' ? 'active' : ''} onClick={() => setBillingCycle('annual')}>
            {t('pricing.annual', lang)} (Save 17%)
          </button>
        </div>
        
        <div className="pricing-grid">
          {PRICING_PLANS.filter(p => !p.hidden).map(plan => (
            <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">{t('pricing.mostPopular', lang)}</div>}
              <h3>{plan.name}</h3>
              <p className="plan-desc">{plan.description}</p>
              <div className="plan-price">
                <span className="price-amount">${billingCycle === 'annual' ? Math.round(plan.priceAnnual / 12) : plan.price}</span>
                {plan.price > 0 && <span className="price-period">{t('pricing.perMonth', lang)}</span>}
              </div>
              <ul className="plan-features">
                {plan.features.map((f, i) => <li key={i}>✓ {f}</li>)}
              </ul>
              <button 
                className={plan.popular ? 'btn-primary' : 'btn-secondary'}
                onClick={() => plan.id === 'free' 
                  ? (currentUser ? null : setCurrentPage('auth'))
                  : handleCheckout(plan.id)
                }
                disabled={checkoutLoading === plan.id || (currentUser && plan.id === 'free')}
              >
                {checkoutLoading === plan.id ? t('common.loading', lang) : plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============================================
  // RENDER SIMULATION
  // ============================================
  const renderSimulation = () => {
    // Phase: Scenario Selection
    if (simPhase === 'select') {
      return (
        <div className="sim-page">
          {renderNavbar()}
          <div className="sim-select-container">
            <button className="back-link" onClick={() => setCurrentPage('catalog')}>
              ← {t('game.backToLibrary', lang)}
            </button>
            <div className="sim-select-header">
              <span className="sim-select-icon">{selectedSimulation?.icon}</span>
              <h1>{selectedSimulation?.title}</h1>
              <p>{selectedSimulation?.description}</p>
            </div>
            <h3 className="scenarios-title">{t('game.chooseScenario', lang)}</h3>
            <div className="scenarios-grid">
              {Object.values(APEX_SCENARIOS).map(scenario => (
                <button key={scenario.id} className="scenario-card" onClick={() => selectScenario(scenario)}>
                  <div className="scenario-icon">{scenario.icon}</div>
                  <div className="scenario-info">
                    <h3>{scenario.title}</h3>
                    <p className="scenario-sub">{scenario.subtitle}</p>
                    <p className="scenario-desc">{scenario.description}</p>
                    {scenario.hasPrototyping && <span className="scenario-badge">🔬 {t('game.prototypingAvailable', lang)}</span>}
                    {scenario.hasUncertainty && <span className="scenario-badge">⚡ {t('game.highUncertainty', lang)}</span>}
                  </div>
                  <div className="scenario-meta">
                    <span className="difficulty" style={{color: scenario.difficultyColor}}>{scenario.difficulty}</span>
                    <span>{scenario.initial.weeks} {t('game.weeks', lang)}</span>
                    <span>{t('game.focus', lang)}: {scenario.pedagogicalFocus}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Phase: Project Briefing
    if (simPhase === 'brief') {
      const getProjectBrief = () => {
        const briefs = {
          tech_startup: {
            context: lang === 'fr'
              ? `Vous êtes chef de projet senior chez ${selectedScenario.company}, une entreprise technologique en pleine croissance spécialisée dans les solutions d'affaires infonuagiques. L'entreprise a identifié une opportunité de marché significative pour une nouvelle plateforme SaaS.`
              : `You are a senior project manager at ${selectedScenario.company}, a fast-growing technology company specializing in cloud-based business solutions. The company has identified a significant market opportunity for a new SaaS platform.`,
            challenge: lang === 'fr'
              ? `Votre PDG vous a confié la mission d'assembler et de diriger une équipe de développement pour livrer cette plateforme. L'analyse de marché suggère que des concurrents travaillent sur des solutions similaires, vous mettant sous pression pour livrer un produit de haute qualité.`
              : `Your CEO has tasked you with assembling and leading a product development team to deliver this platform. Market analysis suggests that competitors are working on similar solutions, putting pressure on you to deliver a high-quality product.`,
            deliverables: lang === 'fr' ? [
              { level: 1, name: 'Plateforme de base', desc: 'Gestion des utilisateurs, authentification et stockage des données', tasks: 3 },
              { level: 2, name: 'Fonctionnalités standard', desc: 'Tableau de bord, rapports et intégrations API', tasks: 4 },
              { level: 3, name: 'Fonctionnalités avancées', desc: 'Analytique, automatisation et support multi-locataires', tasks: 3 },
              { level: 4, name: 'Fonctionnalités premium', desc: 'Insights IA et sécurité entreprise', tasks: 2 }
            ] : [
              { level: 1, name: 'Core Platform', desc: 'Basic user management, authentication, and data storage', tasks: 3 },
              { level: 2, name: 'Standard Features', desc: 'Dashboard, reporting, and API integrations', tasks: 4 },
              { level: 3, name: 'Advanced Features', desc: 'Analytics, automation, and multi-tenant support', tasks: 3 },
              { level: 4, name: 'Premium Features', desc: 'AI-powered insights and enterprise security', tasks: 2 }
            ]
          },
          live_show: {
            context: lang === 'fr'
              ? `Vous êtes le Producteur Exécutif chez ${selectedScenario.company}, une entreprise de divertissement de renommée mondiale. L'entreprise a donné le feu vert à un nouveau spectacle ambitieux combinant acrobaties, musique et technologie de pointe.`
              : `You are the Executive Producer at ${selectedScenario.company}, a world-renowned live entertainment company. The company has greenlit an ambitious new touring show that combines acrobatics, music, and cutting-edge technology.`,
            challenge: lang === 'fr'
              ? `Votre directeur artistique a une vision audacieuse pour "${selectedScenario.projectName}" mais les exigences techniques et créatives sont importantes. Vous devez gérer une équipe diversifiée tout en assurant le respect des normes de sécurité.`
              : `Your artistic director has a bold vision for "${selectedScenario.projectName}" but the technical and creative demands are significant. You must manage a diverse team while ensuring safety standards are met.`,
            deliverables: lang === 'fr' ? [
              { level: 1, name: 'Actes de fondation', desc: 'Séquence d\'ouverture et performances d\'ensemble', tasks: 2 },
              { level: 2, name: 'Actes vedettes', desc: 'Séquences aériennes et performances spéciales', tasks: 2 },
              { level: 3, name: 'Intégration technique', desc: 'Éclairage, son et mapping vidéo', tasks: 2 },
              { level: 4, name: 'Grande finale', desc: 'Séquence culminante avec intégration complète', tasks: 2 }
            ] : [
              { level: 1, name: 'Foundation Acts', desc: 'Opening sequence and core ensemble performances', tasks: 2 },
              { level: 2, name: 'Feature Acts', desc: 'Aerial sequences and specialty performances', tasks: 2 },
              { level: 3, name: 'Technical Integration', desc: 'Lighting, sound, and projection mapping', tasks: 2 },
              { level: 4, name: 'Grand Finale', desc: 'Climactic sequence with full cast integration', tasks: 2 }
            ]
          },
          construction: {
            context: lang === 'fr'
              ? `Vous êtes le Chef de Projet chez ${selectedScenario.company}, une entreprise de construction commerciale réputée. L'entreprise a remporté le contrat pour construire un nouveau développement à usage mixte.`
              : `You are the Project Manager at ${selectedScenario.company}, a commercial construction company with a strong reputation. The company has won the contract to build a new mixed-use development.`,
            challenge: lang === 'fr'
              ? `Le projet "${selectedScenario.projectName}" implique un bâtiment de 12 étages avec espaces commerciaux, bureaux et résidentiels. Vous devez naviguer les permis, les défis météo et la coordination des sous-traitants.`
              : `The "${selectedScenario.projectName}" project involves a 12-story building with retail, office, and residential spaces. You must navigate permitting, weather challenges, and subcontractor coordination.`,
            deliverables: lang === 'fr' ? [
              { level: 1, name: 'Fondations & Stationnement', desc: 'Stationnement souterrain et fondations', tasks: 3 },
              { level: 2, name: 'Structure principale', desc: 'Étages 1-6 avec espaces commerciaux', tasks: 4 },
              { level: 3, name: 'Étages supérieurs', desc: 'Étages 7-10 unités résidentielles', tasks: 3 },
              { level: 4, name: 'Penthouse & Systèmes', desc: 'Étages 11-12 et intégration des systèmes', tasks: 2 }
            ] : [
              { level: 1, name: 'Foundation & Parking', desc: 'Underground parking and structural foundation', tasks: 3 },
              { level: 2, name: 'Core Structure', desc: 'Floors 1-6 with retail and office space', tasks: 4 },
              { level: 3, name: 'Upper Floors', desc: 'Floors 7-10 residential units', tasks: 3 },
              { level: 4, name: 'Penthouse & Systems', desc: 'Floors 11-12 and building systems integration', tasks: 2 }
            ]
          },
          rd_innovation: {
            context: lang === 'fr'
              ? `Vous êtes le Chef de Projet Principal chez ${selectedScenario.company}, un laboratoire de R&D de pointe. L'entreprise a obtenu un financement pour développer une technologie révolutionnaire de capteurs quantiques.`
              : `You are the Lead Project Manager at ${selectedScenario.company}, a cutting-edge R&D laboratory. The company has secured funding to develop a breakthrough quantum sensing technology.`,
            challenge: lang === 'fr'
              ? `Le projet "${selectedScenario.projectName}" est hautement innovant avec une incertitude technique significative. Votre équipe doit repousser les limites de la technologie actuelle tout en gérant les risques inhérents à la R&D.`
              : `The "${selectedScenario.projectName}" project is highly innovative with significant technical uncertainty. Your team must push the boundaries of current technology while managing R&D risks.`,
            deliverables: lang === 'fr' ? [
              { level: 1, name: 'Preuve de concept', desc: 'Démontrer la capacité de base des capteurs quantiques', tasks: 2 },
              { level: 2, name: 'Prototype Alpha', desc: 'Prototype fonctionnel avec fonctionnalités de base', tasks: 3 },
              { level: 3, name: 'Prototype Bêta', desc: 'Prototype amélioré avec précision accrue', tasks: 3 },
              { level: 4, name: 'Prêt pour production', desc: 'Design manufacturable avec documentation', tasks: 2 }
            ] : [
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

      return (
        <div className="sim-page">
          {renderNavbar()}
          <div className="brief-container hbp-style">
            <button className="back-link" onClick={() => { setSimPhase('select'); setBriefTab('brief'); }}>
              ← {t('game.backToScenarios', lang)}
            </button>
            
            <div className="brief-header">
              <div className="brief-icon">{selectedScenario.icon}</div>
              <div>
                <h1>{selectedScenario.projectName}</h1>
                <p className="brief-company">{selectedScenario.company}</p>
              </div>
            </div>

            <div className="brief-tabs">
              <button className={`brief-tab ${briefTab === 'brief' ? 'active' : ''}`} onClick={() => setBriefTab('brief')}>
                {t('game.projectBrief', lang)}
              </button>
              <button className={`brief-tab ${briefTab === 'objectives' ? 'active' : ''}`} onClick={() => setBriefTab('objectives')}>
                {t('game.scenarioObjectives', lang)}
              </button>
              <button className={`brief-tab ${briefTab === 'managing' ? 'active' : ''}`} onClick={() => setBriefTab('managing')}>
                {t('game.managingYourProject', lang)}
              </button>
            </div>

            <div className="brief-tab-content">
              {briefTab === 'brief' && (
                <div className="tab-panel">
                  <h2>{t('game.projectBrief', lang)}: <span className="highlight">{selectedScenario.title}</span></h2>
                  <p className="brief-paragraph">{brief.context}</p>
                  <p className="brief-paragraph">{brief.challenge}</p>

                  <h3>{t('game.projectDeliverables', lang)}</h3>
                  <p>{lang === 'fr' 
                    ? `Votre projet comprend ${selectedScenario.initial.scope} ${selectedScenario.deliverable} organisés en niveaux progressifs.`
                    : `Your project consists of ${selectedScenario.initial.scope} ${selectedScenario.deliverable} organized into progressive levels.`
                  }</p>
                  
                  <div className="deliverables-list">
                    {brief.deliverables.map((d, i) => (
                      <div key={i} className="deliverable-item">
                        <div className="deliverable-icon">📋</div>
                        <div className="deliverable-content">
                          <strong>{lang === 'fr' ? 'NIVEAU' : 'LEVEL'} {d.level}: {d.name.toUpperCase()}</strong>
                          <p>{d.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {briefTab === 'objectives' && (
                <div className="tab-panel">
                  <h2>{t('game.scenarioObjectives', lang)}: <span className="highlight">{selectedScenario.title}</span></h2>
                  
                  <p className="brief-paragraph">
                    {lang === 'fr'
                      ? `La direction s'attend à ce que vous livriez ce projet en atteignant les objectifs ci-dessous. Vous serez évalué sur votre capacité à équilibrer portée, échéancier, budget, qualité et bien-être de l'équipe.`
                      : `Management expects you to deliver this project meeting the targets below. You will be evaluated on your ability to balance scope, schedule, budget, quality, and team wellbeing.`
                    }
                  </p>

                  <div className="objectives-section">
                    <h3>{lang === 'fr' ? 'Objectifs spécifiques' : 'Specific Objectives'}</h3>

                    <div className="objective-block">
                      <h4>{lang === 'fr' ? 'Portée cible' : 'Target Scope'}: <span className="highlight">{selectedScenario.initial.scope} {selectedScenario.deliverable}</span></h4>
                      <p>{lang === 'fr'
                        ? `Vous recevrez jusqu'à 200 points pour livrer la portée complète. Une livraison partielle résultera en moins de points proportionnellement.`
                        : `You will receive up to 200 points for delivering the full scope. Partial completion will result in proportionally fewer points.`
                      }</p>
                    </div>

                    <div className="objective-block">
                      <h4>{lang === 'fr' ? 'Échéancier cible' : 'Target Schedule'}: <span className="highlight">{lang === 'fr' ? 'Semaine' : 'Week'} {selectedScenario.initial.weeks}</span></h4>
                      <p>{lang === 'fr'
                        ? `Vous recevrez 200 points pour respecter votre échéancier et perdrez 40 points par semaine de dépassement.`
                        : `You will receive 200 points for meeting your schedule goal and lose 40 points for each week you exceed the deadline.`
                      }</p>
                    </div>

                    <div className="objective-block">
                      <h4>{lang === 'fr' ? 'Budget cible' : 'Target Budget'}: <span className="highlight">${(selectedScenario.initial.budget / 1000).toFixed(0)}K</span></h4>
                      <p>{lang === 'fr'
                        ? `Vous recevrez jusqu'à 200 points en respectant le budget. Terminer sous budget maximisera votre score.`
                        : `You will receive up to 200 points for staying within budget. Coming in under budget will maximize your score.`
                      }</p>
                    </div>

                    <div className="objective-block">
                      <h4>{lang === 'fr' ? 'Qualité cible' : 'Target Quality'}: <span className="highlight">{selectedScenario.initial.quality}%+</span></h4>
                      <p>{lang === 'fr'
                        ? `Livrez un produit de haute qualité. La qualité vaut 200 points et peut être améliorée par des revues de qualité.`
                        : `Deliver a high-quality product. Quality is worth 200 points and can be improved through quality reviews.`
                      }</p>
                    </div>

                    <div className="objective-block">
                      <h4>{lang === 'fr' ? 'Processus d\'équipe' : 'Team Process'}: <span className="highlight">100 points</span></h4>
                      <p>{lang === 'fr'
                        ? `Maintenez une dynamique d'équipe saine. Ce score reflète le moral moyen avec des bonus pour la constance.`
                        : `Maintain healthy team dynamics. This score reflects average morale, with bonuses for schedule consistency.`
                      }</p>
                    </div>
                  </div>

                  <div className="scoring-summary">
                    <h4>📊 {lang === 'fr' ? 'Score total possible: 1000 points' : 'Total Possible Score: 1000 points'}</h4>
                    <div className="score-breakdown">
                      <span>{lang === 'fr' ? 'Portée' : 'Scope'}: 200</span>
                      <span>{lang === 'fr' ? 'Échéancier' : 'Schedule'}: 200</span>
                      <span>Budget: 200</span>
                      <span>{lang === 'fr' ? 'Qualité' : 'Quality'}: 200</span>
                      <span>{lang === 'fr' ? 'Processus' : 'Team Process'}: 100</span>
                      <span>Bonus: 100</span>
                    </div>
                  </div>
                </div>
              )}

              {briefTab === 'managing' && (
                <div className="tab-panel">
                  <h2>{t('game.managingYourProject', lang)}: <span className="highlight">{selectedScenario.title}</span></h2>
                  
                  <p className="brief-paragraph">
                    {lang === 'fr'
                      ? `Chaque semaine, vous aurez l'occasion d'ajuster les paramètres du projet et de prendre des décisions. Comprendre les relations causales vous aidera à faire de meilleurs choix.`
                      : `Each week you will have opportunities to adjust project parameters and make decisions. Understanding the causal relationships will help you make better choices.`
                    }
                  </p>

                  <div className="managing-section">
                    <h3>{lang === 'fr' ? '1. Le modèle causal' : '1. The Causal Model'}</h3>
                    <p>{lang === 'fr' 
                      ? 'Cette simulation utilise des systèmes interconnectés où vos décisions ont des effets en cascade:'
                      : 'This simulation uses interconnected systems where your decisions have cascading effects:'
                    }</p>
                    
                    <div className="causal-relationships">
                      <div className="causal-item">
                        <span className="causal-icon">😰</span>
                        <div>
                          <strong>{lang === 'fr' ? 'Stress → Moral → Productivité' : 'Stress → Morale → Productivity'}</strong>
                          <p>{lang === 'fr'
                            ? 'Les délais irréalistes et les heures supplémentaires augmentent le stress. Un stress élevé diminue le moral, ce qui réduit directement la productivité.'
                            : 'Unrealistic deadlines and overtime increase stress. High stress lowers morale, which directly reduces productivity.'
                          }</p>
                        </div>
                      </div>
                      <div className="causal-item">
                        <span className="causal-icon">🧠</span>
                        <div>
                          <strong>{lang === 'fr' ? 'Développement des connaissances' : 'Knowledge Building'}</strong>
                          <p>{lang === 'fr'
                            ? 'Votre équipe commence avec des connaissances limitées. Les réunions de coaching réduisent les erreurs au fil du temps.'
                            : 'Your team starts with limited project knowledge. Coaching meetings reduce mistake rates over time.'
                          }</p>
                        </div>
                      </div>
                      <div className="causal-item">
                        <span className="causal-icon">📅</span>
                        <div>
                          <strong>{lang === 'fr' ? 'Constance de l\'échéancier' : 'Schedule Consistency'}</strong>
                          <p>{lang === 'fr'
                            ? 'Les changements fréquents érodent la confiance de l\'équipe. Chaque changement après la semaine 2 entraîne des pénalités.'
                            : 'Frequent deadline changes erode team trust. Each change after week 2 incurs morale and stress penalties.'
                          }</p>
                        </div>
                      </div>
                      {selectedScenario.hasPrototyping && (
                        <div className="causal-item">
                          <span className="causal-icon">🔬</span>
                          <div>
                            <strong>{lang === 'fr' ? 'Valeur du prototypage' : 'Prototyping Value'}</strong>
                            <p>{lang === 'fr'
                              ? 'Construire des prototypes tôt fait ressortir les problèmes avant qu\'ils ne deviennent coûteux.'
                              : 'Building prototypes early surfaces problems before they become expensive.'
                            }</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="managing-section">
                    <h3>{lang === 'fr' ? '2. Actions hebdomadaires' : '2. Weekly Actions'}</h3>
                    <p>{lang === 'fr'
                      ? 'Chaque semaine, vous pouvez prendre plusieurs actions pour gérer votre projet:'
                      : 'Each week you can take several actions to manage your project:'
                    }</p>
                    
                    <div className="actions-grid">
                      <div className="action-item">
                        <strong>👥 {lang === 'fr' ? 'Gestion d\'équipe' : 'Team Management'}</strong>
                        <p>{lang === 'fr'
                          ? 'Embauchez ou libérez des membres. Les nouvelles recrues augmentent la capacité mais causent du stress temporaire.'
                          : 'Hire or release team members. New hires increase capacity but cause temporary stress.'
                        }</p>
                      </div>
                      <div className="action-item">
                        <strong>📅 {lang === 'fr' ? 'Ajustement d\'échéancier' : 'Schedule Adjustment'}</strong>
                        <p>{lang === 'fr'
                          ? 'Prolongez votre échéance si nécessaire. Les ajustements précoces coûtent moins cher.'
                          : 'Extend your deadline if needed. Early adjustments are less costly than late ones.'
                        }</p>
                      </div>
                      <div className="action-item">
                        <strong>🎯 {lang === 'fr' ? 'Réunions' : 'Meetings'}</strong>
                        <p>{lang === 'fr'
                          ? 'Coaching (connaissances), standups (erreurs), ou revues de statut (parties prenantes).'
                          : 'Coaching (builds knowledge), standups (reduces mistakes), or status reviews (stakeholder alignment).'
                        }</p>
                      </div>
                      <div className="action-item">
                        <strong>⭐ {lang === 'fr' ? 'Revue de qualité' : 'Quality Review'}</strong>
                        <p>{lang === 'fr'
                          ? 'Investissez du temps pour améliorer la qualité. Coûte du budget mais assure de meilleurs résultats.'
                          : 'Invest time in improving quality. Costs budget but ensures better outcomes.'
                        }</p>
                      </div>
                      <div className="action-item">
                        <strong>⚡ {lang === 'fr' ? 'Mode crunch' : 'Crunch Mode'}</strong>
                        <p>{lang === 'fr'
                          ? 'Poussez l\'équipe à faire des heures supplémentaires. Augmente la production à court terme au détriment du stress.'
                          : 'Push the team to work overtime. Increases short-term output at the cost of stress and morale.'
                        }</p>
                      </div>
                      {selectedScenario.hasPrototyping && (
                        <div className="action-item">
                          <strong>🔬 {lang === 'fr' ? 'Construire un prototype' : 'Build Prototype'}</strong>
                          <p>{lang === 'fr'
                            ? 'Investissez dans des tests précoces pour réduire les risques futurs.'
                            : 'Invest in early testing to reduce future risks.'
                          }</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="brief-actions">
              <button className="btn-primary btn-lg" onClick={beginSimulation}>
                {t('game.beginSimulation', lang)} →
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Phase: Playing the simulation
    if (simPhase === 'playing' && gameState) {
      const scenario = selectedScenario;
      const budgetRemaining = gameState.budget.total - gameState.budget.spent;
      const budgetPercent = (budgetRemaining / gameState.budget.total) * 100;
      const scopePercent = (gameState.scope.completed / gameState.scope.totalFeatures) * 100;
      const weeksRemaining = gameState.schedule.deadline - gameState.week + 1;
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
            <div className="week-badge">{t('game.week', lang)} {gameState.week} / {gameState.totalWeeks}</div>
          </div>

          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>

          <GanttMascot mood={
            (budgetPercent < 20 || weeksRemaining <= 1 || gameState.team.stress > 80) ? 'stressed' :
            (budgetPercent < 40 || weeksRemaining <= 3 || gameState.team.stress > 60) ? 'concerned' :
            (scopePercent >= 90 && gameState.scope.quality >= 80) ? 'success' : 'normal'
          } />

          <div className="game-dashboard">
            <div className="metric-card">
              <div className="gauge-container">
                <svg className="gauge" viewBox="0 0 100 100">
                  <circle className="gauge-bg" cx="50" cy="50" r="40" />
                  <circle className="gauge-fill" cx="50" cy="50" r="40" 
                    style={{
                      strokeDasharray: `${Math.max(0, budgetPercent) * 2.51} 251`,
                      stroke: budgetPercent > 30 ? '#10b981' : '#ef4444'
                    }}
                  />
                </svg>
                <div className="gauge-content">
                  <span className="gauge-icon">💰</span>
                  <span className="gauge-value">${(budgetRemaining / 1000).toFixed(0)}K</span>
                </div>
              </div>
              <span className="metric-label">Budget</span>
              <div className={`status-glow ${budgetPercent > 50 ? 'good' : budgetPercent > 30 ? 'warn' : 'bad'}`}></div>
            </div>

            <div className="metric-card">
              <div className="gauge-container">
                <svg className="gauge" viewBox="0 0 100 100">
                  <circle className="gauge-bg" cx="50" cy="50" r="40" />
                  <circle className="gauge-fill" cx="50" cy="50" r="40" 
                    style={{
                      strokeDasharray: `${(weeksRemaining / gameState.totalWeeks) * 100 * 2.51} 251`,
                      stroke: weeksRemaining > 3 ? '#10b981' : weeksRemaining > 1 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </svg>
                <div className="gauge-content">
                  <span className="gauge-icon">📅</span>
                  <span className="gauge-value">{Math.max(0, weeksRemaining)}</span>
                </div>
              </div>
              <span className="metric-label">{t('game.weeksLeft', lang)}</span>
              <div className={`status-glow ${weeksRemaining > 3 ? 'good' : weeksRemaining > 1 ? 'warn' : 'bad'}`}></div>
            </div>

            <div className="metric-card">
              <div className="gauge-container">
                <svg className="gauge" viewBox="0 0 100 100">
                  <circle className="gauge-bg" cx="50" cy="50" r="40" />
                  <circle className="gauge-fill" cx="50" cy="50" r="40" 
                    style={{ strokeDasharray: `${scopePercent * 2.51} 251`, stroke: '#6366f1' }}
                  />
                </svg>
                <div className="gauge-content">
                  <span className="gauge-icon">📦</span>
                  <span className="gauge-value">{Math.round(scopePercent)}%</span>
                </div>
              </div>
              <span className="metric-label">{t('game.scope', lang)}</span>
              <div className={`status-glow ${scopePercent > 80 ? 'good' : scopePercent > 50 ? 'warn' : 'neutral'}`}></div>
            </div>

            <div className="metric-card">
              <div className="gauge-container">
                <svg className="gauge" viewBox="0 0 100 100">
                  <circle className="gauge-bg" cx="50" cy="50" r="40" />
                  <circle className="gauge-fill" cx="50" cy="50" r="40" 
                    style={{
                      strokeDasharray: `${gameState.scope.quality * 2.51} 251`,
                      stroke: gameState.scope.quality > 70 ? '#10b981' : '#f59e0b'
                    }}
                  />
                </svg>
                <div className="gauge-content">
                  <span className="gauge-icon">⭐</span>
                  <span className="gauge-value">{Math.round(gameState.scope.quality)}%</span>
                </div>
              </div>
              <span className="metric-label">{t('game.quality', lang)}</span>
              <div className={`status-glow ${gameState.scope.quality > 80 ? 'good' : gameState.scope.quality > 60 ? 'warn' : 'bad'}`}></div>
            </div>

            <div className="metric-card">
              <div className="gauge-container mini">
                <div className="team-display">
                  <span className="gauge-icon large">👥</span>
                  <span className="gauge-value large">{gameState.team.size}</span>
                </div>
              </div>
              <span className="metric-label">{t('game.teamSize', lang)}</span>
            </div>

            <div className="metric-card">
              <div className="gauge-container">
                <svg className="gauge" viewBox="0 0 100 100">
                  <circle className="gauge-bg" cx="50" cy="50" r="40" />
                  <circle className="gauge-fill" cx="50" cy="50" r="40" 
                    style={{
                      strokeDasharray: `${gameState.team.morale * 2.51} 251`,
                      stroke: gameState.team.morale > 60 ? '#10b981' : gameState.team.morale > 40 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </svg>
                <div className="gauge-content">
                  <span className="gauge-icon">😊</span>
                  <span className="gauge-value">{Math.round(gameState.team.morale)}%</span>
                </div>
              </div>
              <span className="metric-label">{t('game.morale', lang)}</span>
              <div className={`status-glow ${gameState.team.morale > 70 ? 'good' : gameState.team.morale > 40 ? 'warn' : 'bad'}`}></div>
            </div>

            <div className="metric-card">
              <div className="gauge-container">
                <svg className="gauge" viewBox="0 0 100 100">
                  <circle className="gauge-bg" cx="50" cy="50" r="40" />
                  <circle className="gauge-fill stress" cx="50" cy="50" r="40" 
                    style={{
                      strokeDasharray: `${gameState.team.stress * 2.51} 251`,
                      stroke: gameState.team.stress < 40 ? '#10b981' : gameState.team.stress < 60 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </svg>
                <div className="gauge-content">
                  <span className="gauge-icon">😰</span>
                  <span className="gauge-value">{Math.round(gameState.team.stress)}%</span>
                </div>
              </div>
              <span className="metric-label">{t('game.stress', lang)}</span>
              <div className={`status-glow ${gameState.team.stress < 30 ? 'good' : gameState.team.stress < 60 ? 'warn' : 'bad'}`}></div>
            </div>

            <div className="metric-card">
              <div className="gauge-container">
                <svg className="gauge" viewBox="0 0 100 100">
                  <circle className="gauge-bg" cx="50" cy="50" r="40" />
                  <circle className="gauge-fill" cx="50" cy="50" r="40" 
                    style={{ strokeDasharray: `${gameState.team.knowledge * 2.51} 251`, stroke: '#8b5cf6' }}
                  />
                </svg>
                <div className="gauge-content">
                  <span className="gauge-icon">🧠</span>
                  <span className="gauge-value">{Math.round(gameState.team.knowledge)}%</span>
                </div>
              </div>
              <span className="metric-label">{t('game.knowledge', lang)}</span>
              <div className="status-glow neutral"></div>
            </div>

            <div className="metric-card">
              <div className="gauge-container">
                <svg className="gauge" viewBox="0 0 100 100">
                  <circle className="gauge-bg" cx="50" cy="50" r="40" />
                  <circle className="gauge-fill" cx="50" cy="50" r="40" 
                    style={{ strokeDasharray: `${effectiveProductivity * 100 * 2.51} 251`, stroke: '#06b6d4' }}
                  />
                </svg>
                <div className="gauge-content">
                  <span className="gauge-icon">⚡</span>
                  <span className="gauge-value">{Math.round(effectiveProductivity * 100)}%</span>
                </div>
              </div>
              <span className="metric-label">{t('game.productivity', lang)}</span>
              <div className={`status-glow ${effectiveProductivity > 0.9 ? 'good' : 'neutral'}`}></div>
            </div>

            {scenario.hasPrototyping && (
              <div className="metric-card proto-card">
                <div className="gauge-container mini">
                  <div className="proto-display">
                    <span className="gauge-icon large">🔬</span>
                    <span className="gauge-value large">{gameState.prototypesBuilt}/{gameState.maxPrototypes}</span>
                  </div>
                </div>
                <span className="metric-label">{t('game.prototypes', lang)}</span>
                {gameState.prototypesBuilt > 0 && <div className="status-glow good"></div>}
              </div>
            )}
          </div>

          <div className="game-actions">
            <h3>📋 {t('game.weeklyActions', lang)}</h3>
            
            <div className="action-section">
              <h4>👥 {t('game.teamManagement', lang)}</h4>
              <div className="action-row">
                <button className="action-btn" onClick={() => handleAction({ type: 'fire' })} disabled={gameState.team.size <= 2}>
                  − {t('game.fire', lang)}
                </button>
                <span className="team-count">{gameState.team.size} {t('game.members', lang)}</span>
                <button className="action-btn" onClick={() => handleAction({ type: 'hire' })} disabled={gameState.team.size >= 12}>
                  + {t('game.hire', lang)}
                </button>
              </div>
            </div>

            <div className="action-section">
              <h4>📅 {t('game.scheduleAdjustment', lang)}</h4>
              <div className="action-row">
                <button className="action-btn" onClick={() => handleAction({ type: 'extend', weeks: 1 })}>
                  +1 {t('game.weekExtension', lang)}
                </button>
                <span className="deadline-info">{t('game.deadline', lang)}: {t('game.week', lang)} {gameState.schedule.deadline}</span>
                <button className="action-btn" onClick={() => handleAction({ type: 'extend', weeks: 2 })}>
                  +2 {t('game.weeksExtension', lang)}
                </button>
              </div>
              {gameState.scheduleChanges > 0 && (
                <p className="warning-text">⚠️ {lang === 'fr' 
                  ? `${gameState.scheduleChanges} changement(s) d'échéancier - impact sur le moral`
                  : `${gameState.scheduleChanges} schedule change(s) - morale impact`
                }</p>
              )}
            </div>

            <div className="action-section">
              <h4>🎯 {t('game.meetings', lang)}</h4>
              <div className="meeting-buttons">
                {MEETING_TYPES.map(meeting => (
                  <button key={meeting.id} className="meeting-btn" onClick={() => handleAction({ type: 'meeting', meeting: meeting.id })}>
                    <span className="meeting-icon">{meeting.icon}</span>
                    <span>{meeting.name}</span>
                    <small>{meeting.description}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="action-section toggles">
              <label className="toggle-option">
                <input type="checkbox" checked={gameState.qualityReviewActive} onChange={() => handleAction({ type: 'toggleQuality' })} />
                <span>⭐ {t('game.qualityReview', lang)}</span>
                <small>{lang === 'fr' ? '+5% qualité, coût +$5K/sem' : '+5% quality, cost +$5K/week'}</small>
              </label>
              <label className="toggle-option">
                <input type="checkbox" checked={gameState.crunchActive} onChange={() => handleAction({ type: 'toggleCrunch' })} />
                <span>⚡ {t('game.crunchMode', lang)}</span>
                <small>{lang === 'fr' ? '+25% productivité, +15% stress' : '+25% productivity, +15% stress'}</small>
              </label>
              {scenario.hasPrototyping && gameState.prototypesBuilt < gameState.maxPrototypes && (
                <button className="proto-btn" onClick={() => handleAction({ type: 'prototype' })}>
                  🔬 {t('game.buildPrototype', lang)} ({gameState.prototypesBuilt}/{gameState.maxPrototypes})
                </button>
              )}
            </div>

            <div className="week-progress">
              <button className="btn-primary btn-lg" onClick={advanceWeek}>
                {t('game.advanceToWeek', lang)} {gameState.week + 1} →
              </button>
            </div>
          </div>

          {showEventModal && currentEvent && (
            <div className="event-modal-overlay">
              <div className="event-modal">
                <div className="event-header">
                  <span className="event-icon">{currentEvent.icon}</span>
                  <h2>{currentEvent.title}</h2>
                </div>
                <p className="event-description">{currentEvent.description}</p>
                <div className="event-options">
                  {currentEvent.options.map((option, i) => (
                    <button key={i} className="event-option" onClick={() => handleEventChoice(option)}>
                      <strong>{option.label}</strong>
                      <span>{option.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Phase: Results
    if (simPhase === 'results' && results) {
      const getGradeColor = (grade) => {
        if (grade.startsWith('A')) return '#10b981';
        if (grade.startsWith('B')) return '#6366f1';
        if (grade.startsWith('C')) return '#f59e0b';
        return '#ef4444';
      };

      return (
        <div className="sim-results">
          {renderNavbar()}
          <div className="results-container">
            <div className="results-header">
              <h1>🎉 {t('results.projectComplete', lang)}!</h1>
              <div className="final-grade" style={{color: getGradeColor(results.grade)}}>
                {results.grade}
              </div>
              <div className="final-score">{results.totalScore} {t('results.points', lang)}</div>
            </div>

            <div className="score-breakdown-card">
              <h3>{t('results.scoreBreakdown', lang)}</h3>
              <div className="breakdown-items">
                <div className="breakdown-item">
                  <span className="breakdown-label">📦 {t('game.scope', lang)}</span>
                  <div className="breakdown-bar">
                    <div className="bar-fill" style={{width: `${(results.breakdown.scope / 200) * 100}%`}}></div>
                  </div>
                  <span className="breakdown-value">{results.breakdown.scope}/200</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-label">📅 {t('game.schedule', lang)}</span>
                  <div className="breakdown-bar">
                    <div className="bar-fill" style={{width: `${Math.max(0, results.breakdown.schedule) / 200 * 100}%`}}></div>
                  </div>
                  <span className="breakdown-value">{results.breakdown.schedule}/200</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-label">💰 Budget</span>
                  <div className="breakdown-bar">
                    <div className="bar-fill" style={{width: `${(results.breakdown.budget / 200) * 100}%`}}></div>
                  </div>
                  <span className="breakdown-value">{results.breakdown.budget}/200</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-label">⭐ {t('game.quality', lang)}</span>
                  <div className="breakdown-bar">
                    <div className="bar-fill" style={{width: `${(results.breakdown.quality / 200) * 100}%`}}></div>
                  </div>
                  <span className="breakdown-value">{results.breakdown.quality}/200</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-label">👥 {t('results.teamProcess', lang)}</span>
                  <div className="breakdown-bar">
                    <div className="bar-fill" style={{width: `${(results.breakdown.teamProcess / 100) * 100}%`}}></div>
                  </div>
                  <span className="breakdown-value">{results.breakdown.teamProcess}/100</span>
                </div>
                {results.breakdown.bonuses > 0 && (
                  <div className="breakdown-item bonus">
                    <span className="breakdown-label">🌟 Bonus</span>
                    <div className="breakdown-bar">
                      <div className="bar-fill bonus" style={{width: `${(results.breakdown.bonuses / 100) * 100}%`}}></div>
                    </div>
                    <span className="breakdown-value">+{results.breakdown.bonuses}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="results-summary">
              <h3>{t('results.projectSummary', lang)}</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="summary-label">{t('results.finalScope', lang)}</span>
                  <span className="summary-value">{results.summary.scopeCompleted}/{results.summary.scopeTotal} {selectedScenario.deliverable}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">{t('results.completedIn', lang)}</span>
                  <span className="summary-value">{results.summary.weeksUsed} {t('game.weeks', lang)}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">{t('results.budgetUsed', lang)}</span>
                  <span className="summary-value">${(results.summary.budgetSpent / 1000).toFixed(0)}K / ${(results.summary.budgetTotal / 1000).toFixed(0)}K</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">{t('results.finalQuality', lang)}</span>
                  <span className="summary-value">{results.summary.finalQuality}%</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">{t('results.avgMorale', lang)}</span>
                  <span className="summary-value">{results.summary.avgMorale}%</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">{t('results.scheduleChanges', lang)}</span>
                  <span className="summary-value">{results.summary.scheduleChanges}</span>
                </div>
              </div>
            </div>

            {results.feedback && results.feedback.length > 0 && (
              <div className="feedback-section">
                <h3>{t('results.feedback', lang)}</h3>
                <ul className="feedback-list">
                  {results.feedback.map((fb, i) => (
                    <li key={i} className={`feedback-item ${fb.type}`}>
                      <span className="feedback-icon">{fb.type === 'success' ? '✅' : fb.type === 'warning' ? '⚠️' : 'ℹ️'}</span>
                      {fb.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="results-actions">
              <button className="btn-primary" onClick={() => {
                setSimPhase('select');
                setResults(null);
                setGameState(null);
              }}>
                {t('results.playAgain', lang)}
              </button>
              <button className="btn-secondary" onClick={() => setCurrentPage('dashboard')}>
                {t('results.backToDashboard', lang)}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // ============================================
  // RENDER ADMIN DASHBOARD
  // ============================================
  const renderAdminDashboard = () => {
    const filteredUsers = adminData.users.filter(u => 
      u.name?.toLowerCase().includes(adminSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(adminSearch.toLowerCase())
    );

    return (
      <div className="admin-page">
        {renderNavbar()}
        
        {adminLoading && (
          <div className="admin-loading-overlay">
            <div className="admin-loading-spinner">
              <div className="spinner"></div>
              <p>{t('admin.loadingData', lang)}</p>
            </div>
          </div>
        )}
        
        {adminError && (
          <div className="admin-error-banner">
            <span>⚠️ {adminError}</span>
            <button onClick={fetchAdminData}>{t('admin.retry', lang)}</button>
          </div>
        )}
        
        <div className="admin-layout">
          <aside className="admin-sidebar">
            <div className="admin-sidebar-header">
              <span className="admin-logo">⚙️</span>
              <h2>{t('admin.adminPanel', lang)}</h2>
            </div>
            <nav className="admin-nav">
              <button className={`admin-nav-btn ${adminTab === 'overview' ? 'active' : ''}`} onClick={() => setAdminTab('overview')}>
                <span>📊</span> {t('admin.overview', lang)}
              </button>
              <button className={`admin-nav-btn ${adminTab === 'users' ? 'active' : ''}`} onClick={() => setAdminTab('users')}>
                <span>👥</span> {t('admin.users', lang)}
              </button>
              <button className={`admin-nav-btn ${adminTab === 'analytics' ? 'active' : ''}`} onClick={() => setAdminTab('analytics')}>
                <span>📈</span> {t('admin.analytics', lang)}
              </button>
              <button className={`admin-nav-btn ${adminTab === 'revenue' ? 'active' : ''}`} onClick={() => setAdminTab('revenue')}>
                <span>💰</span> {t('admin.revenue', lang)}
              </button>
              <button className={`admin-nav-btn ${adminTab === 'content' ? 'active' : ''}`} onClick={() => setAdminTab('content')}>
                <span>📚</span> {t('admin.content', lang)}
              </button>
              <button className={`admin-nav-btn ${adminTab === 'system' ? 'active' : ''}`} onClick={() => setAdminTab('system')}>
                <span>🔧</span> {t('admin.system', lang)}
              </button>
            </nav>
            <div className="admin-sidebar-footer">
              <button className="admin-back-btn" onClick={() => setCurrentPage('dashboard')}>
                ← {t('admin.backToApp', lang)}
              </button>
            </div>
          </aside>

          <main className="admin-main">
            {adminTab === 'overview' && (
              <div className="admin-content">
                <div className="admin-header">
                  <div>
                    <h1>{t('admin.dashboardOverview', lang)}</h1>
                    <p>{lang === 'fr' ? 'Bienvenue! Voici ce qui se passe avec BizSimHub aujourd\'hui.' : 'Welcome! Here\'s what\'s happening with BizSimHub today.'}</p>
                  </div>
                  <button className="admin-btn refresh-btn" onClick={fetchAdminData} disabled={adminLoading}>
                    {adminLoading ? '↻ ' + t('common.loading', lang) : '↻ ' + t('admin.refresh', lang)}
                  </button>
                </div>

                <div className="admin-metrics-grid">
                  <div className="admin-metric-card">
                    <div className="metric-icon blue">👥</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.overview.totalUsers.toLocaleString()}</span>
                      <span className="metric-label">{t('admin.totalUsers', lang)}</span>
                    </div>
                    <span className="metric-badge green">+{adminData.overview.newUsersToday} {lang === 'fr' ? 'aujourd\'hui' : 'today'}</span>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon green">💰</div>
                    <div className="metric-info">
                      <span className="metric-value">${adminData.overview.monthlyRevenue.toLocaleString()}</span>
                      <span className="metric-label">{t('admin.monthlyRevenue', lang)}</span>
                    </div>
                    <span className="metric-badge green">+23% MoM</span>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon purple">🎯</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.overview.completionRate}%</span>
                      <span className="metric-label">{t('admin.completionRate', lang)}</span>
                    </div>
                    <span className="metric-badge neutral">{lang === 'fr' ? 'Moy' : 'Avg'}</span>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon orange">⚡</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.overview.activeNow}</span>
                      <span className="metric-label">{t('admin.activeNow', lang)}</span>
                    </div>
                    <span className="metric-badge blue">{lang === 'fr' ? 'En direct' : 'Live'}</span>
                  </div>
                </div>

                <div className="admin-stats-row">
                  <div className="admin-stat-card">
                    <h3>{t('admin.activeUsers30d', lang)}</h3>
                    <div className="stat-big">{adminData.overview.activeUsers.toLocaleString()}</div>
                    <div className="stat-bar">
                      <div className="stat-bar-fill" style={{width: `${(adminData.overview.activeUsers / adminData.overview.totalUsers) * 100}%`}}></div>
                    </div>
                    <span className="stat-sub">{Math.round((adminData.overview.activeUsers / adminData.overview.totalUsers) * 100)}% {lang === 'fr' ? 'du total' : 'of total users'}</span>
                  </div>
                  <div className="admin-stat-card">
                    <h3>{t('admin.avgSessionTime', lang)}</h3>
                    <div className="stat-big">{adminData.overview.avgSessionTime}</div>
                    <span className="stat-sub">{lang === 'fr' ? 'Par session utilisateur' : 'Per user session'}</span>
                  </div>
                  <div className="admin-stat-card">
                    <h3>{t('admin.totalRevenueAllTime', lang)}</h3>
                    <div className="stat-big">${adminData.overview.totalRevenue.toLocaleString()}</div>
                    <span className="stat-sub">{lang === 'fr' ? 'Depuis le lancement' : 'Since launch'}</span>
                  </div>
                </div>

                <div className="admin-section">
                  <h3>{t('admin.recentActivity', lang)}</h3>
                  <div className="activity-list">
                    <div className="activity-item">
                      <span className="activity-icon">🎉</span>
                      <div className="activity-content">
                        <strong>Michael Brown</strong> {lang === 'fr' ? 'a complété Project Apex avec Note A' : 'completed Project Apex with Grade A'}
                        <span className="activity-time">{lang === 'fr' ? 'Il y a 5 minutes' : '5 minutes ago'}</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <span className="activity-icon">💳</span>
                      <div className="activity-content">
                        <strong>Lisa Thompson</strong> {lang === 'fr' ? 'est passée au plan Professionnel' : 'upgraded to Professional plan'}
                        <span className="activity-time">{lang === 'fr' ? 'Il y a 23 minutes' : '23 minutes ago'}</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <span className="activity-icon">👤</span>
                      <div className="activity-content">
                        <strong>{lang === 'fr' ? 'Nouvel utilisateur inscrit:' : 'New user registered:'}</strong> alex@company.com
                        <span className="activity-time">{lang === 'fr' ? 'Il y a 1 heure' : '1 hour ago'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {adminTab === 'users' && (
              <div className="admin-content">
                <div className="admin-header">
                  <h1>{t('admin.userManagement', lang)}</h1>
                  <p>{lang === 'fr' ? 'Gérer et surveiller tous les utilisateurs' : 'Manage and monitor all platform users'}</p>
                </div>

                <div className="admin-user-stats">
                  <div className="user-stat">
                    <span className="user-stat-value">{adminData.users.filter(u => u.status === 'active').length}</span>
                    <span className="user-stat-label">{lang === 'fr' ? 'Actifs' : 'Active'}</span>
                  </div>
                  <div className="user-stat">
                    <span className="user-stat-value">{adminData.users.filter(u => u.plan === 'Professional').length}</span>
                    <span className="user-stat-label">Professional</span>
                  </div>
                  <div className="user-stat">
                    <span className="user-stat-value">{adminData.users.filter(u => u.plan === 'Enterprise').length}</span>
                    <span className="user-stat-label">Enterprise</span>
                  </div>
                  <div className="user-stat">
                    <span className="user-stat-value">{adminData.users.filter(u => u.status === 'churned').length}</span>
                    <span className="user-stat-label">{lang === 'fr' ? 'Perdus' : 'Churned'}</span>
                  </div>
                </div>

                <div className="admin-toolbar">
                  <div className="search-box">
                    <span>🔍</span>
                    <input 
                      type="text" 
                      placeholder={lang === 'fr' ? 'Rechercher par nom ou courriel...' : 'Search users by name or email...'} 
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                    />
                  </div>
                  <div className="toolbar-actions">
                    <select className="admin-select">
                      <option>{lang === 'fr' ? 'Tous les plans' : 'All Plans'}</option>
                      <option>{lang === 'fr' ? 'Gratuit' : 'Free'}</option>
                      <option>Professional</option>
                      <option>Enterprise</option>
                    </select>
                    <button className="admin-btn primary">+ {lang === 'fr' ? 'Ajouter' : 'Add User'}</button>
                  </div>
                </div>

                <div className="admin-table-container">
                  {filteredUsers.length > 0 ? (
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>{lang === 'fr' ? 'Utilisateur' : 'User'}</th>
                          <th>Plan</th>
                          <th>{lang === 'fr' ? 'Statut' : 'Status'}</th>
                          <th>Simulations</th>
                          <th>{lang === 'fr' ? 'Dernière activité' : 'Last Active'}</th>
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
                                {user.isTester ? 'Tester' : (user.plan || lang === 'fr' ? 'Gratuit' : 'Free')}
                              </span>
                            </td>
                            <td>
                              <span className={`status-badge ${user.status || 'active'}`}>{user.status || 'active'}</span>
                            </td>
                            <td>
                              <span className="sim-count">{user.completions || 0}/{user.simulations || 0}</span>
                              <span className="sim-label">{lang === 'fr' ? 'complétées' : 'completed'}</span>
                            </td>
                            <td className="last-active">{user.lastActive || (lang === 'fr' ? 'Jamais' : 'Never')}</td>
                            <td>
                              <div className="action-btns">
                                <button className="action-btn" title={lang === 'fr' ? 'Voir' : 'View'} onClick={() => setSelectedUser(user)}>👁</button>
                                <button 
                                  className={`action-btn ${user.isTester ? 'tester-active' : ''}`} 
                                  title={user.isTester ? (lang === 'fr' ? 'Retirer Testeur' : 'Remove Tester') : (lang === 'fr' ? 'Faire Testeur' : 'Make Tester')}
                                  onClick={() => handleToggleTester(user.id, user.isTester)}
                                >
                                  🧪
                                </button>
                                <button 
                                  className={`action-btn ${user.isAdmin ? 'admin-active' : ''}`} 
                                  title={user.isAdmin ? (lang === 'fr' ? 'Retirer Admin' : 'Remove Admin') : (lang === 'fr' ? 'Faire Admin' : 'Make Admin')}
                                  onClick={() => handleToggleAdmin(user.id, user.isAdmin)}
                                >
                                  👑
                                </button>
                                <button className="action-btn danger" title={lang === 'fr' ? 'Supprimer' : 'Delete'}>🗑</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">👥</div>
                      <p>{adminSearch ? (lang === 'fr' ? 'Aucun utilisateur trouvé' : 'No users match your search') : (lang === 'fr' ? 'Aucun utilisateur' : 'No users yet')}</p>
                    </div>
                  )}
                </div>

                {selectedUser && (
                  <div className="admin-modal-overlay" onClick={() => setSelectedUser(null)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                      <div className="modal-header">
                        <h2>{lang === 'fr' ? 'Détails utilisateur' : 'User Details'}</h2>
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
                            <span className={`plan-badge ${(selectedUser.plan || 'free').toLowerCase()}`}>{selectedUser.plan || (lang === 'fr' ? 'Gratuit' : 'Free')}</span>
                          </div>
                          <div className="detail-item">
                            <label>{lang === 'fr' ? 'Statut' : 'Status'}</label>
                            <span className={`status-badge ${selectedUser.status || 'active'}`}>{selectedUser.status || 'active'}</span>
                          </div>
                          <div className="detail-item">
                            <label>Admin</label>
                            <span className={`status-badge ${selectedUser.isAdmin ? 'active' : 'inactive'}`}>
                              {selectedUser.isAdmin ? '✓ ' + (lang === 'fr' ? 'Oui' : 'Yes') : (lang === 'fr' ? 'Non' : 'No')}
                            </span>
                          </div>
                          <div className="detail-item">
                            <label>{lang === 'fr' ? 'Inscrit' : 'Joined'}</label>
                            <span>{selectedUser.joined || 'N/A'}</span>
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
                          {selectedUser.isAdmin ? '👑 ' + (lang === 'fr' ? 'Retirer Admin' : 'Remove Admin') : '👑 ' + (lang === 'fr' ? 'Faire Admin' : 'Make Admin')}
                        </button>
                        <button className="admin-btn">{lang === 'fr' ? 'Envoyer courriel' : 'Send Email'}</button>
                        <button className="admin-btn danger">{lang === 'fr' ? 'Suspendre' : 'Suspend User'}</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {adminTab === 'analytics' && (
              <div className="admin-content">
                <div className="admin-header">
                  <h1>{t('admin.analytics', lang)}</h1>
                  <p>{lang === 'fr' ? 'Performance de la plateforme et métriques d\'engagement' : 'Platform performance and user engagement metrics'}</p>
                </div>

                <div className="admin-chart-section">
                  <h3>{lang === 'fr' ? 'Activité hebdomadaire' : 'Weekly Activity'}</h3>
                  <div className="bar-chart">
                    {adminData.analytics.weeklyActivity.map((day, i) => (
                      <div key={i} className="bar-group">
                        <div className="bar-container">
                          <div className="bar users" style={{height: `${(day.users / 600) * 100}%`}} title={`${day.users} ${lang === 'fr' ? 'utilisateurs' : 'users'}`}></div>
                          <div className="bar sessions" style={{height: `${(day.sessions / 1000) * 100}%`}} title={`${day.sessions} sessions`}></div>
                        </div>
                        <span className="bar-label">{day.day}</span>
                      </div>
                    ))}
                  </div>
                  <div className="chart-legend">
                    <span><i className="legend-dot users"></i> {lang === 'fr' ? 'Utilisateurs' : 'Users'}</span>
                    <span><i className="legend-dot sessions"></i> Sessions</span>
                  </div>
                </div>

                <div className="admin-section">
                  <h3>{lang === 'fr' ? 'Simulations populaires' : 'Popular Simulations'}</h3>
                  {adminData.analytics.popularSimulations?.length > 0 ? (
                    <div className="sim-rankings">
                      {adminData.analytics.popularSimulations.map((sim, i) => (
                        <div key={sim.id || i} className="sim-rank-item">
                          <span className="rank">#{i + 1}</span>
                          <div className="sim-rank-info">
                            <strong>{sim.name}</strong>
                            <div className="sim-rank-stats">
                              <span>🎮 {(sim.plays || 0).toLocaleString()} {lang === 'fr' ? 'parties' : 'plays'}</span>
                              <span>✅ {(sim.completions || 0).toLocaleString()} {lang === 'fr' ? 'complétées' : 'completions'}</span>
                              <span>⭐ {sim.avgScore || 0} {lang === 'fr' ? 'score moy' : 'avg score'}</span>
                            </div>
                          </div>
                          <div className="completion-rate">
                            {sim.plays > 0 ? Math.round((sim.completions / sim.plays) * 100) : 0}%
                            <span>{lang === 'fr' ? 'complétion' : 'completion'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">📊</div>
                      <p>{lang === 'fr' ? 'Aucune donnée de simulation' : 'No simulation data yet'}</p>
                    </div>
                  )}
                </div>

                <div className="admin-section">
                  <h3>{lang === 'fr' ? 'Distribution des notes' : 'Grade Distribution'}</h3>
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

            {adminTab === 'revenue' && (
              <div className="admin-content">
                <div className="admin-header">
                  <h1>{t('admin.revenue', lang)}</h1>
                  <p>{lang === 'fr' ? 'Métriques financières et analytiques d\'abonnements' : 'Financial metrics and subscription analytics'}</p>
                </div>

                <div className="admin-metrics-grid">
                  <div className="admin-metric-card">
                    <div className="metric-icon green">📈</div>
                    <div className="metric-info">
                      <span className="metric-value">${adminData.revenue.mrr.toLocaleString()}</span>
                      <span className="metric-label">{lang === 'fr' ? 'Revenu mensuel récurrent' : 'Monthly Recurring Revenue'}</span>
                    </div>
                    <span className="metric-badge green">+{adminData.revenue.growth}%</span>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon blue">📊</div>
                    <div className="metric-info">
                      <span className="metric-value">${adminData.revenue.arr.toLocaleString()}</span>
                      <span className="metric-label">{lang === 'fr' ? 'Revenu annuel récurrent' : 'Annual Recurring Revenue'}</span>
                    </div>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon purple">👤</div>
                    <div className="metric-info">
                      <span className="metric-value">${adminData.revenue.ltv}</span>
                      <span className="metric-label">{lang === 'fr' ? 'Valeur vie client' : 'Customer LTV'}</span>
                    </div>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon orange">📉</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.revenue.churnRate}%</span>
                      <span className="metric-label">{lang === 'fr' ? 'Taux d\'attrition' : 'Churn Rate'}</span>
                    </div>
                  </div>
                </div>

                <div className="admin-section">
                  <h3>{lang === 'fr' ? 'Répartition des abonnements' : 'Subscription Breakdown'}</h3>
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
                              <span className="sub-plan">{lang === 'fr' ? 'Gratuit' : 'Free'}</span>
                              <span className="sub-count">{free.toLocaleString()} {lang === 'fr' ? 'utilisateurs' : 'users'}</span>
                            </div>
                            <div className="sub-bar">
                              <div className="sub-bar-fill" style={{width: `${(free / total) * 100}%`}}></div>
                            </div>
                            <span className="sub-pct">{Math.round((free / total) * 100)}%</span>
                          </div>
                          <div className="sub-item professional">
                            <div className="sub-info">
                              <span className="sub-plan">Professional</span>
                              <span className="sub-count">{pro.toLocaleString()} {lang === 'fr' ? 'utilisateurs' : 'users'}</span>
                            </div>
                            <div className="sub-bar">
                              <div className="sub-bar-fill" style={{width: `${(pro / total) * 100}%`}}></div>
                            </div>
                            <span className="sub-pct">{Math.round((pro / total) * 100)}%</span>
                          </div>
                          <div className="sub-item enterprise">
                            <div className="sub-info">
                              <span className="sub-plan">Enterprise</span>
                              <span className="sub-count">{enterprise.toLocaleString()} {lang === 'fr' ? 'utilisateurs' : 'users'}</span>
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

                <div className="admin-section">
                  <h3>{lang === 'fr' ? 'Transactions récentes' : 'Recent Transactions'}</h3>
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
                      <p>{lang === 'fr' ? 'Aucune transaction' : 'No transactions yet'}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {adminTab === 'content' && (
              <div className="admin-content">
                <div className="admin-header">
                  <h1>{lang === 'fr' ? 'Gestion du contenu' : 'Content Management'}</h1>
                  <p>{lang === 'fr' ? 'Gérer les simulations, scénarios et contenu d\'apprentissage' : 'Manage simulations, scenarios, and learning content'}</p>
                </div>

                <div className="admin-toolbar">
                  <div className="search-box">
                    <span>🔍</span>
                    <input type="text" placeholder={lang === 'fr' ? 'Rechercher du contenu...' : 'Search content...'} />
                  </div>
                  <div className="toolbar-actions">
                    <button className="admin-btn primary">+ {lang === 'fr' ? 'Nouvelle simulation' : 'New Simulation'}</button>
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
                        <span>🎮 {sim.plays.toLocaleString()} {lang === 'fr' ? 'parties' : 'plays'}</span>
                        {sim.rating && <span>⭐ {sim.rating}</span>}
                      </div>
                      <div className="content-meta">
                        {lang === 'fr' ? 'Dernière mise à jour:' : 'Last updated:'} {sim.lastUpdated}
                      </div>
                      <div className="content-actions">
                        <button className="admin-btn small">{lang === 'fr' ? 'Modifier' : 'Edit'}</button>
                        <button className="admin-btn small">{lang === 'fr' ? 'Aperçu' : 'Preview'}</button>
                        {sim.status === 'draft' && <button className="admin-btn small primary">{lang === 'fr' ? 'Publier' : 'Publish'}</button>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {adminTab === 'system' && (
              <div className="admin-content">
                <div className="admin-header">
                  <h1>{lang === 'fr' ? 'Santé du système' : 'System Health'}</h1>
                  <p>{lang === 'fr' ? 'Surveiller la performance et le statut du système' : 'Monitor platform performance and system status'}</p>
                </div>

                <div className="admin-metrics-grid">
                  <div className="admin-metric-card">
                    <div className="metric-icon green">✅</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.system.uptime}%</span>
                      <span className="metric-label">{lang === 'fr' ? 'Disponibilité' : 'Uptime'}</span>
                    </div>
                    <span className="metric-badge green">{lang === 'fr' ? 'Sain' : 'Healthy'}</span>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon blue">⚡</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.system.avgResponseTime}ms</span>
                      <span className="metric-label">{lang === 'fr' ? 'Temps de réponse moy' : 'Avg Response Time'}</span>
                    </div>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon orange">⚠️</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.system.errorRate}%</span>
                      <span className="metric-label">{lang === 'fr' ? 'Taux d\'erreur' : 'Error Rate'}</span>
                    </div>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon purple">🔌</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.system.activeConnections}</span>
                      <span className="metric-label">{lang === 'fr' ? 'Connexions actives' : 'Active Connections'}</span>
                    </div>
                  </div>
                </div>

                <div className="admin-section">
                  <h3>{lang === 'fr' ? 'Utilisation des ressources' : 'Resource Usage'}</h3>
                  <div className="resource-grid">
                    <div className="resource-item">
                      <div className="resource-header">
                        <span>{lang === 'fr' ? 'Utilisation CPU' : 'CPU Usage'}</span>
                        <span>{adminData.system.cpuUsage}%</span>
                      </div>
                      <div className="resource-bar">
                        <div className="resource-fill cpu" style={{width: `${adminData.system.cpuUsage}%`}}></div>
                      </div>
                    </div>
                    <div className="resource-item">
                      <div className="resource-header">
                        <span>{lang === 'fr' ? 'Utilisation mémoire' : 'Memory Usage'}</span>
                        <span>{adminData.system.memoryUsage}%</span>
                      </div>
                      <div className="resource-bar">
                        <div className="resource-fill memory" style={{width: `${adminData.system.memoryUsage}%`}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="admin-section">
                  <h3>{lang === 'fr' ? 'Erreurs récentes' : 'Recent Errors'}</h3>
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

                <div className="admin-section">
                  <h3>{lang === 'fr' ? 'Actions rapides' : 'Quick Actions'}</h3>
                  <div className="system-actions">
                    <button className="admin-btn">🔄 {lang === 'fr' ? 'Vider le cache' : 'Clear Cache'}</button>
                    <button className="admin-btn">📊 {lang === 'fr' ? 'Exporter les logs' : 'Export Logs'}</button>
                    <button className="admin-btn">🔧 {lang === 'fr' ? 'Diagnostics' : 'Run Diagnostics'}</button>
                    <button className="admin-btn danger">🚨 {lang === 'fr' ? 'Mode maintenance' : 'Maintenance Mode'}</button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  };
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
        .lang-toggle { background: var(--bg-elevated); border: 1px solid var(--border); color: var(--text-secondary); padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.85rem; font-weight: 500; cursor: pointer; transition: all 0.2s; }
        .lang-toggle:hover { border-color: var(--accent-primary); color: var(--text-primary); background: var(--bg-card); }
        
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
          background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 50%, #fdf2f8 100%); 
          min-height: 100vh; 
          color: #1e293b;
          position: relative;
          overflow-x: hidden;
        }
        .sim-playing .navbar { background: rgba(255, 255, 255, 0.9); border-bottom: 1px solid #e2e8f0; backdrop-filter: blur(10px); }
        .sim-playing .nav-link { color: #475569; }
        .sim-playing .nav-link:hover { color: #1e293b; }
        .sim-playing .user-name { color: #475569; }
        
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
          filter: blur(80px);
          opacity: 0.4;
          animation: float 25s ease-in-out infinite;
        }
        .shape-1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          top: -150px;
          right: -150px;
          animation-delay: 0s;
        }
        .shape-2 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%);
          bottom: 5%;
          left: -100px;
          animation-delay: -8s;
        }
        .shape-3 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
          top: 40%;
          right: 5%;
          animation-delay: -16s;
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -40px) scale(1.05); }
          66% { transform: translate(-30px, 30px) scale(0.95); }
        }

        .game-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-top: 50px; position: relative; z-index: 1; }
        .game-title { display: flex; align-items: center; gap: 1rem; }
        .game-icon { 
          font-size: 2rem; 
          background: rgba(255,255,255,0.95); 
          padding: 0.75rem; 
          border-radius: 16px; 
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .game-title h2 { font-size: 1.4rem; margin-bottom: 0.15rem; color: #1e293b; }
        .game-title span { color: #64748b; font-size: 0.9rem; }
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
        
        /* Circular Gauge Dashboard */
        .game-dashboard { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); 
          gap: 0.75rem; 
          margin-bottom: 1.5rem; 
          position: relative;
          z-index: 1;
        }
        
        .metric-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 20px;
          padding: 0.75rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          position: relative;
          transition: all 0.3s ease;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        }
        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
          border-color: rgba(99, 102, 241, 0.3);
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
          stroke: #e2e8f0;
          stroke-width: 7;
        }
        
        .gauge-fill {
          fill: none;
          stroke-width: 7;
          stroke-linecap: round;
          transition: stroke-dasharray 0.6s ease, stroke 0.3s ease;
          filter: drop-shadow(0 0 4px currentColor);
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
          color: #1e293b;
        }
        .gauge-value.large {
          font-size: 1.1rem;
        }
        
        .metric-label {
          font-size: 0.65rem;
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
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%);
          border-color: rgba(139, 92, 246, 0.3);
        }
        
        /* Game Actions - Enhanced */
        .sim-playing .game-actions { 
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 24px; 
          padding: 1.5rem; 
          box-shadow: 0 8px 40px rgba(0,0,0,0.08);
          position: relative;
          z-index: 1;
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
        
        /* Meeting Options - Enhanced LIGHT THEME */
        .meeting-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
        .sim-playing .meeting-btn { 
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border: 2px solid #e2e8f0; 
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
          background: linear-gradient(135deg, #fafaff 0%, #f0f0ff 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.15);
        }
        .sim-playing .meeting-btn:hover:not(:disabled)::before { opacity: 1; }
        .sim-playing .meeting-btn.active { 
          border-color: #10b981; 
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.2);
        }
        .sim-playing .meeting-btn.active::before { 
          opacity: 1;
          background: linear-gradient(90deg, #10b981, #059669);
        }
        .sim-playing .meeting-btn:disabled { opacity: 0.7; cursor: default; }
        .meeting-icon { font-size: 1.5rem; }
        .sim-playing .meeting-name { font-weight: 700; font-size: 0.9rem; color: #1e293b; }
        .sim-playing .meeting-desc { font-size: 0.8rem; color: #64748b; line-height: 1.4; }
        .sim-playing .meeting-done { color: #059669; font-size: 0.8rem; font-weight: 700; margin-top: 0.25rem; }
        
        /* Quick Actions - Enhanced LIGHT THEME */
        .quick-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .sim-playing .quick-btn { 
          padding: 0.75rem 1.25rem; 
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          border: 2px solid #a7f3d0; 
          border-radius: 12px; 
          color: #047857; 
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
          background: rgba(255,255,255,0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.4s ease, height 0.4s ease;
        }
        .sim-playing .quick-btn:hover:not(:disabled)::after {
          width: 200px;
          height: 200px;
        }
        .sim-playing .quick-btn:hover:not(:disabled) { 
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          border-color: #059669;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.25);
        }
        .sim-playing .quick-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .sim-playing .quick-btn.crunch { 
          background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
          border-color: #fecaca; 
          color: #dc2626; 
        }
        .sim-playing .quick-btn.crunch:hover:not(:disabled) { 
          background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
          border-color: #f87171;
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.25);
        }
        .sim-playing .quick-btn.proto { 
          background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
          border-color: #c4b5fd; 
          color: #7c3aed; 
        }
        .sim-playing .quick-btn.proto:hover:not(:disabled) { 
          background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
          border-color: #8b5cf6;
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.25);
        }
        .sim-playing .quick-btn.schedule { 
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
          border-color: #fcd34d; 
          color: #b45309; 
        }
        .sim-playing .quick-btn.schedule:hover:not(:disabled) { 
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border-color: #f59e0b;
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.25);
        }
        
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
        
        /* CSS Alert Bell Animation */
        .alert-bell {
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          box-shadow: 0 4px 20px rgba(245, 158, 11, 0.4);
          animation: bellRing 0.5s ease-in-out infinite alternate;
          z-index: 10;
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
          background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 50%, #fdf2f8 100%);
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
        .end-animation {
          margin-bottom: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 120px;
        }
        
        .end-card { 
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 28px; 
          padding: 2.5rem; 
          max-width: 550px; 
          width: 100%; 
          text-align: center; 
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
          position: relative;
          z-index: 10;
          animation: slideUp 0.5s ease-out;
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
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
      {currentPage === 'catalog' && renderSimulations()}
      {currentPage === 'pricing' && renderPricing()}
      {currentPage === 'simulation' && renderSimulation()}
      {currentPage === 'admin' && renderAdminDashboard()}
    </div>
  );
}

export default App;
