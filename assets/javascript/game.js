

//Variable for all the words available in the game, amount of game wins, and guesses remaining. 
var words = ["HONDA", "FERRARI", "DRIVETRAIN", "BRAKEPAD", "BMW", "ENGINE", "RIMS", "YEAH", "PITSTOP", "DRIFT"];
var wins = 0;
var guessesRemaining = 15;
//variable for the length of the words array. The -1 reflects the fact that the length functions starts at 1 where index starts at 0
var wordsLength = words.length -1;
//creates an empty array to store the blank spaces and words (to get around the issue of strings being immutable)
var blankWordArray = [];
var currentWord = "";
var oldWord = "";

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
    //displays a blank representation of the word and updates the array for the blank spaces (aka underscores)
    for(var i in currentWord) {
        document.getElementById("current-word").innerHTML += "_ ";
        blankWordArray[i] = "_";
    };
    return currentWord;
}

//function that runs when the user guesses the wrong letter. 
function subtractGuesses(userGuess){

        //if you are not out of guesses it simply subtracts one guess and writes it to the HTML
        guessesRemaning = guessesRemaining--;
        document.getElementById("guesses-remaining").innerHTML = guessesRemaining;
        //the letter you guessed is also logged on screen
        document.getElementById("letters-guessed").innerHTML += userGuess + " ";

}

//function that runs if the user wins the game
function winGame(){
    //your win is displayed in two alerts
    alert("you win!");
    //guesses are reset
    guessesRemaining = 15;
    document.getElementById("guesses-remaining").innerHTML = guessesRemaining;
    //the amount of wins increases by 1
    wins += 1;
    document.getElementById("total-wins").innerHTML = wins;
    //a new word is created
    //the letters guessed are deleted
    document.getElementById("letters-guessed").innerHTML = "";
}


//function that runs if the user loses the game
function loseGame(){
    //alerts the user of their defeat
    alert("you lose! try again");
    guessesRemaining = 15;
    document.getElementById("guesses-remaining").innerHTML = guessesRemaining;
    document.getElementById("letters-guessed").innerHTML = "";
}


//--------------START OF THE GAME---------------//

window.onload = function() {
    //runs the makeWord(); function when the window loads
    var currentWord = makeWord();

    document.onkeyup = function(event) {
            //creates a variable for the key pressed
            var userGuess = event.key.toUpperCase();
            //creates a value for the index of the key pressed
            var guessCheck = currentWord.indexOf(userGuess);

            //initial check to see if user's guess is correct
            if(guessCheck > -1 ){
                alert("correct guess!");
                //clears the content of the current word initially
                document.getElementById("current-word").innerHTML = "";
               //updates the array to correctly reflect the correct letter guessed (since the array can be indexed and updated easier than a string)
                for(var i in currentWord){
                    if(currentWord[i] === userGuess){
                        blankWordArray[i] = currentWord[i];
                    }
                }
                //rewrites the contents of the HTML in "current-word" to reflect the contents of the array, which have been updated to reflect the correct letter guessed.
                for(var i in blankWordArray){
                    document.getElementById("current-word").innerHTML += blankWordArray[i] + " ";
                }

            } else {
                subtractGuesses(userGuess);
            }
            //this if statement checks to see if you have won the game by checking if there are any underscores still left in the array representing the current word
            if(blankWordArray.includes("_") == false) {
                document.getElementById("last-word").innerHTML = currentWord;
                winGame(currentWord);
                currentWord = makeWord();
            }else if(guessesRemaining < 0) {
                document.getElementById("last-word").innerHTML = currentWord;
                loseGame();
                currentWord = makeWord();
            }

    }


};