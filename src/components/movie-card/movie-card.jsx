import React from "react";
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div className="movie-card" onClick={() => onMovieClick(movie)}>
      <div>
        <img src={movie.image} alt={movie.title} /> {/* Keeping 'image' as requested */}
      </div>
      <div>
        <h3>{movie.title}</h3>
        <p><strong>Genre:</strong> {movie.genre || "N/A"}</p>
        <p><strong>Director:</strong> {movie.director || "N/A"}</p>
      </div>
    </div>
  );
};

// Define PropTypes for validation
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string,
    director: PropTypes.string,
    image: PropTypes.string, // Keeping 'image' as it is
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
