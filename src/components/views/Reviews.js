import { useState, useEffect } from 'react';

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

export default Reviews;
