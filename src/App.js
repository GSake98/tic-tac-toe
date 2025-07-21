import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Log from "./components/Log";
import { WINNING_COMBINATIONS, INITIAL_GAME_BOARD } from "./board-data";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  currentPlayer =
    gameTurns.length > 0 && gameTurns[0].player === "X" ? "O" : "X";

  return currentPlayer;
}

function App() {
  const [currentPlayerName, setCurrentPlayerName] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = structuredClone(INITIAL_GAME_BOARD);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner = null;

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

  const hasDraw =
    gameTurns.length === INITIAL_GAME_BOARD.flat().length && !winner;

  function handleSelection(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setCurrentPlayerName((oldNames) => {
      return {
        ...oldNames,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onSave={handlePlayerNameChange}
          />
          <Player
            name="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onSave={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver
            restart={handleRestart}
            winnerData={
              winner
                ? { symbol: winner, name: currentPlayerName[winner] }
                : null
            }
          />
        )}
        <GameBoard onSelection={handleSelection} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
