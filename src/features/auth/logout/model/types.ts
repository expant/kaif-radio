export type LogoutButtonProps = {
	className?: string;
};

export type UseLogoutReturn = {
	loading: boolean;
	handleLogout: () => Promise<void>;
};
