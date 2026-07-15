type Props = { size?: number | string };

export const IconShield = ({ size = '1em' }: Props) => (
	<svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
		<path d="M12 1 3 5v6c0 5 3.8 9.7 9 11 5.2-1.3 9-6 9-11V5l-9-4zm-1.2 14.4-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6 1.4 1.4-6 6z" />
	</svg>
);
