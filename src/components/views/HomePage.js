import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PageHeading from '../PageHeading/PageHeading';
import fetchMovies from '../../Services/ApiService';
import styles from '../views/HomePage.module.css';

function HomePage() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies.fetchPopularMovies().then(results => setMovies(results));
  }, []);
  return (
    <>
      <PageHeading />
      <ul>
        {movies &&
          movies.map(({ id, title }) => (
            <li key={id} className={styles.link}>
              <NavLink
                to={{
                  pathname: `movies/${id}`,
                  state: { from: location },
                }}
              >
                {title}
              </NavLink>
            </li>
          ))}
      </ul>
    </>
  );
}

export default HomePage;
