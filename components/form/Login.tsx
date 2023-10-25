"use client";

import { login } from "@/utils/authUtils";
import { useState } from "react";
import SubmitButton from "@/components/button/submitButton";

const Login = () => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		login(form, setForm)
			.finally(() => {
				alert("Has iniciado sesión exitosamente");
			});
	};

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<input type="text" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
			<input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Contraseña" />
			<SubmitButton title="Login"></SubmitButton>
		</form>
	);
};

export default Login;
