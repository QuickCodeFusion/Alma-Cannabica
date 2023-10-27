"use client";
import { login } from '@/utils/authUtils'
import { useState } from 'react'
import SubmitButton from '@/components/button/submitButton'
import { toast } from 'sonner';

const Login = (): React.JSX.Element => {
	const [form, setForm] = useState({
		email: '',
		password: ''
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): any => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): any => {
		e.preventDefault()
		login(form, setForm)
			.then(() => {
				alert('Has iniciado sesión exitosamente')
			})
			.catch((error) => {
				alert('Algo salió mal: ' + error)
			})
	}

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<input type="text" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
			<input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Contraseña" />
			<SubmitButton title="Login"></SubmitButton>
		</form>
	)
}

export default Login
