import express, { response } from 'express';

const app = express();
const port = process.env.SERVER_POST;

app.get('/', (request, response) => {
    response
        .type('html')
        .send('<h1>Hello World</h1>');
        
});

app.get('/data-json1', (request, response) => {
    response
        .type('json')
        .send({
            messaggio: 'ciao son una stringa',
            numero: 9,
            abilitati: true
        })
});

app.get('/data-json2', (request, response) => {
    response.json({
        messaggio: 'Altro messaggio'
    })
});

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log(`Server in ascolto sulla porta ${port}`);
    }
});