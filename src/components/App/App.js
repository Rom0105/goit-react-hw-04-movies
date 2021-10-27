import { Switch, Route } from 'react-router-dom';
import style from '../App/App.module.css';
import Navigation from '../Navigation/Navigation';
import HomePage from '../views/HomePage';
import MoviesPage from '../views/MoviesPage';

function App() {
  return (
    <div className={style.container}>
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/movies" exact>
          <MoviesPage />
        </Route>
        <Route>
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
