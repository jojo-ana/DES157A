(function(){
    "use strict";
    console.log("reading js");

    const openForm = document.querySelector('#openForm');
    const overlay = document.querySelector('#overlay');
    const closeForm = document.querySelector('#formCloseButton');
    const finishedMadLib = document.querySelector('#story');

    // code to opening the modal
    openForm.addEventListener('click', function(event){
        overlay.className = 'showing';
    });
    document.addEventListener('keydown', function(event){
        if (event.key === 'Escape') {
            overlay.className = 'hidden';
        }
    });
    closeForm.addEventListener('click', function(){
        overlay.className = 'hidden';
    });


    // code for the madlib section
    const myForm = document.querySelector('#madLibsForm');
    const submitBtn = document.querySelector('#submitBtn');
    const madLibFill = document.querySelectorAll('span');

    myForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert("shits been submitting oooooo");

        const inputWords = ['#adjective', '#activity', '#verb-ing', '#smell', '#object', '#verb2', '#clothing', '#pleasant-smell']

        for (const neededWord of inputWords) {
            const userInput = document.querySelector(neededWord);
            console.log(`Value of ${neededWord}: ${userInput.value}`)

            for (var i = 0; i < madLibFill.length; i++) {
                madLibFill[i].innerHTML = `${userInput.value}`;
            }
        }


    });

    submitBtn.addEventListener('click', function(){
        overlay.className = 'hidden';
        finishedMadLib.className = 'showing';
    });



})();