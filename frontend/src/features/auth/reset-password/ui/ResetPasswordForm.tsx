import { useState } from 'react';
import { Link } from 'react-router';
import { useResetPassword } from '../model/hooks/useResetPassword';
import { Toast } from '@/shared/ui/Toast/Toast';
import { IconBack } from '@/shared/ui/icons/IconBack';
import { IconLock } from '@/shared/ui/icons/IconLock';
import { IconMail } from '@/shared/ui/icons/IconMail';
import type { SyntheticEvent } from 'react';
import type { ResetPasswordFormProps } from '../model/types';
import styles from './ResetPasswordForm.module.css';

export const ResetPasswordForm = ({ onBack }: ResetPasswordFormProps) => {
	const [email, setEmail] = useState('');
	const { loading, sent, sentEmail, error, submit, resend } = useResetPassword();

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		if (!email.trim()) return;

		await submit(email.trim());
	};

	if (sent) {
		return (
			<div className={styles.sentState}>
				<div className={styles.headRow}>
					<div className={styles.iconBadge}>
						<IconMail size={26} />
					</div>
					<h1 className={styles.title}>лови письмо 📬</h1>
				</div>
				<p className={styles.lead}>
					отправили ссылку на <b>{sentEmail}</b>. перейди по ней — и врубишь новый пароль. Если не
					видно, глянь в спам.
				</p>
				<p className={styles.resend}>
					не пришло за пару минут?{' '}
					<button onClick={resend} disabled={loading}>
						{loading ? 'отправляем...' : 'отправить ещё раз'}
					</button>
				</p>
				<Link to="/auth" className={styles.backLink}>
					вернуться к входу
				</Link>
			</div>
		);
	}

	return (
		<>
			{error && <Toast message={error} onClose={() => {}} />}

			<button className={styles.back} onClick={onBack}>
				<IconBack size={16} /> к входу
			</button>

			<div className={styles.headRow}>
				<div className={styles.iconBadge}>
					<IconLock size={26} />
				</div>
				<h1 className={styles.title}>забыл пароль? бывает 🤝</h1>
			</div>

			<p className={styles.lead}>
				кинь почту, на которую регался — отправим ссылку, чтобы придумать новый.
			</p>

			<form className={styles.form} onSubmit={handleSubmit} noValidate>
				<div className={styles.field}>
					<label htmlFor="reset-email">почта</label>
					<input
						id="reset-email"
						type="email"
						placeholder="you@kaif.fm"
						autoComplete="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<button type="submit" className={styles.submit} disabled={loading}>
					{loading ? 'отправляем...' : 'прислать ссылку'}
				</button>
			</form>

			<p className={styles.foot}>
				вспомнил? <Link to="/auth">войти</Link>
			</p>
		</>
	);
};
