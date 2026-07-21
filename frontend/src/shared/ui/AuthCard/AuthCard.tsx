import type { AuthCardProps } from './types';
import styles from './AuthCard.module.css';

export const AuthCard = ({ children }: AuthCardProps) => (
	<div className={styles.page}>
		<div className={styles.card}>{children}</div>
	</div>
);
