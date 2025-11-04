import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Tipi per il form
interface ContactFormData {
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  citta: string;
  tipoImmobile: string;
  situazioneAttuale: string;
  numeroStanze: string;
  note: string;
}

// Validazione dei dati
function validateFormData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Campi obbligatori
  if (!data.nome?.trim()) errors.push('Nome è obbligatorio');
  if (!data.cognome?.trim()) errors.push('Cognome è obbligatorio');
  if (!data.email?.trim()) errors.push('Email è obbligatoria');
  if (!data.telefono?.trim()) errors.push('Telefono è obbligatorio');

  // Validazione email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push('Email non valida');
  }

  // Validazione telefono (italiano)
  const phoneRegex = /^[\d\s+()-]{8,}$/;
  if (data.telefono && !phoneRegex.test(data.telefono)) {
    errors.push('Telefono non valido');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Configurazione SMTP Transport
function createEmailTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true per porta 465, false per altre
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

// Funzione per inviare email
async function sendEmail(formData: ContactFormData): Promise<void> {
  const transporter = createEmailTransporter();

  // Template HTML per l'email
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0466C8 0%, #05668D 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 5px; border-left: 4px solid #0466C8; }
        .label { font-weight: bold; color: #0466C8; margin-bottom: 5px; }
        .value { color: #333; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">🎯 Nuova Richiesta di Preventivo</h1>
          <p style="margin: 10px 0 0 0;">3VI Climatizzazione</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">👤 Nome e Cognome</div>
            <div class="value">${formData.nome} ${formData.cognome}</div>
          </div>

          <div class="field">
            <div class="label">📧 Email</div>
            <div class="value"><a href="mailto:${formData.email}">${formData.email}</a></div>
          </div>

          <div class="field">
            <div class="label">📱 Telefono</div>
            <div class="value"><a href="tel:${formData.telefono}">${formData.telefono}</a></div>
          </div>

          ${formData.citta ? `
          <div class="field">
            <div class="label">📍 Città/Zona</div>
            <div class="value">${formData.citta}</div>
          </div>
          ` : ''}

          ${formData.tipoImmobile ? `
          <div class="field">
            <div class="label">🏠 Tipo Immobile</div>
            <div class="value">${formData.tipoImmobile}</div>
          </div>
          ` : ''}

          ${formData.numeroStanze ? `
          <div class="field">
            <div class="label">🚪 Numero Stanze</div>
            <div class="value">${formData.numeroStanze}</div>
          </div>
          ` : ''}

          ${formData.situazioneAttuale ? `
          <div class="field">
            <div class="label">🔧 Impianto Predisposto</div>
            <div class="value">${formData.situazioneAttuale}</div>
          </div>
          ` : ''}

          ${formData.note ? `
          <div class="field">
            <div class="label">📝 Note</div>
            <div class="value">${formData.note}</div>
          </div>
          ` : ''}

          <div class="footer">
            <p>Email ricevuta il ${new Date().toLocaleString('it-IT')}</p>
            <p><strong>Ricordati di contattare il cliente entro 24 ore!</strong></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Invio email
  await transporter.sendMail({
    from: `"3VI Landing Page" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL,
    cc: 'filippo.bosco@reddoak.com',
    subject: `🎯 Nuovo Preventivo - ${formData.nome} ${formData.cognome} - ${formData.citta || 'N/A'}`,
    html: htmlContent,
    // Fallback testo semplice
    text: `
Nuova richiesta di preventivo da ${formData.nome} ${formData.cognome}

Email: ${formData.email}
Telefono: ${formData.telefono}
Città: ${formData.citta || 'N/A'}
Tipo Immobile: ${formData.tipoImmobile || 'N/A'}
Numero Stanze: ${formData.numeroStanze || 'N/A'}
Impianto Predisposto: ${formData.situazioneAttuale || 'N/A'}
Note: ${formData.note || 'Nessuna nota'}

Data ricezione: ${new Date().toLocaleString('it-IT')}
    `.trim(),
  });
}

// Funzione per salvare in Google Sheets via Apps Script
async function saveToGoogleSheet(formData: ContactFormData): Promise<void> {
  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!appsScriptUrl) {
    throw new Error('GOOGLE_APPS_SCRIPT_URL non configurato');
  }

  // Prepara i dati da inviare
  const timestamp = new Date().toLocaleString('it-IT', {
    timeZone: 'Europe/Rome',
  });

  const payload = {
    timestamp,
    nome: formData.nome,
    cognome: formData.cognome,
    email: formData.email,
    telefono: formData.telefono,
    citta: formData.citta || '',
    tipoImmobile: formData.tipoImmobile || '',
    numeroStanze: formData.numeroStanze || '',
    situazioneAttuale: formData.situazioneAttuale || '',
    note: formData.note || '',
  };

  // Invia i dati al webhook di Apps Script
  const response = await fetch(appsScriptUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    redirect: 'follow', // Apps Script fa redirect, dobbiamo seguirlo
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Apps Script error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();

  if (result.status !== 'success') {
    throw new Error(`Apps Script failed: ${result.message || 'Unknown error'}`);
  }
}

// POST handler
export async function POST(request: NextRequest) {
  try {
    // Parse del body
    const body = await request.json();

    // Validazione
    const validation = validateFormData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dati non validi',
          details: validation.errors
        },
        { status: 400 }
      );
    }

    const formData: ContactFormData = body;

    // Risultati delle operazioni
    const results = {
      emailSent: false,
      sheetSaved: false,
      errors: [] as string[],
    };

    // 1. Invia email (non blocca se fallisce)
    try {
      await sendEmail(formData);
      results.emailSent = true;
    } catch (emailError) {
      console.error('Errore invio email:', emailError);
      results.errors.push('Impossibile inviare email');
    }

    // 2. Salva su Google Sheets (non blocca se fallisce)
    try {
      await saveToGoogleSheet(formData);
      results.sheetSaved = true;
    } catch (sheetError) {
      console.error('Errore salvataggio Google Sheet:', sheetError);
      results.errors.push('Impossibile salvare su Google Sheets');
    }

    // Determina lo stato della risposta
    const allFailed = !results.emailSent && !results.sheetSaved;
    const partialSuccess = results.emailSent || results.sheetSaved;

    if (allFailed) {
      // Entrambe le operazioni sono fallite
      return NextResponse.json(
        {
          success: false,
          error: 'Impossibile processare la richiesta',
          details: results.errors,
        },
        { status: 500 }
      );
    }

    // Almeno una operazione è riuscita
    return NextResponse.json({
      success: true,
      message: 'Richiesta ricevuta con successo',
      results: {
        emailSent: results.emailSent,
        sheetSaved: results.sheetSaved,
        warnings: results.errors.length > 0 ? results.errors : undefined,
      },
    });

  } catch (error) {
    console.error('Errore generale:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Errore interno del server',
      },
      { status: 500 }
    );
  }
}

// GET handler (per test)
export async function GET() {
  return NextResponse.json({
    message: 'Contact API is running',
    timestamp: new Date().toISOString(),
  });
}
