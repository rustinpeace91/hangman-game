//waits until the document loads before the script runs. 

//Variable for all the words available in the game, amount of game wins, and guesses remaining. 
var words = ["honda", "ferrari", "drivetrain", "brakepad", "BMW", "engine", "rims", "yeah", "pitstop", "drift"];
var wins = 0;
var guessesRemaining = 15;
//variable for the length of the words array. The -1 reflects the fact that the length functions starts at 1 where index starts at 0
var wordsLength = words.length -1;
//creates an empty array to store the blank spaces and words (to get around the issue of strings being immutable)
var blankWordArray = [];
var currentWord = "";

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

//I tried to break most of hte actions up into functions, but ran into a lot of scope related errors.  I will revsit this if I have time. 
/*function subtractScore(){
    if(guessesRemaining > 0){ 
        guessesRemaning = guessesRemaining--;
        document.getElementById("guesses-remaining").innerHTML = guessesRemaining;

    } else {
        alert("you lose! the correct word was " + currentWord);
        currentWord = makeWord();
        guessesRemaining = 15;
        document.getElementById("guesses-remaining").innerHTML = guessesRemaining;
        document.getElementById("letters-guessed").innerHTML = "";
    }
}*/

window.onload = function() {
    //runs the makeWord(); function when the window loads
    var currentWord = makeWord();

    document.onkeyup = function(event) {
            //creates a variable for the key pressed
            var userGuess = event.key;
            //creates a value for the index of the key pressed
            var guessCheck = currentWord.indexOf(userGuess);
            //prints the current word to the screen
            var blankWord = document.getElementById("current-word").innerHTML;

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
                //if the user guess is not correct it first checks to make sure you haven't run out of guesses
                if(guessesRemaining > 0){ 
                    //if you are not out of guesses it simply subtracts one guess and writes it to the HTML
                    guessesRemaning = guessesRemaining--;
                    document.getElementById("guesses-remaining").innerHTML = guessesRemaining;
                    //the letter you guessed is also logged on screen
                    document.getElementById("letters-guessed").innerHTML += userGuess + " ";
                } else {
                    //if you are out of guesses you are alerted of your loss, and the correct word is revealed
                    alert("you lose! the correct word was " + currentWord);
                    //a new word is generated
                    currentWord = makeWord();
                    //the guesses are replenished
                    guessesRemaining = 15;
                    //the guesses are reset and the letters guessed are deleted
                    document.getElementById("guesses-remaining").innerHTML = guessesRemaining;
                    document.getElementById("letters-guessed").innerHTML = "";
                    
                }
            }

            //this if statement checks to see if you have won the game by checking if there are any underscores still left in the array representing the current word
            if(blankWordArray.includes("_") == false) {
                //your win and the correct word is displayed in two alerts
                alert("you win!");
                alert(currentWord)
                //guesses are reset
                guessesRemaining = 15;
                document.getElementById("guesses-remaining").innerHTML = guessesRemaining;
                //the amount of wins increases by 1
                wins += 1;
                document.getElementById("total-wins").innerHTML = wins;
                //a new word is created
                currentWord = makeWord();
                //the letters guessed are deleted
                document.getElementById("letters-guessed").innerHTML = "";
            }

    }


};