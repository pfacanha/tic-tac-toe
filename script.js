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
    if (activePlayer.attempts > 1) {
      console.log(`Now it's another round for ${activePlayer.name}`);
    }
    console.log(`This is ${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    if (board.isAvailable(row, column)) {
      board.placeMark(row, column, activePlayer.token);
      console.log(
        `Row ${row} and Column ${column} was marked with ${activePlayer.token}`
      );
      activePlayer.attempts++;
      console.log(
        `Now ${activePlayer.name} has ${
          maxRounds - activePlayer.attempts
        } attempts left`
      );
    } else {
      console.log(`${activePlayer.name} tried to mark at space not available!`);
    }
  };

  return {
    printRound,
    switchPlayerTurn,
    getActivePlayer,
    playRound,
  };
})(5);

gameController.printRound();
gameController.playRound(0, 0);
gameController.switchPlayerTurn();
gameController.printRound();
gameController.playRound(0, 0);
gameController.printRound();
gameController.playRound(1, 1);
