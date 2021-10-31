import { useEffect, useState } from 'react';
import PageHeading from '../../components/PageHeading/PageHeading';
import fetchMovies from '../../Services/ApiService';
import MovieList from '../../components/MovieList/MovieList';

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies
      .fetchPopularMovies()
      .then(results => setMovies(results))
      .catch(error => console.log(error));
  }, []);
  return (
    <>
      <PageHeading />
      <MovieList movies={movies} />
    </>
  );
}

export default HomePage;
