import { MovieCard } from "./MovieCard";
import movies from "./movies.json";
import styles from "./MoviesGrid.module.css";
import Paginacion from "./componentes1/Paginacion";

export function MoviesGrid() {
  return (
    <ul className={styles.moviesGrid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}