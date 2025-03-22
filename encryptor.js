const crypto = require('crypto');
const fs = require('fs');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const code = fs.readFileSync('./src/core-script.js', 'utf8');

// encrypt the code
const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update(code, 'utf8', 'hex');
encrypted += cipher.final('hex');

// save the encrypted code to a file
fs.writeFileSync('./public/encrypted.js', `${iv.toString('hex')}:${encrypted}`);
fs.writeFileSync('./public/key.txt', key.toString('hex'));