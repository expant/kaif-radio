import type { SyntheticEvent } from 'react';
import type { AddGenreFormProps } from '../../model/types';
import { useAddGenreForm } from '../../model/hooks/useAddGenreForm';
import styles from './AddGenreForm.module.css';

export const AddGenreForm = ({ validating, onAdd }: AddGenreFormProps) => {
	const { open, value, handleOpen, handleChange, handleSubmit, handleBlur } =
		useAddGenreForm(onAdd);

	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		handleSubmit();
	};

	if (open) {
		return (
			<form className={styles.form} onSubmit={onSubmit}>
				<input
					className={styles.input}
					autoFocus
					placeholder="жанр..."
					value={value}
					onChange={(e) => handleChange(e.target.value)}
					onBlur={handleBlur}
					disabled={validating}
				/>
			</form>
		);
	}

	return (
		<button className={styles.addBtn} onClick={handleOpen}>
			м{validating ? '...' : '+ добавить'}
		</button>
	);
};
