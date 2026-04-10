// add javascript here

//Game State
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let scores = [];

let startMs = 0;
let times = [];

//Player Name
let playerName = prompt("Enter your name:");
//***Remember to check name and change capitalizations and stuff */

if(!playerNmae) {
    playerName = "Player";
}

function titleCase(name) {
  let first = name.charAt(0).toUpperCase();
  let rest = name.slice(1).toLowerCase();
  return first + rest;
}

playerName = titleCase(playerName);

//date 

function time() {
    let now = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    let month = months[now.getMonth()];
    let day = now.getDate();
    let year = now.getFullYear();

    let suffix = "th";
    if(day % 10 == 1 && day != 11) suffix = "st";
    else if (day % 10 ==2 && day != 12) suffix = "nd";
    else if (day % 10 == 3 && day != 13) suffix = "rd";

    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;

    return month + " " + day + suffix + ", " + year + " " + h + ":" + m + ":" + s;
}

document.getElementById("date").textContent = time();

//timer or clock

setInterval(function(){
  document.getElementById("date").textContent = time();
},1000);


//moved event listeners all here to see better 

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);

//Play
//get level

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
    startMs = new Date().getTime();


    //Disable and Enable buttons and radio choices
    document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range;
    
    document.getElementById("guess").value="";
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;

    for (let i = 0; i < radios.length; i++) {
        radios[i].disabled = true;
    }

}

//Guessing 

function makeGuess() {
    let input = document.getElementById("guess").value;
    let num = parseInt(input);
    if (isNaN(num)) {
        document.getElementById("msg").textContent = "Please enter a valid number!";
        return;
    }

    guessCount ++;
    let diff = Math.abs(num - answer);

    //correct 

    if(num === answer){
        document.getElementById("msg").textContent = "Correct! " + playerName + " got it in " + guessCount + " guesses!";
        document.getElementById("guessBtn").disabled = true;
        updateScore(guessCount);
        updateTimers(new Date().getTime());
        reset(); //stop guess & give up restart play
    }
    //higher
    else if (num > answer) {
        let temp = "cold";
        if (diff <= 2) {
            temp = "hot";
        } else if (diff <= 5) {
            temp = "warm";
        }
        document.getElementById("msg").textContent = "Too high. " + temp;
    }
    //lower
    else {
        let temp = "cold";
        if (diff <= 2) {
            temp = "hot";
        } else if (diff <= 5) {
            temp = "warm";
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

//timer 

function updateTimers(endMs) {
    let roundTime = (endMs - startMs)/1000;

    times.push(roundTime);

    let fastest = Math.min(...times);
    let total = 0;
    for (let i = 0; i < times.length; i++) {
    total += times[i];
  }

  let avg = total/times.length;

  document.getElementById("fastest").textContent = "Fastest Game: " + fastest.toFixed(1);
  document.getElementById("avgTime").textContent = "Average Time: " + avg.toFixed(1);
}

//giving up
function giveUp() {
    let radios = document.getElementsByName("level");
    let range = 3;

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            range = parseInt(radios[i].value);
        }
    }

    document.getElementById("msg").textContent = playerName + " gave up. The answer was: " + answer;

    updateScore(range);
    updateTimers(new Date().getTime());
    reset();
}

function reset() {
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;

    //disable radio level selection 
    let radios = document.getElementsByName("level");
    for (let i = 0; i < radios.length; i++) {
        radios[i].disabled = false;
    }
}

