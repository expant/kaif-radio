import { useState } from 'react';
import { signUp } from '../../api/signUp';

export const useSignUp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const submit = async (email: string, password: string, username: string) => {
		setLoading(true);
		setError(null);

		try {
			await signUp(email, password, username);
			setSuccess(true);
		} catch {
			setError('не удалось создать аккаунт — попробуй другой email');
		} finally {
			setLoading(false);
		}
	};

	return { loading, error, success, submit };
};
