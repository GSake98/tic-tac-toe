export default function GameOver({ winnerData, restart }) {
  const { symbol, name } = winnerData ?? {};

  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winnerData ? (
        <p>
          {name} with {symbol} won!
        </p>
      ) : (
        <p> Game ended in a draw!</p>
      )}
      <button onClick={restart}>Restart</button>
    </div>
  );
}
