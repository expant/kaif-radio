import type { UpdatePasswordModalProps } from '../model/types';
import { Modal } from '@/shared/ui/Modal/Modal';
import { UpdatePasswordForm } from './UpdatePasswordForm/UpdatePasswordForm';

export const UpdatePasswordModal = ({ onClose, onSuccess }: UpdatePasswordModalProps) => {
	return (
		<Modal onClose={onClose}>
			<UpdatePasswordForm onClose={onClose} onSuccess={onSuccess} />
		</Modal>
	);
};
