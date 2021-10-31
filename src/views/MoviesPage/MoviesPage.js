import { useState, useEffect } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchMovies from '../../Services/ApiService';
import styles from '../MoviesPage/MoviesPage.module.css';
import defaultImage from '../../image/image.png';

function MoviesPage() {
  const location = useLocation();
  const { search, pathname } = useLocation();
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [movie, setMovie] = useState([]);

  const queryValue = new URLSearchParams(search).get('query');

  useEffect(() => {
    if (search === '') {
      return;
    }

    if (!queryValue) {
      return;
    }

    fetchMovies
      .fetchSearchMovies(queryValue)
      .then(results => setMovie(results))
      .finally(setSearchQuery(''))
      .catch(error => console.log(error));

    history.push({ search: `query=${queryValue}` });
  }, [history, queryValue, search]);

  const handleQueryChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    history.push({ ...location, search: `query=${searchQuery}` });
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <button className={styles.button} type="submit">
          <span>Search</span>
        </button>

        <input
          className={styles.input}
          type="text"
          autoComplete="on"
          autoFocus
          placeholder="Search movies"
          value={searchQuery}
          onChange={handleQueryChange}
        />
      </form>

      <ul className={styles.items}>
        {movie.map(({ id, title, poster_path, vote_average }) => (
          <li key={id} className={styles.links}>
            <NavLink
              className={styles.link}
              to={{
                pathname: `${pathname}/${id}`,
                state: { from: location },
              }}
            >
              <img
                className={styles.image}
                src={poster_path ? `https://image.tmdb.org/t/p/w300/${poster_path}` : defaultImage}
                alt={title}
              />
              <div className={styles.text}>
                <span>{title}</span>
                <span>{vote_average}</span>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}

MoviesPage.propTypes = {
  id: PropTypes.number,
  poster_path: PropTypes.string,
  title: PropTypes.string,
  vote_average: PropTypes.string,
};

export default MoviesPage;
