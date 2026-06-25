import { useState } from 'react';
import { signIn } from '../../api/signIn';

export const useSignIn = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const submit = async (email: string, password: string) => {
		setLoading(true);
		setError(null);

		try {
			await signIn(email, password);
		} catch (e) {
			setError('неверный email или пароль');
		} finally {
			setLoading(false);
		}
	};

	return { loading, error, submit };
};
