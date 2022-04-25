import HeartWhite from "src/assets/images/icons/icon-heart-white.svg";

const MovieCard = ({ movie, handleClick, hoverMovie, handleMouseOver }) => {
  return (
    <div
      className="movie-card"
      onClick={() => handleClick(movie.imdbID)}
      onMouseOver={() => handleMouseOver(movie.imdbID)}
    >
      <div className="like-button">
        <img src={HeartWhite} alt="" />
      </div>
      <img src={movie.Poster} alt="" />
      {hoverMovie === movie.imdbID && (
        <div className="movie-details">
          <div className="movie-title">{movie.Title}</div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
