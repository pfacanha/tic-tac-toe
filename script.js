// create a Gameboard object as an IIFE
const Game = (function () {
  let gameboard = [];
  let players = [];

  function init() {
    console.log("You just started the game!");
  }

  function createUser(name) {
    const username = name;
    players.push(username);
    return name;
  }

  function displayPlayers() {
    for (let i = 0; i < players.length; ++i) {
      console.log(`Player ${i + 1} is ${players[i]}`);
    }
  }

  return {
    init,
    createUser,
    displayPlayers,
  };
})();

Game.init();
const player1 = Game.createUser("Pedro");
console.log(player1);
Game.displayPlayers();
