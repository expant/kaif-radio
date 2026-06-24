import { useState, useEffect } from 'react';
import type { ToastProps } from './types';
import styles from './Toast.module.css';

const VISIBLE_DURATION = 3000;
const EXIT_DURATION = 300;

export const Toast = ({ message, onClose }: ToastProps) => {
	const [exiting, setExiting] = useState(false);

	useEffect(() => {
		const hideTimer = setTimeout(() => setExiting(true), VISIBLE_DURATION);
		return () => clearTimeout(hideTimer);
	}, []);

	useEffect(() => {
		if (!exiting) return;
		const closeTimer = setTimeout(onClose, EXIT_DURATION);
		return () => clearTimeout(closeTimer);
	}, [exiting, onClose]);

	return (
		<div className={`${styles.toast} ${exiting ? styles.exit : styles.enter}`}>
			<span className={styles.dot} />
			{message}
		</div>
	);
};
