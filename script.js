// add javascript here

//Game State
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let scores = [];


//Player Name
let playerName = prompt("Enter your name:");
//***Remember to check name and change capitalizations and stuff */

function titleCase(name) {
  let first = name.charAt(0).toUpperCase();
  let rest = name.slice(1).toLowerCase();
  return first + rest;
}

playerName = titleCase(playerName);

//date 

let now = new Date();
let month = now.getMonth() + 1;  // Add 1 because months start at 0
let day = now.getDate();
let year = now.getFullYear();
alert(month + "/" + day + "/" + year);  // e.g. "4/7/2026"

//timer or clock

setInterval(function(){
  document.getElementById("date").textContent = time();
},1000);

//Play
//get level
document.getElementById("playBtn").addEventListener("click", play);

function play() {
    let radios = document.getElementsByName("level");
    let range = 3;
    for (let i=0; i < radios.length; i++) {
        if(radios[i].checked) {
            range = parseInt(radios[i].value);
        }
    }

//round setup / pick answer 

    answer = Math.floor(Math.random() * range) + 1;
    guessCount = 0; //reset guess count for new round


    //Disable and Enable buttons and radio choices
    document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range;
    
    document.getElementById("guess").value="";
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;

    for (let i = 0; i < radios.length; i++) {
        radios[i].disabled = true;
    }

};

//Guessing 
document.getElementById("guessBtn").addEventListener("click", makeGuess);

function makeGuess() {
    let input = document.getElementById("guess").value;
    let num = parseInt(input);
    if (isNaN(num)) {
        document.getElementById("msg").textContent = "Please enter a valid number!";
        return;
    }

    guessCount ++;
    let diff = Math.abs(num-answer);

    //correct 

    if(num === answer){
        document.getElementById("msg").textContent = "Correct! " + playerName + " got it in " + guessCount + " guesses!";
        updateScore(guessCount);
        reset(); //stop guess & give up restart play
    }
    //higher
    else if (num > answer) {
        let temp = "";
        if (diff <= 2) {
            temp = "Hot!";
        } else if (diff <= 5) {
            temp = "Warm!";
        } else {
            temp = "Cold";
        }
        document.getElementById("msg").textContent = "Too high. " + temp;
    }
    //lower
    else {
        let temp = "";
        if (diff <= 2) {
            temp = "Hot!";
        } else if (diff <= 5) {
            temp = "Warm!";
        } else {
            temp = "Cold";
        }
        document.getElementById("msg").textContent = "Too low. " + temp;
    }
}

//update score when win 

function updateScore(score) {
    totalWins ++;
    totalGuesses += score;
    //score for round and average 
    document.getElementById("wins").textContent = "Total wins: " + totalWins;
    document.getElementById("avgScore").textContent = "Average Score: " + (totalGuesses/totalWins).toFixed(1);

    //update leaderboard 
    scores.push(score);
    scores.sort(function(a,b){return a-b;});

    let leaderboard = document.getElementsByName("leaderboard");
    for (let i=0; i < leaderboard.length; i++) {
        if (i < scores.length) {
            leaderboard[i].textContent = scores[i];
        } else {
            leaderboard[i].textContent = "--";

        }
    }
}

function resetButtons() {
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;

    //disable radio level selection 
    let radios = document.getElementsByName("level");
    for (let i=0; i < radios.length; i++) {
        radios[i].disabled = false;
    }
}

