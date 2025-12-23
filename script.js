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

  const placeMark = (row, column, mark) => {
    board[row][column].addMark(mark);
  };

  return {
    printBoard,
    getBoard,
    placeMark,
  };
}

function Cell() {
  let value = "";

  const addMark = (mark) => (value = mark);

  const getValue = () => value;

  return {
    addMark,
    getValue,
  };
}

const gameController = (function () {
  const x = "X";
  const o = "O";

  const players = [
    {
      name: "Player One",
      token: 1,
      score: 0,
    },
    {
      name: "Player Two",
      token: 2,
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
      `${getActivePlayer().name} 
      is going to mark into row ${row} and column ${column}`
    );
    board.placeMark(row, column, x);
  };

  return {
    printRound,
    switchPlayerTurn,
    getActivePlayer,
    playRound,
  };
})();

gameController.printRound();
