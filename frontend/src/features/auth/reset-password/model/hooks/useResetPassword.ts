import { useState } from 'react';
import { sendResetEmail } from '../../api/sendResetEmail';

export const useResetPassword = () => {
	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);
	const [sentEmail, setSentEmail] = useState('');
	const [error, setError] = useState<string | null>(null);

	const submit = async (email: string) => {
		setLoading(true);
		setError(null);

		try {
			await sendResetEmail(email);

			setSentEmail(email);
			setSent(true);
		} catch (e) {
			const status = (e as { status?: number })?.status;
			if (status === 429) {
				setError('слишком много попыток — подожди немного и попробуй снова');
			} else {
				setError('не удалось отправить письмо — проверь email или попробуй позже');
			}
		} finally {
			setLoading(false);
		}
	};

	const resend = async () => {
		if (!sentEmail) return;

		await submit(sentEmail);
	};

	return { loading, sent, sentEmail, error, submit, resend };
};
