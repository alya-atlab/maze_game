//Initialized variables
let is_game_running = false;
let score = 0;
let time_reamining = 10;

//Declared variables
let end;
let start;
let boundaries;
let status_display;
let timer;
let coins;

document.addEventListener("DOMContentLoaded", loadPage);

function displayScore(message) {
  if (message != "")
    status_display.innerHTML = message + "<br/>" + "Your Score is: " + score;
}

function gameOver() {
  if (is_game_running) {
    for (let i = 0; i < boundaries.length; i++)
      boundaries[i].style.backgroundColor = "rgb(243, 159, 159)";
    document.getElementById("loose-sound").play();
    if (score > 0) score = score - 1;
    displayScore("Game Over!");
    is_game_running = false;
  }
}

function startGame() {
  displayScore("");
  is_game_running = true;
  document.getElementById("start-sound").play();
  for (let i = 0; i < boundaries.length; i++)
    boundaries[i].style.backgroundColor = "#eeeeee";
  if (is_game_running) {
    setInterval(update_time, 1000);
  }

  [...coins].forEach((coin) => {
    coin.addEventListener("mouseover", () => {
      score += 5;
      coin.remove();
      document.getElementById("coin-sound").play();
    });
  });
}
function update_time() {
  if (!is_game_running) {
    return;
  }
  timer.innerHTML = "time: " + time_reamining;
  if (time_reamining == 0) {
    gameOver();
  } else {
    time_reamining--;
  }
}

function endGame() {
  if (is_game_running) {
    for (let i = 0; i < boundaries.length; i++)
      boundaries[i].style.backgroundColor = "rgb(113 225 141)";
    document.getElementById("win-sound").play();
    score = score + 5;
    displayScore("You Won!");
    is_game_running = false;
  }
}

function loadPage() {
  end = document.getElementById("end");
  start = document.getElementById("start");
  boundaries = document.getElementsByClassName("boundary");
  status_display = document.getElementById("status");
  timer = document.getElementById("timer");
  coins = document.getElementsByClassName("coin");

  end.addEventListener("mouseover", endGame);
  start.addEventListener("click", startGame);

  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].addEventListener("mouseover", gameOver);
  }
}
