// create a Gameboard object as an IIFE
const Game = (function (maxRounds) {
  let gameboard = [];
  let players = [];
  let rounds = 0;

  function init() {
    console.log("You just started the game!");
    console.log(`${rounds} rounds were played so far!`);
    displayPlayers();
  }

  const createPlayer = (name) => {
    return {
      name,
      score: 0,
      scoreUp: function () {
        ++this.score;
      },
    };
  };

  function addPlayer(name) {
    const player = createPlayer(name);
    players.push(player);
    return player;
  }

  const displayPlayers = () => {
    if (players.length == 0) {
      console.log("No players in the game yet");
    } else {
      console.log(players);
    }
  };

  const play = () => {
    if (rounds < maxRounds) rounds++;
    console.log(`Round ${rounds} was played!`);
  };

  return {
    init,
    addPlayer,
    play,
  };
})(5);

const player1 = Game.createPlayer("Pedro");
Game.init();
