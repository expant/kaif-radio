type Props = {
  size?: number | string;
};

export const IconPlay = ({ size = "1em" }: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M7 5v14l12-7z" />
  </svg>
);
