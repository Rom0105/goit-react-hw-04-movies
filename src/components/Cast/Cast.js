import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchMovies from '../../Services/ApiService';
import style from './Cast.module.css';
import defaultImage from '../../image/image.png';

function Cast({ movieId }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovies
      .fetchMovieCast(movieId)
      .then(({ cast }) => setCast(cast))
      .catch(error => console.log(error));
  }, [movieId]);

  return (
    <>
      {cast.length > 0 ? (
        <div className={style.container}>
          <ul className={style.items}>
            {cast.map(({ id, name, profile_path, character }) => (
              <li className={style.item} key={id}>
                {
                  <img
                    src={
                      profile_path ? `https://image.tmdb.org/t/p/w200${profile_path}` : defaultImage
                    }
                    alt={name}
                    width="175px"
                  />
                }
                <p>{name}</p>
                {character && <p>Character: {character}</p>}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>not found any cast info</p>
      )}
    </>
  );
}

Cast.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      profile_path: PropTypes.string,
      character: PropTypes.string,
    }),
  ),
};

export default Cast;
