import {
  useParams,
  NavLink,
  useRouteMatch,
  useLocation,
  Route,
  useHistory,
} from 'react-router-dom';
import { useState, useEffect, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import fetchMovies from '../../Services/ApiService';
import style from '../views/MovieDetailsPage.module.css';
import defaultImage from '../image/image.png';

const Cast = lazy(() => import('../views/Cast'));
const Reviews = lazy(() => import('../views/Reviews'));

function MovieDetailsPage() {
  const { url } = useRouteMatch();
  const location = useLocation();
  const { movieId } = useParams();
  const history = useHistory();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovies.fetchMoviesById(movieId).then(results => setMovie(results));
  }, [movieId]);

  const onBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {movie && (
        <>
          <button className={style.button} type="button" onClick={onBack}>
            Go back
          </button>

          <div className={style.container}>
            <div>
              <img
                className={style.image}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : defaultImage
                }
                alt={movie.title}
              />
            </div>
            <div className={style.items}>
              <h2 className={style.title}>{movie.title}</h2>
              <h2 className={style.subtitle}>Popularity</h2>
              <p className={style.text}>{movie.popularity}</p>
              <h2 className={style.subtitle}>Vote</h2>
              <p className={style.text}>{movie.vote_average}</p>
              <h2 className={style.subtitle}>Overview</h2>
              <p className={style.text}>{movie.overview}</p>
              <h3 className={style.subtitle}>Genres</h3>
              <ul className={style.list}>
                {movie.genres &&
                  movie.genres.map(item => (
                    <li className={style.item} key={item.id}>
                      {item.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className={style.links}>
            <NavLink
              className={style.link}
              activeClassName={style.activeLink}
              to={{
                pathname: `${url}/cast`,
                state: { ...location.state },
              }}
            >
              Cast
            </NavLink>
            <NavLink
              className={style.link}
              activeClassName={style.activeLink}
              to={{
                pathname: `${url}/reviews`,
                state: { ...location.state },
              }}
            >
              Reviews
            </NavLink>
          </div>
          <Suspense fallback={<h2>Loading...</h2>}>
            <Route path={`${url}/cast`}>
              <Cast movieId={movieId} />
            </Route>

            <Route path={`${url}/reviews`}>
              <Reviews movieId={movieId} />
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
}

MovieDetailsPage.propTypes = {
  url: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  movieId: PropTypes.object,
};

export default MovieDetailsPage;
