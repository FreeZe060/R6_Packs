//npm install express mysql path ejs
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 8000;

const dir = path.join(__dirname, '/');
app.use(express.static('static'));

app.use(express.static('assets'));

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
      console.log(`Connecté à la base de données MySQL`);
    }
});

/* Routes */

app.get('/', (req, res) => {
    connection.query('SELECT packs.* FROM packs', (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des entrepôts : ' + error.message);
            return;
        }
        console.log(results);
        res.render('home', { packs: results });
    });
});


/*END*/

app.listen(port, () => {
    console.log(`Serveur Express: http://localhost:${port}`);
});