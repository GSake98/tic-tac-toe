export default function Player(props) {
  return (
    <li>
      <span className="player">
        <span className="player-name">{props.name}</span>
        <span className="player-symbol">{props.symbol}</span>
      </span>
      <button id="editbtn">
        <img src="edit.png" alt="edit" />
      </button>
    </li>
  );
}
