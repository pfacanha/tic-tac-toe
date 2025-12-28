// start project "Tic-Tac-Toe" from scratch
function Gameboard() {
  let spots = 9;
  const board = [];

  for (let i = 0; i < spots; ++i) {
    board[i] = Cell();
  }

  const printBoard = () => console.log(board);

  const getBoard = () => {
    return board.map((cell) => cell.getValue());
  };

  const placeMark = (spot, token) => {
    board[spot].setMark(token);
  };

  const isAvailable = (spot) => {
    return board[spot].getValue() === "";
  };

  return {
    printBoard,
    getBoard,
    placeMark,
    isAvailable,
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

function GameController(maxRounds) {
  const players = [
    {
      name: "Player One",
      token: "X",
      attempts: 0,
      points: 0,
    },
    {
      name: "Player Two",
      token: "O",
      attempts: 0,
      points: 0,
    },
  ];

  const board = Gameboard();

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printRound = () => {
    if (getActivePlayer().attempts == 0) {
      console.log(`This is ${getActivePlayer().name}'s first turn.`);
    } else {
      console.log(`Now it's another turn for ${getActivePlayer().name}`);
    }
  };

  const playRound = (spot) => {
    if (board.isAvailable(spot)) {
      board.placeMark(spot, activePlayer.token);

      console.log(`Spot ${spot} was marked with ${getActivePlayer().token}`);
      getActivePlayer().attempts++;

      console.log(
        `${getActivePlayer().name} has ${
          maxRounds - getActivePlayer().attempts
        } attempts left`
      );

      switchPlayerTurn();
      printRound();
    } else {
      console.log("Space not available!");
      return;
    }
  };

  printRound();

  return {
    printRound,
    playRound,
    switchPlayerTurn,
    getActivePlayer,
    getBoard: board.getBoard,
  };
}

const screenController = (function () {
  const game = GameController(5);
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = game.getBoard();
    let activePlayer = game.getActivePlayer();
    playerTurnDiv.textContent = `${activePlayer.name}'s turn..`;

    board.forEach((_, index) => {
      const cellButton = document.createElement("button");

      cellButton.classList.add("cell");
      cellButton.dataset.spot = index;

      boardDiv.appendChild(cellButton);
    });
  };

  function clickHandlerBoard(e) {
    const cell = e.target;
    const spot = cell.dataset.spot;

    if (cell.textContent !== "") {
      console.log("Space not available!");
      return;
    }

    const token = game.getActivePlayer().token;
    game.playRound(spot);

    const playerName = game.getActivePlayer().name;
    cell.textContent = token;
    playerTurnDiv.textContent = `${playerName}'s turn..`;
  }

  boardDiv.addEventListener("click", clickHandlerBoard);

  updateScreen();
})();
