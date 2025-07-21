import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Log from "./components/Log";
import { INITIAL_GAME_BOARD, PLAYERS_DATA } from "./data/game-data";
import {
  deriveActivePlayer,
  deriveGameBoard,
  deriveWinner,
} from "./utils/game-logic";

function App() {
  const [players, setPlayers] = useState(PLAYERS_DATA);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
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
    setPlayers((oldNames) => {
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
            name={PLAYERS_DATA.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onSave={handlePlayerNameChange}
          />
          <Player
            name={PLAYERS_DATA.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onSave={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver
            restart={handleRestart}
            winnerData={
              winner ? { symbol: winner, name: players[winner] } : null
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
