import { GenreTags } from '../../features/genre-filter/ui/GenreTags/GenreTags';
import { AddGenreForm } from '../../features/genre-filter/ui/AddGenreForm/AddGenreForm';
import { StationList } from '../../widgets/station-list/ui/StationList/StationList';
import { Player } from '../../widgets/player/ui/Player/Player';
import { Pagination } from '../../features/station-pagination/ui/Pagination/Pagination';
import { Toast } from '../../shared/ui/Toast/Toast';
import { UserControls } from '../../widgets/user-controls/ui/UserControls';
import { useRadioPage } from './model/hooks/useRadioPage';
import styles from './RadioPage.module.css';

export const RadioPage = () => {
	const {
		genre,
		setGenre,
		stations,
		loading,
		error,
		player,
		accentColor,
		page,
		totalPages,
		totalCount,
		setPage,
		genres,
		validating,
		validationError,
		addGenre,
		removeGenre,
		clearError,
	} = useRadioPage();

	return (
		<div className={styles.shell}>
			{validationError && <Toast message={validationError} onClose={clearError} />}

			<header className={styles.header}>
				<div className={styles.brand}>
					<div className={styles.wordmark}>
						<span className={styles.wordmarkKaif}>kaif</span>
						<span className={styles.wordmarkRadio}>radio</span>
					</div>
					<div className={styles.tagline}>
						<span className={styles.liveDot} />
						chill vibes, always on
					</div>
				</div>
				<UserControls />
			</header>

			<div className={styles.grid}>
				<main>
					<div className={styles.genresWrap}>
						<GenreTags
							genres={genres}
							activeGenre={genre}
							onSelect={setGenre}
							onRemove={removeGenre}
							actionSlot={<AddGenreForm validating={validating} onAdd={addGenre} />}
						/>
					</div>

					<div className={styles.sectionHead}>
						<h2 className={styles.sectionTitle}>эфир</h2>
						<div className={styles.ether}>
							<span className={styles.etherNum}>{totalCount}</span>
							<span className={styles.etherLbl}>станций в эфире</span>
						</div>
					</div>

					<StationList
						stations={stations}
						loading={loading}
						error={error}
						currentStationId={player.currentStation?.stationuuid ?? null}
						isPlaying={player.isPlaying}
						onSelect={player.play}
					/>

					<Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
				</main>

				<Player player={player} accentColor={accentColor} />
			</div>
		</div>
	);
};
