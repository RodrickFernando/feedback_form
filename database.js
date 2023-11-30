const sqlite3 = require('sqlite3').verbose();

// Open SQLite database or create a new one if it doesn't exist
const db = new sqlite3.Database('mydatabase.db');

// Create a 'users' table if it doesn't exist
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, feedback TEXT)');
});

module.exports = db;