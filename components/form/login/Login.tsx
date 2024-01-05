'use client'
import { login } from '@/utils/authUtils'
import React, { useState } from 'react'
import SubmitButton from '@/components/button/submitButton'
import { toast } from 'sonner'
import { useUserSession } from '@/app/userContext'
import { useRouter } from 'next/navigation'
import { Input, Link, Spacer } from '@nextui-org/react'
import { validateEmail, validatePassword } from '@/utils/validations'

const Login = (): React.JSX.Element => {
	const [form, setForm] = useState({
		email: '',
		password: ''
	})

	const router = useRouter()

	const { setUserSession } = useUserSession()

	const [loading, setLoading] = useState(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		setLoading(true)
		e.preventDefault()

		if (!validatePassword(form.password)) {
			setLoading(false)
			toast.error(
				'La contraseña debe tener al menos 6 caracteres, como máximo 12, y contener al menos una letra mayúscula.'
			)
			return
		}

		login(form, setForm)
			.then((user) => {
				setUserSession(user)
				setLoading(false)
				if (user?.claims.admin) {
					toast.success(
						'Has iniciado sesión exitosamente, serás redirigido al panel de administrador'
					)
					router.push('/admin-dashboard')
				} else {
					toast.success(
						'Has iniciado sesión exitosamente, serás redirigido a la página de productos'
					)
					router.push('/products')
				}
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
						return toast.error(
							'Su cuenta fue desabilitada por un administrador'
						)

					default:
						return toast.error('A ocurrido un error inesperado')
				}
			})
	}

	const isInvalid = React.useMemo(() => {
		if (form.email === '') return false

		return !validateEmail(form.email)
	}, [form.email])

	const isInvalidPassword = React.useMemo(() => {
		if (form.password === '') return false

		return !validatePassword(form.password)
	}, [form.password])

	return (
		<form method="POST" onSubmit={handleSubmit} className='bg-white p-5 flex flex-col gap-5'>
			<div className="flex flex-col justify-center items-center gap-7 text-center">
				<h1 className="text-xl md:text-3xl">Iniciar sesión</h1>
				<Input
					value={form.email}
					name="email"
					type="email"
					label="Email"
					variant="bordered"
					isInvalid={isInvalid}
					labelPlacement="outside"
					color={isInvalid ? 'danger' : 'success'}
					errorMessage={isInvalid && 'Please enter a valid email'}
					onChange={handleChange}
					className="max-w-xs"
				/>
				<Input
					type="password"
					label="Contraseña"
					variant="bordered"
					labelPlacement="outside"
					value={form.password}
					name="password"
					onChange={handleChange}
					isInvalid={isInvalidPassword}
					color={!isInvalidPassword ? 'success' : 'danger'}
					errorMessage={
						isInvalidPassword &&
                      'La contraseña debe tener al menos 6 caracteres, como máximo 12, y contener al menos una letra mayúscula.'
					}
					className="max-w-xs"
				/>
				<SubmitButton
					className='self-center w-fit'
					loading={loading}
					title="Iniciar sesión"
					isDisabled={
						isInvalid ||
                        isInvalidPassword ||
                        form.password === '' ||
                        form.email === ''
					}
				/>
			</div>
			<div className='flex flex-col justify-center items-center'>
				<p>¿Olvidaste tu contraseña?  </p>
				<Spacer x={2}></Spacer>
				<Link href="/forgot-password">Recuperar contraseña</ Link>
			</div>
		</form>

	)
}

export default Login
