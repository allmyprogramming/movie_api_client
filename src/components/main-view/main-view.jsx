import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
const [token, setToken] = useState(() => localStorage.getItem("token"));


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
