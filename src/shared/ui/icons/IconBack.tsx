type Props = { size?: number | string };

export const IconBack = ({ size = '1em' }: Props) => (
	<svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
		<path d="M14 7l-5 5 5 5V7z" />
	</svg>
);
