import type { ReactNode } from 'react';
import styles from './AuthCard.module.css';

type Props = { children: ReactNode };

export const AuthCard = ({ children }: Props) => (
	<div className={styles.page}>
		<div className={styles.card}>{children}</div>
	</div>
);
