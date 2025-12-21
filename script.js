// create a Gameboard object as an IIFE
const Game = (function (maxRounds) {
  let gameboard = [];
  let players = [];
  let rounds = 0;

  const displayPlayers = () => {
    if (players.length == 0) {
      console.log("No players in the game yet");
    } else {
      console.log(players);
    }
  };

  function init() {
    console.log("You just started the game!");
    console.log(`${rounds} rounds were played so far!`);
    displayPlayers();
  }

  function createUser(name) {
    players.push(name);
    return name;
  }

  const play = () => {
    if (rounds < maxRounds) rounds++;
    console.log(`Round ${rounds} was played!`);
  };

  return {
    init,
    createUser,
    play,
  };
})(5);

const player1 = Game.createUser("Pedro");
Game.init();
player1.play();
