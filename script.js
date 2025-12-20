// create a Gameboard object as an IIFE
const Game = (function () {
  let gameboard = [];
  let players = [];

  function init() {
    console.log("You just started the game!");
    return function displayGame() {
      if (players.length == 0) {
        console.log("No players in the game yet");
      } else {
        for (let i = 0; i < players.length; ++i) {
          console.log(`Player ${i + 1} is ${players[i]}`);
        }
      }
    };
  }

  function createUser(name) {
    const username = name;
    players.push(username);
    return name;
  }

  return {
    init,
    createUser,
    displayPlayers,
  };
})();

Game.init();
const player1 = Game.createUser("Pedro");
