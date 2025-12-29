// ======================
// Cell (factory is fine)
// ======================
function Cell() {
  let value = "";

  const setMark = (token) => (value = token);
  const getValue = () => value;

  return { setMark, getValue };
}

// ======================
// Gameboard (IIFE)
// ======================
const Gameboard = (function () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i][j] = Cell();
    }
  }

  const getBoard = () => board.map((row) => row.map((cell) => cell.getValue()));

  const placeMark = (row, column, token) => {
    board[row][column].setMark(token);
  };

  const isAvailable = (row, column) => board[row][column].getValue() === "";

  return {
    getBoard,
    placeMark,
    isAvailable,
  };
})();

// ======================
// GameController (IIFE)
// ======================
const GameController = (function () {
  const allPossibilities = [
    ["00", "01", "02"],
    ["10", "11", "12"],
    ["20", "21", "22"],
    ["00", "10", "20"],
    ["01", "11", "21"],
    ["02", "12", "22"],
    ["00", "11", "22"],
    ["20", "11", "02"],
  ];

  const players = [
    { name: "Player One", token: "X", marks: [] },
    { name: "Player Two", token: "O", marks: [] },
  ];

  let activePlayer = players[0];
  let attempts = 0;
  let winnerFound = false;
  let drawGame = false;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;
  const isGameOver = () => winnerFound;
  const isDrawGame = () => drawGame;

  const checkWinner = (player) =>
    allPossibilities.some((combo) =>
      combo.every((mark) => player.marks.includes(mark))
    );

  const playRound = (row, column) => {
    if (winnerFound || drawGame) return;
    if (!Gameboard.isAvailable(row, column)) return;

    const position = `${row}${column}`;

    Gameboard.placeMark(row, column, activePlayer.token);
    activePlayer.marks.push(position);
    attempts++;

    if (checkWinner(activePlayer)) {
      winnerFound = true;
      return;
    }

    if (attempts === 9) {
      drawGame = true;
      return;
    }

    switchPlayerTurn();
  };

  return {
    playRound,
    getActivePlayer,
    getBoard: Gameboard.getBoard,
    isGameOver,
    isDrawGame,
  };
})();

// ======================
// ScreenController (IIFE)
// ======================
const screenController = (function () {
  const game = GameController;

  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = game.getBoard();
    playerTurnDiv.textContent = `${game.getActivePlayer().name}'s turn`;

    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellButton = document.createElement("button");

        cellButton.classList.add("cell");
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;
        cellButton.textContent = cell;

        boardDiv.appendChild(cellButton);
      });
    });
  };

  const clickHandlerBoard = (e) => {
    if (game.isGameOver() || game.isDrawGame()) return;

    const cell = e.target;
    if (!cell.classList.contains("cell")) return;

    game.playRound(cell.dataset.row, cell.dataset.column);
    updateScreen();

    if (game.isGameOver()) {
      playerTurnDiv.textContent = `${game.getActivePlayer().name} wins!`;
      setTimeout(() => location.reload(), 1500);
      return;
    }

    if (game.isDrawGame()) {
      playerTurnDiv.textContent = "Draw Game!";
      setTimeout(() => location.reload(), 1500);
    }
  };

  boardDiv.addEventListener("click", clickHandlerBoard);
  updateScreen();
})();
