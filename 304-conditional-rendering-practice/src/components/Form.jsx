import React from "react";

function Form({ userIsRegistered }) {
  return (
    <form className="form">
      {userIsRegistered ? (
        <>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </>
      ) : (
        <>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <button type="submit">Register</button>
        </>
      )}
    </form>
  );
}

export default Form;
