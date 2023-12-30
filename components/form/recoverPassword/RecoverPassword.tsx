'use client'
import { auth } from '@/firebase/config'
import { Button, Input } from '@nextui-org/react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useState } from 'react'
import { toast } from 'sonner'

const RecoverPassword = (): React.JSX.Element => {
	const [email, setEmail] = useState('')

	const handleSubmit = (email: string): void => {
		sendPasswordResetEmail(auth, email)
			.then(() => {
				toast.success('El email para reestablecer la contraseña ha sido enviado')
			})
			.catch((error) => {
				toast.error(error.message)
			})
	}

	return (
		<div className='flex flex-col gap-4 text-center w-full h-fit border m-2 rounded-md shadow-medium p-6'>
			<h1 className='text-xl md:text-2xl'>Reestablecer contraseña</h1>
			<Input
				placeholder='Ingrese el email de su cuenta'
				value={email}
				onValueChange={setEmail}
				onKeyUp={(e) => {
					if (e.key === 'Enter') {
						handleSubmit(email)
					}
				}}
			/>
			<Button
				className='self-center w-fit'
				onClick={() => { handleSubmit(email) }}
			>
				Enviar
			</Button>
		</div>
	)
}

export default RecoverPassword
