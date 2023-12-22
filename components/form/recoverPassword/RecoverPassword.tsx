'use client'
import { auth } from '@/firebase/config'
import { Button, Input } from '@nextui-org/react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useState } from 'react'
import { toast } from 'sonner'

const RecoverPassword = (): React.JSX.Element => {
	const [email, setEmail] = useState('')

	return (
		<div>
			<h1>RecoverPassword</h1>
			<Input placeholder='Email' value={email} onValueChange={setEmail}></Input>
			<Button onClick={() => {
				sendPasswordResetEmail(auth, email)
					.then(function () {
						// Password reset email sent.
						toast.success('Password reset email sent.')
					})
					.catch((error) => {
						toast.error(error.message)
					})
			}}>Enviar</Button>
		</div>
	)
}

export default RecoverPassword
