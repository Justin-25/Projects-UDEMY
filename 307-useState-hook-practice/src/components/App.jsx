import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  let time = new Date().toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState("Time");

  function renderTime() {
    setCurrentTime(time);
  }
  setInterval(() => {
    renderTime();
  }, 1000);

  return (
    <div className="container">
      <h1>{currentTime}</h1>
      <button onClick={renderTime}>Get Time</button>
    </div>
  );
}

export default App;
