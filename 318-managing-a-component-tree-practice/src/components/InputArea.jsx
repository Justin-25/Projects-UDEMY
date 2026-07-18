import React from "react";

function InputArea({ 
  addItem, 
  inputText, 
  handleChange 
}) {
  return (
    <div className="form">
      <input onChange={handleChange} type="text" value={inputText} />
      <button
        onClick={addItem}
      >
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
