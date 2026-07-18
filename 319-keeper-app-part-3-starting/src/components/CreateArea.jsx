import React from "react";

function CreateArea({
  addNote,
  handleAddNote,
  handleNote
}) {
  return (
    <div>
      <form>
        <input onChange={handleNote} name="title" value={addNote.title} placeholder="Title" />
        <textarea onChange={handleNote} name="content" value={addNote.content} placeholder="Take a note..." rows="3" />
        <button onClick={handleAddNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
