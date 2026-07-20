import { useState } from 'react';
import { useSignIn } from './useSignIn';

export const useSignInForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { loading, error, submit } = useSignIn();

	const validate = () => {
		if (!email.trim()) return 'введи email';

		if (!/\S+@\S+\.\S+/.test(email)) return 'email выглядит неправильно';

		if (!password) return 'введи пароль';

		return null;
	};

	const handleSubmit = async () => {
		const validationError = validate();
		if (validationError) return validationError;

		await submit(email, password);

		return null;
	};

	return { email, setEmail, password, setPassword, loading, error, handleSubmit };
};
