document.addEventListener('DOMContentLoaded', function () {
    var imgHover = document.getElementById('profile-container');
    var popup = document.getElementById('popup');
    var timer;

    imgHover.addEventListener('mouseenter', function () {
        clearTimeout(timer); 
        popup.style.display = 'flex';
    });

    imgHover.addEventListener('mouseleave', function () {
        timer = setTimeout(function () {
            popup.style.display = 'none';
        }, 1000);
    });
    
    popup.addEventListener('mouseenter', function () {
        clearTimeout(timer);
    });
    
    popup.addEventListener('mouseleave', function () {
        popup.style.display = 'none';
    });
    
});

function previewImage() {
    // Récupérer les éléments HTML nécessaires
    const selectedImageContainer = document.getElementById('selected-image');
    const imageScrollContainer = document.getElementById('image-scroll');

    // Réinitialiser l'image sélectionnée
    selectedImageContainer.innerHTML = '';

    // Récupérer le fichier d'image sélectionné par l'utilisateur
    const selectedImgInput = document.getElementById('selectedImg');
    const selectedImgFile = selectedImgInput.files[0];

    // Vérifier s'il y a un fichier sélectionné
    if (selectedImgFile) {
        // Créer une URL objet pour l'image sélectionnée
        const selectedImgURL = URL.createObjectURL(selectedImgFile);

        // Afficher l'image sélectionnée dans la popup
        const selectedImg = document.createElement('img');
        selectedImg.src = selectedImgURL;
        selectedImageContainer.appendChild(selectedImg);

        // Ajouter l'image sélectionnée à la barre de défilement (miniature)
        const scrollImage = document.createElement('img');
        scrollImage.src = selectedImgURL;
        scrollImage.onclick = () => {
            // Mettre à jour l'image principale lorsqu'on clique sur une miniature
            selectedImageContainer.innerHTML = '';
            selectedImageContainer.appendChild(scrollImage);
        };
        imageScrollContainer.appendChild(scrollImage);

        // Stocker l'image sur le serveur (vous devez ajouter cette partie selon votre backend)
        // Exemple fictif de requête AJAX pour envoyer l'image au serveur
        const formData = new FormData();
        formData.append('profileImage', selectedImgFile);

        fetch('/assets/image_user', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Traiter la réponse du serveur (par exemple, mettre à jour la photo de profil dans la base de données)
            console.log('Image stockée avec succès', data);
            selectedImg.src = data.url;
        })
        .catch(error => {
            console.error('Erreur lors du stockage de l\'image', error);
        });
    } else {
        console.error('Aucune image sélectionnée.');
    }
}


function popUp() {
    const inscriptionPopup = document.getElementById("inscription"); // Modifié pour correspondre à votre ID
    const log = document.getElementById("loginPopup");
    inscriptionPopup.style.display = "flex";
    log.style.display = "none";

}

function Popup2() {
    const inscriptionPopup = document.getElementById("inscription"); // Modifié pour correspondre à votre ID
    inscriptionPopup.style.display = "flex";
}