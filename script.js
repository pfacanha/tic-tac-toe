// start project "Tic-Tac-Toe" from scratch
function Gameboard() {
  let rows = 3;
  let columns = 3;
  const board = [];

  for (let i = 0; i < rows; ++i) {
    board[i] = [];
    for (let j = 0; j < columns; ++j) {
      board[i][j] = Cell();
    }
  }

  const printBoard = () => console.log(board);

  const getBoard = () => {
    return board.map((row) => row.map((cell) => cell.getValue()));
  };

  const placeMark = (row, column, token) => {
    board[row][column].setMark(token);
  };

  const isAvailable = (row, column) => {
    return board[row][column].getValue() === "";
  };

  return {
    printBoard,
    getBoard,
    placeMark,
    isAvailable,
  };
}

function Cell() {
  let value = "";

  const setMark = (token) => (value = token);

  const getValue = () => value;

  return {
    setMark,
    getValue,
  };
}

function GameController(maxRounds) {
  const players = [
    {
      name: "Player One",
      token: "X",
      attempts: 0,
      score: 0,
    },
    {
      name: "Player Two",
      token: "O",
      attempts: 0,
      score: 0,
    },
  ];

  const board = Gameboard();

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printRound = () => {
    if (getActivePlayer().attempts == 0) {
      console.log(`This is ${getActivePlayer().name}'s first turn.`);
    } else {
      console.log(`Now it's another turn for ${getActivePlayer().name}`);
    }
  };

  const playRound = (row, column) => {
    if (board.isAvailable(row, column)) {
      board.placeMark(row, column, activePlayer.token);

      console.log(
        `Row ${row} and Column ${column} was marked with ${
          getActivePlayer().token
        }`
      );
      getActivePlayer().attempts++;

      console.log(
        `${getActivePlayer().name} has ${
          maxRounds - getActivePlayer().attempts
        } attempts left`
      );

      switchPlayerTurn();
      printRound();
    }
  };

  // TODO: create function that defines who is the winner, loser or draw
  const isOver = () => {};

  printRound();

  return {
    printRound,
    playRound,
    switchPlayerTurn,
    getActivePlayer,
    getBoard: board.getBoard,
  };
}

const screenController = (function () {
  const game = GameController(5);
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = game.getBoard();
    let activePlayer = game.getActivePlayer();
    playerTurnDiv.textContent = `${activePlayer.name}'s turn..`;

    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellButton = document.createElement("button");

        cellButton.classList.add("cell");
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = colIndex;
        cellButton.textContent = cell;

        boardDiv.appendChild(cellButton);
      });
    });
  };
  function clickHandlerBoard(e) {
    const cell = e.target;
    const row = cell.dataset.row;
    const column = cell.dataset.column;

    if (cell.textContent !== "") return;

    const token = game.getActivePlayer().token;
    game.playRound(row, column);

    const playerName = game.getActivePlayer().name;
    cell.textContent = token;
    playerTurnDiv.textContent = `${playerName}'s turn..`;
  }

  boardDiv.addEventListener("click", clickHandlerBoard);

  updateScreen();
})();
