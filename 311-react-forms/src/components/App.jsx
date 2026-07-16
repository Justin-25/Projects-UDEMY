import React from "react";
import { useState } from "react";

function App() {
  const [headingText, setHeadingText] = useState("")
  const [submitButton, setSubmitButton] = useState("")

  function handleEvent(event) {
    setHeadingText(event.target.value);
  }
  console.log(headingText)

  function handleClick() {
    setSubmitButton(headingText)
  }

  return (
    <div className="container">
      <h1>Hello {submitButton}</h1>
      <input type="text" onChange={handleEvent} placeholder="What's your name?" />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default App;
