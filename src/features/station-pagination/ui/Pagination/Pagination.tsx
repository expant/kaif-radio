import type { PaginationProps } from '../../model/types';
import { getPageRange } from '../../model/getPageRange';
import styles from './Pagination.module.css';

export const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
	if (totalPages <= 1) return null;

	const pages = getPageRange(page, totalPages);

	return (
		<div className={styles.pagination}>
			<button
				className={styles.edge}
				onClick={() => onPageChange(1)}
				disabled={page === 1}
				aria-label="Первая страница"
			>
				«
			</button>

			{pages.map((p, i) =>
				p === '...' ? (
					<span key={`dots-${i}`} className={styles.dots}>
						...
					</span>
				) : (
					<button
						key={p}
						className={`${styles.page} ${p === page ? styles.active : ''}`}
						onClick={() => onPageChange(p)}
					>
						{p}
					</button>
				),
			)}

			<button
				className={styles.edge}
				onClick={() => onPageChange(totalPages)}
				disabled={page === totalPages}
				aria-label="Последняя страница"
			>
				»
			</button>
		</div>
	);
};
