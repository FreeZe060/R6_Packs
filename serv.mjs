import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import bodyParser from 'body-parser';
import path from 'path';
import bcrypt from 'bcrypt';
import fs from 'fs';
import stripePackage from 'stripe';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import session from 'express-session';
import ejs from 'ejs';

const stripe = stripePackage('sk_test_51OGlUbJjPngOvvrw1zgffcUbkQoFplGBMNRGrHfxsGttXvp0sNcgMkStDxLuYRAUlp564BxZmv18MdGchifQZ4NC005QMUQG57');
const app = express();
const port = 8000;
const { json, urlencoded } = bodyParser;
const { render } = ejs;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dir = path.join(__dirname, '/');
app.set('view engine', 'ejs');
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static('static'));
app.use(express.static('assets'));

const firebaseConfig = {
    apiKey: "AIzaSyD9QCn0KqwKrSW0vYC6wR-V7wOpp-DybHs",
    authDomain: "r6packs-ce327.firebaseapp.com",
    databaseURL: "https://r6packs-ce327-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "r6packs-ce327",
    storageBucket: "r6packs-ce327.appspot.com",
    messagingSenderId: "778809700328",
    appId: "1:778809700328:web:a4e0497b0f487d3340fe5d",
    measurementId: "G-935LG9E85Q"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

console.log("Firebase Firestore connecté avec succès !");

app.use(session({
    secret: 'votre_clé_secrète',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.logUser = req.session.logUser;
    next();
});

async function getFirestoreData(packs) {
    try {
        const packsCollection = collection(db, packs);
        const snapshot = await getDocs(packsCollection);
        const results = snapshot.docs.map(doc => doc.data());
        return results;
    } catch (error) {
        console.error(`Erreur lors de la récupération des données de la collection ${packs}:`, error);
        throw error;
    }
}

async function getFirestoreDatas(profile) {
    try {
        const profileCollection = collection(db, profile);
        const snapshot = await getDocs(profileCollection);
        const results = snapshot.docs.map(doc => doc.data());
        return results;
    } catch (error) {
        console.error(`Erreur lors de la récupération des données de la collection ${profile}:`, error);
        throw error;
    }
}

app.get('/', async (req, res) => {
    try {
        const packResults = await getFirestoreData('packs');
        const logUser = res.locals.logUser;
        res.render('home', { packs: packResults, profile: logUser });
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des packs');
    }
});

app.get('/profiles', async (req, res) => {
    try {
        const profilesResults = await getFirestoreDatas('profile');
        res.render('profile', { profiles: profilesResults, profile: res.locals.logUser });
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des profils');
    }
});
/*Encodage de l'url*/

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


//////////////////////////////////////////// ROUTE GET /////////////////////////////////////////////////////////////////

///////////////////////////////////// HOME SQL ////////////////////////////////////////////////////////


// app.get('/', (req, res) => {
//     connection.query('SELECT packs.* FROM packs', (error, Packresults) => {
//         if (error) {
//             console.error('Erreur lors de la récupération des entrepôts : ' + error.message);
//             return;
//         }
//         const logUser = res.locals.logUser;
//         res.render('home', { packs: Packresults, profile: logUser});
//     });
// });


///////////////////////////////////// HOME NOSQL ////////////////////////////////////////////////////////

// app.get('/', (req, res) => {

//     console.log('Trying to fetch data from Firestore...');

//     db.collection('packs').get()
//         .then((snapshot) => {
//             const Packresults = [];
//             snapshot.forEach((doc) => {
//                 Packresults.push(doc.data());
//             });
//             const logUser = res.locals.logUser;
//             res.render('home', { packs: Packresults, profile: logUser });
//         })
//         .catch((error) => {
//             console.error('Erreur lors de la récupération des packs :', error);
//             res.status(500).send('Erreur lors de la récupération des packs');
//         });
// });


///////////////////////////////////// PROFILES SQL ////////////////////////////////////////////////////////


// app.get('/profiles', (req, res) => {
//     connection.query('SELECT profile.* FROM profile', (error, Profilesresults) => {
//         if (error) {
//             console.error('Erreur lors de la récupération des profils : ' + error.message);
//             return;
//         }
//         res.render('profile', { profiles: Profilesresults, profile: res.locals.logUser });
//     });
// });


///////////////////////////////////// PROFILES NOSQL ////////////////////////////////////////////////////////

// app.get('/profiles', (req, res) => {
//     db.collection('profile').get()
//         .then((snapshot) => {
//             const Profilesresults = [];
//             snapshot.forEach((doc) => {
//                 Profilesresults.push(doc.data());
//             });
//             res.render('profile', { profiles: Profilesresults, profile: res.locals.logUser });
//         })
//         .catch((error) => {
//             console.error('Erreur lors de la récupération des profils :', error);
//             res.status(500).send('Erreur lors de la récupération des profils');
//         });
// });


///////////////////////////////////// SKINS SQL ////////////////////////////////////////////////////////


// app.get('/skins', (req, res) => {
//     connection.query('SELECT skins.name, rarity.name as rarity_name, relations_skins_armes.image, armes.name as arme_name FROM relations_skins_armes ' +
//     'JOIN skins ON skins.id = relations_skins_armes.id_skin ' +
//     'JOIN rarity ON skins.id_rarity = rarity.id ' +
//     'JOIN armes ON relations_skins_armes.id_arme = armes.id', (error, results) => {
//         if (error) {
//             console.error('Erreur lors de la récupération des skins : ' + error.message);
//             return;
//         }
        
//         res.render('skins', { skins: results, profile: res.locals.logUser });
//     });
// });


///////////////////////////////////// SKINS NOSQL ////////////////////////////////////////////////////////


app.get('/skins', (req, res) => {
    db.collection('relations_skins_armes').get()
        .then((snapshot) => {
            const results = [];
            snapshot.forEach((doc) => {
                results.push(doc.data());
            });
            res.render('skins', { skins: results, profile: res.locals.logUser });
        })
        .catch((error) => {
            console.error('Erreur lors de la récupération des skins :', error);
            res.status(500).send('Erreur lors de la récupération des skins');
        });
});


///////////////////////////////////// OPENING SQL ////////////////////////////////////////////////////////


// app.get('/opening:id', (req, res) => {
//     const id_pack = req.params.id;
//     const logUser = res.locals.logUser;
//     connection.query('SELECT packs.* FROM packs WHERE packs.id = ?',[id_pack], (error, Packresults) => {
//         if (error) {
//             console.error('Erreur lors de la récupération des packs : ' + error.message);
//             return;
//         }
//         connection.query('SELECT relations_skins_armes.id as id, skins.name, rarity.name as rarity_name, relations_skins_armes.image as image, relations_skins_armes.price as price, armes.name as arme_name, drops.droprate FROM drops ' + 
//         'JOIN relations_skins_armes ON drops.id_relations_skins_armes = relations_skins_armes.id ' + 
//         'JOIN skins ON skins.id = relations_skins_armes.id_skin ' +
//         'JOIN rarity ON skins.id_rarity = rarity.id ' +
//         'JOIN armes ON relations_skins_armes.id_arme = armes.id ' + 
//         'WHERE drops.id_pack =  ? ORDER BY drops.droprate;',[id_pack], (error, Dropsresults) => {
//             if (error) {
//                 console.error('Erreur lors de la récupération des packs : ' + error.message);
//                 return;
//             }
//             console.log(Packresults[0]);
//             console.log(Dropsresults);
//             res.render('opening', { profile: logUser, pack: Packresults[0], drops: Dropsresults });
//         });;
//     });;
// });


///////////////////////////////////// OPENING NOSQL ////////////////////////////////////////////////////////


app.get('/opening/:id', (req, res) => {
    const id_pack = req.params.id;
    const logUser = res.locals.logUser;

    db.collection('packs').doc(id_pack).get()
        .then((packDoc) => {
            const Packresults = packDoc.data();
            return db.collection('drops')
                .where('id_pack', '==', id_pack)
                .orderBy('droprate')
                .get();
        })
        .then((dropsSnapshot) => {
            const Dropsresults = [];
            dropsSnapshot.forEach((doc) => {
                Dropsresults.push(doc.data());
            });
            res.render('opening', { profile: logUser, pack: Packresults, drops: Dropsresults });
        })
        .catch((error) => {
            console.error('Erreur lors de la récupération des packs ou des drops :', error);
            res.status(500).send('Erreur lors de la récupération des packs ou des drops');
        });
});


/////////////////////////////INVENTARE///////////////////////////////////

// app.get('/inventaire', (req, res) => {
//     const userId = req.session.logUser.id;

//     // Récupérer les informations sur le skin à partir de la table d'inventaire
//     connection.query('SELECT relations_skins_armes.id_skin, skins.name, skins.image '+ 
//     'FROM inventaire JOIN relations_skins_armes ON inventaire.id_skin = relations_skins_armes.id WHERE inventaire.id_profile = ?', [userId], (error, results) => {
//         if (error) {
//             console.error('Erreur lors de la récupération des skins de l\'inventaire:', error);
//             return res.status(500).json({ success: false, error: 'Erreur lors de la récupération des skins de l\'inventaire' });
//         }

//         // Rendre la vue EJS avec les données de l'inventaire
//         res.render('inventaire', { profile: res.locals.logUser, inventory: results });
//     });
// });


///////////////////////////////////// SAVESKINS SQL ////////////////////////////////////////////////////////


// app.post('/saveSelectedSkin', (req, res) => {
//     const selectedSkinName = req.body.selectedSkin;
//     const userId = req.session.logUser.id;
//     console.log('Requête reçue sur /saveSelectedSkin');
//     console.log('Skin sélectionné reçu :', selectedSkinName);
//     connection.query('SELECT id FROM relations_skins_armes WHERE id_skin = (SELECT id FROM skins WHERE name = ?)', [selectedSkinName], (error, results) => {
//         if (error) {
//             console.error('Erreur lors de la récupération de l\'ID de la relation skins/armes:', error);
//             return res.status(500).json({ success: false, error: 'Erreur lors de la récupération de l\'ID de la relation skins/armes' });
//         }
//         if (results.length === 0) {
//             console.error('ID de la relation skins/armes non trouvé pour le skin sélectionné');
//             return res.status(500).json({ success: false, error: 'ID de la relation skins/armes non trouvé pour le skin sélectionné' });
//         }
//         const relationSkinsArmesId = results[0].id;
//         console.log(results[0].id);
//         connection.query('INSERT INTO inventaire (id_skin, id_profile) VALUES (?, ?) ON DUPLICATE KEY UPDATE id_skin = VALUES(id_skin)', [relationSkinsArmesId, userId], (inventaireError, inventaireResults) => {
//             if (inventaireError) {
//                 console.error('Erreur lors de la mise à jour de la table inventaire:', inventaireError);
//                 return res.status(500).json({ success: false, error: 'Erreur lors de la mise à jour de la table inventaire' });
//             }
//             res.json({ success: true });
//         });
//     });
// });

///////////////////////////////////// SAVESKINS NOSQL////////////////////////////////////////////////////////

app.post('/saveSelectedSkin', async (req, res) => {
    try {
        const selectedSkinName = req.body.selectedSkin;
        const userId = req.session.logUser.id;

        // Récupérer l'ID de la relation skins/armes en fonction du nom du skin sélectionné
        const snapshot = await db.collection('skins').where('name', '==', selectedSkinName).get();

        if (snapshot.empty) {
            console.error('ID de la relation skins/armes non trouvé pour le skin sélectionné');
            return res.status(500).json({ success: false, error: 'ID de la relation skins/armes non trouvé pour le skin sélectionné' });
        }

        const relationSkinsArmesId = snapshot.docs[0].id;

        // Mettre à jour la collection 'inventaire' avec l'ID de la relation skins/armes et l'ID du profil
        await db.collection('inventaire').doc(userId).set(
            { id_skin: relationSkinsArmesId },
            { merge: true }
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la collection inventaire:', error);
        res.status(500).json({ success: false, error: 'Erreur lors de la mise à jour de la collection inventaire' });
    }
});



//////////////////////////////////////////// ROUTE POST /////////////////////////////////////////////////////////////////

///////////////////////////////////// USERID SQL ////////////////////////////////////////////////////////


// app.post('/UserId', (req, res) => {
//     const reqUserId = req.body.userId;
//     if (reqUserId != -1){
//         console.log("{ message: 'Id utilisateur chargé :",req.body.userId,"}");
//         connection.query('SELECT profile.* FROM profile WHERE id = ?',[reqUserId], (error, Profileresults) => {
//             if (error) {
//                 console.error('Erreur lors de la récupération des entrepôts : ' + error.message);
//                 return;
//             }
//             req.session.logUser = Profileresults[0];
//             res.redirect('/');
//         });;
//     }else{
//         console.log("{ message: 'Utilisateur deco' }");
//         req.session.logUser = undefined;
//         res.redirect('/');
//     }
// });

///////////////////////////////////// USERID NOSQL ////////////////////////////////////////////////////////

app.post('/UserId', async (req, res) => {
    const reqUserId = req.body.userId;
    try {
        if (reqUserId != -1) {
            console.log(`{ message: 'Id utilisateur chargé : ${reqUserId}' }`);
            const userDoc = await db.collection('profile').doc(reqUserId).get();

            if (!userDoc.exists) {
                console.error('Utilisateur non trouvé');
                return res.status(404).send('Utilisateur non trouvé');
            }

            req.session.logUser = userDoc.data();
            res.redirect('/');
        } else {
            console.log("{ message: 'Utilisateur deco' }");
            req.session.logUser = undefined;
            res.redirect('/');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        res.status(500).send('Erreur lors de la récupération de l\'utilisateur');
    }
});



///////////////////////////////////// REGISTER SQL ////////////////////////////////////////////////////////


// app.post('/register', async (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     const nom = req.body.nom;

//     const selectedImg = req.body.selectedImg;
//     const imageBuffer = Buffer.from(selectedImg, 'base64');
//     const fileName = `${username}_${Date.now()}.png`;
//     const filePath = `./assets/image_user/${fileName}`;

//     // Hash du mot de passe
//     const hashedPassword = await bcrypt.hash(password, 10);

//     connection.query('INSERT INTO profile (username, hashed_password, name, image, money) VALUES (?, ?, ?, ?, ?)', [username, hashedPassword, nom, fileName || null, 10000], (error, results) => {
//         if (error) {
//             console.error('Erreur lors de l\'inscription : ' + error.message);
//             return res.json({ success: false, message: 'Erreur lors de l\'inscription' });
//         }

//         fs.writeFile(filePath, imageBuffer, (writeError) => {
//             if (writeError) {
//                 console.error('Erreur lors de l\'enregistrement de l\'image : ' + writeError.message);
//                 return res.json({ success: false, message: 'Erreur lors de l\'enregistrement de l\'image' });
//             }

//             console.log('Image enregistrée avec succès sous le nom :', fileName);
//             console.log('Utilisateur inscrit avec succès. ID de l\'utilisateur :', results.insertId);
//             res.redirect('/');
//         });
        
//     }); 
// });


///////////////////////////////////// REGISTER NOSQL ////////////////////////////////////////////////////////


app.post('/register', async (req, res) => {
    try {
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

        // Insérer l'utilisateur dans la collection 'profile' avec le nom, le mot de passe haché et l'image choisie
        const userRef = await db.collection('profile').add({
            username: username,
            hashed_password: hashedPassword,
            name: nom,
            image: fileName || null,
            money: 10000,
        });

        fs.writeFile(filePath, imageBuffer, (writeError) => {
            if (writeError) {
                console.error('Erreur lors de l\'enregistrement de l\'image : ' + writeError.message);
                return res.json({ success: false, message: 'Erreur lors de l\'enregistrement de l\'image' });
            }

            console.log('Image enregistrée avec succès sous le nom :', fileName);
            console.log('Utilisateur inscrit avec succès. ID de l\'utilisateur :', userRef.id);
            res.redirect('/');
        });
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        res.status(500).json({ success: false, message: 'Erreur lors de l\'inscription' });
    }
});


///////////////////////////////////// LOGIN SQL////////////////////////////////////////////////////////


// app.post('/login', async (req, res) => {
//     const username = req.body.usernameLogin;
//     const password = req.body.passwordLogin;

//     connection.query('SELECT * FROM profile WHERE username = ?', [username], async (error, results) => {
//         if (error) {
//             console.error('Erreur lors de la récupération des informations d\'identification : ' + error.message);
//             return res.json({ success: false, message: 'Erreur lors de la connexion' });
//         }

//         if (results.length === 0) {
//             return res.json({ success: false, message: 'L\'utilisateur n\'existe pas' });
//         }

//         const hashedPassword = results[0].hashed_password;
//         const passwordMatch = await bcrypt.compare(password, hashedPassword);

//         if (passwordMatch) {
//             req.session.logUser = results[0];
//             return res.json({ success: true, message: 'Connexion réussie' });
//         } else {
//             return res.json({ success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect' });
//         }
//     });
// });


///////////////////////////////////// LOGIN NOSQL////////////////////////////////////////////////////////


app.post('/login', async (req, res) => {
    try {
        const username = req.body.usernameLogin;
        const password = req.body.passwordLogin;

        // Rechercher l'utilisateur par nom d'utilisateur
        const snapshot = await db.collection('profile').where('username', '==', username).get();

        if (snapshot.empty) {
            // L'utilisateur n'existe pas
            return res.json({ success: false, message: 'L\'utilisateur n\'existe pas' });
        }

        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();

        // Comparer le mot de passe haché
        const passwordMatch = await bcrypt.compare(password, userData.hashed_password);

        if (passwordMatch) {
            req.session.logUser = userData;
            return res.json({ success: true, message: 'Connexion réussie' });
        } else {
            // Mot de passe incorrect
            return res.json({ success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ success: false, message: 'Erreur lors de la connexion' });
    }
});


///////////////////////////////////// SEARCH SKINS SQL ////////////////////////////////////////////////////////


// app.post('/search-skins', async (req, res) => {
//     const searchTerm = req.body.searchTerm;

//     const query = "SELECT skins.name, rarity.name as rarity_name, relations_skins_armes.image, armes.name as arme_name " +
//                   "FROM relations_skins_armes " +
//                   "JOIN skins ON skins.id = relations_skins_armes.id_skin " +
//                   "JOIN rarity ON skins.id_rarity = rarity.id " +
//                   "JOIN armes ON relations_skins_armes.id_arme = armes.id " +
//                   "WHERE skins.name LIKE ?";

//     connection.query(query, [`%${searchTerm}%`], (error, results) => {
//         if (error) {
//             console.error('Erreur lors de la recherche des skins : ' + error.message);
//             return res.status(500).json({ success: false, message: 'Erreur lors de la recherche des skins' });
//         }

//         res.json({ success: true, results });
//     });
// });


///////////////////////////////////// SEARCH SKINS NOSQL ////////////////////////////////////////////////////////

app.post('/search-skins', async (req, res) => {
    try {
        const searchTerm = req.body.searchTerm.toLowerCase();

        // Requête Firestore pour la recherche par nom de skin
        const snapshot = await db.collection('skins')
            .where('name', '>=', searchTerm)
            .where('name', '<=', searchTerm + '\uf8ff')
            .get();

        const results = [];

        // Utilisez Promise.all pour traiter les opérations asynchrones en parallèle
        const promises = snapshot.docs.map(async (doc) => {
            const skinData = doc.data();
            const rarityData = await db.collection('rarity').doc(skinData.id_rarity).get();
            const armeData = await db.collection('armes').doc(skinData.id_arme).get();

            const result = {
                name: skinData.name,
                rarity_name: rarityData.data().name,
                image: skinData.image,
                arme_name: armeData.data().name
            };

            results.push(result);
        });

        await Promise.all(promises);

        // Renvoie les résultats au client
        res.json({ success: true, results });
    } catch (error) {
        console.error('Erreur lors de la recherche des skins :', error);
        res.status(500).json({ success: false, message: 'Erreur lors de la recherche des skins' });
    }
});



///////////////////////////////////// DELETE USER SQL ////////////////////////////////////////////////////////


// app.post('/deleteUser/:userId', (req, res) => {
//     if (!req.session.logUser || !req.session.logUser.isAdmin) {
//         return res.status(403).send("Accès non autorisé");
//     }

//     const userIdToDelete = req.params.userId;

//     try {
//         connection.query('DELETE FROM profile WHERE id = ?', [userIdToDelete], (error, results) => {
//             if (error) {
//                 console.error('Erreur lors de la suppression de l\'utilisateur : ' + error.message);
//                 return res.status(500).send("Erreur lors de la suppression de l'utilisateur");
//             }

//             console.log("userIdToDelete :", userIdToDelete);
//             return res.status(200).send("Utilisateur supprimé avec succès");
//         });
//     } catch (error) {
//         console.error('Erreur lors de la suppression de l\'utilisateur : ' + error.message);
//         return res.status(500).send("Erreur lors de la suppression de l'utilisateur");
//     }
// });


///////////////////////////////////// DELETE USER NOSQL ////////////////////////////////////////////////////////


app.post('/deleteUser/:userId', async (req, res) => {
    // Assurez-vous que l'utilisateur est un administrateur
    if (!req.session.logUser || !req.session.logUser.isAdmin) {
        return res.status(403).send("Accès non autorisé");
    }

    const userIdToDelete = req.params.userId;

    try {
        // Supprimer l'utilisateur de la collection 'profile'
        await db.collection('profile').doc(userIdToDelete).delete();

        // Logique de suppression réussie
        console.log("userIdToDelete :", userIdToDelete);
        return res.status(200).send("Utilisateur supprimé avec succès");
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        return res.status(500).send("Erreur lors de la suppression de l'utilisateur");
    }
});


///////////////////////////////////// ACHAT SQL ////////////////////////////////////////////////////////


// app.post('/charge', async (req, res) => {
//     try {
//         const token = req.body.token;
//         const montantEnEuros = parseFloat(req.body.montant);;

//         if (!req.session.logUser) {
//             return res.json({ success: false, message: 'Utilisateur non connecté' });
//         }

//         const userId = req.session.logUser.id;

//         let quantiteMonnaie = 0;

//         if (montantEnEuros === 5) {
//             quantiteMonnaie = 5000;
//         } else if (montantEnEuros === 10) {
//             quantiteMonnaie = 10000;
//         } else if (montantEnEuros === 20) {
//             quantiteMonnaie = 20000;
//         } else if (montantEnEuros === 50) {
//             quantiteMonnaie = 50000;
//         } else {
//         }

//         connection.query('SELECT * FROM profile WHERE id = ?', [userId], async (error, results) => {
//             if (error) {
//                 console.error('Erreur lors de la récupération de l\'utilisateur : ' + error.message);
//                 return res.json({ success: false, message: 'Erreur lors de la mise à jour de la monnaie' });
//             }

//             const user = results[0];

//             const nouveauSolde = user.money + quantiteMonnaie;

//             connection.query('UPDATE profile SET money = ? WHERE id = ?', [nouveauSolde, userId], (updateError, updateResults) => {
//                 if (updateError) {
//                     console.error('Erreur lors de la mise à jour de la monnaie : ' + updateError.message);
//                     return res.json({ success: false, message: 'Erreur lors de la mise à jour de la monnaie' });
//                 }

//                 res.json({ success: true, message: 'Paiement réussi', nouveauSolde: nouveauSolde });
//             });
//         });
//     } catch (error) {
//         console.error('Erreur de paiement :', error);
//         res.json({ success: false, message: 'Erreur de paiement - ' + error.message });
//     }
// });


///////////////////////////////////// ACHAT NOSQL ////////////////////////////////////////////////////////


app.post('/charge', async (req, res) => {
    try {
        const token = req.body.token;
        const montantEnEuros = parseFloat(req.body.montant);

        // Assurez-vous que l'utilisateur est connecté
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
            // Gérer d'autres montants si nécessaire
        }

        // Récupérer l'utilisateur actuel
        const userDoc = await db.collection('profile').doc(userId).get();
        const user = userDoc.data();

        // Calculer le nouveau solde
        const nouveauSolde = user.money + quantiteMonnaie;

        // Mettre à jour la base de données avec le nouveau solde
        await db.collection('profile').doc(userId).update({ money: nouveauSolde });

        res.json({ success: true, message: 'Paiement réussi', nouveauSolde: nouveauSolde });
    } catch (error) {
        // Gérer les erreurs
        console.error('Erreur de paiement :', error);
        res.json({ success: false, message: 'Erreur de paiement - ' + error.message });
    }
});


////////////////////////////////// MONEY SQL//////////////////////////////////////

// app.post('/UpdateMoney', (req, res) => {
//     const change = req.body.change;
//     const userId = req.session.logUser.id;
//     const userMoney = req.session.logUser.money;
//     resultMoney = userMoney + change;
//     if (resultMoney<0){
//         resultMoney = 0;
//     }
//     connection.query('UPDATE profile SET money = ? WHERE id = ?', [resultMoney, userId], (error, results) => {
//         if (error) {
//             console.error('Erreur lors de l\'update de la money dans la base de données:', error);
//             return res.status(500).json({ success: false, error: 'Erreur lors de l\'update de la money dans la base de données' });
//         }

//         console.log('User money Updated:', resultMoney);
//         req.session.logUser.money = resultMoney;
//         res.json({ success: true });
//     });
// });


////////////////////////////////// MONEY NOSQL//////////////////////////////////////


app.post('/UpdateMoney', async (req, res) => {
    try {
        const change = req.body.change;
        const userId = req.session.logUser.id;
        const userMoney = req.session.logUser.money;
        let resultMoney = userMoney + change;

        if (resultMoney < 0) {
            resultMoney = 0;
        }

        // Récupérer l'utilisateur actuel
        const userDoc = await db.collection('profile').doc(userId).get();
        const user = userDoc.data();

        // Calculer le nouveau solde
        const nouveauSolde = user.money + change;

        if (nouveauSolde < 0) {
            return res.status(400).json({ success: false, message: 'Le solde ne peut pas être négatif' });
        }

        // Mettre à jour la base de données avec le nouveau solde
        await db.collection('profile').doc(userId).update({ money: nouveauSolde });

        console.log('User money Updated:', nouveauSolde);
        req.session.logUser.money = nouveauSolde;
        res.json({ success: true });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la money dans la base de données:', error);
        return res.status(500).json({ success: false, error: 'Erreur lors de la mise à jour de la money dans la base de données' });
    }
});


/*END*/

app.listen(port, () => {
    console.log(`Serveur Express: http://localhost:${port}`);
});


