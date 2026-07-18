import React from "react";

function Note({
  id,
  item,
  onDeleteNotes
}) {
  return (
    <div className="note">
      <h1>{item.title}</h1>
      <p>{item.content}</p>
      <button onClick={() => {
        onDeleteNotes(id)
      }}>DELETE</button>
    </div>
  );
}

export default Note;
