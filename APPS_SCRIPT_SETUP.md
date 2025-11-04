# 📝 Setup Google Apps Script - Guida Rapida (5 minuti)

Questa guida ti mostrerà come configurare Google Apps Script per salvare automaticamente i contatti dal form della landing page al tuo Google Sheet.

**Vantaggi rispetto a Google Cloud Console:**
- ✅ **Niente credenziali complesse** da gestire
- ✅ **Setup in 5 minuti** (non 20!)
- ✅ **Nessun file JSON** da scaricare
- ✅ **Completamente gratuito** e illimitato
- ✅ **Direttamente collegato** al tuo Google Sheet

---

## 📋 Prerequisiti

- ✅ Un Google Sheet già creato (quello dove vuoi salvare i contatti)
- ✅ Account Google con accesso al foglio

---

## 🚀 Setup Passo-Passo

### Passo 1: Preparare il Google Sheet

1. **Apri il tuo Google Sheet** dove vuoi salvare i contatti
2. **Verifica il nome del foglio/tab** in basso (es. "Sheet1", "Contatti", ecc.)
   - Ricorda questo nome, ti servirà dopo
3. **Aggiungi le intestazioni** nella **prima riga** (se non le hai già):

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Data/Ora | Nome | Cognome | Email | Telefono | Città | Tipo Immobile | Numero Stanze | Impianto Predisposto | Note |

> **Tip**: Puoi anche lasciare vuota la prima riga e usare la funzione `setupHeaders()` dello script per crearle automaticamente!

---

### Passo 2: Aprire l'Editor di Apps Script

1. Nel Google Sheet, vai su **Estensioni** (menu in alto)
2. Clicca su **Apps Script**
3. Si apre una nuova scheda con l'editor di codice
4. Vedrai un file chiamato `Code.gs` con del codice di esempio

---

### Passo 3: Copiare il Codice dello Script

1. **Apri il file `apps-script-code.js`** che ho creato nella root del progetto
2. **Copia TUTTO il contenuto** del file
3. **Torna all'editor di Apps Script**
4. **Seleziona tutto** il codice esistente (Ctrl+A o Cmd+A)
5. **Cancellalo** e **incolla** il nuovo codice
6. **IMPORTANTE**: Se il tuo foglio/tab non si chiama "Sheet1", modifica questa riga:
   ```javascript
   const SHEET_NAME = 'Sheet1'; // Cambia con il nome del tuo foglio
   ```

---

### Passo 4: Salvare il Progetto

1. Clicca su **File** → **Salva** (oppure Ctrl+S / Cmd+S)
2. Ti chiede di dare un nome al progetto
3. Scrivi: `3VI Contact Form Handler`
4. Clicca **OK**

---

### Passo 5: Deploy come Web App

Ora devi pubblicare lo script come Web App per ottenere l'URL webhook.

1. In alto a destra, clicca su **Deploy** → **Nuova distribuzione**
   - (Se non vedi "Deploy", cerca l'icona con l'ingranaggio blu)

2. Clicca sull'icona **⚙️ Seleziona tipo** (a sinistra)

3. Seleziona **Web app**

4. Compila i campi:
   - **Descrizione**: `3VI Landing Contact Form`
   - **Esegui come**: **Me** (il tuo account)
   - **Chi ha accesso**: **Chiunque** ⚠️ IMPORTANTE!

5. Clicca **Distribuisci** (o **Deploy**)

6. **Prima volta**: Ti chiede di autorizzare lo script
   - Clicca **Autorizza accesso**
   - Seleziona il tuo account Google
   - Vedrai un avviso "Google non ha verificato questa app"
   - Clicca **Avanzate** (in piccolo in basso)
   - Clicca **Vai a 3VI Contact Form Handler (non sicuro)**
   - Clicca **Consenti**

7. Una volta completato, vedrai una finestra con:
   - **URL dell'applicazione web**: `https://script.google.com/macros/s/ABC123xyz.../exec`

8. **COPIA questo URL** - è il tuo webhook!

---

### Passo 6: Configurare il file .env.local

1. Apri il progetto della landing page
2. Crea (o apri) il file `.env.local` nella root
3. Aggiungi o modifica questa riga:
   ```env
   GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/ABC123xyz.../exec
   ```
   Sostituisci con l'URL che hai copiato

4. **Salva** il file

---

### Passo 7: Test dello Script (Opzionale ma consigliato)

Prima di testare dal form, puoi verificare che lo script funzioni:

#### Test 1: Funzione testWrite()

1. Nell'editor di Apps Script, seleziona dal menu a tendina in alto: **testWrite**
2. Clicca sul pulsante **▶️ Esegui**
3. Controlla il tuo Google Sheet - dovresti vedere una nuova riga con dati di test

#### Test 2: Creare le intestazioni automaticamente

Se non hai ancora le intestazioni:

1. Seleziona dal menu a tendina: **setupHeaders**
2. Clicca **▶️ Esegui**
3. Controlla il foglio - la prima riga avrà le intestazioni formattate

#### Test 3: Verificare il webhook

Apri il browser e vai su:
```
https://script.google.com/macros/s/TUO_SCRIPT_ID/exec
```

Dovresti vedere una risposta JSON tipo:
```json
{
  "status": "ok",
  "message": "3VI Contact Form Apps Script is running",
  "timestamp": "2025-...",
  "sheetName": "Sheet1"
}
```

---

### Passo 8: Test dal Form della Landing Page

