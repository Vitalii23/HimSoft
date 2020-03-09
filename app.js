const express = require("express");
const xmlparser = require('express-xml-bodyparser');
const cors = require("cors");
const port = 3000;

const app = express();

var corsOptions = {
    origin: "http://localhost:3001"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xmlparser("method"));

const db = require("./model");

db.sequelize.sync();

app.get("/", (req, res) => {
    var xmlString = ('<info>Welcome to application</info>');
    res.set('Content-Type', 'text/xml');
    res.send(xmlString);
});

require("./routes/method.routes")(app);

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

let connections = [];

const server = app.listen(port, () => console.log(`App running on port ${port}.`));

server.on('connection', connection => {
    connections.push(connection);
    connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});

function shutDown() {
    console.log('Received kill signal, shutting down gracefully');
    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);

    connections.forEach(curr => curr.end());
    setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}