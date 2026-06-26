import type { UpdateUsernameModalProps } from '../model/types';
import { Modal } from '@/shared/ui/Modal/Modal';
import { UpdateUsernameForm } from './UpdateUsernameForm/UpdateUsernameForm';

export const UpdateUsernameModal = ({ currentUsername, onClose }: UpdateUsernameModalProps) => {
	return (
		<Modal onClose={onClose}>
			<UpdateUsernameForm currentUsername={currentUsername} onClose={onClose} />
		</Modal>
	);
};
