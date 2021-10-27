import axios from 'axios';
import { BASE_URL, API_KEY } from '../services/Keys';

axios.defaults.baseURL = BASE_URL;

export async function fetchPopularMovies(page) {
  const url = `/trending/all/day?api_key=${API_KEY}&page=${page}`;
  const { data } = await axios.get(url);
  return data;
}

export async function fetchSearchMovies(searchQuery, page) {
  const url = `/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}&language=en-US&include_adult=false`;
  const { data } = await axios.get(url);
  return data;
}

export async function fetchMovieInformation(movieId) {
  const url = `/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
  const { data } = await axios.get(url);
  return data;
}

export async function fetchCastInformation(movieId) {
  const url = `/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
  const { data } = await axios.get(url);
  return data.cast;
}

export async function fetchReviews(movieId) {
  const url = `/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`;
  const { data } = await axios.get(url);
  return data.results;
}
