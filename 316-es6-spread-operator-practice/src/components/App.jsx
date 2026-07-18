import React, { useState } from "react";

function App() {
  const [newList, setNewList] = useState({
    listItem: ""
  })
  const [submit, setSubmit] = useState([])


  function handleItem(event) {
    const {name, value} = event.target;

    setNewList(() => {
      return {
        [name]: value
      }
    })
  }

  function handleSubmit() {
    setSubmit((prev) => {
      return [
        ...prev,
        newList.listItem
      ]
    });

    setNewList({listItem: ""})
  }
  
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" onChange={handleItem} name="listItem" value={newList.listItem} />
        <button onClick={handleSubmit}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {submit.map((item) => {
            return (
              <li key={item}>{item}</li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
