import { useState } from 'react';
import { updatePassword, WRONG_CURRENT_PASSWORD } from '../../api/updatePassword';

export const useUpdatePassword = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const submit = async (currentPassword: string, newPassword: string) => {
		setLoading(true);
		setError(null);

		try {
			await updatePassword(currentPassword, newPassword);

			return true;
		} catch (e) {
			const wrong = e instanceof Error && e.message === WRONG_CURRENT_PASSWORD;

			setError(wrong ? 'неверный текущий пароль' : 'не удалось сменить пароль — попробуй позже');

			return false;
		} finally {
			setLoading(false);
		}
	};

	return { loading, error, submit };
};
