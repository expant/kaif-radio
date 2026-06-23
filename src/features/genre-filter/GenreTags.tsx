import type { GenreTagsProps } from "./types";
import { GENRES } from "./constants";
import styles from "./GenreTags.module.css";

export const GenreTags = ({ activeGenre, onSelect }: GenreTagsProps) => (
  <div className={styles.container}>
    {GENRES.map((genre) => (
      <button
        key={genre}
        className={`${styles.tag} ${activeGenre === genre ? styles.active : ""}`}
        onClick={() => onSelect(genre)}
      >
        {genre}
      </button>
    ))}
  </div>
);
