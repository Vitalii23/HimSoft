const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const xml = require('xml');
const port = 3000;
const db = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (request, response) => {
    var xmlString = ('<info>Node.js, Express, and Postgres API</info>');
    response.header('Content-Type', 'text/xml').send(xmlString);
});

app.get('/method', db.getMethods);
app.get('/method/:id', db.getMethodById);
app.post('/method', db.addMethod);
app.put('/method/:id', db.updateMethod);
app.delete('/method/:id', db.deleteMethod);
app.get('/read', db.readPoll);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});