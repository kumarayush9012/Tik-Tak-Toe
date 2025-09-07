const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const timerDisplay = document.getElementById("timer");

let currentPlayer = "X";
let gameActive = true;
let cells = Array(9).fill(null);
let timer = 0;
let timerInterval;

// Winning combinations
const winningPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// Create board
function createBoard() {
  board.innerHTML = "";
  cells = Array(9).fill(null);
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  board.classList.remove("disabled");

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => makeMove(i, cell));
    board.appendChild(cell);
  }

  // Reset and start timer
  clearInterval(timerInterval);
  timer = 0;
  timerDisplay.textContent = "Time: 0s";
  timerInterval = setInterval(() => {
    timer++;
    timerDisplay.textContent = `Time: ${timer}s`;
  }, 1000);
}

function makeMove(index, cell) {
  if (!gameActive || cells[index]) return;
  cells[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    clearInterval(timerInterval);
    disableBoard();
  } else if (cells.every(cell => cell)) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    clearInterval(timerInterval);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winningPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function disableBoard() {
  document.querySelectorAll(".cell").forEach(cell => cell.classList.add("disabled"));
}

resetBtn.addEventListener("click", createBoard);

// Initialize game
createBoard();
