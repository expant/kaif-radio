type Props = {
	size?: number | string;
};

export const IconEye = ({ size = '1em' }: Props) => (
	<svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
		<path d="M12 5c-5 0-9 4.5-10 7 1 2.5 5 7 10 7s9-4.5 10-7c-1-2.5-5-7-10-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
	</svg>
);
