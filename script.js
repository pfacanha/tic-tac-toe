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

  const getBoard = () => board;

  const placeMark = (row, column, token) => {
    const cell = board[row][column];
    cell.setMark(token);
    return cell;
  };

  return {
    printBoard,
    getBoard,
    placeMark,
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

const gameController = (function () {
  const players = [
    {
      name: "Player One",
      token: "X",
      score: 0,
    },
    {
      name: "Player Two",
      token: "O",
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
    console.log(`This is ${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    console.log(
      `${
        getActivePlayer().name
      } is going to mark into row ${row} and column ${column}`
    );
    const cell = board.placeMark(row, column, activePlayer.token);
    console.log(
      `Row ${row} and Column ${column} was marked with ${cell.getValue()}`
    );
  };

  return {
    printRound,
    switchPlayerTurn,
    getActivePlayer,
    playRound,
  };
})();

gameController.printRound();
gameController.playRound(0, 0);
gameController.switchPlayerTurn();
const gameboard = Gameboard();
console.table(gameboard.getBoard());
