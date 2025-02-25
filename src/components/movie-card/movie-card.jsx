export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie); // Trigger the onMovieClick callback when a card is clicked
      }}
    >
      {movie.title}
    </div>
  );
};
