const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const TOKEN_PATH = path.join(__dirname, 'token.json');

function loadCredentials() {
  const credentialsPath = path.join(__dirname, 'credentials.json');
  if (!fs.existsSync(credentialsPath)) {
    throw new Error('Archivo credentials.json no encontrado. Por favor, crea uno desde Google Cloud Console.');
  }
  return JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));
}

async function authenticate() {
  const credentials = loadCredentials();
  const { client_id, client_secret, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  }

  return getNewToken(oAuth2Client);
}

function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  console.log('Autoriza la aplicación visitando esta URL:', authUrl);

  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Introduce el código que aparece tras la autorización: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return reject('Error al obtener el token de acceso');
        oAuth2Client.setCredentials(token);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        console.log('Token almacenado en:', TOKEN_PATH);
        resolve(oAuth2Client);
      });
    });
  });
}

module.exports = authenticate;