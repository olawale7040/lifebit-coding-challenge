import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
const initialState = {
  movies: [],
  movieDetails: null,
  error: null,
};

const slice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    fetchMovies(state, action) {
      const { payload } = action;
      state.movies = payload;
    },
    fetchMovieDetails(state, action) {
      const { payload } = action;
      state.movieDetails = payload;
    },
    createError(state, action) {
      state.error = action.payload;
    },
  },
});

export const reducer = slice.reducer;

export const fetchMovies = (searchText) => async (dispatch) => {
  try {
    const response = await Axios.get(
      `http://www.omdbapi.com/?s=${searchText}&apikey=46b69003&plot=full`
    );
    console.log(response, "response....");
    if (response.status === 200 && response.data.Search) {
      dispatch(slice.actions.fetchMovies(response.data.Search));
    }
    if (response.status === 200 && response.data.Error) {
      dispatch(slice.actions.createError(response.data.Error));
    }
  } catch (err) {
    return err.message;
  }
};

export const fetchMovieDetails = (id) => async (dispatch) => {
  try {
    dispatch(slice.actions.fetchMovieDetails(null));
    const response = await Axios.get(
      `http://www.omdbapi.com/?i=${id}&apikey=46b69003&plot=full`
    );
    console.log(response, "response....");
    if (response.status === 200) {
      dispatch(slice.actions.fetchMovieDetails(response.data));
    }
  } catch (err) {
    return err.message;
  }
};
