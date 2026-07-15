import React from "react";
import { Fragment } from "react";

function Note({ notes }) {
  return (
    <>
      {notes.map((note) => {
        return (
          <div className="note" key={note.key}>
            <h1>{note.title}</h1>
            <p>{note.content}</p>
          </div>
        );
      })}
    </>
  );
}

export default Note;
