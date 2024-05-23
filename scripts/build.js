require('dotenv').config();
const { execSync } = require('child_process');

const projectName = process.env.PROJECT_NAME;
if (!projectName) {
  throw new Error('PROJECT_NAME is not defined in the .env file');
}

const command = `docker-compose -f docker-compose.yml -p ${projectName}__dev--js up -d`;
execSync(command, { stdio: 'inherit' });
