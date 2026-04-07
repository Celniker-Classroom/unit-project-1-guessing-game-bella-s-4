// add javascript here

//Game State
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let scores = 0;

//Player Name
let playerName = prompt("Enter your name:");
//***Remember to check name and change capitalizations and stuff */

//Play
//get level
document.getElementById("playBtn").addEventListener("click", function() {
    let radios = document.getElementsByName("level");
    let range = 3;
    for (let i=0; i < radios.length; i++) {
        if(radios[i].checked) {
            range = parseint(radios[i].value);
        }
    }
})

//round setup
answer = Math.floor(Math.random() * range) + 1;

document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range;
