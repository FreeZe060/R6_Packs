document.addEventListener('DOMContentLoaded', function () {
    var imgHover = document.getElementById('profile-container');
    var popup = document.getElementById('popup');
    var timer;
    const sign = document.getElementById("inscription");

    if (!sign) {
        console.error("L'élément avec l'ID 'inscription' n'a pas été trouvé.");
    }

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
    
    document.addEventListener('click', function(event) {
        // Vérifiez si la cible du clic n'est pas à l'intérieur de la popup
        if (sign && !sign.contains(event.target)) {
            console.log("oui");
            sign.style.display = "none";
        }
    });
});


function previewImage() {
    const selectedImageContainer = document.getElementById('selected-image');
    const imageScrollContainer = document.getElementById('image-scroll');

    // Réinitialiser l'image sélectionnée
    selectedImageContainer.innerHTML = '';

    // Afficher l'image sélectionnée
    const selectedImgInput = document.getElementById('selectedImg');
    const selectedImg = document.createElement('img');
    selectedImg.src = URL.createObjectURL(selectedImgInput.files[0]);
    selectedImageContainer.appendChild(selectedImg);

    // Ajouter l'image sélectionnée à la barre de défilement
    const scrollImage = document.createElement('img');
    scrollImage.src = URL.createObjectURL(selectedImgInput.files[0]);
    scrollImage.onclick = () => {
        // Mettre à jour l'image sélectionnée lorsqu'on clique sur une miniature
        selectedImageContainer.innerHTML = '';
        selectedImageContainer.appendChild(scrollImage);
    };
    imageScrollContainer.appendChild(scrollImage);
}

function popUp() {
    const inscriptionPopup = document.getElementById("inscription"); // Modifié pour correspondre à votre ID
    const log = document.getElementById("loginPopup");
    inscriptionPopup.style.display = "flex";
    log.style.display = "none";

}