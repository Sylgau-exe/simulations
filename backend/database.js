// database.js - SQLite Database Setup for BizSimHub (using sql.js)
const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'bizsimhub.db');

let db = null;
let SQL = null;

// Initialize database
async function initializeDatabase() {
  SQL = await initSqlJs();
  
  // Load existing database or create new one
  try {
    if (fs.existsSync(DB_PATH)) {
      const fileBuffer = fs.readFileSync(DB_PATH);
      db = new SQL.Database(fileBuffer);
      console.log('✅ Loaded existing database');
    } else {
      db = new SQL.Database();
      console.log('✅ Created new database');
    }
  } catch (e) {
    db = new SQL.Database();
    console.log('✅ Created new database (fresh start)');
  }

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      subscription_tier TEXT DEFAULT 'free',
      subscription_status TEXT DEFAULT 'inactive',
      stripe_customer_id TEXT,
      stripe_subscription_id TEXT,
      subscription_start_date DATETIME,
      subscription_end_date DATETIME,
      organization TEXT,
      role TEXT,
      avatar_url TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS simulation_scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      simulation_id TEXT NOT NULL,
      scenario_id TEXT NOT NULL,
      score INTEGER NOT NULL,
      grade TEXT,
      duration_minutes INTEGER,
      decisions_made INTEGER,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      budget_score INTEGER,
      schedule_score INTEGER,
      scope_score INTEGER,
      quality_score INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS payment_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      stripe_payment_intent_id TEXT,
      stripe_invoice_id TEXT,
      amount INTEGER NOT NULL,
      currency TEXT DEFAULT 'usd',
      status TEXT NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS subscription_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      stripe_event_id TEXT UNIQUE,
      event_type TEXT NOT NULL,
      event_data TEXT,
      processed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Create indexes
  db.run(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_users_stripe_customer ON users(stripe_customer_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_scores_user ON simulation_scores(user_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_scores_simulation ON simulation_scores(simulation_id)`);

  saveDatabase();
  console.log('✅ Database schema initialized');
  
  return db;
}

// Save database to file
function saveDatabase() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  }
}

// Helper to run query and return results
function runQuery(sql, params = []) {
  try {
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const results = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    return results;
  } catch (e) {
    console.error('Query error:', e.message, sql);
    return [];
  }
}

// Helper to run query and return single result
function runQuerySingle(sql, params = []) {
  const results = runQuery(sql, params);
  return results.length > 0 ? results[0] : null;
}

// Helper to run insert/update
function runStatement(sql, params = []) {
  try {
    db.run(sql, params);
    saveDatabase();
    const result = db.exec("SELECT last_insert_rowid()");
    return { lastInsertRowid: result[0]?.values[0]?.[0] };
  } catch (e) {
    console.error('Statement error:', e.message, sql);
    return null;
  }
}

// User operations
const UserDB = {
  create: (email, passwordHash, name) => {
    runStatement(
      `INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)`,
      [email, passwordHash, name]
    );
    return UserDB.findByEmail(email);
  },

  findByEmail: (email) => {
    return runQuerySingle('SELECT * FROM users WHERE email = ?', [email]);
  },

  findById: (id) => {
    return runQuerySingle('SELECT * FROM users WHERE id = ?', [id]);
  },

  findByStripeCustomerId: (customerId) => {
    return runQuerySingle('SELECT * FROM users WHERE stripe_customer_id = ?', [customerId]);
  },

  update: (id, updates) => {
    const allowedFields = [
      'name', 'organization', 'role', 'avatar_url',
      'subscription_tier', 'subscription_status',
      'stripe_customer_id', 'stripe_subscription_id',
      'subscription_start_date', 'subscription_end_date'
    ];
    
    const fields = [];
    const values = [];
    
    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key) && value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
    
    if (fields.length === 0) return UserDB.findById(id);
    
    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);
    
    runStatement(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
    return UserDB.findById(id);
  },

  updateSubscription: (id, tier, status, stripeSubId = null) => {
    const sql = status === 'active' 
      ? `UPDATE users SET subscription_tier = ?, subscription_status = ?, stripe_subscription_id = ?, subscription_start_date = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
      : `UPDATE users SET subscription_tier = ?, subscription_status = ?, stripe_subscription_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    
    runStatement(sql, [tier, status, stripeSubId, id]);
    return UserDB.findById(id);
  },

  getAll: () => {
    return runQuery('SELECT id, email, name, subscription_tier, subscription_status, created_at FROM users');
  }
};

// Score operations
const ScoreDB = {
  create: (userId, simulationId, scenarioId, scoreData) => {
    const result = runStatement(
      `INSERT INTO simulation_scores (
        user_id, simulation_id, scenario_id, score, grade,
        duration_minutes, decisions_made,
        budget_score, schedule_score, scope_score, quality_score
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId, simulationId, scenarioId,
        scoreData.score, scoreData.grade,
        scoreData.durationMinutes || null,
        scoreData.decisionsMade || null,
        scoreData.budgetScore || null,
        scoreData.scheduleScore || null,
        scoreData.scopeScore || null,
        scoreData.qualityScore || null
      ]
    );
    return result?.lastInsertRowid;
  },

  getUserScores: (userId) => {
    return runQuery(
      'SELECT * FROM simulation_scores WHERE user_id = ? ORDER BY completed_at DESC',
      [userId]
    );
  },

  getUserBestScores: (userId) => {
    return runQuery(
      `SELECT simulation_id, scenario_id, MAX(score) as best_score, COUNT(*) as attempts
       FROM simulation_scores WHERE user_id = ? GROUP BY simulation_id, scenario_id`,
      [userId]
    );
  },

  getLeaderboard: (simulationId, limit = 10) => {
    return runQuery(
      `SELECT u.id as user_id, u.name, MAX(s.score) as best_score, COUNT(*) as attempts
       FROM simulation_scores s
       JOIN users u ON s.user_id = u.id
       WHERE s.simulation_id = ?
       GROUP BY u.id
       ORDER BY best_score DESC
       LIMIT ?`,
      [simulationId, limit]
    );
  },

  getGlobalStats: () => {
    return runQuerySingle(
      `SELECT COUNT(*) as total_plays, COUNT(DISTINCT user_id) as unique_players,
       AVG(score) as average_score, MAX(score) as highest_score
       FROM simulation_scores`
    );
  }
};

// Payment operations
const PaymentDB = {
  create: (userId, paymentData) => {
    return runStatement(
      `INSERT INTO payment_history (
        user_id, stripe_payment_intent_id, stripe_invoice_id,
        amount, currency, status, description
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        paymentData.paymentIntentId || null,
        paymentData.invoiceId || null,
        paymentData.amount,
        paymentData.currency || 'usd',
        paymentData.status,
        paymentData.description || null
      ]
    );
  },

  getUserPayments: (userId) => {
    return runQuery(
      'SELECT * FROM payment_history WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
  }
};

// Subscription events
const EventDB = {
  create: (eventId, eventType, eventData, userId = null) => {
    return runStatement(
      `INSERT OR IGNORE INTO subscription_events (stripe_event_id, event_type, event_data, user_id)
       VALUES (?, ?, ?, ?)`,
      [eventId, eventType, JSON.stringify(eventData), userId]
    );
  },

  exists: (eventId) => {
    const result = runQuerySingle('SELECT 1 as found FROM subscription_events WHERE stripe_event_id = ?', [eventId]);
    return !!result;
  }
};

// Get database instance
function getDB() {
  return db;
}

module.exports = {
  initializeDatabase,
  getDB,
  UserDB,
  ScoreDB,
  PaymentDB,
  EventDB,
  saveDatabase
};
