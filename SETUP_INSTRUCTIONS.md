# 📧 Guida Configurazione Sistema Email + Google Sheets

Questa guida ti accompagnerà passo-passo nella configurazione del sistema di invio email e salvataggio contatti su Google Sheets per la landing page 3VI.

## 📋 Indice

1. [Prerequisiti](#prerequisiti)
2. [Setup Google Cloud e Google Sheets](#setup-google-cloud-e-google-sheets)
3. [Configurazione SMTP (Email)](#configurazione-smtp-email)
4. [Configurazione File .env.local](#configurazione-file-envlocal)
5. [Test in Locale](#test-in-locale)
6. [Deploy su Vercel](#deploy-su-vercel)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisiti

Prima di iniziare, assicurati di avere:

- ✅ Un account Google (per Google Sheets e Google Cloud)
- ✅ Un foglio Google Sheets già creato
- ✅ Un account email per SMTP (Gmail o altro)
- ✅ Node.js installato sul computer
- ✅ Il progetto Next.js funzionante in locale

---

## Setup Google Cloud e Google Sheets

### Passo 1: Creare un Progetto Google Cloud

1. Vai su [Google Cloud Console](https://console.cloud.google.com/)
2. Accedi con il tuo account Google
3. In alto a sinistra, clicca sul menu a tendina del progetto
4. Clicca su **"NUOVO PROGETTO"**
5. Inserisci nome progetto: `3vi-landing-contacts` (o un nome a tua scelta)
6. Clicca **"CREA"**
7. Attendi qualche secondo che il progetto venga creato

### Passo 2: Abilitare Google Sheets API

1. Nel menu a sinistra (☰), vai su **"API e servizi"** → **"Libreria"**
2. Nella barra di ricerca, cerca: `Google Sheets API`
3. Clicca sulla card **"Google Sheets API"**
4. Clicca il pulsante blu **"ABILITA"**
5. Attendi l'abilitazione (qualche secondo)

### Passo 3: Creare un Service Account

1. Nel menu a sinistra, vai su **"API e servizi"** → **"Credenziali"**
2. In alto, clicca **"CREA CREDENZIALI"**
3. Seleziona **"Account di servizio"**
4. Compila il form:
   - **Nome account di servizio**: `3vi-sheets-writer` (o un nome a tua scelta)
   - **ID account**: verrà generato automaticamente
   - **Descrizione**: `Service account per salvare contatti dal form della landing page`
5. Clicca **"CREA E CONTINUA"**
6. Nel campo **"Ruolo"**, cerca e seleziona: **"Editor"**
   - (In alternativa, cerca "Fogli Google" e seleziona un ruolo editor specifico)
7. Clicca **"CONTINUA"**
8. Clicca **"FINE"** (lascia vuoti gli altri campi opzionali)

### Passo 4: Scaricare le Credenziali JSON

1. Nella pagina **"Credenziali"**, trovi la lista degli account di servizio
2. Clicca sull'email del service account appena creato (es. `3vi-sheets-writer@...`)
3. Vai alla scheda **"CHIAVI"** (Keys)
4. Clicca **"AGGIUNGI CHIAVE"** → **"Crea nuova chiave"**
5. Seleziona formato **"JSON"**
6. Clicca **"CREA"**
7. Il file JSON viene scaricato automaticamente sul tuo computer
8. **IMPORTANTE**:
   - Rinomina il file in `google-credentials.json`
   - Conservalo in un luogo sicuro
   - NON condividerlo MAI con nessuno
   - NON caricarlo mai su Git o online

### Passo 5: Condividere il Google Sheet con il Service Account

Questo è il passo più importante! Senza questo, l'API non potrà scrivere sul foglio.

1. Apri il file `google-credentials.json` scaricato con un editor di testo (Notepad, TextEdit, VS Code)
2. Cerca il campo `"client_email"`, avrà un valore tipo:
   ```
   "client_email": "3vi-sheets-writer@xxxx.iam.gserviceaccount.com"
   ```
3. **Copia questa email completa**
4. Apri il tuo **Google Sheet** (quello dove vuoi salvare i contatti)
5. Clicca sul pulsante **"Condividi"** in alto a destra
6. Incolla l'email del service account nel campo di condivisione
7. Assicurati che i permessi siano impostati su **"Editor"** (NON Visualizzatore!)
8. **DISABILITA** la spunta "Invia notifica via email"
9. Clicca **"Condividi"** o **"Invia"**

✅ Fatto! Il service account ora può scrivere sul tuo foglio.

### Passo 6: Ottenere l'ID del Google Sheet

1. Apri il tuo Google Sheet
2. Guarda l'URL nella barra degli indirizzi del browser:
   ```
   https://docs.google.com/spreadsheets/d/1ABC123xyz456def789ghi/edit
   ```
3. L'ID del foglio è la parte tra `/d/` e `/edit`
4. Nell'esempio sopra: `1ABC123xyz456def789ghi`
5. **Copia questo ID**, ti servirà per il file `.env.local`

### Passo 7: Preparare il Google Sheet (Intestazioni)

Il tuo Google Sheet deve avere le intestazioni nelle colonne. Nella **prima riga** del foglio, scrivi:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Data/Ora | Nome | Cognome | Email | Telefono | Città | Tipo Immobile | Numero Stanze | Impianto Predisposto | Note |

Puoi anche personalizzare i nomi delle colonne, ma mantieni l'ordine!

### Passo 8: Verificare il Nome del Foglio/Tab

1. In basso nel tuo Google Sheet, vedi il nome del tab (di default: "Sheet1", "Foglio1", ecc.)
2. Puoi rinominarlo come preferisci (es. "Contatti", "Lead 2025")
3. **Ricorda questo nome**, ti servirà per `GOOGLE_SHEET_NAME` nel file `.env.local`

---

## Configurazione SMTP (Email)

Hai due opzioni principali per l'invio email:

### Opzione 1: Gmail (più semplice per iniziare) ⭐ CONSIGLIATA

#### Prerequisiti Gmail:
- Account Gmail
- Autenticazione a 2 fattori attiva

#### Come generare una App Password per Gmail:

1. Vai su [Sicurezza Account Google](https://myaccount.google.com/security)
2. Assicurati che la **"Verifica in due passaggi"** sia **ATTIVA**
   - Se non è attiva, attivala seguendo le istruzioni
3. Torna su [myaccount.google.com/security](https://myaccount.google.com/security)
4. Cerca la sezione **"Password per le app"** (potrebbe essere in fondo alla pagina)
5. Clicca su **"Password per le app"**
6. Potrebbe chiederti di autenticarti di nuovo
7. Nel campo "App", seleziona **"Altro (nome personalizzato)"**
8. Scrivi: `3VI Landing Contact Form`
9. Clicca **"Genera"**
10. Ti viene mostrata una password di **16 caratteri** (tipo: `abcd efgh ijkl mnop`)
11. **COPIA questa password** (puoi rimuovere gli spazi)
12. Questa è la password da usare per `SMTP_PASSWORD`

#### Valori da usare nel .env.local (Gmail):
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=la-tua-email@gmail.com
SMTP_PASSWORD=abcdefghijklmnop
```

### Opzione 2: SendGrid (consigliato per produzione)

#### Vantaggi SendGrid:
- ✅ 100 email gratuite al giorno
- ✅ Migliore deliverability (finiscono meno in spam)
- ✅ Analytics e tracking
- ✅ Più affidabile per uso professionale

#### Setup SendGrid:

1. Vai su [SendGrid](https://sendgrid.com/) e registrati
2. Completa la verifica email
3. Accedi al dashboard
4. Vai su **Settings** → **API Keys**
5. Clicca **"Create API Key"**
6. Nome: `3VI Landing Page`
7. Tipo: **"Full Access"** oppure scegli solo **"Mail Send"**
8. Clicca **"Create & View"**
9. **COPIA la API Key** (inizia con `SG.`)
10. ⚠️ **IMPORTANTE**: La vedrai una sola volta! Salvala subito

#### Valori da usare nel .env.local (SendGrid):
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=SG.tua-api-key-qui
```

> **Nota**: `SMTP_USER` deve essere letteralmente la parola `apikey` con SendGrid!

---

## Configurazione File .env.local

### Passo 1: Creare il file .env.local

1. Apri il progetto in VS Code (o il tuo editor)
2. Nella **root del progetto** (stessa cartella di `package.json`)
3. Crea un nuovo file chiamato esattamente: `.env.local` (con il punto all'inizio!)

### Passo 2: Copiare il template

1. Apri il file `.env.local.example` che ho creato
2. Copia tutto il contenuto
3. Incollalo nel nuovo file `.env.local`

### Passo 3: Compilare le variabili

Ora sostituisci i valori placeholder con i tuoi dati reali:

#### SMTP (Email):
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tua-email@gmail.com
SMTP_PASSWORD=la-tua-app-password-di-16-caratteri
CONTACT_EMAIL=3virozzano@gmail.com
```

#### Google Sheets:
```env
GOOGLE_SHEET_ID=1ABC123xyz456def789ghi
GOOGLE_SHEET_NAME=Sheet1
GOOGLE_SERVICE_ACCOUNT_EMAIL=3vi-sheets-writer@xxxx.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n"
```

#### Come ottenere GOOGLE_PRIVATE_KEY:

1. Apri il file `google-credentials.json` con un editor di testo
2. Cerca il campo `"private_key"`
3. Copia **TUTTO** il valore, incluse le virgolette e i caratteri `\n`
4. Esempio di cosa copiare:
   ```json
   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
   ```
5. Incolla esattamente così nel file `.env.local`

⚠️ **IMPORTANTE**:
- Mantieni le **virgolette** intorno alla chiave
- Mantieni i caratteri **\n** (rappresentano gli a capo)
- NON rimuovere niente, copia tutto esattamente com'è

#### Come ottenere GOOGLE_SERVICE_ACCOUNT_EMAIL:

1. Apri il file `google-credentials.json`
2. Cerca il campo `"client_email"`
3. Copia il valore (sarà tipo: `nome@project.iam.gserviceaccount.com`)

### Esempio Completo di .env.local:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=filippo@3vi.net
SMTP_PASSWORD=abcdefghijklmnop
CONTACT_EMAIL=3virozzano@gmail.com

# Google Sheets
GOOGLE_SHEET_ID=1XyZ123AbC456DeF789
GOOGLE_SHEET_NAME=Contatti
GOOGLE_SERVICE_ACCOUNT_EMAIL=3vi-sheets-writer@project-123456.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCB...\n-----END PRIVATE KEY-----\n"
```

### Passo 4: Salvare e verificare

1. **Salva** il file `.env.local`
2. Assicurati che il file sia nella **root del progetto**
3. Verifica che il file NON sia visibile su Git (è in `.gitignore` per default)

---

## Test in Locale

### Passo 1: Riavviare il server di sviluppo

Se il server era già avviato, **fermalo** (Ctrl+C) e **riavvialo**:

```bash
npm run dev
```

> ⚠️ Next.js carica le variabili d'ambiente solo all'avvio!

### Passo 2: Verificare che l'API funzioni

Apri il browser e vai su:
```
http://localhost:3000/api/contact
```

Dovresti vedere:
```json
{
  "message": "Contact API is running",
  "timestamp": "2025-..."
}
```

### Passo 3: Test con il form

1. Vai sulla landing page: `http://localhost:3000`
2. Scorri fino al form di contatto
3. Compila tutti i campi obbligatori
4. Accetta la privacy
5. Clicca **"Richiedi Consulenza Gratuita"**

### Passo 4: Verificare il risultato

Dopo l'invio, dovresti:

1. ✅ Essere reindirizzato alla pagina `/thank-you`
2. ✅ Ricevere un'email a `3virozzano@gmail.com` con tutti i dati del form
3. ✅ Vedere una nuova riga aggiunta al Google Sheet con i dati

### Cosa fare se qualcosa non funziona:

1. Apri la **Console del Browser** (F12) → tab "Console"
   - Guarda se ci sono errori in rosso
2. Controlla i **log del server** nel terminale dove hai lanciato `npm run dev`
   - Cerca messaggi di errore
3. Vai alla sezione [Troubleshooting](#troubleshooting) di questa guida

---

## Deploy su Vercel

Una volta che tutto funziona in locale, è il momento di fare il deploy su Vercel.

### Passo 1: Deploy del codice

Se non l'hai già fatto:

```bash
# Commit dei cambiamenti
git add .
git commit -m "Add contact form API with email and Google Sheets integration"

# Push su GitHub
git push origin main
```

### Passo 2: Configurare le variabili d'ambiente su Vercel

1. Vai su [Vercel Dashboard](https://vercel.com/dashboard)
2. Seleziona il tuo progetto
3. Vai su **Settings** (in alto)
4. Nel menu a sinistra, clicca **"Environment Variables"**

### Passo 3: Aggiungere ogni variabile

Per ogni variabile nel tuo `.env.local`, crea una entry su Vercel:

#### Come aggiungere una variabile:

1. Clicca **"Add New"**
2. **Name**: il nome della variabile (es. `SMTP_HOST`)
3. **Value**: il valore della variabile (es. `smtp.gmail.com`)
4. **Environment**: Seleziona **tutti e tre**:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Clicca **"Save"**

#### Lista variabili da aggiungere:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `CONTACT_EMAIL`
- `GOOGLE_SHEET_ID`
- `GOOGLE_SHEET_NAME`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY` ⚠️ **ATTENZIONE**: Vedi sotto

#### ⚠️ IMPORTANTE per GOOGLE_PRIVATE_KEY su Vercel:

La chiave privata contiene caratteri speciali `\n`. Su Vercel:

1. Copia il valore **CON le virgolette** dal tuo `.env.local`
2. Incollalo nel campo Value di Vercel
3. Assicurati che i `\n` siano mantenuti
4. Se hai problemi, prova a cliccare "Use Secret" per nascondere il valore

### Passo 4: Rideploy

Dopo aver aggiunto tutte le variabili:

1. Vai su **Deployments** (in alto)
2. Trova il deployment più recente
3. Clicca sui tre puntini `...` → **"Redeploy"**
4. Seleziona **"Use existing Build Cache"** → Clicca **"Redeploy"**

### Passo 5: Test in produzione

Una volta completato il deploy:

1. Vai sul tuo sito in produzione (es. `tuo-sito.vercel.app`)
2. Compila il form con dati di test
3. Verifica che:
   - ✅ Vieni reindirizzato a `/thank-you`
   - ✅ Ricevi l'email
   - ✅ Il dato viene salvato su Google Sheet

---

## Troubleshooting

### ❌ Email non arrivano

**Problema**: Il form si invia ma non ricevo email.

**Soluzioni**:

1. **Controlla la cartella Spam/Posta indesiderata**
   - L'email potrebbe essere finita lì

2. **Verifica le credenziali SMTP**
   - Controlla che `SMTP_USER` e `SMTP_PASSWORD` siano corretti nel `.env.local`
   - Se usi Gmail, assicurati di usare la **App Password**, NON la password normale

3. **Controlla i log**
   - Nel terminale (se locale) o nei log di Vercel
   - Cerca errori tipo "Authentication failed" o "Invalid credentials"

4. **Test SMTP**
   - Prova a inviare un'email di test manualmente con le stesse credenziali

5. **Verifica che l'email mittente sia valida**
   - `SMTP_USER` deve essere un'email valida e funzionante

### ❌ Errore: "The caller does not have permission"

**Problema**: Errore quando si cerca di scrivere su Google Sheets.

**Soluzioni**:

1. **Verifica di aver condiviso il foglio**
   - Apri il Google Sheet
   - Clicca "Condividi"
   - Verifica che l'email del service account (`GOOGLE_SERVICE_ACCOUNT_EMAIL`) sia nella lista
   - Assicurati che abbia permessi di **"Editor"**, non solo "Visualizzatore"

2. **Controlla l'email del service account**
   - Nel `.env.local`, verifica che `GOOGLE_SERVICE_ACCOUNT_EMAIL` corrisponda esattamente al campo `client_email` del file JSON

3. **Ricontrolla l'ID del foglio**
   - `GOOGLE_SHEET_ID` deve essere corretto
   - Prova a copiarlo di nuovo dall'URL

### ❌ Errore: "Invalid credentials" (Google Sheets)

**Problema**: Credenziali Google non valide.

**Soluzioni**:

1. **Verifica GOOGLE_PRIVATE_KEY**
   - Assicurati che contenga **tutte** le virgolette
   - Mantieni i caratteri `\n` (non sostituirli con a capo reali)
   - Copia **esattamente** dal file JSON, incluse le virgolette

2. **Formato corretto**:
   ```env
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
   ```

3. **Se ancora non funziona**:
   - Prova a ricreare il service account
   - Scarica di nuovo il file JSON
   - Ricopia le credenziali

### ❌ Errore: "Module not found: nodemailer"

**Problema**: Dipendenze mancanti.

**Soluzioni**:

```bash
# Reinstalla le dipendenze
npm install nodemailer googleapis @types/nodemailer

# Riavvia il server
npm run dev
```

### ❌ Form si invia ma non fa redirect

**Problema**: Il form viene inviato ma rimango sulla stessa pagina.

**Soluzioni**:

1. **Controlla la console del browser** (F12 → Console)
   - Cerca errori JavaScript

2. **Verifica che l'API restituisca success**
   - Controlla i log del server
   - L'API deve restituire `{ success: true }`

3. **Verifica il codice di CTASection.tsx**
   - Deve esserci `router.push('/thank-you')` dopo il successo

### ❌ Errore: "Failed to fetch" o "Network error"

**Problema**: Il browser non riesce a chiamare l'API.

**Soluzioni**:

1. **Verifica che il server sia avviato**
   - Deve essere in esecuzione `npm run dev`

2. **Controlla l'URL dell'API**
   - Deve essere `/api/contact`
   - Non `localhost:3000/api/contact` (usa il path relativo)

3. **Disabilita estensioni del browser**
   - Adblocker o firewall potrebbero bloccare le richieste

### ❌ Variabili d'ambiente non funzionano

**Problema**: Le variabili del `.env.local` sembrano non essere lette.

**Soluzioni**:

1. **Riavvia il server**
   - Next.js legge il `.env.local` solo all'avvio
   - Ferma il server (Ctrl+C) e riavvialo (`npm run dev`)

2. **Verifica il nome del file**
   - Deve chiamarsi esattamente `.env.local` (con il punto all'inizio)
   - Non `.env.local.txt` o altro

3. **Verifica la posizione**
   - Deve essere nella **root** del progetto (stessa cartella di `package.json`)

4. **Su Vercel**:
   - Le variabili devono essere configurate nel dashboard
   - Dopo averle aggiunte, fai un redeploy

### ❌ Dati salvati nel Google Sheet ma colonne sbagliate

**Problema**: I dati vengono salvati ma nelle colonne sbagliate.

**Soluzioni**:

1. **Verifica l'ordine delle intestazioni**
   - Devono essere esattamente in questo ordine:
     1. Data/Ora
     2. Nome
     3. Cognome
     4. Email
     5. Telefono
     6. Città
     7. Tipo Immobile
     8. Numero Stanze
     9. Impianto Predisposto
     10. Note

2. **Verifica il nome del foglio/tab**
   - `GOOGLE_SHEET_NAME` deve corrispondere al nome del tab in basso nel foglio

### 📞 Serve ancora aiuto?

Se hai seguito tutti i passaggi e qualcosa ancora non funziona:

1. **Controlla i log**:
   - Console del browser (F12)
   - Log del server (terminale)
   - Log di Vercel (Deployments → Function Logs)

2. **Verifica le variabili d'ambiente**:
   - Stampa i valori (senza mostrare le password!) per verificare che siano caricati

3. **Test incrementale**:
   - Prova prima solo l'invio email (commenta il codice di Google Sheets)
   - Poi prova solo Google Sheets (commenta l'invio email)
   - Questo ti aiuterà a identificare quale parte ha problemi

---

## 🎉 Configurazione Completata!

Se sei arrivato fin qui e tutto funziona, congratulazioni! 🎊

Il tuo sistema di gestione contatti è ora completo e funzionante:

- ✅ Form di contatto sulla landing page
- ✅ Email automatiche a `3virozzano@gmail.com`
- ✅ Salvataggio automatico su Google Sheet
- ✅ Thank you page professionale
- ✅ Gestione errori e validazione

### Prossimi Passi (Opzionali):

1. **Personalizza l'email**
   - Modifica il template HTML in `src/app/api/contact/route.ts`

2. **Aggiungi analytics**
   - Traccia le conversioni con Google Analytics o Meta Pixel

3. **Email di conferma al cliente**
   - Implementa l'invio di un'email anche al cliente

4. **Rate limiting**
   - Previeni spam con limiti di richieste

5. **Integrazione CRM**
   - Collega Zapier per inviare i dati a un CRM

---

**Guida creata per 3VI Climatizzazione**
Ultima modifica: 2025

Per domande o problemi, controlla la sezione [Troubleshooting](#troubleshooting) sopra.
