import React from "react";

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
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
