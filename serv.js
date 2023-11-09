//npm install express mysql path ejs
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 8080;

const dir = path.join(__dirname, '/');
app.use(express.static('static'));

/* EJS */ 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* Base de données SQL*/

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'r6_packs'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données : ' + err.message);
    } else {
      console.log('Connecté à la base de données MySQL ${database}');
    }
});