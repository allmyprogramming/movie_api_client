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
      director: "Frank Darabont",
      genre: "Drama",
      description:"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
    },
    {
      id: 2,
      title: "Tenet",
      image:
        "https://m.media-amazon.com/images/I/91JmduXIc+L._AC_SY679_.jpg",
      director: "Christopher Nolan",
      genre: "Action, Sci-Fi",
      description:"A secret agent embarks on a dangerous, time-bending mission to prevent the onset of World War III."
    },
    {
      id: 3,
      title: "Inception",
      image:
        "https://m.media-amazon.com/images/I/91X1hI3FqSL._AC_SY679_.jpg",
      director: "Christopher Nolan",
      genre: "Action, Adventure, Sci-Fi",
      description:"A thief who enters the dreams of others to steal secrets from their subconscious is given the task of planting an idea into the mind of a CEO."
    },
    {
      id: 4,
      title: "Dunkirk",
      image:
        "https://m.media-amazon.com/images/I/91hMDezAxRL._AC_SY679_.jpg",
      director: "Christopher Nolan",
      genre: "Action, Drama, History",
      description:"Allied soldiers from Belgium, the British Empire, and France are surrounded by the German army and evacuated during a fierce battle in World War II."
    },
    {
      id: 5,
      title: "The Prestige",
      image:
        "https://m.media-amazon.com/images/I/51L2H+7GzHL._AC_SY679_.jpg",
      director: "Christopher Nolan",
      genre: "Drama, Mystery, Sci-Fi",
      description:"Two magicians engage in a bitter rivalry, each trying to best the other's tricks in a battle for supremacy, which leads to shocking consequences."
    },
    {
      id: 6,
      title: "The Dark Knight",
      image:
        "https://m.media-amazon.com/images/I/71cDDqyoEgL._AC_SY679_.jpg",
      director: "Christopher Nolan",
      genre: "Action, Crime, Drama",
      description:"When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, forcing Batman to come out of retirement."
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
