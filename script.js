// start project "Tic-Tac-Toe" from scratch
function GameBoard() {
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
  const players = [
    { name: "Player One", score: 0 },
    {
      name: "Player Two",
      score: 0,
    },
  ];

  const displayPlayers = () =>
    players.forEach((player) => console.log(player.name));

  return {
    displayPlayers,
  };
})();

gameController.displayPlayers();
