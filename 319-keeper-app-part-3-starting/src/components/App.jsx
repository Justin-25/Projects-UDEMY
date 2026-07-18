import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useState } from "react";

function App() {
  const [addNote, setAddNote] = useState({
    title: "",
    content: "",
  });
  const [listNote, setListNote] = useState([]);

  function handleNote(event) {
    const { name, value } = event.target;
    setAddNote((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleAddNote(event) {
    setListNote((prev) => {
      return [...prev, addNote];
    });

    setAddNote({
      title: "",
      content: "",
    });

    event.preventDefault();
  }

  function onDeleteNotes(id) {
    setListNote((prev) => {
      return prev.filter((item, index) => {
        return index !== id
      })
    })
  }

  return (
    <div>
      <Header />
      <CreateArea
        addNote={addNote}
        handleNote={handleNote} 
        handleAddNote={handleAddNote} 
      />
      {listNote.map((item, index) => {
        return (
          <Note
            key={index}
            id={index}
            item={item}
            onDeleteNotes={onDeleteNotes}
            title="Note title"
            content="Note content"
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
