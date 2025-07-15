import { useState } from "react";

export default function Player(props) {
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit() {
    setIsEditing((editing) => !editing);
  }

  function handleSave() {
    setIsEditing((editing) => !editing);
  }

  var playerName = <span className="player-name">{props.name}</span>;
  var buttonIcon = (
    <button id="editbtn" onClick={handleEdit}>
      <img src="edit.png" alt="edit" />
    </button>
  );

  if (isEditing) {
    playerName = <input type="text" required value={props.name} />;
    buttonIcon = (
      <button id="savebtn" onClick={handleSave}>
        <img src="save.png" alt="save" />
      </button>
    );
  }

  return (
    <li>
      <span className="player">
        {playerName}
        <span className="player-symbol">{props.symbol}</span>
      </span>
      {buttonIcon}
    </li>
  );
}
