async function choixUser(element) {

    const userId = element.getAttribute('id-user');
        
    await fetch('/UserId', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    })
    window.location.href = "/";
}

async function decoProfile() {
        
    await fetch('/UserId', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: -1 }),
    })
    window.location.reload();
}


///////////////////////////////////// LOGIN POST ////////////////////////////////////////////////////////


document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton');
    const loginPopup = document.getElementById('loginPopup');
    const closePopup = document.getElementById('closePopup');
    const closepopup = document.getElementById('closepopup');
    const inscription = document.getElementById('inscription');

    loginButton.addEventListener('click', function () {
        loginPopup.style.display = 'block';
    });

    closePopup.addEventListener('click', function () {
        loginPopup.style.display = 'none';
    });

    closepopup.addEventListener('click', function () {
        inscription.style.display = 'none';
    });

    // Ajoutez un événement pour gérer la soumission du formulaire de connexion
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Récupérez les valeurs du formulaire et envoyez-les au serveur via une requête AJAX
        const usernameLogin = document.getElementById('usernameLogin').value;
        const passwordLogin = document.getElementById('passwordLogin').value;

        // Utilisez fetch ou XMLHttpRequest pour envoyer les informations de connexion au serveur
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usernameLogin, passwordLogin }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Réponse du serveur :', data);
        
            // Gérez la réponse du serveur ici
            if (data.success) {
                loginPopup.style.display = 'none';
                window.location.reload();
            } else {
                alert('La connexion a échoué. Veuillez réessayer.');
            }
        })        
        .catch(error => {
            console.error('Erreur lors de la demande de connexion:', error);
        });


    });
});


///////////////////////////////////// SEARCH SKINS ////////////////////////////////////////////////////////


document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchResultsContainer = document.getElementById('searchResults');
    const allSkinsContainer = document.querySelector('.for_skins');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTerm = document.querySelector('input[name="searchTerm"]').value;

        // Effectuez une requête AJAX pour obtenir les résultats de la recherche
        fetch('/search-skins', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ searchTerm }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Affichez les résultats dans la liste
                displaySearchResults(data.results);
            } else {
                console.error('Erreur lors de la recherche : ' + data.message);
            }
        })
        .catch(error => {
            console.error('Erreur lors de la recherche : ' + error.message);
        });
    });

    function displaySearchResults(results) {
        // Effacez les résultats précédents
        searchResultsContainer.innerHTML = '';

        // Ajoutez les nouveaux résultats à la liste
        results.forEach(result => {
            const listItem = document.createElement('li');
            listItem.textContent = `${result.name} (${result.rarity_name}) - ${result.arme_name}`;
            searchResultsContainer.appendChild(listItem);
        });
    }

    // Ajoutez un gestionnaire d'événements pour mettre à jour les résultats en temps réel lors de la saisie
    document.querySelector('input[name="searchTerm"]').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const allSkins = allSkinsContainer.querySelectorAll('.container_skin');

        // Parcourez tous les skins et affichez ceux qui correspondent à la recherche
        allSkins.forEach(skin => {
            const skinName = skin.querySelector("#skin_name").textContent.toLowerCase();
            if (skinName.includes(searchTerm)) {
                skin.style.display = 'block';
            } else {
                skin.style.display = 'none';
            }
        });
    });
});


///////////////////////////////////// ADMIN ////////////////////////////////////////////////////////


function isAdmin(req, res, next) {
    if (req.session.logUser && req.session.logUser.isAdmin) {
        return next(); // Autorisé
    } else {
        res.redirect('/'); // Rediriger vers la page d'accueil ou une page d'erreur
    }
}

function afficherBoutonSupprimer(element) {
    // Ajoutez une classe CSS pour afficher le bouton "Supprimer"
    element.querySelector('.btn-supprimer').classList.add('visible');
}

function cacherBoutonSupprimer(element) {
    // Supprimez la classe CSS pour cacher le bouton "Supprimer"
    element.querySelector('.btn-supprimer').classList.remove('visible');
}

document.addEventListener('DOMContentLoaded', function () {
    const userContainers = document.getElementById('.user-container');

    userContainers.forEach(container => {
        const userId = container.getAttribute('id-user');

        container.querySelector('.btn-supprimer').addEventListener('click', async function () {
            const confirmation = window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?");

            if (confirmation) {
                await supprimerUtilisateur(userId);
            }
        });
    });
});


async function supprimerUtilisateur(userId) {
    try {
        const response = await fetch(`/deleteUser/${userId}`, { method: 'POST' });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const result = await response.text();
        console.log(result);
        window.location.reload(); // Recharge la page après la suppression
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur : ' + error.message);
        // Gérer l'erreur ici (afficher un message à l'utilisateur, etc.)
    }
}

function AdminAjoutMoney(){
    fetch('/UpdateMoney', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ change : 5000 }),
    })
    window.location.reload();
}


/////////////////////////////// GERER LE PRIX DU PACK AVEC LE SERV /////////////////////////////////////////

async function startAchat() {
    const pricepack = -JSON.parse(document.getElementById("prixData").getAttribute("prixData"));
    await fetch('/UpdateMoney', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ change : pricepack }),
    })
    // const moneyDisplay = document.getElementById("money-display");
    // moneyDisplay.innerHTML += pricepack;
}

async function saveSelectedSkin() {
    const skinName = winningSliceDiv.getAttribute("skin_name");

    await fetch('/saveSelectedSkin', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedSkin: skinName }),
    });
}

// Appel de l'API pour récupérer l'inventaire de l'utilisateur
async function getUserInventory() {
    const response = await fetch('/inventaire');
    const data = await response.json();

    if (data.success) {
        const inventory = data.inventory;

        // Afficher les skins dans votre interface utilisateur
        inventory.forEach((item) => {
            const skinName = item.name;
            const skinImage = item.image;

            // Faites quelque chose avec le nom et l'image du skin (par exemple, l'afficher dans une liste)
            console.log(`Nom du skin : ${skinName}, Image du skin : ${skinImage}`);
        });
    } else {
        console.error('Erreur lors de la récupération de l\'inventaire de l\'utilisateur');
    }
}





window.onload = function () {
    getUserInventory();
};