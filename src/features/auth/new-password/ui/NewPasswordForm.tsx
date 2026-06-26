import { useState } from 'react';
import { Link } from 'react-router';
import { useNewPassword } from '../model/hooks/useNewPassword';
import { Toast } from '@/shared/ui/Toast/Toast';
import { IconEye } from '@/shared/ui/icons/IconEye';
import { IconBack } from '@/shared/ui/icons/IconBack';
import { IconShield } from '@/shared/ui/icons/IconShield';
import { IconCheck } from '@/shared/ui/icons/IconCheck';
import type { SyntheticEvent } from 'react';
import styles from './NewPasswordForm.module.css';

export const NewPasswordForm = () => {
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [showPw, setShowPw] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const { loading, done, error, submit } = useNewPassword();

	const passwordsMatch = password.length >= 6 && password === confirm;

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		if (!passwordsMatch) return;

		await submit(password);
	};

	if (done) {
		return (
			<div className={styles.doneState}>
				<div className={styles.headRow}>
					<div className={styles.iconBadge}>
						<IconCheck size={26} />
					</div>
					<h1 className={styles.title}>готово! 🎉</h1>
				</div>
				<p className={styles.lead}>пароль обновили. Можно врубаться обратно и слушать дальше.</p>
				<Link to="/auth" className={styles.submitLink}>
					войти заново
				</Link>
			</div>
		);
	}

	return (
		<>
			{error && <Toast message={error} onClose={() => {}} />}

			<Link to="/auth/reset-password" className={styles.back}>
				<IconBack size={16} /> назад
			</Link>

			<div className={styles.headRow}>
				<div className={styles.iconBadge}>
					<IconShield size={26} />
				</div>
				<h1 className={styles.title}>придумай новый пароль 🔑</h1>
			</div>

			<p className={styles.lead}>
				старый забыли вместе. Теперь пусть будет посильнее — и врубаемся обратно.
			</p>

			<form className={styles.form} onSubmit={handleSubmit} noValidate>
				<div className={styles.field}>
					<label htmlFor="new-pw">новый пароль</label>
					<div className={styles.pwWrap}>
						<input
							id="new-pw"
							type={showPw ? 'text' : 'password'}
							placeholder="••••••••"
							autoComplete="new-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button type="button" className={styles.pwToggle} onClick={() => setShowPw((p) => !p)}>
							<IconEye size={20} />
						</button>
					</div>
				</div>

				<div className={styles.field}>
					<label htmlFor="confirm-pw">ещё раз</label>
					<div className={styles.pwWrap}>
						<input
							id="confirm-pw"
							type={showConfirm ? 'text' : 'password'}
							placeholder="••••••••"
							autoComplete="new-password"
							value={confirm}
							onChange={(e) => setConfirm(e.target.value)}
						/>
						<button
							type="button"
							className={styles.pwToggle}
							onClick={() => setShowConfirm((p) => !p)}
						>
							<IconEye size={20} />
						</button>
					</div>
					{confirm.length > 0 && (
						<span className={`${styles.match} ${passwordsMatch ? styles.matchOk : styles.matchNo}`}>
							{passwordsMatch ? 'совпадают ✓' : 'не совпадают'}
						</span>
					)}
				</div>

				<button type="submit" className={styles.submit} disabled={!passwordsMatch || loading}>
					{loading ? 'сохраняем...' : 'сохранить пароль'}
				</button>
			</form>
		</>
	);
};
