import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps } from './types';
import styles from './Modal.module.css';

export const Modal = ({ onClose, children }: ModalProps) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [onClose]);

	return createPortal(
		<div className={styles.overlay} onClick={onClose}>
			<div
				className={styles.modal}
				role="dialog"
				aria-modal="true"
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
};
