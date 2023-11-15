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
    
window.onload = function () {
    
};