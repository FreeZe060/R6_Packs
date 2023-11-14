//npm install express-session express mysql path ejs body-parser
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
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

/* Definition de l'user */

app.use(session({
    secret: 'votre_clé_secrète',
    resave: false,
    saveUninitialized: true
}));
app.use((req, res, next) => {
    // Middleware pour rendre l'ID de l'utilisateur disponible dans toutes les routes
    res.locals.logUser = req.session.logUser;
    next();
});

/*Encodage de l'url*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Routes GET*/

app.get('/', (req, res) => {
    connection.query('SELECT packs.* FROM packs', (error, Packresults) => {
        if (error) {
            console.error('Erreur lors de la récupération des entrepôts : ' + error.message);
            return;
        }
        const logUser = res.locals.logUser;
        res.render('home', { packs: Packresults, profile: logUser});
    });
});

app.get('/profiles', (req, res) => {
    connection.query('SELECT profile.* FROM profile', (error, Profilesresults) => {
        if (error) {
            console.error('Erreur lors de la récupération des entrepôts : ' + error.message);
            return;
        }
        res.render('profile', { profiles: Profilesresults });
    });;
});


app.get('/opening', (req, res) => {
    const logUser = res.locals.logUser;
    res.render('opening', {profile: logUser});
});

app.get('/inventaire', (req, res) => {
    // connection.query('SELECT profile.* FROM profile', (error, Profilesresults) => {
    //     if (error) {
    //         console.error('Erreur lors de la récupération des entrepôts : ' + error.message);
    //         return;
    //     }
    //     res.render('profile', { profiles: Profilesresults });
    // });;
    res.render('inventaire');
});


/*Routes POST*/

app.post('/UserId', (req, res) => {
    const reqUserId = req.body.userId;
    console.log("{ message: 'Id utilisateur chargé :",req.body.userId,"}");
    connection.query('SELECT profile.* FROM profile WHERE id = ?',[reqUserId], (error, Profileresults) => {
        if (error) {
            console.error('Erreur lors de la récupération des entrepôts : ' + error.message);
            return;
        }
        req.session.logUser = Profileresults[0];
        res.redirect('/');
    });;
    
});

/*END*/

app.listen(port, () => {
    console.log(`Serveur Express: http://localhost:${port}`);
});