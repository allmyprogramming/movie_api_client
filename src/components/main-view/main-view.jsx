import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Shawshank Redemption",
      image:
        "https://m.media-amazon.com/images/I/71KJTxW1yML._AC_SY679_.jpg",
      director: "Frank Darabont"
    },
    {
      id: 2,
      title: "Tenet",
      image:
        "https://m.media-amazon.com/images/I/91JmduXIc+L._AC_SY679_.jpg",
      director: "Christopher Nolan"
    },
    {
      id: 3,
      title: "Inception",
      image:
        "https://m.media-amazon.com/images/I/91X1hI3FqSL._AC_SY679_.jpg",
      director: "Christopher Nolan"
    },
    {
      id: 4,
      title: "Dunkirk",
      image:
        "https://m.media-amazon.com/images/I/91hMDezAxRL._AC_SY679_.jpg",
      director: "Christopher Nolan"
    },
    {
      id: 5,
      title: "The Prestige",
      image:
        "https://m.media-amazon.com/images/I/51L2H+7GzHL._AC_SY679_.jpg",
      director: "Christopher Nolan"
    },
    {
      id: 6,
      title: "The Dark Knight",
      image:
        "https://m.media-amazon.com/images/I/71cDDqyoEgL._AC_SY679_.jpg",
      director: "Christopher Nolan"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  // Function to handle the back click
  const handleBackClick = () => {
    setSelectedMovie(null); // Reset selected movie to null to go back to the main view
  };

  // If a movie is selected, show the MovieView
  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={handleBackClick} />;
  }

  // If no movies, show a message
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  // Otherwise, show the list of movie cards
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={() => {
            setSelectedMovie(movie); // Set selected movie when clicked
          }}
        />
      ))}
    </div>
  );
};
