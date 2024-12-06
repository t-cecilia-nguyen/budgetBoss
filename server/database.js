const sqlite3 = require('sqlite3').verbose();

// Initialize database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Create table USERS if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )
`);

// makes the transaction table
db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        amount REAL NOT NULL,
        type TEXT CHECK(type IN ('Income', 'Expense')) NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
`);

// Create Budgets table if it doesn't already exist
db.run(`
    CREATE TABLE IF NOT EXISTS budgets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        amount REAL NOT NULL,
        start_date TEXT NOT NULL,
        end_date TEXT NOT NULL,
        category TEXT NOT NULL,
        notes TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(id)
    )
`);

module.exports = db;
