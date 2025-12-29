// start project "Tic-Tac-Toe" from scratch
function Cell() {
  let value = "";

  const setMark = (token) => (value = token);

  const getValue = () => value;

  return {
    setMark,
    getValue,
  };
}

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

function GameController() {
  let attempts = 0;
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
    {
      name: "Player One",
      token: "X",
      marks: [],
    },
    {
      name: "Player Two",
      token: "O",
      marks: [],
    },
  ];

  const board = Gameboard();

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printRound = () => {
    console.log(`${activePlayer.name}'s turn`);
  };

  const playRound = (row, column) => {
    const position = row + column;

    if (board.isAvailable(row, column)) {
      board.placeMark(row, column, activePlayer.token);
      activePlayer.marks.push(row + column);

      console.log(
        `Row ${row} and Column ${column} was marked with ${
          getActivePlayer().token
        }`
      );
      ++attempts;
      if (attempts >= 3) {
        checkWinner(activePlayer);
      }
      switchPlayerTurn();
      printRound();
    }
  };

  const checkWinner = (player) => {
    // check if active player marks array contains at least 3 of one of the possibilities
    const matches = allPossibilities.filter((possibility) => {
      player.marks.includes(possibility);
    });
    if (matches.length == 3) {
      console.log("We got a winner!" + player.name);
      return true;
    }
  };

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
      row.forEach((column, columnIndex) => {
        const cellButton = document.createElement("button");

        cellButton.classList.add("cell");
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;

        boardDiv.appendChild(cellButton);
      });
    });
  };

  function clickHandlerBoard(e) {
    const cell = e.target;
    const row = cell.dataset.row;
    const column = cell.dataset.column;

    if (cell.textContent !== "") {
      console.log("Space not available!");
      return;
    }

    const token = game.getActivePlayer().token;
    game.playRound(row, column);

    const playerName = game.getActivePlayer().name;
    cell.textContent = token;
    playerTurnDiv.textContent = `${playerName}'s turn..`;
  }

  boardDiv.addEventListener("click", clickHandlerBoard);
  updateScreen();
})();
