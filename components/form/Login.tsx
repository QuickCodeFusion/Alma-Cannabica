'use client'
import { login } from '@/utils/authUtils'
import { useState } from 'react'
import SubmitButton from '@/components/button/submitButton'
import { toast } from 'sonner'

const Login = (): React.JSX.Element => {
	const [form, setForm] = useState({
		email: '',
		password: ''
	})

	const [loading, setLoading] = useState(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): any => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): any => {
		setLoading(true)
		e.preventDefault()
		login(form, setForm)
			.then(() => {
				setLoading(false)
				toast.success('Has iniciado sesión exitosamente')
			})
			.catch((error) => {
				setLoading(false)
				const regex = /\(([^)]+)\)/
				let authError = error.message
				authError = authError.match(regex)

				switch (authError[1]) {
					case 'auth/invalid-email':
						return toast.error('El Email ingresado no es valido')

					case 'auth/invalid-password':
						return toast.error('La Contraseña ingresada no es valida')

					case 'auth/user-not-found':
						return toast.error('No se encontro al usuario')

					case 'auth/user-disabled':
						return toast.error('Su cuenta fue desabilitada por un administrador')

					default:
						return toast.error('A ocurrido un error inesperado')
				}
			})
	}

	return (
		<form method="POST" onSubmit={handleSubmit} className='py-10'>
			<input type="text" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
			<input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Contraseña" />
			<SubmitButton loading={loading} title="Login"></SubmitButton>
		</form>
	)
}

export default Login
