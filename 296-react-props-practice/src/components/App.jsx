import React from "react";
import { Card } from "./Card";
import { contacts } from "../contacts"

function App() {
  return (
    <div>
      <Card
        contacts={contacts}
      />
    </div>
  );
}

export default App;
