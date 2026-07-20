import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import type { UpdateUsernameFormProps } from '../../model/types';
import { useUpdateUsername } from '../../model/hooks/useUpdateUsername';
import { Toast } from '@/shared/ui/Toast/Toast';
import styles from './UpdateUsernameForm.module.css';

export const UpdateUsernameForm = ({ currentUsername, onClose }: UpdateUsernameFormProps) => {
	const [value, setValue] = useState(currentUsername);
	const { loading, error, submit } = useUpdateUsername();

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		if (!value.trim() || value.trim() === currentUsername) {
			onClose();

			return;
		}

		await submit(value.trim());

		if (!error) onClose();
	};

	return (
		<>
			{error && <Toast message={error} onClose={() => {}} />}

			<h3 className={styles.title}>новое имя</h3>
			<p className={styles.sub}>так тебя будут видеть в kaifradio.</p>

			<form onSubmit={handleSubmit}>
				<label className={styles.label} htmlFor="username-input">
					username
				</label>
				<input
					id="username-input"
					className={styles.input}
					type="text"
					maxLength={24}
					autoComplete="off"
					autoFocus
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<div className={styles.actions}>
					<button type="button" className={styles.btnGhost} onClick={onClose}>
						отмена
					</button>
					<button type="submit" className={styles.btnSolid} disabled={loading}>
						{loading ? 'секундочку...' : 'сохранить'}
					</button>
				</div>
			</form>
		</>
	);
};
