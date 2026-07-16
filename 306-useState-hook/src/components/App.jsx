import React from "react";
import { useState } from "react";

function App() {
  const [addCount, setAddCount] = useState(0);

  function renderIncreaseCount() {
    setAddCount(addCount + 1)
  }

  function renderDecreaseCount() {
    setAddCount(addCount - 1)
  }

  return (
    <div className="container">
      <h1>{addCount}</h1>
      <button onClick={renderIncreaseCount}>+</button>
      <button onClick={renderDecreaseCount}>-</button>
    </div>
  );
}

export default App;
