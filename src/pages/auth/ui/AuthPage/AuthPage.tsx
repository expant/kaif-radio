import { useState } from 'react';
import { Link } from 'react-router';
import { SignInForm } from '@/features/auth/sign-in/ui/SignInForm/SignInForm';
import { SignUpForm } from '@/features/auth/sign-up/ui/SignUpForm/SignUpForm';
import styles from './AuthPage.module.css';

type AuthMode = 'sign-in' | 'sign-up';

export const AuthPage = () => {
	const [mode, setMode] = useState<AuthMode>('sign-in');

	const isSignIn = mode === 'sign-in';

	return (
		<div className={styles.page}>
			<div className={styles.card}>
				<div className={styles.brand}>
					<Link to="/" className={styles.wordmark}>
						<span className={styles.wordmarkKaif}>kaif</span>
						<span className={styles.wordmarkRadio}>radio</span>
					</Link>
					<div className={styles.tagline}>
						<span className={styles.liveDot} />
						{isSignIn ? 'с возвращением, врубай свой вайб' : 'заводи аккаунт, тут свои'}
					</div>
				</div>

				<div className={styles.seg}>
					<button className={isSignIn ? styles.segActive : ''} onClick={() => setMode('sign-in')}>
						вход
					</button>
					<button className={!isSignIn ? styles.segActive : ''} onClick={() => setMode('sign-up')}>
						регистрация
					</button>
				</div>

				{isSignIn ? (
					<SignInForm onSwitchToSignUp={() => setMode('sign-up')} />
				) : (
					<SignUpForm onSwitchToSignIn={() => setMode('sign-in')} />
				)}
			</div>
		</div>
	);
};
