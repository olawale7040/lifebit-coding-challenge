import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { fetchMovieDetails } from "src/slices/movies";

// Images
import backIcon from "src/assets/images/icons/icon-arrow-grey.svg";

const MovieDetails = () => {
  const dispatch = useDispatch();
  let { id } = useParams();

  // State
  const movieDetails = useSelector((state) => state.movies.movieDetails);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);
  return (
    <div>
      <div className="back-icon">
        <Link to="/" className="nav-link">
          <img src={backIcon} alt="" />
        </Link>
      </div>
      {movieDetails && (
        <div className="movie-details-container">
          <div className="movie-information">
            <div className="movie-main-title">{movieDetails.Title}</div>

            <div className="movie-plot-head">Plot</div>
            <div className="movie-plot">{movieDetails.Plot}</div>
            <div className="movie-details-info">
              <div>
                <div className="grey-head">Cast</div>
                {/* <div className="item-list">Genre</div> */}
              </div>
              <div>
                <div className="grey-head">Genre</div>
                <div className="item-list">{movieDetails.Genre}</div>
              </div>
              <div>
                <div className="grey-head">Director</div>
                <div className="item-list">{movieDetails.Director}</div>
              </div>
            </div>
          </div>
          <div>
            <img className="movie-image" src={movieDetails.Poster} alt="" />
          </div>
        </div>
      )}
      {movieDetails == null && <div className="empty-box">...Loading</div>}
    </div>
  );
};

export default MovieDetails;
