function openCase() {
    
    
    const totalSkinsToGenerate = 100;
    const generatedSkins = generateSkinList(dropRates, totalSkinsToGenerate);
    
    console.log(generatedSkins);
    console.log(count_element(generatedSkins, "skin4"));
    
    const randomIndex = Math.floor(Math.random() * totalSkinsToGenerate);
    
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = 'Congratulations! You got something awesome! U got ' + generatedSkins[randomIndex]; ;
}
        
function generateSkinList(dropsData) {
    // Initialisation de la liste des skins
    let skinList = [];
    
    // Calcul de la somme totale des pourcentages
    const totalPercentage = dropsData.reduce((acc, drop) => acc + drop.droprate, 0);
    if (totalPercentage != 1){
        throw new Error("Pourcentage must be 100 percent  (" + totalPercentage + ")");
    }
    
    // Calcul du nombre d'éléments à générer pour chaque skin ("skin4:74")
    const minDroprate = Math.min(...dropsData.map(item => item.droprate));
    let totalSkins = 1;
    while (dropsData.some(item => Math.round((item.droprate / minDroprate) * totalSkins) < 1)) {
        totalSkins *= 2;
        console.log(totalSkins)
    }
    const skinCounts = {};
    index = 0;
    dropsData.forEach(item => {
        skinCounts[index] = Math.round((item.droprate / minDroprate) * totalSkins);
        index++;
    });
    console.log(skinCounts);
    
    // // Correction du nombre d'éléments pour s'assurer que le total est exactement égal à totalSkins
    // const diff = totalSkins - Object.values(skinCounts).reduce((acc, count) => acc + count, 0);
    // if (diff !== 0) {
    //     // Ajouter ou retirer la différence à un skin (le premier trouvé)
    //     for (let skin in skinCounts) {
    //         skinCounts[skin] += diff;
    //         break;
    //     }
    // }
    
    // Génération de la liste finale
    for (let [index,nbr] in skinCounts) {
        for (let i = 0; i < skinCounts[index]; i++) {
            skinList.push(index);
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

window.onload = function () {
    const dropsData = JSON.parse(document.getElementById("dropsData").getAttribute("dropsData"));

    ListeSkins = generateSkinList(dropsData);
    console.log(ListeSkins);

    const divSkins = document.getElementById("wheel")

    ListeSkins.forEach(function(index) {
        var divContainer = document.createElement("div");
        divContainer.className = "wheel-slice";
        
        skin = dropsData[index]

        if (skin.rarity_name == "LEGENDARY"){
            divContainer.style.boxShadow = '0 0px 10px 0px orange';
            divContainer.style.borderColor = 'orange'
        } else if (skin.rarity_name == "EPIC"){
            divContainer.style.boxShadow = 'inset 0 0px 0px 0px blueviolet';
            divContainer.style.borderColor = 'blueviolet'
        } else if (skin.rarity_name == "RARE"){
            divContainer.style.boxShadow = 'inset 0 0px 0px 0px rgb(87, 213, 255)';
            divContainer.style.borderColor = 'rgb(87, 213, 255)'
        } else if (skin.rarity_name == "UNCOMMON"){
            divContainer.style.boxShadow = 'inset 0 0px 0px 0px rgb(113, 255, 113)';
            divContainer.style.borderColor = 'rgb(113, 255, 113)'
        } else if (skin.rarity_name == "COMMON"){
            divContainer.style.boxShadow = 'inset 0 0px 0px 0px gray';
            divContainer.style.borderColor = 'gray' 
        }

        var imgSkin = document.createElement("img");
        imgSkin.className = "img_skin";
        imgSkin.src = "/SkinR6/" + skin.arme_name + "/"+ skin.image;
        imgSkin.alt = skin.name;

        divContainer.appendChild(imgSkin);
        divSkins.appendChild(divContainer);


    });

};