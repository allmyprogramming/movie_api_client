export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.image} alt={`Cover of ${movie.title}`} />
        </div>
        <div>
          <h2>{movie.title}</h2>
          <div>
            <span>Author: </span>
            <span>{movie.author}</span>
          </div>
        </div>
        <button onClick={onBackClick}>Back</button> {/* Trigger the onBackClick */}
      </div>
    );
  };
  