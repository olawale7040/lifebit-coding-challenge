import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchMovies } from "src/slices/movies";

import searchIcon from "src/assets/images/icons/icon-magnifier-grey.svg";
import emptyStateImage from "src/assets/images/illustrations/illustration-empty-state.png";
import MovieCard from "src/components/MovieCard";

const HomePage = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  // Navigate
  const navigate = useNavigate();
  // State
  const { movies, error } = useSelector((state) => state.movies);

  if (searchText.length > 3) {
    dispatch(fetchMovies(searchText));
  }

  const handleClick = (id) => {
    navigate(`details/${id}`);
  };
  return (
    <section className="main-content">
      <div className="content-wrapper">
        <div className="search-container">
          <div className="div-search-btn">
            <img src={searchIcon} alt="Search Icon" />
          </div>
          <input
            type="text"
            className="search-text-box"
            placeholder="Search Movies..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        {!searchText && (
          <div className="empty-container">
            <div>
              <img src={emptyStateImage} alt="" />
            </div>
            <div className="information-text">Don't know what to search?</div>
            <div className="information-text-grey">
              Here's an offer you can't refuse
            </div>
          </div>
        )}
        {searchText && movies.length > 0 && (
          <div className="movies-list-container">
            {movies.map((movie) => (
              <MovieCard
                movie={movie}
                handleClick={handleClick}
                key={movie.imdbID}
              />
            ))}
          </div>
        )}
        {error && <div className="empty-box">{error}</div>}
      </div>
    </section>
  );
};

export default HomePage;
