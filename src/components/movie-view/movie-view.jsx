import React from "react";

export const MovieView = ({ movie, onBackClick }) => {
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
        <span>Director: </span> {/* Updated to Director */}
        <span>{movie.director}</span> {/* Updated to director */}
      </div>
      <button onClick={onBackClick}>Back</button> {/* Trigger the onBackClick */}
    </div>
  );
};
