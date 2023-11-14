async function choixUser(element) {

    const userId = element.getAttribute('id-user');

    // fetch(`/UserId?userId=${userId}`, { method: 'POST'})
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data); // Vous pouvez gérer la réponse du serveur ici
    //     })
    //     .catch(error => {
    //         console.error('Erreur lors de la communication avec le serveur:', error);
    // });
        
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
        
function showpop_profile(){
    const pop_profile = document.getElementById('pop-profile');
}
        
        
function openCase() {
    
    // Exemple d'utilisation
    const dropRates = {
        "skin1": 0.01,
        "skin2": 0.15,
        "skin3": 0.10,
        "skin4": 0.74
    };
    
    const totalSkinsToGenerate = 100;
    const generatedSkins = generateSkinList(dropRates, totalSkinsToGenerate);
    
    console.log(generatedSkins);
    console.log(count_element(generatedSkins, "skin4"));
    
    const randomIndex = Math.floor(Math.random() * totalSkinsToGenerate);
    
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = 'Congratulations! You got something awesome! U got ' + generatedSkins[randomIndex]; ;
}
        
function generateSkinList(dropRates, totalSkins) {
    // Initialisation de la liste des skins
    let skinList = [];
    
    // Calcul de la somme totale des pourcentages
    const totalPercentage = Object.values(dropRates).reduce((acc, rate) => acc + rate, 0);
    if (totalPercentage != 1){
        throw new Error("Pourcentage must be 100 percent");
    }
    
    // Calcul du nombre d'éléments à générer pour chaque skin ("skin4:74")
    const skinCounts = Object.fromEntries(Object.entries(dropRates).map(([skin, rate]) => [skin, Math.round((rate / totalPercentage) * totalSkins)]));
    
    // Correction du nombre d'éléments pour s'assurer que le total est exactement égal à totalSkins
    const diff = totalSkins - Object.values(skinCounts).reduce((acc, count) => acc + count, 0);
    if (diff !== 0) {
        // Ajouter ou retirer la différence à un skin (le premier trouvé)
        for (let skin in skinCounts) {
            skinCounts[skin] += diff;
            break;
        }
    }
    
    // Génération de la liste finale
    for (let skin in skinCounts) {
        for (let i = 0; i < skinCounts[skin]; i++) {
            skinList.push(skin);
        }
    }
    
    // Mélanger la liste pour plus d'aléatoire
    skinList.sort(() => Math.random() - 0.5);
    
    return skinList;
}
        
        
function count_element(liste, element){
    
    count=0;
    for (let i in liste) {
        if (liste[i] == element){
            count++;
        }
    }
    return count;
}
        
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
        
window.onload = function () {
    
};