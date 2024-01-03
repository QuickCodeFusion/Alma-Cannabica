'use client'
import { auth } from '@/firebase/config'
import { validateEmail } from '@/utils/validations'
import { Button, Input } from '@nextui-org/react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useMemo, useState } from 'react'
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

	const isInvalid = useMemo(() => {
		return !validateEmail(email)
	}, [email])

	return (
		<div className='flex flex-col gap-4 text-center w-full h-fit md:w-1/2 border m-2 rounded-md shadow-medium p-6'>
			<h1 className='text-xl md:text-2xl'>Reestablecer contraseña</h1>
			<Input
				classNames={{
					inputWrapper: 'border'
				}}
				placeholder='Ingrese el email de su cuenta'
				value={email}
				onValueChange={setEmail}
				onKeyUp={(e) => {
					if (e.key === 'Enter') {
						handleSubmit(email)
					}
				}}
				isRequired
				isInvalid={isInvalid}
				errorMessage={isInvalid ? 'El email no es válido' : ''}
			/>
			<Button
				className='self-center w-fit'
				disabled={isInvalid}
				onClick={() => { handleSubmit(email) }}
			>
				Enviar
			</Button>
		</div>
	)
}

export default RecoverPassword
