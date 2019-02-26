const box1 = document.querySelector('#box1');
const box2 = document.querySelector('#box2');
const box3 = document.querySelector('#box3');
const box4 = document.querySelector('#box4');
const box5 = document.querySelector('#box5');
const box6 = document.querySelector('#box6');
const box7 = document.querySelector('#box7');
const box8 = document.querySelector('#box8');
const box9 = document.querySelector('#box9');
const playerTurn = document.querySelector('#playerTurn');
const winCount1 = document.querySelector('#winCount1');
const winCount2 = document.querySelector('#winCount2');
const tieCount = document.querySelector('#tieCount');
const boxArray = document.querySelectorAll('#grid div');
const winState = document.querySelector('#win-state');

let xoMark = 0;
let totalWins1 = 0;
let totalWins2 = 0;
let totalTies = 0;
let currentPlayer = 0;
let enabled = true;

function reset () {
    box1.innerHTML = "";
    box2.innerHTML = "";
    box3.innerHTML = "";
    box4.innerHTML = "";
    box5.innerHTML = "";
    box6.innerHTML = "";
    box7.innerHTML = "";
    box8.innerHTML = "";
    box9.innerHTML = "";
    xoMark = 0;

    // to alternate the turns between players for the next games
    if (currentPlayer == 1) {   
        currentPlayer = 2;
        playerTurn.innerHTML = "O starts!";
    }
    else if (currentPlayer == 2) {
        currentPlayer = 1;
        playerTurn.innerHTML = "X starts!";
    }

    //display between win and turn message
    playerTurn.classList.remove('hidden');
    winState.classList.add('hidden');
}

function updateWinner(){
    if (currentPlayer == 1) {
        totalWins1 += 1; // player x win count +1
        winCount1.innerHTML = totalWins1 + " wins"; // update counter
        winState.innerHTML = "X WINS!" // win message
        playerTurn.classList.add('hidden'); //change display from turn to win message
        winState.classList.remove('hidden');
    }
    else if (currentPlayer == 2) {
        totalWins2 += 1; //player O win count +1
        winCount2.innerHTML = totalWins2 + " wins"; // update counter
        winState.innerHTML = "O WINS!" // win message
        playerTurn.classList.add('hidden'); //change display from turn to win message
        winState.classList.remove('hidden');
    }
    // disable getWinner() if game has ended (by win or tie) but players can keep playing on empty boxes (if any)
    enabled = false;
}

function getWinner() {
    // enables getWinner function until the game ends (by win or tie), and disables it after
    if (enabled == true) {
        // list of all possible combinations of wins
        if (box1.innerHTML !== "" && box1.innerHTML == box2.innerHTML && box1.innerHTML == box3.innerHTML) {
            updateWinner();
        }
        else if (box4.innerHTML !== "" && box4.innerHTML == box5.innerHTML && box4.innerHTML == box6.innerHTML) {
            updateWinner();
        }
        else if (box7.innerHTML !== "" && box7.innerHTML == box8.innerHTML && box7.innerHTML == box9.innerHTML) {
            updateWinner();
        }
        else if (box1.innerHTML !== "" && box1.innerHTML == box4.innerHTML && box1.innerHTML == box9.innerHTML) {
            updateWinner();
        }
        else if (box2.innerHTML !== "" && box2.innerHTML == box5.innerHTML && box2.innerHTML == box8.innerHTML) {
            updateWinner();
        }
        else if (box3.innerHTML !== "" && box3.innerHTML == box6.innerHTML && box3.innerHTML == box9.innerHTML) {
            updateWinner();
        }
        else if (box1.innerHTML !== "" && box1.innerHTML == box5.innerHTML && box1.innerHTML == box9.innerHTML) {
            updateWinner();
        }
        else if (box3.innerHTML !== "" && box3.innerHTML == box5.innerHTML && box3.innerHTML == box7.innerHTML) {
            updateWinner();
        }
        
        // condition for ties
        else if (box1.innerHTML !== "" && box2.innerHTML !== "" && box3.innerHTML !== "" && box4.innerHTML !== "" && box5.innerHTML !== "" && box6.innerHTML !== "" && box7.innerHTML !== "" && box8.innerHTML !== "" && box9.innerHTML !== ""){
            totalTies += 1; // ties count +1
            tieCount.innerHTML = totalTies + " ties"; // update counter
            winState.innerHTML = "It's a TIE!" // tie message
            playerTurn.classList.add('hidden'); //change display from turn to tie message
            winState.classList.remove('hidden');
        }
    }
}

// for all 9 boxes, if even number of turn then mark is X, if odd number of turn then mark is O
for (i = 0; i < boxArray.length; i++) {
    boxArray[i].onclick = function () {
        if (this.innerHTML !== "X" && this.innerHTML !== "O") {
            if (xoMark%2 == 0) { 
                this.innerHTML = "X"; 
                currentPlayer = 1;
                playerTurn.innerHTML = "O's turn"; //the next person's turn
            }
            else {
                this.innerHTML = "O";
                currentPlayer = 2;
                playerTurn.innerHTML = "X's turn"; 
            }
            xoMark += 1;
            getWinner();            
        }
    }
}
