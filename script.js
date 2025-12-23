// start project "Tic-Tac-Toe" from scratch
const gameBoard = (function () {
  const board = [];

  const getBoard = () => board;

  return {
    getBoard,
  };
})();

const gameController = (function () {
  const players = [
    { name: "Number One", score: 0 },
    {
      name: "Number Two",
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
