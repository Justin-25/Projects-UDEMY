import React from "react";
import ReactDOM from "react-dom";

const fName = "Justin"
const lName = "Mandia"
const luckyNumber = Math.floor(Math.random() * 100);

ReactDOM.render(<div>
  <h1>Hello {fName + " " +lName}!</h1>
  <div>Your lucky number is {luckyNumber}</div>
</div>, document.getElementById("root"));

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
