// create a Gameboard object as an IIFE
const Game = (function () {
  let gameboard = [];
  let players = [];
  let count = 0;

  function init() {
    console.log("You just started the game!");
    console.log(`${count} rounds were played so far!`);
    function displayGame() {
      if (players.length == 0) {
        console.log("No players in the game yet");
      } else {
        for (let i = 0; i < players.length; ++i) {
          console.log(`Player ${i + 1} is ${players[i]}`);
        }
      }
    }
    displayGame();
  }

  function createUser(name) {
    players.push(name);
    return name;
  }

  const playRound = () => count++;

  return {
    init,
    createUser,
    playRound,
  };
})();

Game.init();
const player1 = Game.createUser("Pedro");
console.log(`${player1} is the player`);
console.log(Game.count);
