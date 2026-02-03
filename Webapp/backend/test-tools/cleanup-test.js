/**
 * Test Cleanup Tool
 * Restores development database after testing
 */

const fs = require('fs');
const path = require('path');

const backendDir = path.join(__dirname, '..');
const devDb = path.join(backendDir, 'rules_management.db');
const devDbBackup = path.join(backendDir, 'rules_management_dev_backup.db');

console.log('='.repeat(60));
console.log('Test Cleanup Tool');
console.log('='.repeat(60));

if (fs.existsSync(devDbBackup)) {
  console.log('Restoring development database from backup...');
  fs.copyFileSync(devDbBackup, devDb);
  fs.unlinkSync(devDbBackup);
  console.log('Development database restored successfully');
} else {
  console.log('No backup found. Development database unchanged.');
}

console.log('='.repeat(60));
