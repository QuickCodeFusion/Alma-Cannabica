'use client'
import React, { useState } from 'react'
import SubmitButton from '@/components/button/submitButton'
import { toast } from 'sonner'
import { registerAndLogin } from '@/utils/authUtils'
import { useUserSession } from '@/app/userContext'

const Register = (): React.JSX.Element => {
	const { setUserSession } = useUserSession()
	const [loading, setLoading] = useState(false)
	const [form, setForm] = useState({
		name: '',
		email: '',
		photoUrl: '',
		password: ''
	})
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault()
		setLoading(true)
		registerAndLogin(form, setForm)
			.then((user) => {
				setLoading(false)
				setUserSession(user)
				toast.success('Te has registrado e iniciado sesión correctamente')
			})
			.catch((error) => {
				setLoading(false)
				const regex = /\(([^)]+)\)/
				let authError = error.message
				authError = authError.match(regex)

				switch (authError[1]) {
					case 'auth/invalid-email':
						return toast.error('El Email ingresado no es válido')

					case 'auth/user-disabled':
						return toast.error('Su cuenta fue desabilitada por un administrador')

					case 'auth/email-already-in-use':
						return toast.error('El Email ya se encuentra registrado')

					default:
						return toast.error(`Ha ocurrido un error inesperado ${authError[1]}`)
				}
			})
	}
	return (
		<form method="POST" onSubmit={handleSubmit}>
			<input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" />
			<input type="text" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
			<input type="file" name="photoUrl" value={form.photoUrl} onChange={handleChange} placeholder="Photo Url" />
			<input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Contraseña" />
			<SubmitButton loading={loading} title="Register"></SubmitButton>
		</form>
	)
}

export default Register
