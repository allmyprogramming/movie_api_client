import React from "react";

import PropTypes from "prop-types";
import "./movie-view.scss";


export const MovieView = ({ movie, onBackClick }) => {
  if (!movie) {
    return <div>Loading movie details...</div>;
  }

  return (
    <div>
      <div>
        <img src={movie.image} alt={movie.title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director || "N/A"}</span> {/* Avoid errors if undefined */}
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre || "N/A"}</span>
      </div>
      <div>
        <span>Description: </span>
        <p>{movie.description}</p>
      </div>
      <button onClick={onBackClick} className="back-button">
        Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string,
    director: PropTypes.string,
    image: PropTypes.string, // Keeping 'image' as it is
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};