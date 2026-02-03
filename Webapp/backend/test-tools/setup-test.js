/**
 * Test Database Setup Tool
 * Switches to clean or QA database for testing
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const useClean = args.includes('--clean');
const noServer = args.includes('--no-server');

const backendDir = path.join(__dirname, '..');
const devDb = path.join(backendDir, 'rules_management.db');
const devDbBackup = path.join(backendDir, 'rules_management_dev_backup.db');
const cleanDb = path.join(backendDir, 'rules_management_clean.db');
const qaDb = path.join(backendDir, 'rules_management_qa.db');

console.log('='.repeat(60));
console.log('Test Database Setup Tool');
console.log('='.repeat(60));

// Backup current dev database
if (fs.existsSync(devDb)) {
  console.log('Backing up development database...');
  fs.copyFileSync(devDb, devDbBackup);
  console.log('Backup created: rules_management_dev_backup.db');
}

// Switch to test database
const sourceDb = useClean ? cleanDb : qaDb;
const dbType = useClean ? 'clean' : 'QA';

if (fs.existsSync(sourceDb)) {
  fs.copyFileSync(sourceDb, devDb);
  console.log(`Switched to ${dbType} database`);
} else {
  // Create empty database if it doesn't exist
  if (useClean) {
    console.log('Creating new clean database...');
    fs.writeFileSync(devDb, '');
    console.log('Clean database created (will be initialized on server start)');
  } else {
    console.error(`Error: ${dbType} database not found at ${sourceDb}`);
    process.exit(1);
  }
}

console.log('');
console.log('Ready for testing.');
console.log('Remember to run: npm run db:restore-dev after testing');
console.log('='.repeat(60));
