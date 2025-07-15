import { useState } from "react";

export default function Player(props) {
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit() {
    setIsEditing(!isEditing);
  }

  function handleSave() {
    setIsEditing(!isEditing);
  }

  return (
    <li>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{props.name}</span>
        ) : (
          <input />
        )}
        <span className="player-symbol">{props.symbol}</span>
      </span>
      {!isEditing ? (
        <button id="editbtn" onClick={handleEdit}>
          <img src="edit.png" alt="edit" />
        </button>
      ) : (
        <button id="savebtn" onClick={handleSave}>
          <img src="save.png" alt="save" />
        </button>
      )}
    </li>
  );
}
