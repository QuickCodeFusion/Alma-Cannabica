import { db } from '@/firebase/config'
import { type Address } from '@/types/User/types'
import { doc, setDoc } from 'firebase/firestore'

/**
 * Creates a new user in the database.
 *
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} photoUrl - The photo URL of the user.
 * @param {Address[]} addresses - The addresses of the user. TODO: Add type for addresses.
 * @param {string} uid - The unique identifier of the user.
 * @param {string} token - The Firebase authentication token.
 * @return {Promise<void>} A promise that resolves when the user is created successfully.
 */
export const createUser = async (
	name: string,
	email: string,
	uid: string,
	token: string,
	photoUrl?: string,
	addresses?: Address[]
): Promise<void> => {
	if (!name || !email || !uid || !token) {
		throw new Error('Missing data')
	}

	const userRef = doc(db, 'users', uid)

	const userData = {
		name,
		email,
		photoUrl: photoUrl ?? 'https://firebasestorage.googleapis.com/v0/b/alma-cannabica-3f2f5.appspot.com/o/default-user-icon-3084929853.jpg?alt=media&token=d78ab167-3602-40dc-b81f-bb3680fa3324',
		addresses: addresses ?? [],
		token,
		admin: false
	}

	await setDoc(userRef, userData)
}
