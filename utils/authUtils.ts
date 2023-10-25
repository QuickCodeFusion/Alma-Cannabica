import { auth } from '@/firebase/config'
import { toast } from 'sonner'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

/**
 * Registers a new user and logs them in.
 *
 * @param {any} form - the form data containing user information
 * @param {any} setForm - a function to update the form data
 * @return {Promise<void>} a promise that resolves when the user is registered and logged in
 */
export const registerAndLogin = async (
	form: any,
	setForm: any
): Promise<void> => {
	const { name, email, photoUrl, password } = form
	try {
		const { user } = await createUserWithEmailAndPassword(auth, email, password)
		const accessToken = await user.getIdToken(true)

		const normalizedUser = {
			uid: user.uid,
			email: user.email,
			name: user.displayName ?? name,
			photoUrl: user.photoURL ?? photoUrl
		}

		await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(normalizedUser)
		})

		setForm({
			name: '',
			email: '',
			photoUrl: '',
			password: ''
		})

		await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json'
			}
		})
		await signInWithEmailAndPassword(auth, email, password)
		toast.success('Registro Correcto')
	} catch (error: any) {
		toast.error('Revise sus datos ingresados')
	}
}

/**
 * Logs in a user with the provided form data.
 *
 * @param {any} form - The form data containing email and password.
 * @param {any} setForm - The function to update the form data.
 * @return {Promise<void>} A Promise that resolves when the login is complete.
 */
export const login = async (form: any, setForm: any): Promise<void> => {
	const { email, password } = form

	try {
		const { user } = await signInWithEmailAndPassword(auth, email, password)
		const accessToken = await user.getIdToken(true)
		const normalizedUser = {
			uid: user.uid,
			email: user.email,
			name: user.displayName,
			photoUrl: user.photoURL
		}

		console.log(normalizedUser, ' TODO: Add type for normalizedUser and add data to context')

		await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json'
			}
		})

		setForm({
			name: '',
			email: '',
			photoUrl: '',
			password: ''
		})
		toast.success('Inicio Sesion Correcto')
	} catch (error) {
		// Handle any errors that occur during login
		toast.error('Email o contraseña incorrectos')
	}
}