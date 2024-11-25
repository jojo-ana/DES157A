(function(){
    "use strict";
    console.log("reading js");


    /////// switching to instruction screen
    const instructionBTTN = document.querySelector('#instructionScreen');
    const mainPage = document.querySelector('#mainPage');
    const mainBG = document.querySelector('#mainBG');
    const logoSection = document.querySelector('#logo');
    const instructionScreen = document.querySelector('#instructions');

    instructionBTTN.addEventListener('click', function(){
        ///hide main page and main BG
        mainPage.className = 'hidden';
        mainBG.className = 'hidden';
        ///show logo and instruction
        logoSection.className = 'showing';
        instructionScreen.className = 'showing';
    });

    /////// switching to gameplay screen
    const playGame = document.querySelectorAll('#instructions div button');
    const gameScreen = document.querySelector('#gameScreen');

    playGame.forEach((button) => {
        button.addEventListener('click', () => {
            ///hide the instructions and show the game screen
            instructionScreen.className = 'hidden';
            gameScreen.className = 'showing';
        });
    });

    /////// after winning, switch to winner screen
    const handleWin = () => {
        gameScreen.className = "hidden";
        winnerScreen.className = "showing";
    };

    if (!gameScreen.classList.contains("hidden")) {
        setTimeout(handleWin, 5000); ///only for demo purposes
    }

    const playAgainBTTN = document.querySelector('#playAgain').addEventListener('click', () => {
        location.reload();
    });

    ////////// gameplay code
    


})();