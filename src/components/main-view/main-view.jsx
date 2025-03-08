import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);




  useEffect(() => {
    if (!token) return;

    fetch("https://movie-api-lvgy.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          image: movie.ImageUrl,
          director: movie.Director,
          genre: movie.Genre,
          description: movie.Description,
        }));

        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <BrowserRouter>
    <Row className="justify-content-md-center">
      {!user ? (
        
        <Col md={5}>
          <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} />
          <SignupView />
          </Col>
        
      ) : selectedMovie ? (
        <Col md={8} style={{ border: "1px solid black" }}>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
            <MovieCard key={movie.id} movie={movie} onMovieClick={() => setSelectedMovie(movie)} /> </Col>
          ))}
        </>
      )}
    </Row>
    </BrowserRouter>
  );
};

/*
  // Function to handle the back click
  const handleBackClick = () => {
    setSelectedMovie(null); // Reset selected movie to null to go back to the main view
  };

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }

  // If a movie is selected, show the MovieView
  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={handleBackClick} />;
  }

  // If no movies are fetched, show a message
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movie-api-lvgy.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, [token]);

  // Otherwise, show the list of movie cards
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie} // Pass the movie data to MovieCard
          onMovieClick={() => {
            setSelectedMovie(movie); // Set the selected movie when clicked
          }}
        />
      ))}
    </div>
  );
};
*/