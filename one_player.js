
function startGame(){
 const cells = document.querySelectorAll('.cell');
 starting.winCombi = [[0,1,2], [3,4,5], [6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]] ;
  starting.board =Array.from(Array(9).keys());
  let first_choice = 10;
  if(starting.beginPlayer==="ai-button"){
  let center_and_corners = [0,2,4,6,8];
		first_choice = center_and_corners[Math.floor(Math.random()*center_and_corners.length)];
  }

   for(var i=0; i<cells.length; i++)
   {
     if(i != first_choice)
      cells[i].addEventListener('click',turnClick,false);
     else
     {cells[i].innerText = starting.aiPlayer;
    }



   }
   starting.player = starting.beginPlayer;
   starting.beginPlayer="blank";
}

function lastMove()
{  var availSpots = emptySquares();
  if(availSpots.length===1 && starting.player==="ai-button")
    {turn(starting.board[availSpots[0]],starting.aiPlayer);
    checkTie();
  }
}



  function turnClick(square){

   if (typeof starting.board[square.target.id] == 'number') {
    turn(square.target.id, starting.humanPlayer);
		if (!checkTie() && !checkWin(starting.board, starting.humanPlayer)) {
      turn(bestSpot(), starting.aiPlayer);
      lastMove();
	}
}
  }

function turn(squareId,player) {
	starting.board[squareId] = player;
	document.getElementById(squareId).innerText = player;
 let gameWon = checkWin(starting.board,player);
 if (gameWon)
 gameOver(gameWon,"one");

}

function checkWin(newBoard, player) {
	let plays = newBoard.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of starting.winCombi.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}


function gameOver(gameWon,playerNum) {
  const cells = document.querySelectorAll('.cell');
	for (let index of starting.winCombi[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == starting.humanPlayer ? "#8080ff" : "#ffff99";
	}
	for (var i = 0; i < cells.length; i++) {

    cells[i].removeEventListener('click', turnClick, false);


	}
  if(playerNum ==="one")
  declareWinner(gameWon.player == starting.humanPlayer ? "You won!" : "You lost!");
  else
  declareWinner(gameWon.player == "X" ? "player-1 won!" : "player-2 won!");
}

function declareWinner(who) {

	document.querySelector(".endgame").style.display = "block";

	document.querySelector(".endgame .text").innerText = who;

  if(who === "You won!")
  $("#robot").fadeOut(2000);
  else if(who === "You lost!")
    $("#astro").fadeOut(2000);

   if(who === "player-1 won!")
  $("#astro2").fadeOut(2000);
  else if(who === "player-2 won!")
    $("#astro1").fadeOut(2000);

   if(who === "It's a TIE!")
  {
    $("#robot").fadeOut(2000);
    $("#astro").fadeOut(2000);
    $("#astro2").fadeOut(2000);
    $("#astro1").fadeOut(2000);
  }

}

function emptySquares() {


  return starting.board.filter((elm, i) => i===elm);

}

function bestSpot() {
if(starting.MAX_DEPTH ===100000000){
  var score=minimax(starting.board,starting.aiPlayer,0);
  return starting.bestMove;
}
else{

   return minimax(starting.board,starting.aiPlayer,0);
}
}

function checkTie() {
const cells = document.querySelectorAll('.cell');
	if (emptySquares().length == 0) {

		for (var i = 0; i < cells.length; i++) {

			cells[i].style.backgroundColor = "#b3e0ff";

			cells[i].removeEventListener('click', turnClick, false);
      cells[i].removeEventListener('click', switchPlayer, false);
		}

		declareWinner("It's a TIE!");

		return true;

	}

	return false;

}

function wins(state, player) {
	var win;

	for (var i = 0; i < starting.winCombi.length; i++) {
		win = true;
		for (var j = 0; j < starting.winCombi[i].length; j++) {
			if (state[starting.winCombi[i][j]] != player) {
				win = false;
			}
		}
		if (win) {
			return true;
		}
	}
	return false;
}


function full(state) {
	return !emptySquares(state).length;
}

function terminal(state) {
	return (full(state) || wins(state, "X") || wins(state, "O"));
}




function minimax(newBoard, player,depth) {

  var availSpots = emptySquares();


if((depth >=starting.MAX_DEPTH )|| terminal(newBoard)){
 if (checkWin(newBoard, starting.humanPlayer)) {

   return -10;

 } else if (checkWin(newBoard, starting.aiPlayer)) {

   return 10;

 } else if (availSpots.length === 0) {

   return 0;

 }
}
  var scores=[];
  var moves =[];
for (let i = 0; i < availSpots.length; i++) {

    var move,score;
  move = newBoard[availSpots[i]];

  newBoard[availSpots[i]] = player;

  if (player === starting.aiPlayer)
{
    score = minimax(newBoard, starting.humanPlayer,depth+1);



}
  else
  {
     score =  minimax(newBoard, starting.aiPlayer,depth+1);

  }
    newBoard[availSpots[i]] = move;

    scores.push(score);
    moves.push(move);
}
var minScore,maxScore;
if (player === starting.aiPlayer) {

  maxScore =scores[0];
  starting.bestMove = moves[0];
  for(let i = 0; i < moves.length; i++) {
    if (scores[i] > maxScore) {
      maxScore = scores[i];
      starting.bestMove = moves[i];
    }
  }
if(starting.MAX_DEPTH ===100000000)
 return maxScore;

} else {

    minScore = scores[0];
    starting.bestMove =moves[0];
    for(let i = 0; i < moves.length; i++) {
    if (scores[i] < minScore) {
      minScore = scores[i];
      starting.bestMove = moves[i];
    }
  }
  if(starting.MAX_DEPTH ===100000000)
  return minScore;

}
if(starting.MAX_DEPTH !== 100000000)
return starting.bestMove;


}
