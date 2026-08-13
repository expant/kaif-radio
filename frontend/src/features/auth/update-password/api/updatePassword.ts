import { supabase } from '@/shared/api/supabaseClient';

export const WRONG_CURRENT_PASSWORD = 'WRONG_CURRENT_PASSWORD';

export const updatePassword = async (currentPassword: string, newPassword: string) => {
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user?.email) throw new Error('no user');

	const { error: signInError } = await supabase.auth.signInWithPassword({
		email: user.email,
		password: currentPassword,
	});

	if (signInError) throw new Error(WRONG_CURRENT_PASSWORD);

	const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

	if (updateError) throw updateError;
};
