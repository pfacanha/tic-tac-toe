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

const gameController = (function (maxRounds) {
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
      board.placeMark(row, column, getActivePlayer().token);

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
    } else {
      console.log(
        `${getActivePlayer().name} tried to mark at space not available!`
      );
    }

    switchPlayerTurn();
    printRound();
  };

  printRound();

  return {
    printRound,
    playRound,
    switchPlayerTurn,
    getActivePlayer,
    getBoard: board.getBoard,
  };
})(5);

gameController.playRound(1, 1);
