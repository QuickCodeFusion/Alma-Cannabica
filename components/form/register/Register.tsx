'use client'
import React, { useState } from 'react'
import SubmitButton from '@/components/button/submitButton'
import { toast } from 'sonner'
import { registerAndLogin } from '@/utils/authUtils'
import { useUserSession } from '@/app/userContext'
import { Image, Input, useDisclosure } from '@nextui-org/react'
import { validateEmail, validatePassword } from '@/utils/validations'
import style from './register.module.css'
import UpdatePhoto from '../UpdatePhoto'
import { uploadFile } from '@/utils/uploadFile'

const Register = (): React.JSX.Element => {
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

	const defaultUser = 'https://firebasestorage.googleapis.com/v0/b/alma-cannabica-3f2f5.appspot.com/o/default-user-icon-3084929853.jpg?alt=media&token=d78ab167-3602-40dc-b81f-bb3680fa3324'
	const { setUserSession } = useUserSession()
	const [loading, setLoading] = useState(false)
	const [file, setFile] = useState<File>()
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
		console.log(form.photoUrl)
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, updateFile: File | string): Promise<void> => {
		e.preventDefault()
		if (file === undefined) {
			toast.error('Debe subir una imagen')
			return
		}
		const photoURLL = await uploadFile(file, file.name)
			.then((url) => {
				return url
			})
			.catch((error) => {
				toast.error(error.message)
			})

		const { name, email, password } = form
		const newUser = {
			name,
			email,
			password,
			photoUrl: photoURLL
		}

		setLoading(true)
		await registerAndLogin(newUser, setForm)
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

	const isInvalid = React.useMemo(() => {
		if (form.email === '') return false

		return !validateEmail(form.email)
	}, [form.email])

	const isInvalidPassword = React.useMemo(() => {
		if (form.password === '') return false

		return !validatePassword(form.password)
	}, [form.password])

	return (

		<form method="POST" onSubmit={ (e) => { void handleSubmit(e, form.photoUrl) }} className={style.container}>
			<div className={style.form}>

				<div className='m-4'>
					<div onClick={() => { onOpen() }} className='cursor-pointer hover:blur-[2px]'>
						<Image src={form.photoUrl || defaultUser} alt="user" width={160} height={200} className='rounded-full'></Image>

						<UpdatePhoto isOpen={isOpen} onOpenChange={onOpenChange} onClose={(file) => { onClose(); setForm({ ...form, photoUrl: file instanceof File ? URL.createObjectURL(file) : file }) } } setFile={setFile}/>

					</div>
				</div>
				<div className='m-4'>
					<Input
						value={form.name}
						name="name"
						type="text"
						label="Tu nombre"
						variant="bordered"
						labelPlacement="outside"
						color={'success'}
						onChange={handleChange}
						className="max-w-xs"
					/>

				</div>
				<div className='m-4'>

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
				</div>

				<div className='m-4'>
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
				</div>

				<SubmitButton loading={loading} title="Register" isDisabled={isInvalid || isInvalidPassword || form.name === '' || form.email === '' || form.password === ''}></SubmitButton>
			</div>
		</form>
	)
}

export default Register
