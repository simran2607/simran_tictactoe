starting = function(){
 var beginPlayer;
 var player;
 var play="X";
 var bestMove;
 var board;
 const humanPlayer="O";
 const aiPlayer = 'X';
 var running =false;
 var MAX_DEPTH;
 const winCombi = [[0,1,2], [3,4,5], [6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]] ;
 return{
   beginPlayer:beginPlayer,
   player:player,
   play:play,
   bestMove:bestMove,
   board:board,
   humanPlayer:humanPlayer,
   aiPlayer:aiPlayer,
   MAX_DEPTH:MAX_DEPTH,
   winCombi: winCombi,
   running:running
 }
}



$("button[class*=player-no]").click(function(){
  var player = $(this).attr("id");
  if(player === "one-p")
   {newgame1();
    starting.humanPlayer="O";
    starting.aiPlayer="X";
   }
   else if(player === "two-p")
   {newgame2();
    starting.MAX_DEPTH =1000000;
    starting.play="X";
   }
   starting.running=false;
   $(".player-no").fadeOut(450);
});

function newgame1()
{
  document.querySelector(".players").style.display="block";
  document.querySelector(".starting-player").style.display="block";
  document.querySelector(".depth-button").style.display="block";
  document.querySelector(".newgame-1").style.display="block";

}

function newgame2()
{
  document.querySelector(".players-2").style.display="block";
  document.querySelector(".newgame-2").style.display="block";
  document.querySelector(".starting-2-player").style.display="block";
  document.querySelector(".suggestion").style.display="block";
}


function gameFinish(){
   buttonColor();
  document.querySelector(".endgame").style.display="none";
  document.querySelector(".players").style.display="none";
  document.querySelector(".starting-player").style.display="none";
  document.querySelector(".starting-2-player").style.display="none";
  document.querySelector(".depth-button").style.display="none";
  document.querySelector(".newgame-1").style.display="none";
  document.querySelector(".players-2").style.display="none";
  document.querySelector(".newgame-2").style.display="none";
  document.querySelector(".suggestion").style.display="none";
   $(".player-no").fadeIn(1000);
}
function buttonColor(){
  document.getElementById("medium").style.backgroundColor ="#000000";
  document.getElementById("hard").style.backgroundColor ="#000000";
  document.getElementById("easy").style.backgroundColor ="#000000";
  document.getElementById("play-x").style.backgroundColor ="#000000";
  document.getElementById("play-o").style.backgroundColor ="#000000";
  document.getElementById("ai-button").style.backgroundColor ="#000000";
  document.getElementById("astro-button").style.backgroundColor ="#000000";
}
  $("button[class*=newgame-1]").click(function(){

    startGame();
    if(starting.running)
      {gameFinish();
        $("#robot").fadeIn(1000);
        $("#astro").fadeIn(1000);
        $("#astro1").fadeIn(1000);
        $("#astro2").fadeIn(1000);
      const cells = document.querySelectorAll('.cell');
        for(var i=0; i<cells.length; i++)
        {
          cells[i].innerText ='';
          cells[i].style.removeProperty('background-color');
          cells[i].removeEventListener('click', turnClick, false);
          cells[i].removeEventListener('click', switchPlayer, false);
        }
      }

  });

  $("button[class*=newgame-2]").click(function(){

      beginGame();
      if(starting.running)
        {gameFinish();
          $("#robot").fadeIn(1000);
          $("#astro").fadeIn(1000);
          $("#astro1").fadeIn(1000);
          $("#astro2").fadeIn(1000);
        const cells = document.querySelectorAll('.cell');
          for(var i=0; i<cells.length; i++)
          {
            cells[i].innerText ='';
            cells[i].style.removeProperty('background-color');
            cells[i].removeEventListener('click', turnClick, false);
            cells[i].removeEventListener('click', switchPlayer, false);
          }
        }
});

$("div[class*=btn]").click(function(){
  gameFinish();
  $("#robot").fadeIn(1000);
  $("#astro").fadeIn(1000);
  $("#astro1").fadeIn(1000);
  $("#astro2").fadeIn(1000);
const cells = document.querySelectorAll('.cell');
  for(var i=0; i<cells.length; i++)
  {
    cells[i].innerText ='';
    cells[i].style.removeProperty('background-color');
  }
});

$("button[class*=depth]").click(function() {
    var difficulty = $(this).attr("id");

    if (difficulty === "easy")
    {starting.MAX_DEPTH = 5;
      document.getElementById(difficulty).style.backgroundColor ="#5c5c3d";
      document.getElementById("medium").style.backgroundColor ="#000000";
      document.getElementById("hard").style.backgroundColor ="#000000";
    }
    else if (difficulty === "medium")
    {starting.MAX_DEPTH = 7;
      document.getElementById(difficulty).style.backgroundColor ="#5c5c3d";
      document.getElementById("easy").style.backgroundColor ="#000000";
      document.getElementById("hard").style.backgroundColor ="#000000";
    }
    else if(difficulty === "hard")
    {starting.MAX_DEPTH = 100000000;
      document.getElementById(difficulty).style.backgroundColor ="#5c5c3d";
      document.getElementById("easy").style.backgroundColor ="#000000";
      document.getElementById("medium").style.backgroundColor ="#000000";
    }
    else {

    }

  });

  $("button[class*=start-p]").click(function() {
      starting.beginPlayer = $(this).attr("id");
      var begin= $(this).attr("id");
      if(begin==="ai-button")
      {document.getElementById(begin).style.backgroundColor ="#5c5c3d";
      document.getElementById("astro-button").style.backgroundColor ="#000000";
    }
     else{
      document.getElementById(begin).style.backgroundColor ="#5c5c3d";
      document.getElementById("ai-button").style.backgroundColor ="#000000";
}

      });

      $("button[class*=start-play]").click(function() {
          var player= $(this).attr("id");
          starting.play="X";
          if(player ==="play-x")
          {starting.play="X";
          document.getElementById(player).style.backgroundColor ="#5c5c3d";
          document.getElementById("play-o").style.backgroundColor ="#000000";
        }
          else
          {starting.play="O";
          document.getElementById(player).style.backgroundColor ="#5c5c3d";
          document.getElementById("play-x").style.backgroundColor ="#000000";
        }
          });
