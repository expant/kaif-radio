import { useState } from 'react';
import { updatePassword } from '../../api/updatePassword';
import { supabase } from '@/shared/api/supabaseClient';

export const useNewPassword = () => {
	const [done, setDone] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const submit = async (password: string) => {
		setLoading(true);
		setError(null);

		try {
			await updatePassword(password);
			await supabase.auth.signOut();

			setDone(true);
		} catch {
			setError('не удалось обновить пароль — попробуй ещё раз');
		} finally {
			setLoading(false);
		}
	};

	return { loading, done, error, submit };
};
