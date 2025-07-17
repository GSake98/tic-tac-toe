import { useState } from "react";

export default function Player({ name, symbol, isActive }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit() {
    setIsEditing((editing) => !editing);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  var editablePlayerName = <span className="player-name">{playerName}</span>;
  var buttonIcon = (
    <button id="editbtn" onClick={handleEdit}>
      <img src="edit.png" alt="edit" />
    </button>
  );

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    buttonIcon = (
      <button id="savebtn" onClick={handleEdit}>
        <img src="save.png" alt="save" />
      </button>
    );
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      {buttonIcon}
    </li>
  );
}
