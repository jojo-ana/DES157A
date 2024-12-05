(function(){
    /* THINGS I STILL NEED TO DO:
    details???? like the border on the gamescreen ig
    animation details
    credits
    */

    "use strict";
    console.log("reading js");

    const gameData = {
        players: ['player 1', 'player 2'],
        score: [0, 0],
        index: 0,
        rounds: 1,
        currentRound: 0
    }

    const instructionBTTN = document.querySelector('#instructionScreen');
    const mainPage = document.querySelector('#mainPage');
    const mainBG = document.querySelector('#mainBG');
    const logoSection = document.querySelector('#logo');
    const instructionScreen = document.querySelector('#instructions');
    const playGame = document.querySelectorAll('#instructions div button');
    const gameScreen = document.querySelector('#gameScreen');
    const winnerScreen = document.querySelector('#winnerScreen');
    const winnerBG = document.querySelector('#winnerBG');
    const gameplaySection = document.querySelector('#gameplaySection');
    const playerDisplay = document.querySelector('#playerDisplay');
    const scoreDisplay = document.querySelector('#scoreCnt');
    const timerElement = document.querySelector('span#timerCnt');
    let currentPlayerIndex;
    // let gameStarted = false;

    /////////switching screens
    ////swtiching to instruction screen
    instructionBTTN.addEventListener('click', function(){
        instructionScreen.className = 'showing';
        instructionScreen.style.animation = 'dropDown 1s ease-out';
        mainPage.classList.add('fadeOut');
        mainBG.classList.add('fadeOut');
        setTimeout(() => {
            mainPage.className = 'hidden';
            mainBG.className = 'hidden';
        }, 1000);
        logoSection.className = 'showing';
    });

    ////switching to the gameplay screen
    playGame.forEach((button) => {
        button.addEventListener('click', (event) => {
            instructionScreen.style.animation = 'pullUp 1s ease-in';
            setTimeout(() => {
                instructionScreen.className = 'hidden';
            }, 1000);

            playBackgroundMusic();

            currentPlayerIndex = parseInt(event.target.getAttribute('data-player'), 10);
            updatePlayerDisplay();
            updateScores();
            console.log(`Player ${currentPlayerIndex + 1} selected!`);


            showSwitchText();
            setTimeout(() => {
                gameScreen.className = 'showing';

            }, 5000);

        });
    });


    /////////Game Play Screen
    ////updating player display
    function updatePlayerDisplay() {
        playerDisplay.innerHTML = `Player ${currentPlayerIndex + 1}`;
    }

    ////updating score
    function updateScores() {
        scoreDisplay.innerHTML = `${gameData.score[currentPlayerIndex]}`;
    }

    ////timer logic
    let timer = 30; //5 for demo; change to 30 for actual game
    let isSwitchingPlayer = false;

    function resetTimer() {
        timer = 30; 
        updateTimerDisplay();
    }

    function updateTimerDisplay() {
        timerElement.innerHTML = timer.toString().padStart(2, '0');
    }

    ////switching mid text
    function showSwitchText() {
        const switchTextDiv = document.querySelector('#switchText');
        switchTextDiv.className = "showing";
        let countdown = 5;
        switchTextDiv.innerHTML = `<p>Starting next Player's turn in <span id="countdown">${countdown}</span>...</p>`;
        const interval = setInterval(() => {
            countdown -= 1;
            document.querySelector('#countdown').innerHTML = countdown;
            if (countdown <= 0) {
                clearInterval(interval); //Stop the countdown
                switchTextDiv.className = "hidden";
                switchTextDiv.textContent = "";
            }
        }, 1000);

        if (gameData.currentRound >= gameData.rounds) {
            clearInterval(interval);
            switchTextDiv.innerHTML = '<p>Calculating scores...</p>';
            setTimeout(() => {
                switchTextDiv.className = "hidden";
            }, 5000);
        }
    }

    function switchPlayer() {
        if (isSwitchingPlayer) return; 
        isSwitchingPlayer = true;
        const overlay = document.createElement('div');
        overlay.classList.add('blocking-overlay');
        gameplaySection.appendChild(overlay);
        showSwitchText();       

        setTimeout(() => {
            currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0; //Switch between Player 1 (0) and Player 2 (1)
            updatePlayerDisplay();
            updateScores(); //Update score for the new player
            console.log(`Switched to Player ${currentPlayerIndex + 1}`);
            resetTimer();
            
            gameplaySection.removeChild(overlay);

            ///checking if the round is complete
            if (gameData.currentRound >= gameData.rounds) {
                determineWinner(); //Compare scores and go to the winning screen
            } else {
                gameData.currentRound++; 
            }

            isSwitchingPlayer = false;
        }, 5000); 
    }

    const countdown = setInterval(() => {
        if (!gameScreen.classList.contains('showing')) return;
        if (timer > 0) {
            timer--;
            updateTimerDisplay();
        } else {
            switchPlayer();
        }
    }, 1000);

    updateTimerDisplay();

    ////point clickables
    function createClickable() {
        if (!gameScreen.classList.contains('showing')) return;

        const pointData = {
            "1": ['leafB.png', 'leafY.png', 'leafR.png'],          
            "-1": ['leafMinus.png'],                              
            "5": ['flowerB.png', 'flowerR.png', 'flowerY.png'],   
            "-5": ['flowerB.png', 'flowerR.png', 'flowerY.png']
        };

        const pointTypes = [1, 1, 1, -1, -1, 5, 5, 5, -5];
        const points = pointTypes[Math.floor(Math.random() * pointTypes.length)];
        const imageOptions = pointData[points.toString()];
        const selectedImage = imageOptions[Math.floor(Math.random() * imageOptions.length)];
        console.log(selectedImage); 
        const clickable = document.createElement('div');
        clickable.classList.add('clickable');
        clickable.style.backgroundImage = `url('images/${selectedImage}')`;
        clickable.dataset.points = points;

        // Random position within gameplaySection
        const sectionWidth = gameplaySection.offsetWidth;
        const sectionHeight = gameplaySection.offsetHeight;
        const x = Math.random() * (sectionWidth - 100);
        const y = Math.random() * (sectionHeight - 150);
        clickable.style.left = `${x}px`;
        clickable.style.top = `${y}px`;

        clickable.addEventListener('click', () => {
            if (points > 0) {
                positiveClickSound.currentTime = 0;
                positiveClickSound.volume = 0.45; 

                positiveClickSound.play();
            } else {
                negativeClickSound.currentTime = 0;
                negativeClickSound.volume = 0.15; 
                negativeClickSound.play();
            }

            ///if points>0, then the display will show +${points}; if its a -#, then it will show ${points} ie -1
            const pointsText = points > 0 ? `+${points}` : `${points}`;
            scoreAddMinus.innerHTML = pointsText;
            scoreAddMinus.style.color = points < 0 ? '#ff1a00' : '#27fd2c'; 
            scoreAddMinus.classList.add('showing');
            setTimeout(() => scoreAddMinus.classList.remove('showing'), 500);

            gameData.score[currentPlayerIndex] += points; 
            updateScores(); 
            gameplaySection.removeChild(clickable);
        });

        gameplaySection.appendChild(clickable);

        // Remove the clickable after a few seconds if not clicked
        setTimeout(() => {
            if (gameplaySection.contains(clickable)) {
                gameplaySection.removeChild(clickable);
            }
        }, 3000);
    }

    // Game loop to create clickable objects
    function gameLoop() {
        createClickable();
        setTimeout(gameLoop, Math.random() * 1000 + 500);
    }
    gameLoop();

    ////determine winning screen
    function determineWinner() {
        gameScreen.classList.add('fadeOut');
        setTimeout(() => {
            gameScreen.className = "hidden";
        }, 1000);
        winnerScreen.className = "showing";
        winnerBG.className = "showing";
        winnerScreen.style.animation = 'dropDown 1s ease-out';
        winnerBG.style.animation = 'fadeIn 1s ease-out';

        const winnerScore = document.querySelector('#winnerScore');
        const winnerPlayer = document.querySelector('#winnerPlayer');
        const loserScore = document.querySelector('#loserScore');

        const [score1, score2] = gameData.score;
        if (score1 > score2) {
            winnerPlayer.innerHTML = "Player 1 Wins!";
            winnerScore.innerHTML = `${gameData.score[0]}`;
            loserScore.innerHTML = `Opponent's Score: ${gameData.score[1]}`;
        } else if (score2 > score1) {
            winnerPlayer.innerHTML = "Player 2 Wins!";
            winnerScore.innerHTML = `${gameData.score[1]}`;
            loserScore.innerHTML = `Opponent's Score: ${gameData.score[0]}`;
        } else {
            winnerPlayer.innerHTML = "It's a Tie!";
            winnerScore.innerHTML = `${gameData.score[1]}`
        }
    }

    ////happening in winning screen
    const playAgainBTTN = document.querySelector('#playAgain');
    playAgainBTTN.addEventListener('click', () => {
        location.reload();
    });

    //////audio
    const backgroundMusic = new Audio('audio/grhOtonoke_mixdown.wav');
    backgroundMusic.autoplay = true;  
    backgroundMusic.loop = true;    
    backgroundMusic.volume = 0.075;  

    function playBackgroundMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            console.log("Background music playing");
        }
    }

    const buttonClickSound = new Audio('audio/boink.wav');
    const positiveClickSound = new Audio('audio/point.wav');
    const negativeClickSound = new Audio('audio/pointMinus.wav');
    const bttns = document.querySelectorAll('button');

    bttns.forEach(button => {
        button.addEventListener('click', () => {
            buttonClickSound.volume = 0.25;
            buttonClickSound.currentTime = 0;
            buttonClickSound.play().catch(error => {
                console.error('Sound playback error:', error);
            });
        });
    });

})();