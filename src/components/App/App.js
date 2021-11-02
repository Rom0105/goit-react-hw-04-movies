import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import style from '../App/App.module.css';

const Navigation = lazy(() =>
  import('../Navigation/Navigation' /* webpackChunkName: "navigation" */),
);
const HomePage = lazy(() =>
  import('../../views/HomePage/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('../../views/MoviesPage/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    '../../views/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);

function App() {
  return (
    <div className={style.container}>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Navigation />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
