import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import style from '../App/App.module.css';

const Navigation = lazy(() => import('../Navigation/Navigation'));
const HomePage = lazy(() => import('../views/HomePage'));
const MoviesPage = lazy(() => import('../views/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../views/MovieDetailsPage'));

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

          <Route>
            <HomePage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
