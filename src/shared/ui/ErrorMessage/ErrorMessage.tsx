import type { ErrorMessageProps } from './types';
import styles from './ErrorMessage.module.css';

export const ErrorMessage = ({ message, hint }: ErrorMessageProps) => (
	<div className={styles.wrap}>
		<span className={styles.emoji}>😵</span>
		<p className={styles.message}>{message}</p>
		{hint && <p className={styles.hint}>{hint}</p>}
	</div>
);
