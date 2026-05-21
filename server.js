import express, { response } from 'express';
import basicAuth from 'express-basic-auth';

const app = express();
const port = process.env.SERVER_POST;

app.use(express.static('public1'));
app.use(express.static('public2'));

app.get('/', (request, response) => {
    response
        .type('html')
        .send('<h1>Hello NodeJS</h1>');
        
});

app.get('/rotta-json', (request, response) => {
    // Versione standard
    // response
    //    .type('json')
    //    .send({
    //        messaggio: 'Questo è un messaggio JSON',
    //    });
    // Shortcut
    response.json({
        messaggio: 'Questo è un messaggio JSON'
    })
});

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log(`Server in ascolto sulla porta ${port}`);
    }
});