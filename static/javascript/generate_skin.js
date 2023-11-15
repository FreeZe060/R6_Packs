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
        
function generateSkinList(dropsData, totalSkins) {
    // Initialisation de la liste des skins
    let skinList = [];
    
    // Calcul de la somme totale des pourcentages
    const totalPercentage = dropsData.reduce((acc, drop) => acc + drop.droprate/100, 0);
    // if (totalPercentage != 1){
    //     throw new Error("Pourcentage must be 100 percent");
    // }
    
    // Calcul du nombre d'éléments à générer pour chaque skin ("skin4:74")
    const skinCounts = Object.fromEntries(dropsData.map(item => [item.name, Math.round((item.droprate / totalPercentage) * totalSkins)]));
    
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

window.onload = function () {
    const dropsData = JSON.parse(document.getElementById("dropsData").getAttribute("dropsData"));
    console.log(dropsData);
    const totalPercentage = dropsData.reduce((acc, drop) => acc + drop.droprate, 0);
    console.log(totalPercentage);
    const minDroprate = Math.min(...dropsData.map(item => item.droprate));
    console.log(minDroprate);
    let totalSkins = 1;
    console.log(totalSkins);
    while (dropsData.some(item => Math.round((item.droprate / minDroprate) * totalSkins) < 1)) {
        totalSkins *= 2;
    }
    const skinCounts = Object.fromEntries(dropsData.map(item => [item.name, Math.round((item.droprate / minDroprate) * totalSkins)]));
    console.log(skinCounts);

    console.log(generateSkinList(dropsData))

};