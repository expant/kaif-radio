type Props = {
  size?: number | string;
};

export const IconPause = ({ size = "1em" }: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
  </svg>
);
