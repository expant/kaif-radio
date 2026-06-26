import { useNavigate } from 'react-router';
import { AuthCard } from '@/shared/ui/AuthCard/AuthCard';
import { ResetPasswordForm } from '@/features/auth/reset-password/ui/ResetPasswordForm';

export const ResetPasswordPage = () => {
	const navigate = useNavigate();

	return (
		<AuthCard>
			<ResetPasswordForm onBack={() => navigate('/auth')} />
		</AuthCard>
	);
};
