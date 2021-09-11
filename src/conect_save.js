const fs = require('fs');
const qrcode = require('qrcode-terminal');
const path = require("path");

const { Client } = require('whatsapp-web.js');
const client = new Client();

// Path where the session data will be stored
const SESSION_FILE_PATH = '../session.json';

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('authenticated', (session) => {
 
  fs.writeFile(path.resolve(__dirname, SESSION_FILE_PATH), JSON.stringify(session), (err) => {
      if (err) {
          console.error(err);
      }
  });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();