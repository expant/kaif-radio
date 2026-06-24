import { useEffect, useRef } from 'react';
import styles from './Wave.module.css';

type Props = {
	active: boolean;
};

export const Wave = ({ active }: Props) => {
	const barsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!barsRef.current) return;

		barsRef.current.innerHTML = '';

		for (let i = 0; i < 32; i++) {
			const b = document.createElement('span');

			b.style.setProperty('--hi', 35 + Math.random() * 58 + '%');
			b.style.setProperty('--lo', 8 + Math.random() * 12 + '%');
			b.style.setProperty('--d', (0.7 + Math.random() * 0.8).toFixed(2) + 's');
			b.style.setProperty('--dl', (-Math.random() * 1.1).toFixed(2) + 's');
			barsRef.current.appendChild(b);
		}
	}, []);

	return <div className={`${styles.wave} ${active ? styles.active : ''}`} ref={barsRef} />;
};
