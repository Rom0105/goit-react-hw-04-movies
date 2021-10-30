import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import fetchMovies from '../../Services/ApiService';

function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovies.fetchMovieReviews(movieId).then(({ results }) => setReviews(results));
  }, [movieId]);

  return (
    <>
      {reviews.length !== 0 ? (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <p>Author: {author}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>not found reviews</p>
      )}
    </>
  );
}

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      author: PropTypes.string,
      content: PropTypes.string,
    }),
  ),
};

export default Reviews;
