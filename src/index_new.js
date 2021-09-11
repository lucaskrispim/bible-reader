//const { Client } = require('whatsapp-web.js')
//const qrcode = require('qrcode-terminal')
//const path = require("path");
const Bible = require('../biblia_acf')
//const SESSION_FILE_PATH = '../session.json';

console.log(
    
    Bible.find('zacarias 1 1')
)
return false
let sessionData = require(path.resolve(__dirname, SESSION_FILE_PATH));


const client = new Client({ session: sessionData });

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', message => {
  const msg = Bible.find(message.body)
    message.reply(msg);
});

client.initialize();