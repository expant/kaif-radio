import { useState } from 'react';
import { updateUsername } from '../../api/updateUsername';

export const useUpdateUsername = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const submit = async (username: string) => {
		setLoading(true);
		setError(null);
		try {
			await updateUsername(username);
		} catch {
			setError('не удалось обновить имя — попробуй позже');
		} finally {
			setLoading(false);
		}
	};

	return { loading, error, submit };
};
