const { Client } = require('whatsapp-web.js')
const SESSION_FILE_PATH = '../session.json';
const Bible = require('../biblia_acf')

let sessionData = require(SESSION_FILE_PATH);

const client = new Client({ session: sessionData });

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', message => {
  message.reply(
    Bible.find(message.body.toLowerCase())
  )
});

client.initialize();