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
        return 1 - Math.pow(1 - t, 6); 
    }
    document.getElementsByClassName
    function spinWheel(timestamp) {
        if (!animationStartTime) {
            animationStartTime = timestamp;
        }
        
        const progress = timestamp - animationStartTime;
        const duration = 9000; 
        
        if (progress < duration && isAnimating) {
            let scrollDistance;
            
            if (duration - progress <= 5000 && !slowdownStarted) {
                slowdownStarted = true;
                const remainingTime = duration - progress;
                const easing = easeOutSlow(1 - remainingTime / 5000); 
                scrollDistance = (progress / duration) * 2890 - 500 * easing;
            } else {
                scrollDistance = (progress / duration) * 2890;
            }
            
            wheel.style.transform = `translateX(-${scrollDistance}px)`;
            
            const cursorPosition = wheelContainer.offsetLeft + (wheel.offsetWidth / 2);
            cursor.style.left = `${cursorPosition}px`;
            
            requestAnimationFrame(spinWheel);
        } else {
            animationStartTime = null;
            isAnimating = false;
            slowdownStarted = false;
            displayResultUnderCursor();
            
            if (winningSliceIndex !== -1) {
                timer = setTimeout(function () {
                    const button_loterie = document.getElementById('button_loterie');
                    const resultContainer = document.getElementById('result');
                    const resultContainers = document.getElementById('results');
                    
                    wheelContainer.style.display = "none";
                    button_loterie.style.display = "none";
                    
                    const arme_name = winningSliceDiv.getAttribute("arme_name");
                    const skin_name = winningSliceDiv.getAttribute("skin_name");

                    resultContainer.style.display = "flex";
                    resultContainers.innerHTML = `Vous avez gagné avec le skin ${skin_name} sur la ${arme_name}`;
                    skin
                    
                    const container_skin = document.getElementById("container_skin_in_loterie");
                    winningSliceDiv.classList.remove(...winningSliceDiv.classList);
                    container_skin.appendChild(winningSliceDiv);
                    winningSliceDiv.classList.add("container_skin");
                    

                    const p_skinName = document.createElement("p");
                    p_skinName.innerHTML = skin_name;

                    const p_armeName = document.createElement("p");
                    p_armeName.innerHTML = arme_name;

                    p_armeName.setAttribute("id", "arme_name");
                    p_skinName.setAttribute("id", "skin_name");

                    winningSliceDiv.appendChild(p_skinName);
                    winningSliceDiv.appendChild(p_armeName);

                }, 1000);
            }
        }
    }
    
    function startAnimation() {
        startAchat();
        resetWinningSliceIndex();
        
        wheelContainer.style.display = "flex";
        pack.style.display = "none";
        wheel.style.transform = 'translateX(0)';
        button_loterie.style.display = "none";
        
        isAnimating = true;
        requestAnimationFrame(spinWheel);
    }
    
    
    function displayResultUnderCursor() {
        const cursorRect = cursor.getBoundingClientRect();
        const slices = document.querySelectorAll('.wheel-slice');

        slices.forEach((slice, index) => {
            const sliceRect = slice.getBoundingClientRect();

            if (
                cursorRect.left >= sliceRect.left &&
                cursorRect.right <= sliceRect.right &&
                cursorRect.top >= sliceRect.top &&
                cursorRect.bottom <= sliceRect.bottom
            ) {
                winningSliceIndex = index;
                winningSliceDiv = slice;
                saveSelectedSkin();
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