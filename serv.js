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


//////////////////////////////////////////// ROUTE GET /////////////////////////////////////////////////////////////////

///////////////////////////////////// HOME ////////////////////////////////////////////////////////


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


///////////////////////////////////// PROFILES ////////////////////////////////////////////////////////


app.get('/profiles', (req, res) => {
    connection.query('SELECT profile.* FROM profile', (error, Profilesresults) => {
        if (error) {
            console.error('Erreur lors de la récupération des profils : ' + error.message);
            return;
        }
        res.render('profile', { profiles: Profilesresults, profile: res.locals.logUser });
    });
});


///////////////////////////////////// SKINS ////////////////////////////////////////////////////////


app.get('/skins', (req, res) => {
    connection.query('SELECT skins.name, rarity.name as rarity_name, relations_skins_armes.image, armes.name as arme_name FROM relations_skins_armes ' +
    'JOIN skins ON skins.id = relations_skins_armes.id_skin ' +
    'JOIN rarity ON skins.id_rarity = rarity.id ' +
    'JOIN armes ON relations_skins_armes.id_arme = armes.id', (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des skins : ' + error.message);
            return;
        }
        
        res.render('skins', { skins: results, profile: res.locals.logUser });
    });
});


///////////////////////////////////// OPENING ////////////////////////////////////////////////////////


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
            console.log(Packresults[0]);
            console.log(Dropsresults);
            res.render('opening', { profile: logUser, pack: Packresults[0], drops: Dropsresults });
        });;
    });;
});

app.get('/achat', (req, res) => {
    const logUser = res.locals.logUser;
    res.render('achat', { profile: logUser });
});

app.get('/paiement', (req, res) => {
    const montant = req.query.montant;
    const logUser = res.locals.logUser;
    res.render('payment', { profile: logUser, montant });
});

/////////////////////////////INVENTARE///////////////////////////////////

// app.get('/inventaire', (req, res) => {
//     const userId = req.session.logUser.id; 

  
//     connection.query('SELECT relations_skins_armes.id_skin, skins.name, skins.image '+ 
//     'FROM inventaire '+
//     'JOIN relations_skins_armes ON inventaire.id_skin = relations_skins_armes.id '+
//     'JOIN skins ON relations_skins_armes.id_skin = skins.id '+
//     'WHERE inventaire.id_profile = ?', [userId], (error, results) => {

//         if (error) {
//             console.error('Erreur lors de la récupération des skins de l\'inventaire:', error);
//             return res.status(500).json({ success: false, error: 'Erreur lors de la récupération des skins de l\'inventaire' });
//         }

//         res.render('inventaire', { profile: req.session.logUser, inventory: results }); 
//     });
// });


///////////////////////////////////// SAVESKINS ////////////////////////////////////////////////////////


app.post('/saveSelectedSkin', (req, res) => {
    const selectedSkinName = req.body.selectedSkin;
    const userId = req.session.logUser.id;
    console.log('Requête reçue sur /saveSelectedSkin');
    console.log('Skin sélectionné reçu :', selectedSkinName);
    connection.query('SELECT id FROM relations_skins_armes WHERE id_skin = (SELECT id FROM skins WHERE name = ?)', [selectedSkinName], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération de l\'ID de la relation skins/armes:', error);
            return res.status(500).json({ success: false, error: 'Erreur lors de la récupération de l\'ID de la relation skins/armes' });
        }
        if (results.length === 0) {
            console.error('ID de la relation skins/armes non trouvé pour le skin sélectionné');
            return res.status(500).json({ success: false, error: 'ID de la relation skins/armes non trouvé pour le skin sélectionné' });
        }
        const relationSkinsArmesId = results[0].id;
        console.log(results[0].id);
        connection.query('INSERT INTO inventaire (id_skin, id_profile) VALUES (?, ?) ON DUPLICATE KEY UPDATE id_skin = VALUES(id_skin)', [relationSkinsArmesId, userId], (inventaireError, inventaireResults) => {
            if (inventaireError) {
                console.error('Erreur lors de la mise à jour de la table inventaire:', inventaireError);
                return res.status(500).json({ success: false, error: 'Erreur lors de la mise à jour de la table inventaire' });
            }
            res.json({ success: true });
        });
    });
});



//////////////////////////////////////////// ROUTE POST /////////////////////////////////////////////////////////////////

///////////////////////////////////// USERID ////////////////////////////////////////////////////////


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


///////////////////////////////////// REGISTER ////////////////////////////////////////////////////////


