const wheelContainer = document.getElementById('wheel-container');
        const pack = document.getElementById('open_packs');
        const wheel = document.getElementById('wheel');
        const cursor = document.querySelector('.cursor');
        const slices = document.querySelectorAll('.wheel-slice');

        let animationStartTime = null;
        let isAnimating = false;
        let slowdownStarted = false;
        let winningSliceIndex = -1;

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
                    scrollDistance = (progress / duration) * 2962 - 500 * easing;
                } else {
                    scrollDistance = (progress / duration) * 2962;
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
                        console.log("oui");
                        const resultContainer = document.getElementById('result');
                        const resultContainers = document.getElementById('results');
                        resultContainer.style.display = "flex";
                        resultContainers.innerHTML = `Vous avez gagné avec la div ${winningSliceIndex + 1}`;
                        wheelContainer.style.display = "none";
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

            // Active l'animation
            isAnimating = true;
            requestAnimationFrame(spinWheel);
        }


        function displayResultUnderCursor() {
            const cursorRect = cursor.getBoundingClientRect();

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
                }
            });
        }

        function resetWinningSliceIndex() {
            winningSliceIndex = -1;
        }

        function buttonresult() {
            const resultContainer = document.getElementById('result');
            wheelContainer.style.display = "none";
            resultContainer.style.display = "none";
            pack.style.display = "flex";
        }