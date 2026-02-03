/**
 * Database Inspection Tool
 * Inspects the SQLite database and displays table information
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'rules_management.db');

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  }
});

console.log('='.repeat(60));
console.log('Database Inspection Tool');
console.log('='.repeat(60));
console.log(`Database: ${dbPath}\n`);

// Get all tables
db.all(
  "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name",
  [],
  (err, tables) => {
    if (err) {
      console.error('Error querying tables:', err.message);
      db.close();
      return;
    }

    console.log('Tables found:', tables.map(t => t.name).join(', '));
    console.log('');

    let processed = 0;
    tables.forEach((table) => {
      const tableName = table.name;
      
      // Get row count
      db.get(`SELECT COUNT(*) as count FROM "${tableName}"`, [], (err, row) => {
        if (err) {
          console.log(`${tableName}: Error - ${err.message}`);
        } else {
          console.log(`${tableName}: ${row.count} rows`);
        }

        processed++;
        if (processed === tables.length) {
          console.log('\n' + '='.repeat(60));
          db.close();
        }
      });
    });
  }
);
