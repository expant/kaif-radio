import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import type { UpdateUsernameModalProps } from '../model/types';
import { useUpdateUsername } from '../model/hooks/useUpdateUsername';
import { Toast } from '@/shared/ui/Toast/Toast';
import styles from './UpdateUsernameModal.module.css';

// TODO: Модалку сделать через React Portal и вынести отдельно в shared
export const UpdateUsernameModal = ({ currentUsername, onClose }: UpdateUsernameModalProps) => {
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
			<div className={styles.overlay} onClick={onClose}>
				<div
					className={styles.modal}
					role="dialog"
					aria-modal="true"
					onClick={(e) => e.stopPropagation()}
				>
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
				</div>
			</div>
		</>
	);
};
