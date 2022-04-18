import { useState } from "react";
import HeartWhite from "src/assets/images/icons/icon-heart-white.svg";

const MovieCard = ({ movie, handleClick }) => {
  const [showName, setShowName] = useState(false);
  return (
    <div className="movie-card" onClick={() => handleClick(movie.imdbID)}>
      <div className="like-button">
        <img src={HeartWhite} alt="" />
      </div>
      <img src={movie.Poster} alt="" />
      {showName && (
        <div className="movie-details">
          <div className="movie-title">{movie.Title}</div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
