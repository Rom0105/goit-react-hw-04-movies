import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '28f39dee398e80aa6c8a620368a9d164';

const fetchMovies = {
  fetchPopularMovies() {
    return axios
      .get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
      .then(response => response.data.results)
      .catch(error => error);
  },

  fetchSearchMovies(querySearch) {
    return axios
      .get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&page=1&include_adult=false&query=${querySearch}`,
      )
      .then(response => response.data.results)
      .catch(error => error);
  },

  fetchMoviesById(movieId) {
    return axios
      .get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
      .then(response => response.data)
      .catch(error => error);
  },

  fetchMovieCast(movieId) {
    return axios
      .get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`)
      .then(response => response.data)
      .catch(error => error);
  },

  fetchMovieReviews(movieId) {
    return axios
      .get(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&page=1`)
      .then(response => response.data)
      .catch(error => error);
  },
};

export default fetchMovies;
