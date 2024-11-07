(function(){
    "use strict";
    document.addEventListener('mousemove', function(event){
        const spotlight = document.getElementById('spotlight');
        const x = event.clientX;
        const y = event.clientY;
        
        // Update CSS variables for the spotlight's position
        spotlight.style.setProperty('--x', `${x}px`);
        spotlight.style.setProperty('--y', `${y}px`);

    });


})();