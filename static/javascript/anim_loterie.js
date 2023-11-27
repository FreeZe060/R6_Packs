    const wheelContainer = document.getElementById('wheel-container');
    const pack = document.getElementById('open_packs');
    const cursor = document.querySelector('.cursor');
    const wheel = document.getElementById('wheel');
    
    let animationStartTime = null;
    let isAnimating = false;
    let slowdownStarted = false;
    let winningSliceIndex = -1;
    let winningSliceDiv = null;
    
    function print(liste){
        console.log(liste);
    }
    
    function easeOutSlow(t) {
        return 1 - Math.pow(1 - t, 6); // Ajustez le facteur d'accélération ici
    }
    
    function spinWheel(timestamp) {
        if (!animationStartTime) {
            animationStartTime = timestamp;
        }
        
        const progress = timestamp - animationStartTime;
        const duration = 9000; // Durée totale de l'animation en millisecondes
        
        if (progress < duration && isAnimating) {
            // Défilement fluide avec ralentissement progressif
            let scrollDistance;
            
            if (duration - progress <= 5000 && !slowdownStarted) {
                // Ralentissement progressif avec une fonction d'accélération
                slowdownStarted = true;
                const remainingTime = duration - progress;
                const easing = easeOutSlow(1 - remainingTime / 5000); // Ajustez la fonction d'accélération si nécessaire
                scrollDistance = (progress / duration) * 2890 - 500 * easing;
            } else {
                scrollDistance = (progress / duration) * 2890;
            }
            
            // Met à jour la position de la roue
            wheel.style.transform = `translateX(-${scrollDistance}px)`;
            
            // Positionne le curseur au milieu de la roue
            const cursorPosition = wheelContainer.offsetLeft + (wheel.offsetWidth / 2);
            cursor.style.left = `${cursorPosition}px`;
            
            // Continue l'animation
            requestAnimationFrame(spinWheel);
        } else {
            // Animation terminée, réinitialise les variables
            animationStartTime = null;
            isAnimating = false;
            slowdownStarted = false;
            displayResultUnderCursor();
            
            if (winningSliceIndex !== -1) {
                timer = setTimeout(function () {
                    const button_loterie = document.getElementById('button_loterie');
                    const resultContainer = document.getElementById('result');
                    const resultContainers = document.getElementById('results');
                    arme_name = winningSliceDiv.getAttribute("arme_name");
                    skin_name = winningSliceDiv.getAttribute("skin_name");
                    // skin_image = winningSliceDiv.getAttribute("skin_image");

                    resultContainer.style.display = "flex";
                    resultContainers.innerHTML = `Vous avez gagné avec le skin ${skin_name} sur la ${arme_name}`;
                    skin

                    const container_skin = document.createElement("div");
                    container_skin.classList.add("container_skin");
                    container_skin.appendChild(winningSliceDiv);
                    resultContainer.appendChild(container_skin);




                    wheelContainer.style.display = "none";
                    button_loterie.style.display = "none";
                }, 1000);
            }
            // Affiche le résultat sous le curseur
        }
    }
    
    function startAnimation() {
        // Réinitialise la variable de l'index de la slice gagnante
        resetWinningSliceIndex();
        
        wheelContainer.style.display = "flex";
        pack.style.display = "none";
        // Réinitialise la position de la roue
        wheel.style.transform = 'translateX(0)';
        button_loterie.style.display = "none";
        
        // Active l'animation
        isAnimating = true;
        requestAnimationFrame(spinWheel);
    }
    
    
    function displayResultUnderCursor() {
        const cursorRect = cursor.getBoundingClientRect();
        const slices = document.querySelectorAll('.wheel-slice');

        // Parcourez les slices pour trouver celle sous le curseur
        slices.forEach((slice, index) => {
            const sliceRect = slice.getBoundingClientRect();

            if (
                cursorRect.left >= sliceRect.left &&
                cursorRect.right <= sliceRect.right &&
                cursorRect.top >= sliceRect.top &&
                cursorRect.bottom <= sliceRect.bottom
            ) {
                // Stockez l'index de la slice sous le curseur
                winningSliceIndex = index;
                winningSliceDiv = slice;
            }
        });
    }

    function resetWinningSliceIndex() {
        winningSliceIndex = -1;
    }

    function buttonresult() {
        const resultContainer = document.getElementById('result');
        const button_loterie = document.getElementById('button_loterie');
        wheelContainer.style.display = "none";
        resultContainer.style.display = "none";
        pack.style.display = "flex";
        button_loterie.style.display = "flex";
    }