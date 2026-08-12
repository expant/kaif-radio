import type { GenreTagsProps } from '../../model/types';
import { useDropdown } from '../../model/hooks/useDropdown';
import styles from './GenreTags.module.css';

export const GenreTags = ({
	genres,
	activeGenre,
	actionSlot,
	favoritesTag,
	onSelect,
	onRemove,
}: GenreTagsProps) => {
	const { open, toggle, close, ref } = useDropdown();

	const activeLabel = activeGenre && activeGenre !== favoritesTag ? activeGenre : 'жанр';

	const handleSelect = (genre: string) => {
		onSelect(genre);
		close();
	};

	return (
		<div className={styles.root} ref={ref}>
			<div className={styles.bar}>
				{favoritesTag && (
					<button
						className={`${styles.favoritesTag} ${activeGenre === favoritesTag ? styles.active : ''}`}
						onClick={() => handleSelect(favoritesTag)}
					>
						❤️
					</button>
				)}

				{/* Триггер — только на мобилке */}
				<button
					className={styles.trigger}
					onClick={toggle}
					aria-expanded={open}
					aria-label="Выбрать жанр"
				>
					<span className={styles.triggerLabel}>{activeLabel}</span>
					<span className={styles.chevron}>▾</span>
				</button>
			</div>

			<div className={`${styles.tags} ${open ? styles.open : ''}`}>
				{genres.map((genre) => (
					<div
						key={genre}
						className={`${styles.tag} ${activeGenre === genre ? styles.active : ''}`}
					>
						<button className={styles.label} onClick={() => handleSelect(genre)}>
							{genre}
						</button>
						<button
							className={styles.remove}
							onClick={() => onRemove(genre)}
							aria-label={`Удалить ${genre}`}
						>
							×
						</button>
					</div>
				))}
				{actionSlot}
			</div>
		</div>
	);
};
