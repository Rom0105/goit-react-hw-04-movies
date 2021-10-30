import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PageHeading from '../PageHeading/PageHeading';
import fetchMovies from '../../Services/ApiService';
import styles from '../views/HomePage.module.css';
import defaultImage from '../image/image.png';

function HomePage() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies.fetchPopularMovies().then(results => setMovies(results));
  }, []);
  return (
    <>
      <PageHeading />
      <ul className={styles.items}>
        {movies &&
          movies.map(({ id, title, poster_path, vote_average, name }) => (
            <li key={id} className={styles.links}>
              <NavLink
                className={styles.link}
                to={{
                  pathname: `/movies/${id}`,
                  state: { ...location.state },
                }}
              >
                <img
                  className={styles.image}
                  src={
                    poster_path ? `https://image.tmdb.org/t/p/w300/${poster_path}` : defaultImage
                  }
                  alt={title}
                />
                <div className={styles.text}>
                  <span>
                    {title} {name}
                  </span>
                  <span>{vote_average}</span>
                </div>
              </NavLink>
            </li>
          ))}
      </ul>
    </>
  );
}

export default HomePage;
