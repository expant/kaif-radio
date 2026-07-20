import { useState } from 'react';
import { useSignUp } from './useSignUp';

export const useSignUpForm = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { loading, error, success, submit } = useSignUp();

	// TODO: оптимизировать валидацию
	const validate = () => {
		if (!username.trim()) return 'введи ник или имя';

		if (username.trim().length < 2) return 'имя слишком короткое';

		if (!email.trim()) return 'введи email';

		if (!/\S+@\S+\.\S+/.test(email)) return 'email выглядит неправильно';

		if (!password) return 'придумай пароль';

		if (password.length < 6) return 'пароль слишком короткий — минимум 6 символов';

		return null;
	};

	const handleSubmit = async () => {
		const validationError = validate();

		if (validationError) return validationError;

		await submit(email, password, username);

		return null;
	};

	return {
		username,
		setUsername,
		email,
		setEmail,
		password,
		setPassword,
		loading,
		error,
		success,
		handleSubmit,
	};
};
