import express, { response } from 'express';
import basicAuth from 'express-basic-auth';

const app = express();
const port = process.env.SERVER_POST;

app.use(basicAuth({
    users: {
        admin: 'admin',
    },
    challenge: true
}))

app.get('/:id', (request, response) => {
    console.log(request.query);
    console.log(request.params);
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