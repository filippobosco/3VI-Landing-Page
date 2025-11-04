/**
 * ========================================
 * GOOGLE APPS SCRIPT - 3VI LANDING PAGE
 * ========================================
 *
 * Questo script gestisce l'invio dei dati dal form di contatto
 * al Google Sheet automaticamente.
 *
 * ISTRUZIONI:
 * 1. Apri il tuo Google Sheet
 * 2. Vai su Estensioni → Apps Script
 * 3. Copia e incolla TUTTO questo codice
 * 4. Salva (Ctrl+S o File → Salva)
 * 5. Deploy come Web App (vedi APPS_SCRIPT_SETUP.md)
 *
 * IMPORTANTE:
 * - Il foglio deve avere le intestazioni nella prima riga
 * - Lo script scriverà automaticamente dalla riga 2 in poi
 */

// Nome del foglio/tab dove salvare i dati
// Cambia questo se il tuo foglio ha un nome diverso
const SHEET_NAME = 'Sheet1'; // Oppure 'Contatti', 'Lead 2025', etc.

/**
 * Gestisce le richieste POST dal form
 */
function doPost(e) {
  try {
    // Log per debug (visibile in Esecuzioni)
    Logger.log('Ricevuta richiesta POST');

    // Parse del body JSON
    const data = JSON.parse(e.postData.contents);
    Logger.log('Dati ricevuti: ' + JSON.stringify(data));

    // Ottieni il foglio attivo
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error(`Foglio "${SHEET_NAME}" non trovato. Verifica il nome del foglio.`);
    }

    // Prepara la riga da inserire
    const row = [
      data.timestamp || new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' }),
      data.nome || '',
      data.cognome || '',
      data.email || '',
      data.telefono || '',
      data.citta || '',
      data.tipoImmobile || '',
      data.numeroStanze || '',
      data.situazioneAttuale || '',
      data.note || ''
    ];

    // Aggiungi la riga al foglio
    sheet.appendRow(row);

    Logger.log('Dati salvati con successo');

    // Risposta di successo
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Dati salvati correttamente',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log dell'errore
    Logger.log('ERRORE: ' + error.message);

    // Risposta di errore
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.message,
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Gestisce le richieste GET (per testare che lo script funzioni)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: '3VI Contact Form Apps Script is running',
      timestamp: new Date().toISOString(),
      sheetName: SHEET_NAME
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * FUNZIONE DI TEST (opzionale)
 * Puoi eseguire questa funzione dall'editor per testare
 * che lo script possa scrivere sul foglio
 */
function testWrite() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    Logger.log('ERRORE: Foglio "' + SHEET_NAME + '" non trovato!');
    return;
  }

  // Dati di test
  const testData = [
    new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' }),
    'Mario',
    'Rossi',
    'mario.rossi@test.com',
    '333 1234567',
    'Milano Centro',
    'Casa',
    'Trilocale',
    'No',
    'Questo è un test'
  ];

  sheet.appendRow(testData);
  Logger.log('✅ Test completato! Controlla il foglio.');
}

/**
 * SETUP INTESTAZIONI (opzionale)
 * Esegui questa funzione UNA VOLTA per creare automaticamente
 * le intestazioni nella prima riga del foglio
 */
function setupHeaders() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    Logger.log('ERRORE: Foglio "' + SHEET_NAME + '" non trovato!');
    return;
  }

  // Intestazioni
  const headers = [
    'Data/Ora',
    'Nome',
    'Cognome',
    'Email',
    'Telefono',
    'Città',
    'Tipo Immobile',
    'Numero Stanze',
    'Impianto Predisposto',
    'Note'
  ];

  // Scrivi le intestazioni nella prima riga
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Formatta le intestazioni
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#0466C8');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setHorizontalAlignment('center');

  // Auto-resize delle colonne
  for (let i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
  }

  Logger.log('✅ Intestazioni create con successo!');
}
