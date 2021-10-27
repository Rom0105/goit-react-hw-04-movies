import styles from '../views/MoviesPage.module.css';

function MoviesPage() {
  return (
    <form className={styles.form}>
      <button className={styles.button} type="submit">
        <span>Search</span>
      </button>

      <input
        className={styles.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
      />
    </form>
  );
}

export default MoviesPage;
