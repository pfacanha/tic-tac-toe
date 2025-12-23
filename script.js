// start project "Tic-Tac-Toe" from scratch
const Gameboard = {
  board: [],
};

const players = [];

function createPlayer(name) {
  return {
    name,
  };
}

function addPlayer(player) {
  players.push(player);
}

const player1 = createPlayer("Pedro");
