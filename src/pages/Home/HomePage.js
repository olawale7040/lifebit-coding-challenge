import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchMovies } from "src/slices/movies";

import searchIcon from "src/assets/images/icons/icon-magnifier-grey.svg";
import emptyStateImage from "src/assets/images/illustrations/illustration-empty-state.png";
import MovieCard from "src/components/MovieCard";

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const HomePage = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [hoverMovie, setHoverMovie] = useState(0);
  const debounceResult = useRef();

  // Navigate
  const navigate = useNavigate();
  // State
  const { movies, error, loading } = useSelector((state) => state.movies);

  const handleClick = (id) => {
    navigate(`details/${id}`);
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
    debounceResult.current(e);
  };
  const handleMouseOver = (id) => {
    setHoverMovie(id);
  };

  useEffect(() => {
    debounceResult.current = debounce((e) => {
      dispatch(fetchMovies(e.target.value));
    }, 2000);
  }, [dispatch]);
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
            onChange={handleChange}
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
                hoverMovie={hoverMovie}
                handleMouseOver={handleMouseOver}
              />
            ))}
          </div>
        )}
        {error && movies.length === 0 && (
          <div className="empty-box">{error}</div>
        )}
        {loading && <div className="empty-box">Loading...</div>}
      </div>
    </section>
  );
};

export default HomePage;
