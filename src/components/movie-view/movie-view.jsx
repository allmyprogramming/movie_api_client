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
        <span>Director: </span>
        <span>{movie.director?.Name}</span> {/* Handle potential undefined */}
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre?.Name}</span> {/* Handle potential undefined */}
      </div>
      <div>
        <span>Description: </span>
        <p>{movie.description}</p>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
