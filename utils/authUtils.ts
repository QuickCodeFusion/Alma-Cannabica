import { auth } from '@/firebase/config'
import { type NormalizedUser } from '@/types/User/types'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

/**
 * Registers a new user and logs them in.
 *
 * @param {any} form - the form data containing user information
 * @param {any} setForm - a function to update the form data
 * @return {Promise<NormalizedUser>} a promise that resolves with the normalized user
 */
export const registerAndLogin = async (
	form: any,
	setForm: any
): Promise<NormalizedUser | undefined> => {
	const { name, email, photoUrl, password } = form
	const { user } = await createUserWithEmailAndPassword(auth, email, password)
	const accessToken = await user.getIdToken(true)

	const response = await fetch('/api/auth/login', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json'
		}
	})

	const { userdata } = await response.json()

	const normalizedUser: NormalizedUser = {
		uid: user.uid,
		email: user.email ?? email,
		name: user.displayName ?? name,
		photoUrl: user.photoURL ?? photoUrl,
		claims: { admin: userdata?.admin } ?? { admin: false }
	}

	await fetch('/api/auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify(normalizedUser)
	})

	setForm({
		name: '',
		email: '',
		photoUrl: '',
		password: ''
	})

	await signInWithEmailAndPassword(auth, email, password)

	return normalizedUser
}

/**
 * Logs in a user with the provided form data.
 *
 * @param {any} form - The form data containing email and password.
 * @param {any} setForm - The function to update the form data.
 * @return {Promise<NormalizedUser>} A Promise that resolves with the normalized user.
 */
export const login = async (form: any, setForm: any): Promise<NormalizedUser> => {
	const { email, password } = form

	const { user } = await signInWithEmailAndPassword(auth, email, password)
	const accessToken = await user.getIdToken(true)

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

	const response = await fetch('/api/auth/login', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json'
		}
	})

	const { userdata } = await response.json()

	const normalizedUser: NormalizedUser = {
		uid: user.uid,
		email: user.email ?? '',
		name: user.displayName ?? '',
		photoUrl: user.photoURL ?? '',
		claims: { admin: userdata?.admin } ?? { admin: false }
	}
	await signInWithEmailAndPassword(auth, email, password)

	return normalizedUser
}
