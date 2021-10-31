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
import style from '../MovieDetailsPage/MovieDetailsPage.module.css';
import OnBack from '../../components/OnBack/OnBack';
import Movie from '../../components/Movie/Movie';

const Cast = lazy(() => import('../../components/Cast/Cast'));
const Reviews = lazy(() => import('../../components/Reviews/Reviews'));

function MovieDetailsPage() {
  const { url } = useRouteMatch();
  const location = useLocation();
  const { movieId } = useParams();
  const history = useHistory();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovies
      .fetchMoviesById(movieId)
      .then(results => setMovie(results))
      .catch(error => console.log(error));
  }, [movieId]);

  const onBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {movie && (
        <>
          <OnBack onBack={onBack} />
          <Movie movie={movie} />
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
