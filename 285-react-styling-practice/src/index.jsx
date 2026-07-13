//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser

import React from "react";
import ReactDOM from "react-dom";

let currentTime;

const customStyle = {
  color: ""
}

const hours = new Date();
const currentHours = hours.getHours()
console.log(currentHours)

function renderDay() {
  if (currentHours < 12) {
    return (
      currentTime = "Good Morning",
      customStyle.color = "red"
    );
  } else if (currentHours < 18) {
    return (
      currentTime = "Good Afternoon",
      customStyle.color = "green"
    )
  } else {
    return (
      currentTime = "Good Evening",
      customStyle.color = "blue"
    )
  }
}

renderDay()

ReactDOM.render(
  <div className="heading">
    <h1 style={customStyle}>{currentTime}</h1>
  </div>
, document.getElementById("root"))