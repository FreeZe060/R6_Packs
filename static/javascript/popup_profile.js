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
    const selectedImageContainer = document.getElementById('selected-image');
    const imageScrollContainer = document.getElementById('image-scroll');

    selectedImageContainer.innerHTML = '';

    const selectedImgInput = document.getElementById('selectedImg');
    const selectedImgFile = selectedImgInput.files[0];

    if (selectedImgFile) {
        const selectedImgURL = URL.createObjectURL(selectedImgFile);

        const selectedImg = document.createElement('img');
        selectedImg.src = selectedImgURL;
        selectedImageContainer.appendChild(selectedImg);

        const scrollImage = document.createElement('img');
        scrollImage.src = selectedImgURL;
        scrollImage.onclick = () => {
            selectedImageContainer.innerHTML = '';
            selectedImageContainer.appendChild(scrollImage);
        };
        imageScrollContainer.appendChild(scrollImage);

        const formData = new FormData();
        formData.append('profileImage', selectedImgFile);

        fetch('/assets/image_user', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
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
    const inscriptionPopup = document.getElementById("inscription");
    const log = document.getElementById("loginPopup");
    inscriptionPopup.style.display = "flex";
    log.style.display = "none";

}

function alerts() {   
    alert("Vous n'avez pas assez d'argent !"); 
}

function Popup2() {
    const inscriptionPopup = document.getElementById("inscription");
    inscriptionPopup.style.display = "flex";
}