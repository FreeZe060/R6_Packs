//npm install express-session express mysql path ejs body-parser bcrypt fs
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');
const stripe = require('stripe')('sk_test_51OGlUbJjPngOvvrw1zgffcUbkQoFplGBMNRGrHfxsGttXvp0sNcgMkStDxLuYRAUlp564BxZmv18MdGchifQZ4NC005QMUQG57');
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

app.get('/skins', (req, res) => {
    // Assurez-vous de gérer les erreurs et autres opérations nécessaires
    connection.query('SELECT skins.name, rarity.name as rarity_name, relations_skins_armes.image, armes.name as arme_name FROM relations_skins_armes ' +
        'JOIN skins ON skins.id = relations_skins_armes.id_skin ' +
        'JOIN rarity ON skins.id_rarity = rarity.id ' +
        'JOIN armes ON relations_skins_armes.id_arme = armes.id', (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération des skins : ' + error.message);
                return;
            }

            res.render('skins', { skins: results });
        });
});


app.get('/opening:id', (req, res) => {
    const id_pack = req.params.id;
    const logUser = res.locals.logUser;
    connection.query('SELECT packs.* FROM packs WHERE packs.id = ?',[id_pack], (error, Packresults) => {
        if (error) {
            console.error('Erreur lors de la récupération des packs : ' + error.message);
            return;
        }
        connection.query('SELECT relations_skins_armes.id as id, skins.name, rarity.name as rarity_name, relations_skins_armes.image as image, relations_skins_armes.price as price, armes.name as arme_name, drops.droprate FROM drops ' + 
        'JOIN relations_skins_armes ON drops.id_relations_skins_armes = relations_skins_armes.id ' + 
        'JOIN skins ON skins.id = relations_skins_armes.id_skin ' +
        'JOIN rarity ON skins.id_rarity = rarity.id ' +
        'JOIN armes ON relations_skins_armes.id_arme = armes.id ' + 
        'WHERE drops.id_pack =  ? ORDER BY drops.droprate;',[id_pack], (error, Dropsresults) => {
            if (error) {
                console.error('Erreur lors de la récupération des packs : ' + error.message);
                return;
            }
            console.log(Dropsresults);
            res.render('opening', { profile: logUser, pack: Packresults[0], drops: Dropsresults });
        });;
    });;
});


app.get('/inventaire', (req, res) => {
    const logUser = res.locals.logUser;
    res.render('inventaire', {profile: logUser});
});

app.get('/test', (req, res) => {
    const logUser = res.locals.logUser;
    res.render('test', {profile: logUser});
});

/*Routes POST*/

app.post('/charge', async (req, res) => {
    try {
      const token = req.body.token;
  
      // ... (autres étapes de traitement)
  
      const charge = await stripe.charges.create({
        amount: 1000, // Montant en centimes (par exemple, 10,00 €)
        currency: 'EUR',
        source: token,
        description: 'Paiement pour votre site web',
      });
  
      // ... (autres étapes de traitement)
  
      // Envoyez une réponse réussie au client
      res.json({ success: true, message: 'Paiement réussi' });
    } catch (error) {
      // Gérez les erreurs
      console.error('Erreur de paiement:', error);
      res.json({ success: false, message: 'Erreur de paiement - ' + error.message });
    }
});
  


app.post('/UserId', (req, res) => {
    const reqUserId = req.body.userId;
    if (reqUserId != -1){
        console.log("{ message: 'Id utilisateur chargé :",req.body.userId,"}");
        connection.query('SELECT profile.* FROM profile WHERE id = ?',[reqUserId], (error, Profileresults) => {
            if (error) {
                console.error('Erreur lors de la récupération des entrepôts : ' + error.message);
                return;
            }
            req.session.logUser = Profileresults[0];
            res.redirect('/');
        });;
    }else{
        console.log("{ message: 'Utilisateur deco' }");
        req.session.logUser = undefined;
        res.redirect('/');
    }
});

app.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const nom = req.body.nom;

    const selectedImg = req.body.selectedImg;
    // Convertir la chaîne base64 en données binaires
    const imageBuffer = Buffer.from(selectedImg, 'base64');
    const fileName = `${username}_${Date.now()}.png`;
    const filePath = `./assets/image_user/${fileName}`;

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer l'utilisateur dans la base de données avec le nom, le mot de passe haché et l'image choisie
    connection.query('INSERT INTO profile (username, hashed_password, name, image, money) VALUES (?, ?, ?, ?, ?)', [username, hashedPassword, nom, fileName || null, 10000], (error, results) => {
        if (error) {
            console.error('Erreur lors de l\'inscription : ' + error.message);
            return res.json({ success: false, message: 'Erreur lors de l\'inscription' });
        }

        fs.writeFile(filePath, imageBuffer, (writeError) => {
            if (writeError) {
                console.error('Erreur lors de l\'enregistrement de l\'image : ' + writeError.message);
                return res.json({ success: false, message: 'Erreur lors de l\'enregistrement de l\'image' });
            }

            console.log('Image enregistrée avec succès sous le nom :', fileName);
            console.log('Utilisateur inscrit avec succès. ID de l\'utilisateur :', results.insertId);
            return res.json({ success: true, message: 'Inscription réussie' });
        });
        res.redirect('/profile');
    }); 
});

app.post('/login', async (req, res) => {
    const username = req.body.usernameLogin;
    const password = req.body.passwordLogin;

    connection.query('SELECT * FROM profile WHERE username = ?', [username], async (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des informations d\'identification : ' + error.message);
            return res.json({ success: false, message: 'Erreur lors de la connexion' });
        }

        if (results.length === 0) {
            // L'utilisateur n'existe pas
            return res.json({ success: false, message: 'L\'utilisateur n\'existe pas' });
        }

        const hashedPassword = results[0].hashed_password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (passwordMatch) {
            req.session.logUser = results[0];
            return res.json({ success: true, message: 'Connexion réussie' });
        } else {
            // Mot de passe incorrect
            return res.json({ success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }
    });
});

app.post('/search-skins', async (req, res) => {
    const searchTerm = req.body.searchTerm;

    // Requête SQL pour la recherche par nom de skin
    const query = "SELECT skins.name, rarity.name as rarity_name, relations_skins_armes.image, armes.name as arme_name " +
                  "FROM relations_skins_armes " +
                  "JOIN skins ON skins.id = relations_skins_armes.id_skin " +
                  "JOIN rarity ON skins.id_rarity = rarity.id " +
                  "JOIN armes ON relations_skins_armes.id_arme = armes.id " +
                  "WHERE skins.name LIKE ?";

    connection.query(query, [`%${searchTerm}%`], (error, results) => {
        if (error) {
            console.error('Erreur lors de la recherche des skins : ' + error.message);
            return res.status(500).json({ success: false, message: 'Erreur lors de la recherche des skins' });
        }

        // Renvoie les résultats au client
        res.json({ success: true, results });
    });
});



/*END*/

app.listen(port, () => {
    console.log(`Serveur Express: http://localhost:${port}`);
});