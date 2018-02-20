//waits until the document loads before the script runs. 

//Variable for all the words available in the game, amount of game wins, and guesses remaining. 
var words = ["wombat", "bull", "hippo", "alligator", "stingray", "biff", "soffffffffffffffff", "yeah"];
var wins = 0;
var guessesRemaining = 15;
//variable for the length of the words array. The -1 reflects the fact that the length functions starts at 1 where index starts at 0
var wordsLength = words.length -1;
var blankWordArray = [];


//function to make a new word
function makeWord(){
    //clears whatever HTML might have already been in the "current-word" span
    document.getElementById("current-word").innerHTML = "";
    //clears the array
    blankWordArray = [];
    //uses a random number between 0 and wordsLength to select a new word
    var wordSelector = Math.floor(Math.random() * wordsLength);
    //sets the currentWord variable to a random element of the Words array
    var currentWord = words[wordSelector];
    //displays a blank representation of the word and updates an array for the blank spaces
    for(var i in currentWord) {
        document.getElementById("current-word").innerHTML += "_ ";
        blankWordArray[i] = "_";
    };
    return currentWord;
}

function subtractScore(){
    if(guessesRemaining > 0){ 
        guessesRemaning = guessesRemaining--;
        document.getElementById("guesses-remaining").innerHTML = guessesRemaining;

    } else {
        alert("you lose!");
        currentWord = makeWord();
        guessesRemaining = 15;
        document.getElementById("guesses-remaining").innerHTML = guessesRemaining;
        document.getElementById("letters-guessed").innerHTML = ""; 
    }
}

window.onload = function() {
    //runs the makeWord(); function when the window loads
    var currentWord = makeWord();

    document.onkeyup = function(event) {
            //creates a variable for the key pressed
            var userGuess = event.key;
            //creates a value for the index of the key pressed
            var guessCheck = currentWord.indexOf(userGuess);
            var blankWord = document.getElementById("current-word").innerHTML;



            if(guessCheck > -1 ){
                alert("correct");
                document.getElementById("current-word").innerHTML = "";
                for(var i in currentWord){
                    if(currentWord[i] === userGuess){
                        blankWordArray[i] = currentWord[i];
                    }
                }
                for(var i in blankWordArray){
                    document.getElementById("current-word").innerHTML += blankWordArray[i] + " ";
                }

                alert(blankWordArray);
            } else {
                subtractScore();
                document.getElementById("letters-guessed").innerHTML += userGuess + " ";
            }

            if(blankWordArray.includes("_") == false) {
                alert("you win!");
                wins += 1;
                document.getElementById("total-wins").innerHTML = wins;
                currentWord = makeWord();
                document.getElementById("letters-guessed").innerHTML = "";
            }

    }


};