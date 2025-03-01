import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Store login error messages

  const handleSubmit = (event) => {
    event.preventDefault();
    // this prevents the default behavior of the form which is to reload the entire page

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://movie-api-lvgy.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Set headers
      body: JSON.stringify(data), // Convert data to JSON format
    })
      .then((response) => response.json())
      .then((userData) => {
        if (userData.token) {
          onLoggedIn(userData); // Pass user data to MainView
        } else {
          setError("Invalid username or password"); // Show error if login fails
        }
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update state
          required
        />
      </label>
      <label>
        Password:
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
