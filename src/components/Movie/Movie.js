import defaultImage from '../../image/image.png';
import style from '../../views/MovieDetailsPage/MovieDetailsPage.module.css';

function Movie({ movie }) {
  return (
    <div className={style.container}>
      <div>
        <img
          className={style.image}
          src={
            movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : defaultImage
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
  );
}

export default Movie;
