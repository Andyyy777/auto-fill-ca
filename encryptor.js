const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); 
const iv = crypto.randomBytes(16); 

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

try {
    const code = fs.readFileSync(
        path.join(__dirname, 'src/core-script.js'),
        { encoding: 'binary' }
    );

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    cipher.setAutoPadding(true); 

    let encrypted = cipher.update(code, 'binary', 'hex');
    encrypted += cipher.final('hex');

    fs.writeFileSync(
        path.join(publicDir, 'encrypted.js'),
        `${iv.toString('hex')}:${encrypted}`
    );
    
    fs.writeFileSync(
        path.join(publicDir, 'key.txt'),
        key.toString('hex')
    );

    console.log('Encryption completed successfully');
    console.log(`IV: ${iv.toString('hex')}`);
    console.log(`Key: ${key.toString('hex')}`);
} catch (error) {
    console.error('Encryption failed:', error);
    process.exit(1);
}