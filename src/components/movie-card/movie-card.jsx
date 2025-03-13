import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router";

export const MovieCard = ({ movie }) => {

  const [isFavorite, setIsFavorite] = useState(movie.isFavorite || false);

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };


  return (

    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} alt={movie.title} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>

        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="primary">View Details
          </Button>
        </Link>

        <Button
          variant="secondary"
          onClick={handleToggleFavorite} // Handles favorite toggle
          className="mt-2"
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>

      </Card.Body>
    </Card>
  );
};


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
