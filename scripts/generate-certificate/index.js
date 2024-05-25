require('dotenv').config();
const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');

const DOMAIN = process.env.DOMAIN;
if (!DOMAIN) {
    throw new Error('DOMAIN is not defined in the .env file');
}

const SSL_DIR = './infra/nginx/ssl';
const NGINX_SITES_AVAILABLE = '/etc/nginx/sites-available';
const NGINX_SITES_ENABLED = '/etc/nginx/sites-enabled';
const NGINX_CONF = `${NGINX_SITES_AVAILABLE}/${DOMAIN}`;
const PORT = 3000; // Change this to your application's port if needed

const getNginxConfig = (DOMAIN, SSL_DIR, PORT) => `
server {
    listen 80;
    server_name ${DOMAIN};
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name ${DOMAIN};

    ssl_certificate ${SSL_DIR}/${DOMAIN}.crt;
    ssl_certificate_key ${SSL_DIR}/${DOMAIN}.key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://localhost:${PORT};
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
  `;



try {
    // Create SSL directory if it doesn't exist
    execSync(`mkdir -p ${SSL_DIR}`);

    // Generate private key
    execSync(`openssl genrsa -out ${SSL_DIR}/${DOMAIN}.key 2048`);

    // Generate CSR (Certificate Signing Request)
    execSync(`openssl req -new -key ${SSL_DIR}/${DOMAIN}.key -out ${SSL_DIR}/${DOMAIN}.csr -subj "/CN=${DOMAIN}"`);

    // Generate self-signed certificate
    execSync(`openssl x509 -req -days 365 -in ${SSL_DIR}/${DOMAIN}.csr -signkey ${SSL_DIR}/${DOMAIN}.key -out ${SSL_DIR}/${DOMAIN}.crt`);

    // Create Nginx configuration for the domain
    const nginxConfig = getNginxConfig(DOMAIN, SSL_DIR, PORT)

    fs.writeFileSync(NGINX_CONF, nginxConfig);

    // Enable the new site by creating a symbolic link
    execSync(`ln -s ${NGINX_CONF} ${NGINX_SITES_ENABLED}/`);

    // Test Nginx configuration
    execSync('nginx -t');

    // Reload Nginx to apply changes
    execSync('systemctl reload nginx');

    // Update /etc/hosts file
    const hostsEntry = `127.0.0.1 ${DOMAIN}`;
    const hostsFile = '/etc/hosts';

    // Read current hosts file
    const hostsContent = fs.readFileSync(hostsFile, 'utf-8');

    // Check if entry already exists
    if (!hostsContent.includes(hostsEntry)) {
        // Append new entry
        fs.appendFileSync(hostsFile, os.EOL + hostsEntry);
    }

    console.log(`Setup complete. You can now access https://${DOMAIN}`);
} catch (error) {
    console.error('An error occurred:', error);
}
