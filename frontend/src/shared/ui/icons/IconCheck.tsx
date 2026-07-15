type Props = { size?: number | string };

export const IconCheck = ({ size = '1em' }: Props) => (
	<svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
		<path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
	</svg>
);
