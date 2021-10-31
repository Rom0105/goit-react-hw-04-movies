import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import styles from '../../components/MovieList/MovieList.module.css';
import defaultImage from '../../image/image.png';

function MovieList({ movies }) {
  const location = useLocation();

  return (
    <>
      <ul className={styles.items}>
        {movies &&
          movies.map(({ id, title, poster_path, vote_average }) => (
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

MovieList.propTypes = {
  id: PropTypes.number,
  poster_path: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  vote_average: PropTypes.string,
};

export default MovieList;
