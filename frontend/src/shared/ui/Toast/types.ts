export type ToastVariant = 'default' | 'success';

export type ToastProps = {
	message: string;
	onClose: () => void;
	variant?: ToastVariant;
};
