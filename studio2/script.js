(function(){
    "use strict";
    console.log('reading js');

    /////// Spotlight hover effect
    document.addEventListener('mousemove', function(event){
        const spotlight = document.getElementById('spotlight');
        const x = event.clientX;
        const y = event.clientY;
        
        spotlight.style.setProperty('--x', `${x}px`);
        spotlight.style.setProperty('--y', `${y}px`);

    });

    /////// Carousel Paired with Scroll
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const captionTexts = document.querySelectorAll('#textContainer p');
    const originalSources = [
        'images/selen1new.jpg',  
        'images/selen2new.jpg',  
        'images/selen3new.jpg',  
        'images/selen4new.jpg' 
    ];
    let rotation = 0;
    carousel.style.transition = 'transform 0.1s ease-out';

    window.addEventListener('wheel', function(event) {
        if ((rotation < 270 && event.deltaY > 0) || (rotation > 0 && event.deltaY < 0)) {
            rotation += event.deltaY * 0.05;
            if (rotation > 270) rotation = 270;
            if (rotation < 0) rotation = 0;

            for (let i = 0; i < carouselItems.length; i++) {
                const carouselItem = carouselItems[i];
                const imgElement = carouselItem.querySelector('img');
                const captionText = captionTexts[i];
                const span = captionText.querySelector('span');

                const newSpan = document.createElement('span');
                newSpan.textContent = 'Selen in'; 

                ///interactivity based on rotation which is based on scroll; affects carousel item/caption visibility
                if (i === 0 && rotation >= 0 && rotation < 90) {
                    // console.log('you in section1');
                    imgElement.src = 'images/selen1old.png';
                    toggleCarouselItemVisibility(carouselItem, captionText, true, 0);
                    if (span) {
                        captionText.removeChild(span);
                    }
                } else if (i === 1 && rotation >= 90 && rotation < 180) {
                    // console.log('you in section2');
                    imgElement.src = 'images/selen2old.png';
                    toggleCarouselItemVisibility(carouselItem, captionText, true, 1);
                    if (span) {
                        captionText.removeChild(span); 
                    }                  
                } else if (i === 2 && rotation >= 180 && rotation < 270) {
                    // console.log('you in section3');
                    imgElement.src = 'images/selen3old.png';
                    toggleCarouselItemVisibility(carouselItem, captionText, true, 2);
                    if (span) {
                        captionText.removeChild(span); 
                    }
                } else if (i === 3 && rotation >= 270 && rotation < 360) {
                    // console.log('you in section4');
                    imgElement.src = 'images/selen4old.png';
                    toggleCarouselItemVisibility(carouselItem, captionText, true, 3);
                    if (span) {
                        captionText.removeChild(span); 
                    }
                } else {
                    imgElement.src = originalSources[i];
                    toggleCarouselItemVisibility(carouselItem, captionText, false, 4);

                    if (!span) {
                        insertSpanAfterComma(captionText, newSpan);
                    }
                }

                ///inserting a span when img is hovered, as if it's always been there
                imgElement.addEventListener('mouseover', function () {
                    // console.log('HOVERING GRAH');
                    const span = captionText.querySelector('span');
                        if (!span) {
                            const newSpan = document.createElement('span');
                            newSpan.textContent = 'Selen in';
                            insertSpanAfterComma(captionText, newSpan);
                        }
                });

                imgElement.addEventListener('mouseout', function () {
                    // console.log('GOING OFF');
                    const span = captionText.querySelector('span');
                    if (span) {
                        captionText.removeChild(span);
                    }
                });
            }
            
            function updateRotation() {
                carousel.style.transform = `rotate(-${rotation}deg)`;
            }
            window.requestAnimationFrame(updateRotation);
        }
    });
    
    ////functions to make the scroll effect work
    function toggleCarouselItemVisibility(carouselItem, captionText, showOnScreen, index) {
        if (showOnScreen) {
            carouselItem.classList.add('onscreen');
            carouselItem.classList.remove('offscreen');
            captionText.classList.add('onscreen');
            captionText.classList.remove('offscreen');

        } else {
            carouselItem.classList.add('offscreen');
            carouselItem.classList.remove('onscreen');
            captionText.classList.add('offscreen');
            captionText.classList.remove('onscreen');
        }
    }

    function insertSpanAfterComma(captionText, newSpan) {
        const pContent = captionText.innerHTML;
        const commaIndex = pContent.indexOf(',');
        if (commaIndex !== -1) {
            const beforeComma = pContent.slice(0, commaIndex + 1);
            const afterComma = pContent.slice(commaIndex + 1);
            captionText.innerHTML = beforeComma + ' ' + newSpan.outerHTML + afterComma;
        }
    }

    /////// Ghost Effect randomization
    const ghostTexts = document.querySelectorAll('span');

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function triggerFlicker() {
        for (let i = 0; i < ghostTexts.length; i++) {
            const ghostText = ghostTexts[i];

            const randomFlickers = getRandomInt(3, 5);

            ghostText.style.animation = `flicker 0.5s ease-in-out ${randomFlickers} infinite`;
            ghostText.classList.add('flicker');

            setTimeout(() => {
                ghostText.classList.remove('flicker');
            }, 0.5 * randomFlickers * 1000); 
        }
    }
    setInterval(triggerFlicker, getRandomInt(4, 5) * 1000);
})();