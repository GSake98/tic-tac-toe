import { useState } from "react";

const INITIAL_GAME_BOARD = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

export default function GameBoard() {
  const [gameBoard, setGameBoard] = useState(INITIAL_GAME_BOARD);

  function handleSelection(rowIndex, colIndex, playerSymbol) {
    setGameBoard((prevGameBoard) => {
      var updatedBoard = prevGameBoard.map((innerArray) => [...innerArray]);
      updatedBoard[rowIndex][colIndex] = "X";
      return updatedBoard;
    });
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelection(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
