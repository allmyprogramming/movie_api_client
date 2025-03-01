import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Token state

  // Fetch movies when the token is available
  useEffect(() => {
    if (!token) return;
 

    fetch("https://movie-api-lvgy.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` }, // Use token for authorization
    })
    .then((response) => response.json())
    .then((movies) => {
      setMovies(movies);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id, // MongoDB ID field
            title: movie.Title, // Title field from the DB
            image: movie.ImageUrl, // ImageUrl field from the DB
            director: movie.Director, // Director field from the DB
            genre: movie.Genre, // Genre field from the DB
            description: movie.Description, // Description field from the DB
          };
        });
        setMovies(moviesFromApi); // Set the movies state
      });
  }, [token]); // Depend on token to fetch movies when it changes

  // Function to handle the back click
  const handleBackClick = () => {
    setSelectedMovie(null); // Reset selected movie to null to go back to the main view
  };

  // If no user is logged in, show the login view
  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user); // Set the logged-in user
          setToken(token); // Set the token
        }}
      />
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
