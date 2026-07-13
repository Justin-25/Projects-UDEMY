import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <div>
    <h1 className="title">My Favourite Foods</h1>
    <div className="img-container">
      <img src="https://images.yummy.ph/yummy/uploads/2019/03/sinigangbaboysamiso-recipe-1.jpg" />
      <img src="https://i2.wp.com/www.foodwithmae.com/wp-content/uploads/2019/01/BeefBulaloMaeRecipe.jpg?fit=1200%2C1180&ssl=1" />
      <img src="https://assets.unileversolutions.com/v1/85775930.jpg"/>
    </div>
  </div>,
  document.getElementById("root")
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
