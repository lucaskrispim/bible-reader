const { Client } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const Version = require('./versiculo.js')
const SESSION_FILE_PATH = '../session.json';

let sessionData = require(SESSION_FILE_PATH);

const client = new Client({ session: sessionData });

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', message => {
  const ver = new Version(message.body)
  if (ver.getVersion()) {
    message.reply(ver.getVersion());
  }

});

client.initialize();