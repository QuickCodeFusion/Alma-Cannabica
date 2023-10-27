"use client";
import { useState } from "react";
import SubmitButton from "@/components/button/submitButton";
import { toast } from "sonner";
import { registerAndLogin } from "@/utils/authUtils";

const Register = () => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		photoUrl: "",
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
		registerAndLogin(form, setForm)
	};
	return (
		<form method="POST" onSubmit={handleSubmit}>
			<input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" />
			<input type="text" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
			<input type="file" name="photoUrl" value={form.photoUrl} onChange={handleChange} placeholder="Photo Url" />
			<input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Contraseña" />
			<SubmitButton title="Register"></SubmitButton>
		</form>
	);
};

export default Register;
