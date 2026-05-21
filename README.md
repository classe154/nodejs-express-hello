# NodeJS + Express — Hello Server

Progetto introduttivo per imparare a creare un server backend con **NodeJS** ed **Express** usando la sintassi ES6.

---

## Concetti chiave

### Server backend
Un server backend è un programma che rimane in esecuzione e risponde alle richieste dei client (es. il browser).
La risposta può essere una pagina HTML, dati JSON o un file statico.

### Porta
La porta è il canale su cui il server è in ascolto.
Visitare `localhost:3000` significa contattare il server locale sulla porta `3000`.
In questo progetto la porta è configurata tramite variabile d'ambiente (vedi `.env`).

### Middleware
Un middleware è una funzione che si esegue tra la richiesta e la risposta.
Può esaminare, modificare o bloccare il flusso. Deve chiamare `next()` per passare al passo successivo.

```
        RICHIESTA
        (browser)
            │
            ▼
┌─────────────────────────┐
│        Express          │
│                         │
│  ┌───────────────────┐  │
│  │   Middleware 1    │  │  ← es. logger personalizzato
│  │  (log + next())   │  │     stampa metodo e URL
│  └────────┬──────────┘  │
│           │ next()      │
│  ┌────────▼──────────┐  │
│  │   Middleware 2    │  │  ← es. express.static('public1')
│  │ (file statici)    │  │     cerca il file: se lo trova, risponde
│  └────────┬──────────┘  │     e si ferma qui (senza next())
│           │ next()      │
│  ┌────────▼──────────┐  │
│  │   Middleware 3    │  │  ← es. express.static('public2')
│  │ (file statici)    │  │     seconda cartella di fallback
│  └────────┬──────────┘  │
│           │ next()      │
│  ┌────────▼──────────┐  │
│  │  Route handler    │  │  ← es. app.get('/', ...)
│  │  (risposta HTML   │  │     risponde e termina il flusso
│  │   o JSON)         │  │
│  └───────────────────┘  │
└─────────────────────────┘
            │
            ▼
        RISPOSTA
        (browser)
```

> Vedi `server.js` — middleware personalizzato con `console.log` e `next()`.

### File statici con `express.static()`
Permette di servire file HTML, CSS e immagini da una cartella.
L'ordine dei middleware statici è importante: Express usa il primo file che trova.

> Vedi `server.js` — `express.static('public1')` e `express.static('public2')`.
> Se esiste `index.html` in una delle cartelle, viene servito automaticamente su `/`.

### Rotte con `app.get()`
Una rotta definisce come il server risponde a una richiesta su un certo percorso.

| Percorso | Tipo risposta | Descrizione |
|---|---|---|
| `/` | HTML | Restituisce una pagina HTML |
| `/rotta-json` | JSON | Restituisce un oggetto JSON |
| `/utenti` | JSON | Restituisce un array di utenti |

> `response.json(...)` è lo shortcut di `response.type('json').send(...)`.

---

## Come avviare il progetto

**1. Crea il file `.env`** copiando l'esempio:

```bash
cp .env.example .env
```

**2. Installa le dipendenze:**

```bash
pnpm install
```

**3. Avvia il server:**

```bash
# avvio normale
pnpm start

# avvio con riavvio automatico al salvataggio
pnpm watch
```

Il server sarà disponibile su [http://localhost:3000](http://localhost:3000).

---

## Struttura del progetto

```
nodejs-express-hello/
├── server.js        # entry point — middleware, rotte e avvio del server
├── public1/         # file statici (priorità alta)
├── public2/         # file statici (priorità bassa)
├── .env             # variabili d'ambiente (da creare, non in git)
├── .env.example     # template per .env
└── package.json
```
