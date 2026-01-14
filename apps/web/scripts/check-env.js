const fs = require('fs');
const path = require('path');

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
};

const rootDir = path.join(__dirname, '..');
const examplePath = path.join(rootDir, '.env.local.example');
const localPath = path.join(rootDir, '.env.local');

console.log('Checking environment variables...');

if (!fs.existsSync(localPath)) {
  console.warn(`${colors.yellow}Warning: .env.local file is missing.${colors.reset}`);

  if (fs.existsSync(examplePath)) {
    console.log(
      `Please copy ${colors.yellow}.env.local.example${colors.reset} to ${colors.yellow}.env.local${colors.reset} and configure it.`
    );
  } else {
    console.log(
      `Please ensure you have a ${colors.yellow}.env.local${colors.reset} file configured.`
    );
  }
  // Do not block local dev; features will validate their own env vars on-demand.
  process.exit(0);
}

console.log(
  `${colors.green}✅ Environment configuration file found.${colors.reset}\n`
);