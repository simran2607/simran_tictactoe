
function beginGame(){
  starting.winCombi = [[0,1,2], [3,4,5], [6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]] ;
const cells = document.querySelectorAll('.cell');
  starting.board =Array.from(Array(9).keys());
   for(var i=0; i<cells.length; i++)
   {
     cells[i].addEventListener('click',switchPlayer,false);

   }
}

function switchPlayer(square){
starting.running=true;
    if (typeof starting.board[square.target.id] == 'number') {
        playaMove(square.target.id,starting.play);

      if (!checkTie() && !checkWin(starting.board,starting.play)) {

        if(starting.play==="X")
                starting.play= "O";
        else
                starting.play="X";


      }
    }

}

$("button[class*=suggestion]").click(function() {
const cells = document.querySelectorAll('.cell');
  if(starting.play ==="X")
  { minimaxSuggest(starting.board,true,0,"X");
    cells[starting.bestMove].style.backgroundColor = "#ccccff";
  }
  else if(starting.play ==="O")
  { minimaxSuggest(starting.board,false,0,"O");
    cells[starting.bestMove].style.backgroundColor ="#ffccff";
  }

});


function playaMove(squareId,player) {
	  starting.board[squareId] = player;
	  document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(starting.board,player);
    if (gameWon)
      gameOver(gameWon,"two");
}



function minimaxSuggest(newBoard,maximizing,depth,player) {

  var availSpots = emptySquares();
  var scores=[];
  var moves =[];

if((depth >=starting.MAX_DEPTH )|| terminal(newBoard))
{
      if (wins(newBoard,player)) {

          return 10;

      }
      else if (wins(newBoard,opponent)) {

          return -10;

      } else if (availSpots.length === 0) {

          return 0;

     }
}

    for (let i = 0; i < availSpots.length; i++) {

    var move,score;
    move = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;
    var opponent;

    if(player ==="O")
      opponent="X";
      else if(player ==="X")
        opponent="O";

  if (maximizing)
     score = minimax(newBoard,false,depth+1,opponent);
  else
     score =  minimax(newBoard,true,depth+1,opponent);

    newBoard[availSpots[i]] = move;
    scores.push(score);
    moves.push(move);
  }

  var minScore,maxScore;
    if ((maximizing) && player==="X") {

      maxScore =scores[0];
      starting.bestMove = moves[0];
        for(let i = 0; i < moves.length; i++) {
            if (scores[i] > maxScore) {
              maxScore = scores[i];
              starting.bestMove = moves[i];
            }
    }

    return maxScore;

}
else if ((maximizing !=true) && player=="O"){

     minScore = scores[0];
     starting.bestMove =moves[0];
      for(let i = 0; i < moves.length; i++) {
        if (scores[i] < minScore) {
          minScore = scores[i];
          starting.bestMove = moves[i];

        }
      }
      return minScore;

    }

}
