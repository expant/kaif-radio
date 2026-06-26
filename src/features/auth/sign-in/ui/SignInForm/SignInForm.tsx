import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import type { SignInFormProps } from '../../model/types';
import { useSignInForm } from '../../model/hooks/useSignInForm';
import { IconEye } from '@/shared/ui/icons/IconEye';
import { Toast } from '@/shared/ui/Toast/Toast';
import styles from './SignInForm.module.css';

export const SignInForm = ({ onSwitchToSignUp }: SignInFormProps) => {
	const { email, setEmail, password, setPassword, loading, error, handleSubmit } = useSignInForm();
	const [localError, setLocalError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);
	const togglePassword = () => setShowPassword((prev) => !prev);

	const onSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		const validationError = await handleSubmit();
		if (validationError) setLocalError(validationError);
		else setLocalError(null);
	};

	const displayError = localError ?? error;

	return (
		<>
			{displayError && <Toast message={displayError} onClose={() => setLocalError(null)} />}

			<form className={styles.form} onSubmit={onSubmit} noValidate>
				<div className={styles.field}>
					<label htmlFor="sign-in-email">почта</label>
					<input
						id="sign-in-email"
						type="email"
						placeholder="you@kaif.fm"
						autoComplete="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className={styles.field}>
					<label htmlFor="sign-in-password">пароль</label>
					<div className={styles.pwWrap}>
						<input
							id="sign-in-password"
							type={showPassword ? 'text' : 'password'}
							placeholder="••••••••"
							autoComplete="current-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							type="button"
							className={styles.pwToggle}
							onClick={togglePassword}
							aria-label="показать пароль"
						>
							<IconEye size={20} />
						</button>
					</div>
				</div>

				<div className={styles.rowExtra}>
					<a href="/auth/reset-password" className={styles.forgot}>
						забыл пароль?
					</a>
				</div>

				<button type="submit" className={styles.submit} disabled={loading}>
					{loading ? 'секундочку...' : 'врубаемся'}
				</button>

				<p className={styles.foot}>
					ещё не с нами?{' '}
					<button type="button" className={styles.footLink} onClick={onSwitchToSignUp}>
						залетай
					</button>
				</p>
			</form>
		</>
	);
};
