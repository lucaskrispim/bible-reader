const { Client } = require('whatsapp-web.js')
const path = require("path");
const Version = require('./versiculo.js')
const SESSION_FILE_PATH = '../session.json';

let sessionData = require(path.resolve(__dirname, SESSION_FILE_PATH));

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