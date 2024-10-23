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
    const inputIds = ['adjective', 'activity', 'verb-ing', 'plural-noun', 'verb', 'smell', 'object', 'clothing', 'pleasant-smell'];
    const madLibFill = document.querySelectorAll('span');

    myForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        let hasError = false; 
        let errorMessage = document.querySelector('#errorMessage');
        
        errorMessage.innerHTML = '';

        //loops through the inputs: making sure the text box is filled and updating spans (in order) 
        for (let i = 0; i < madLibFill.length; i++) {
            const inputId = inputIds[i];
            const inputElement = document.querySelector(`#${inputId}`);
            const inputValue = inputElement.value;

            if (!inputValue) {
                let myText = `<p>Please provide ${inputId.replace('-', ' ')}</p>`;
                inputElement.focus();
                errorMessage.innerHTML = myText; 
                hasError = true;
                break; //stops it at the curent loop count
            } else {
                madLibFill[i].innerHTML = inputValue;
                // console.log(`reading: ${inputValue}`);
            }
        }

        //if theres no errors in the loop, hides overlay, shows finished product, + clears input
        if (!hasError) {
            overlay.className = 'hidden';
            finishedMadLib.className = 'showing';

            for (let i = 0; i < inputIds.length; i++) {
                document.querySelector(`#${inputIds[i]}`).value = '';
            }
        }
    });



})();