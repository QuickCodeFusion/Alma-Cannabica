import { db } from '@/firebase/config'
import { collection, doc, setDoc } from 'firebase/firestore'

/**
 * Creates a new category in the database.
 *
 * @param {string[]} categories - An array of category names.
 * @return {Promise<void>} A promise that resolves when the categories are created.
 */

export const createCategory = async (categories: string[]): Promise<void> => {
	const collectionRef = collection(db, 'category')

	const docRef = doc(collectionRef, categories[0])
	await setDoc(docRef, {
		name: categories
	})
}
