import { AuthCard } from '@/shared/ui/AuthCard/AuthCard';
import { NewPasswordForm } from '@/features/auth/new-password/ui/NewPasswordForm';

export const NewPasswordPage = () => {
	return (
		<AuthCard>
			<NewPasswordForm />
		</AuthCard>
	);
};
