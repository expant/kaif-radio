import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import type { UpdatePasswordFormProps } from '../../model/types';
import { useUpdatePassword } from '../../model/hooks/useUpdatePassword';
import { Toast } from '@/shared/ui/Toast/Toast';
import styles from './UpdatePasswordForm.module.css';

const MIN_LENGTH = 6;

export const UpdatePasswordForm = ({ onClose, onSuccess }: UpdatePasswordFormProps) => {
	const [current, setCurrent] = useState('');
	const [next, setNext] = useState('');
	const [confirm, setConfirm] = useState('');
	const [localError, setLocalError] = useState<string | null>(null);

	const { loading, error, submit } = useUpdatePassword();

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		if (next.length < MIN_LENGTH) {
			setLocalError(`новый пароль — минимум ${MIN_LENGTH} символов`);

			return;
		}

		if (next !== confirm) {
			setLocalError('пароли не совпадают');

			return;
		}

		if (next === current) {
			setLocalError('новый пароль должен отличаться от текущего');

			return;
		}

		setLocalError(null);

		const ok = await submit(current, next);

		if (ok) onSuccess();
	};

	const message = localError ?? error;

	return (
		<>
			{message && <Toast message={message} onClose={() => setLocalError(null)} />}

			<h3 className={styles.title}>смена пароля</h3>
			<p className={styles.sub}>введи текущий пароль и новый.</p>

			<form onSubmit={handleSubmit}>
				<div className={styles.field}>
					<label className={styles.label} htmlFor="current-password">
						текущий пароль
					</label>
					<input
						id="current-password"
						className={styles.input}
						type="password"
						autoComplete="current-password"
						autoFocus
						value={current}
						onChange={(e) => setCurrent(e.target.value)}
					/>
				</div>

				<div className={styles.field}>
					<label className={styles.label} htmlFor="new-password">
						новый пароль
					</label>
					<input
						id="new-password"
						className={styles.input}
						type="password"
						autoComplete="new-password"
						value={next}
						onChange={(e) => setNext(e.target.value)}
					/>
				</div>

				<div className={styles.field}>
					<label className={styles.label} htmlFor="confirm-password">
						повтори новый
					</label>
					<input
						id="confirm-password"
						className={styles.input}
						type="password"
						autoComplete="new-password"
						value={confirm}
						onChange={(e) => setConfirm(e.target.value)}
					/>
				</div>

				<div className={styles.actions}>
					<button type="button" className={styles.btnGhost} onClick={onClose}>
						отмена
					</button>
					<button type="submit" className={styles.btnSolid} disabled={loading}>
						{loading ? 'секундочку...' : 'сменить'}
					</button>
				</div>
			</form>
		</>
	);
};
