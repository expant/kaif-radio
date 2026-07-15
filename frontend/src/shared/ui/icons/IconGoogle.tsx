type Props = {
	size?: number | string;
};

export const IconGoogle = ({ size = '1em' }: Props) => (
	<svg viewBox="0 0 24 24" width={size} height={size}>
		<path
			fill="#EA4335"
			d="M12 11v3.2h4.5c-.2 1.2-1.5 3.5-4.5 3.5a5.2 5.2 0 0 1 0-10.4c1.6 0 2.7.7 3.3 1.3l2.3-2.2C16.1 4.3 14.3 3.5 12 3.5a8.5 8.5 0 0 0 0 17c4.9 0 8.1-3.4 8.1-8.3 0-.6 0-1-.1-1.2H12z"
		/>
	</svg>
);