app.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const nom = req.body.nom;

    const selectedImg = req.body.selectedImg;
    const imageBuffer = Buffer.from(selectedImg, 'base64');
    const fileName = `${username}_${Date.now()}.png`;
    const filePath = `./assets/image_user/${fileName}`;

    const hashedPassword = await bcrypt.hash(password, 10);

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
            // return res.json({ success: true, message: 'Inscription réussie' });
            res.redirect('/');
        });
        
    }); 
});


///////////////////////////////////// LOGIN ////////////////////////////////////////////////////////


app.post('/login', async (req, res) => {
    const username = req.body.usernameLogin;
    const password = req.body.passwordLogin;

    connection.query('SELECT * FROM profile WHERE username = ?', [username], async (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des informations d\'identification : ' + error.message);
            return res.json({ success: false, message: 'Erreur lors de la connexion' });
        }

        if (results.length === 0) {
            return res.json({ success: false, message: 'L\'utilisateur n\'existe pas' });
        }

        const hashedPassword = results[0].hashed_password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (passwordMatch) {
            req.session.logUser = results[0];
            return res.json({ success: true, message: 'Connexion réussie' });
        } else {
            return res.json({ success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }
    });
});


///////////////////////////////////// SEARCH SKINS ////////////////////////////////////////////////////////


app.post('/search-skins', async (req, res) => {
    const searchTerm = req.body.searchTerm;

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

        res.json({ success: true, results });
    });
});


///////////////////////////////////// DELETE USER ////////////////////////////////////////////////////////


app.post('/deleteUser/:userId', (req, res) => {
    if (!req.session.logUser || !req.session.logUser.isAdmin) {
        return res.status(403).send("Accès non autorisé");
    }

    const userIdToDelete = req.params.userId;

    try {
        connection.query('DELETE FROM profile WHERE id = ?', [userIdToDelete], (error, results) => {
            if (error) {
                console.error('Erreur lors de la suppression de l\'utilisateur : ' + error.message);
                return res.status(500).send("Erreur lors de la suppression de l'utilisateur");
            }

            console.log("userIdToDelete :", userIdToDelete);
            return res.status(200).send("Utilisateur supprimé avec succès");
        });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur : ' + error.message);
        return res.status(500).send("Erreur lors de la suppression de l'utilisateur");
    }
});


///////////////////////////////////// ACHAT ////////////////////////////////////////////////////////


app.post('/charge', async (req, res) => {
    try {
        const token = req.body.token;
        const montantEnEuros = parseFloat(req.body.montant);;

        if (!req.session.logUser) {
            return res.json({ success: false, message: 'Utilisateur non connecté' });
        }

        const userId = req.session.logUser.id;

        let quantiteMonnaie = 0;

        if (montantEnEuros === 5) {
            quantiteMonnaie = 5000;
        } else if (montantEnEuros === 10) {
            quantiteMonnaie = 10000;
        } else if (montantEnEuros === 20) {
            quantiteMonnaie = 20000;
        } else if (montantEnEuros === 50) {
            quantiteMonnaie = 50000;
        } else {
        }

        connection.query('SELECT * FROM profile WHERE id = ?', [userId], async (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération de l\'utilisateur : ' + error.message);
                return res.json({ success: false, message: 'Erreur lors de la mise à jour de la monnaie' });
            }

            const user = results[0];

            const nouveauSolde = user.money + quantiteMonnaie;

            connection.query('UPDATE profile SET money = ? WHERE id = ?', [nouveauSolde, userId], (updateError, updateResults) => {
                if (updateError) {
                    console.error('Erreur lors de la mise à jour de la monnaie : ' + updateError.message);
                    return res.json({ success: false, message: 'Erreur lors de la mise à jour de la monnaie' });
                }

                res.json({ success: true, message: 'Paiement réussi', nouveauSolde: nouveauSolde });
            });
        });
    } catch (error) {
        console.error('Erreur de paiement :', error);
        res.json({ success: false, message: 'Erreur de paiement - ' + error.message });
    }
});

////////////////////////////////// MONEY //////////////////////////////////////

app.post('/UpdateMoney', (req, res) => {
    const change = req.body.change;
    const userId = req.session.logUser.id;
    const userMoney = req.session.logUser.money;
    resultMoney = userMoney + change;
    if (resultMoney<0){
        resultMoney = 0;
    }
    connection.query('UPDATE profile SET money = ? WHERE id = ?', [resultMoney, userId], (error, results) => {
        if (error) {
            console.error('Erreur lors de l\'update de la money dans la base de données:', error);
            return res.status(500).json({ success: false, error: 'Erreur lors de l\'update de la money dans la base de données' });
        }

        console.log('User money Updated:', resultMoney);
        req.session.logUser.money = resultMoney;
        res.json({ success: true });
    });
});

/*END*/

app.listen(port, () => {
    console.log(`Serveur Express: http://localhost:${port}`);
});