1. **Riavvia il server** di sviluppo (IMPORTANTE!):
   ```bash
   # Ferma il server (Ctrl+C)
   # Riavvia
   npm run dev
   ```

2. Vai sulla landing page: `http://localhost:3000`

3. Scorri fino al form di contatto

4. Compila con dati di test:
   - Nome: Test
   - Cognome: Apps Script
   - Email: test@test.com
   - Telefono: 333 1234567
   - Altri campi a piacere

5. Clicca **"Richiedi Consulenza Gratuita"**

6. **Verifica**:
   - ✅ Vieni reindirizzato a `/thank-you`
   - ✅ Ricevi un'email a `3virozzano@gmail.com`
   - ✅ Una nuova riga appare nel Google Sheet

---

## 🔧 Troubleshooting

### ❌ Errore: "Script non autorizzato"

**Soluzione**:
- Vai su Deploy → Gestisci distribuzioni
- Verifica che "Chi ha accesso" sia impostato su **Chiunque**

### ❌ Errore: "Foglio non trovato"

**Soluzione**:
- Verifica il nome del foglio/tab nel Google Sheet
- Assicurati che `SHEET_NAME` nel codice corrisponda esattamente (case-sensitive!)
- Esempio: `const SHEET_NAME = 'Contatti';`

### ❌ Dati non arrivano nel foglio

**Soluzione**:
1. Controlla i log di Apps Script:
   - Vai su **Esecuzioni** (icona orologio a sinistra)
   - Cerca errori nelle esecuzioni recenti

2. Verifica l'URL in `.env.local`:
   - Deve finire con `/exec` (non `/dev`)
   - Deve essere completo: `https://script.google.com/macros/s/.../exec`

3. Riavvia il server Next.js dopo aver modificato `.env.local`

### ❌ Errore 404 o "Not Found"

**Soluzione**:
- L'URL del webhook è sbagliato
- Vai su Deploy → Gestisci distribuzioni
- Copia di nuovo l'URL corretto

### ❌ Colonne nel posto sbagliato

**Soluzione**:
- L'ordine delle colonne nel foglio deve corrispondere all'ordine nello script
- Usa la funzione `setupHeaders()` per creare le intestazioni corrette automaticamente

---

## 🔄 Aggiornare lo Script (se serve)

Se in futuro devi modificare lo script:

1. Fai le modifiche nel codice
2. **Salva** (Ctrl+S)
3. Vai su **Deploy** → **Gestisci distribuzioni**
4. Clicca sull'icona ✏️ **Modifica** (a destra della distribuzione attiva)
5. Cambia **Versione** da dropdown: **Nuova versione**
6. Clicca **Distribuisci**
7. ✅ L'URL rimane lo stesso, non serve aggiornare `.env.local`

---

## 📊 Visualizzare i Log (Debug)

Per vedere cosa succede quando lo script riceve dati:

1. Nell'editor Apps Script, clicca su **Esecuzioni** (icona orologio a sinistra)
2. Vedrai tutte le esecuzioni recenti
3. Clicca su una esecuzione per vedere i log dettagliati
4. Utile per capire errori o verificare che i dati arrivino correttamente

---

## 🚀 Deploy su Vercel

Quando fai il deploy su Vercel:

1. Vai su **Vercel Dashboard** → tuo progetto → **Settings**
2. **Environment Variables**
3. Aggiungi:
   - **Name**: `GOOGLE_APPS_SCRIPT_URL`
   - **Value**: `https://script.google.com/macros/s/ABC123.../exec`
   - **Environments**: Seleziona tutti (Production, Preview, Development)
4. **Save**
5. Vai su **Deployments** → **Redeploy** (sui tre puntini dell'ultimo deploy)

---

## ✅ Checklist Setup Completo

- [ ] Google Sheet aperto con nome foglio verificato
- [ ] Intestazioni nella prima riga (o usato `setupHeaders()`)
- [ ] Apps Script creato e codice incollato
- [ ] `SHEET_NAME` modificato se necessario
- [ ] Script salvato
- [ ] Deploy come Web App con "Chiunque" come accesso
- [ ] URL webhook copiato
- [ ] `.env.local` aggiornato con `GOOGLE_APPS_SCRIPT_URL`
- [ ] Server Next.js riavviato
- [ ] Test dal form: dati salvati correttamente
- [ ] Variabili configurate su Vercel (per produzione)

---

## 🎉 Fatto!

Se hai completato tutti i passaggi, il tuo sistema è pronto:

- ✅ Form di contatto funzionante
- ✅ Email automatiche a `3virozzano@gmail.com`
- ✅ Salvataggio automatico su Google Sheet
- ✅ Thank you page dopo l'invio

Il tutto **senza Google Cloud Console**, **senza credenziali complesse**, in **5 minuti**! 🚀

---

## 📞 Serve Aiuto?

Controlla la sezione [Troubleshooting](#-troubleshooting) sopra.

Se i problemi persistono:
1. Verifica i log di Apps Script (Esecuzioni)
2. Controlla la console del browser (F12)
3. Verifica i log del server Next.js

---

**Guida creata per 3VI Climatizzazione**
Ultima modifica: 2025

**File correlati:**
- [`apps-script-code.js`](apps-script-code.js) - Codice da copiare in Apps Script
- [`.env.local.example`](.env.local.example) - Template variabili d'ambiente
- [`SETUP_INSTRUCTIONS.md`](SETUP_INSTRUCTIONS.md) - Guida configurazione SMTP
