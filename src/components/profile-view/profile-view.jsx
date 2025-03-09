import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, onDeregister }) => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [newUsername, setNewUsername] = useState(user.username);
    const [newPassword, setNewPassword] = useState("");
    const [newEmail, setNewEmail] = useState(user.email);
    const [newBirthday, setNewBirthday] = useState(user.birthday);
  

    useEffect(() => {
        // Fetch the user's favorite movies based on the user's favorite movie IDs
        fetch("https://movie-api-lvgy.onrender.com/movies", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => response.json())
          .then((movies) => {
            // Filter the movies to get only the user's favorite movies
            const favoriteMovies = movies.filter((movie) =>
              user.FavoriteMovies.includes(movie._id)
            );
            setFavoriteMovies(favoriteMovies);
          })
          .catch((error) => {
            console.error("Error fetching favorite movies:", error);
          });
      }, [user.FavoriteMovies, token]); // Dependencies: user.FavoriteMovies, token
    
      const handleUpdate = (event) => {
        event.preventDefault();
        const updatedUser = {
          username: newUsername,
          password: newPassword,
          email: newEmail,
          birthday: newBirthday,
        };
    
        // Update user information
        fetch(`https://movie-api-lvgy.onrender.com/users/${user._id}`, {
          method: "PUT",
          body: JSON.stringify(updatedUser),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUserInfo(data);
            alert("Profile updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
          });
      };
    
      const handleFavoriteToggle = (movieId) => {
        // Toggle favorite movie (add/remove)
        const newFavoriteMovies = user.FavoriteMovies.includes(movieId)
          ? user.FavoriteMovies.filter((id) => id !== movieId)
          : [...user.FavoriteMovies, movieId];
    
        fetch(`https://movie-api-lvgy.onrender.com/users/${user._id}/favoriteMovies`, {
          method: "PUT",
          body: JSON.stringify({ favoriteMovies: newFavoriteMovies }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then(() => {
            // Update the favorite movies list in the state
            setFavoriteMovies((prev) =>
              newFavoriteMovies.includes(movieId)
                ? [...prev, movieId]
                : prev.filter((movie) => movie._id !== movieId)
            );
          })
          .catch((error) => console.error("Error updating favorites:", error));
      };
    
      const handleDeregister = () => {
        // Handle account deregistration
        fetch(`https://movie-api-lvgy.onrender.com/users/${user._id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(() => {
            alert("Your account has been deleted.");
            onDeregister(); // Callback to reset user state in MainView
          })
          .catch((error) => console.error("Error deregistering user:", error));
      };
    
      return (
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2>User Profile</h2>
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                />
              </Form.Group>
    
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
              </Form.Group>
    
              <Form.Group controlId="formBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  value={newBirthday}
                  onChange={(e) => setNewBirthday(e.target.value)}
                />
              </Form.Group>
    
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </Form.Group>
    
              <Button type="submit" variant="primary" className="mt-3">
                Update Profile
              </Button>
            </Form>
    
            <Button variant="danger" onClick={handleDeregister} className="mt-3">
              Deregister Account
            </Button>
    
            <h3>Your Favorite Movies</h3>
            <Row>
              {favoriteMovies.length > 0 ? (
                favoriteMovies.map((movie) => (
                  <Col md={4} key={movie._id} className="mb-4">
                    <MovieCard
                      movie={movie}
                      onMovieClick={() => handleFavoriteToggle(movie._id)} // Toggle favorite
                    />
                  </Col>
                ))
              ) : (
                <p>You have no favorite movies yet.</p>
              )}
            </Row>
          </Col>
        </Row>
      );
    };