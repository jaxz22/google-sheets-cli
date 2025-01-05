#!/usr/bin/env node

const { google } = require('googleapis');
const authenticate = require('./auth');

async function readSheet(spreadsheetId, range) {
  try {
    const auth = await authenticate();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    console.log('Datos leídos:');
    console.log(response.data.values);
  } catch (error) {
    console.error('Error al leer la hoja:', error);
  }
}

async function writeSheet(spreadsheetId, range, values) {
  try {
    const auth = await authenticate();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    console.log('Escritura exitosa:');
    console.log(response.data);
  } catch (error) {
    console.error('Error al escribir en la hoja:', error.message);
  }
}

// Ejecución desde consola
(async () => {
  const args = process.argv.slice(2); // Obtiene argumentos de comandos

  if (args[0] === 'read') {
    const spreadsheetId = args[1];
    const range = args[2];

    if (!spreadsheetId || !range) {
      console.error('Uso: node index.js read <spreadsheetId> <range>');
      process.exit(1);
    }

    await readSheet(spreadsheetId, range);
  } else if (args[0] === 'write') {
    const spreadsheetId = args[1];
    const range = args[2];
    const values = JSON.parse(args[3]); 

    if (!spreadsheetId || !range || !values) {
      console.error('Uso: node index.js write <spreadsheetId> <range> <values>');
      process.exit(1);
    }

    await writeSheet(spreadsheetId, range, values);
  } else {
    console.error('Comando desconocido. Usa "read" o "write".');
  }
})();