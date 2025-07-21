import { INITIAL_GAME_BOARD, WINNING_COMBINATIONS } from "../data/game-data";

export function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  currentPlayer =
    gameTurns.length > 0 && gameTurns[0].player === "X" ? "O" : "X";

  return currentPlayer;
}

export function deriveGameBoard(gameTurns) {
  let gameBoard = structuredClone(INITIAL_GAME_BOARD);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

export function deriveWinner(gameBoard) {
  let winner;

  for (var combination of WINNING_COMBINATIONS) {
    var firstSquare = gameBoard[combination[0].row][combination[0].column];
    var secondSquare = gameBoard[combination[1].row][combination[1].column];
    var thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      secondSquare === thirdSquare
    ) {
      winner = firstSquare;
    }
  }

  return winner;
}
