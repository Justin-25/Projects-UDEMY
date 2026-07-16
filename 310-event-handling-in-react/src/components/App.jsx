import React from "react";
import { useState } from "react";

function App() {
  const [headingText, setHeadingText] = useState("Hello")
  const [isMouseOver, setIsMouseOver] = useState(false);

  function handleClick() {
    setHeadingText("Submitted")
  }

  function onMouseOverhandle(event) {
    setIsMouseOver(true)
    event.target.style.cursor= "pointer";
  }

  function onMouseOuthandle() {
    setIsMouseOver(false)
  }

  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button 
        style={{ background: isMouseOver ? "#000" : "#fff"}}
        onClick={handleClick} 
        onMouseOver={onMouseOverhandle} 
        onMouseOut={onMouseOuthandle}
      >Submit</button>
    </div>
  );
}

export default App;
