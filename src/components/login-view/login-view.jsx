import React, { useState } from "react";
import PropTypes from "prop-types";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // this prevents the default behavior of the form which is to reload the entire page

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://movie-api-lvgy.onrender.com/login", {
        method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            onLoggedIn(data.user, data.token);
          } else {
            alert("No such user");
          }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
    };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update state
          required
        />
      </label>
      <label>
        password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update state
          required
        />
       </label>
      <button type="submit">Submit</button>
    </form>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
