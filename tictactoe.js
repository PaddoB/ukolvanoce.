document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("board");
  const status = document.getElementById("status");
 document.getElementById("resetButton").addEventListener("click", resetGame) ; 


  let currentPlayer = "X";
  let gameBoard = new Array(5).fill(null).map(() => new Array(5).fill(null));
  let gameActive = true;

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener("click", handleCellClick);
      board.appendChild(cell);
    }
  }

  function handleCellClick(event) {
    if (!gameActive) return;
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    if (gameBoard[row][col] === null) {
      gameBoard[row][col] = currentPlayer;
      event.target.textContent = currentPlayer;
      checkWinner(row, col);
      togglePlayer();
    }
  }

  function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  function checkWinner(row, col) {
    if (
      checkRow(row) ||
      checkColumn(col) ||
      checkDiagonals(row, col) ||
      checkAntiDiagonals(row, col)
    ) {
      status.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (isBoardFull()) {
      status.textContent = "It's a tie!";
      gameActive = false;
    }
  }

  function checkRow(row) {
    let count = 0;
    for (let col = 0; col < 5; col++) {
      if (gameBoard[row][col] === currentPlayer) {
        count++;
        if (count === 5) return true;
      } else {
        count = 0;
      }
    }
    return false;
  }

  function checkColumn(col) {
    let count = 0;
    for (let row = 0; row < 5; row++) {
      if (gameBoard[row][col] === currentPlayer) {
        count++;
        if (count === 5) return true;
      } else {
        count = 0;
      }
    }
    return false;
  }

  function checkDiagonals(row, col) {
    let count = 0;
    for (let i = 0; i < 5; i++) {
      if (gameBoard[i][i] === currentPlayer) {
        count++;
        if (count === 5) return true;
      } else {
        count = 0;
      }
    }
    return false;
  }

  function checkAntiDiagonals(row, col) {
    let count = 0;
    for (let i = 0; i < 5; i++) {
      if (gameBoard[i][4 - i] === currentPlayer) {
        count++;
        if (count === 5) return true;
      } else {
        count = 0;
      }
    }
    return false;
  }

  function isBoardFull() {
    return gameBoard.every((row) => row.every((cell) => cell !== null));
  }

 
  function resetGame() {
    gameBoard = new Array(5).fill(null).map(() => new Array(5).fill(null));
    gameActive = true;
    currentPlayer = "X";
    status.textContent = "Player X's turn";

   
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.textContent = "";
    });
  }
});
