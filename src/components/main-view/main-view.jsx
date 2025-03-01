import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch movies from the API
    fetch("https://movie-api-lvgy.onrender.com/movies")
      .then((response) => response.json())
      .then((data) => {
        // Map through the data and format it
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
      })
      .catch((error) => {
        console.error("Error fetching movies:", error); // Handle errors
      });
  }, []); // Empty dependency array to run only once on component mount

  // Function to handle the back click
  const handleBackClick = () => {
    setSelectedMovie(null); // Reset selected movie to null to go back to the main view
  };

  if (!user) {
    return <LoginView />;
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
