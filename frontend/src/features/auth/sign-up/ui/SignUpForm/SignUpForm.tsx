import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import type { SignUpFormProps } from '../../model/types';
import { useSignUpForm } from '../../model/hooks/useSignUpForm';
import { Toast } from '@/shared/ui/Toast/Toast';
import styles from './SignUpForm.module.css';

export const SignUpForm = ({ onSwitchToSignIn }: SignUpFormProps) => {
	const {
		username,
		setUsername,
		email,
		setEmail,
		password,
		setPassword,
		loading,
		error,
		success,
		handleSubmit,
	} = useSignUpForm();
	const [localError, setLocalError] = useState<string | null>(null);

	const onSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		const validationError = await handleSubmit();
		if (validationError) setLocalError(validationError);
		else setLocalError(null);
	};

	const displayError = localError ?? error;

	if (success) {
		return (
			<div className={styles.success}>
				<span className={styles.successEmoji}>📬</span>
				<p className={styles.successText}>почти готово — проверь почту и подтверди регистрацию</p>
			</div>
		);
	}

	return (
		<>
			{displayError && <Toast message={displayError} onClose={() => setLocalError(null)} />}

			<form className={styles.form} onSubmit={onSubmit} noValidate>
				<div className={styles.field}>
					<label htmlFor="sign-up-username">как тебя звать</label>
					<input
						id="sign-up-username"
						type="text"
						placeholder="ник или имя"
						autoComplete="nickname"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<div className={styles.field}>
					<label htmlFor="sign-up-email">почта</label>
					<input
						id="sign-up-email"
						type="email"
						placeholder="you@kaif.fm"
						autoComplete="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className={styles.field}>
					<label htmlFor="sign-up-password">придумай пароль</label>
					<input
						id="sign-up-password"
						type="password"
						placeholder="••••••••"
						autoComplete="new-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<button type="submit" className={styles.submit} disabled={loading}>
					{loading ? 'секундочку...' : 'погнали'}
				</button>

				<p className={styles.foot}>
					уже свой?{' '}
					<button type="button" className={styles.footLink} onClick={onSwitchToSignIn}>
						войти
					</button>
				</p>
			</form>
		</>
	);
};
