import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import type { AddGenreFormProps } from '../../model/types';
import styles from './AddGenreForm.module.css';

export const AddGenreForm = ({ validating, onAdd }: AddGenreFormProps) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		if (!value.trim() || validating) return;
		onAdd(value);
		setValue('');
		setOpen(false);
	};

	const handleBlur = () => {
		if (!value.trim()) {
			setOpen(false);
			return;
		}
		onAdd(value);
		setValue('');
		setOpen(false);
	};

	if (open) {
		return (
			<form className={styles.form} onSubmit={handleSubmit}>
				<input
					className={styles.input}
					autoFocus
					placeholder="жанр..."
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onBlur={handleBlur}
					disabled={validating}
				/>
			</form>
		);
	}

	return (
		<button className={styles.addBtn} onClick={() => setOpen(true)}>
			{validating ? '...' : '+ добавить'}
		</button>
	);
};
