/*************
 * Variables *
 *************/

const TERMS = ["ALLAN", "MARIE", 'ATTILA', 'EMILY']
let word = null;
let guessedWord = "";
let triedLetters = "";
let guessesLeft = null;
let typing = true;
let losses = 0;
let wins = 0;
const sound = new Audio();

/************************************************************************
 * This resets the word, blanks amount, and amount of allowable guesses *
*************************************************************************/

let reset = function(){
    //when we are done this is pulled from an array but right now we are just using marie
    word = TERMS[Math.floor(Math.random()*TERMS.length)];
    typing = true;
    guessedWord = "";
    triedLetters = "";
    document.getElementById ("triedKeys").textContent = "Letters you have tried will appear here." ; 

    for (let i = 0; i < word.length; i++) {
        guessedWord = guessedWord + "_";
    } 

    document.getElementById ("guessedWord").textContent = guessedWord ; 

    guessesLeft = (word.length * 2);
    document.getElementById ("guessCount").textContent = "Remaining Incorrect Guesses: " + guessesLeft ; 
}

reset();


/***********************************************************************
 * This sets the correct letter into the blank and alerts when you win *
 ***********************************************************************/
let correct = function(typedLetter){
                
    for (let i = 0; i < word.length; i++) { // Loops through every letter in word. index = x
        if(word.charAt(i) === typedLetter){ // Letter in word = typedLetter
            guessedWord = guessedWord.substr(0,i) + typedLetter + guessedWord.substr(i+1); //replace index x in guessedWord with typedLetter
        }
    }
    if (!guessedWord.includes("_")){
        document.getElementById ("guessCount").textContent = "YOU WIN!" ;
        wins ++;
        document.getElementById ("winCount").textContent = "Wins: " + wins ; 
        typing = false;
        sound.src = 'assets/images/happykids.mp3';
        sound.play();
    }
    document.getElementById ("guessedWord").textContent = guessedWord ; 
}

/***********************************************************
 * This handles incorrect letters and alerts when you lose *
 ***********************************************************/

let incorrect = function(typedLetter){
    guessesLeft--;
    document.getElementById ("guessCount").textContent = "Remaining Incorrect Guesses: " + guessesLeft ; 


    if (guessesLeft === 0) {
        document.getElementById ("guessCount").textContent = "YOU LOSE!" ;
        losses ++;
        document.getElementById ("lossCount").textContent = "Losses: " + losses ; 
        typing = false;
        sound.src = 'assets/images/boo2.mp3';
        sound.play();
    }

}

    /********************************************************************************
 * This allows you to only type letters and sends them to show where appropriate *
 *********************************************************************************/

document.addEventListener('keydown', function(event) {

    if (!typing) {
        return;
    }

    const keycode = event.keyCode;
    if (keycode > 64 && keycode < 91) {
        const typedLetter = String.fromCharCode(keycode);

        if (!triedLetters.includes(typedLetter)) {

            triedLetters = triedLetters + typedLetter + " ";
            document.getElementById ("triedKeys").textContent = triedLetters ;
            
            if (word.includes(typedLetter)) {

                correct(typedLetter);
            }
            else{
                incorrect(typedLetter);
            }


        }
    }

});


