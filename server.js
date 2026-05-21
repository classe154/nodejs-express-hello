// Importiamo il framework Express per creare il server.
import express from 'express';

// Creiamo l'applicazione Express.
// Tutti i middleware e le rotte vengono registrati su questo oggetto.
const app = express();

// La porta viene letta dal file .env tramite process.env.
// In questo modo evitiamo di scrivere il valore direttamente nel codice.
const PORT = process.env.SERVER_PORT;

// --- MIDDLEWARE ---

// Middleware personalizzato: viene eseguito per ogni richiesta in arrivo.
// Riceve (request, response, next): next() passa il controllo al passo successivo.
// Senza next() la richiesta si bloccherebbe qui e il client non riceverebbe risposta.
app.use((request, response, next) => {
    console.log('Richiesta ricevuta:', request.method, request.url);
    next();
});

// Middleware statico: serve i file presenti nella cartella public1.
// Express cerca prima qui: se trova il file lo serve, altrimenti passa al prossimo.
app.use(express.static('public1'));

// Middleware statico: serve i file presenti nella cartella public2.
// Se un file esiste in entrambe le cartelle, vince sempre public1 (per via dell'ordine).
// Caso speciale: se esiste index.html in una delle cartelle statiche,
// viene servito automaticamente quando il browser visita "/".
app.use(express.static('public2'));

// --- ROTTE ---

// Rotta GET per il percorso "/".
// Restituisce HTML: il browser lo interpreta e mostra il contenuto come pagina.
app.get('/', (request, response) => {
    response
        .type('html')
        .send('<h1>Hello NodeJS</h1>');
});

// Rotta GET per il percorso "/rotta-json".
// Restituisce dati strutturati in formato JSON, utili per comunicare con un frontend.
app.get('/rotta-json', (request, response) => {
    // Versione esplicita — equivalente allo shortcut qui sotto:
    // response
    //     .type('json')
    //     .send({ messaggio: 'Questo è un messaggio JSON' });

    // Shortcut: response.json() imposta il tipo JSON e invia la risposta in un colpo solo.
    response.json({
        messaggio: 'Questo è un messaggio JSON'
    });
});

// Esempio aggiuntivo: rotta con più campi JSON.
// Mostra che possiamo restituire qualsiasi struttura di dati.
app.get('/utenti', (request, response) => {
    response.json([
        { id: 1, nome: 'Alice' },
        { id: 2, nome: 'Bob' },
    ]);
});

// --- AVVIO DEL SERVER ---

// Mettiamo il server in ascolto sulla porta indicata.
// La callback viene eseguita una volta sola, quando il server è pronto (o in caso di errore).
app.listen(PORT, (error) => {
    if (error) {
        console.error('Errore durante l\'avvio del server:', error);
        return;
    }
    console.log(`Server avviato correttamente sulla porta ${PORT}`);
});
