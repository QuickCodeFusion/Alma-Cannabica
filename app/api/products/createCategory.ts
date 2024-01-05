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

	const categoriesPromise = categories.map(async (category: string) => {
		const docRef = doc(collectionRef, category)
		await setDoc(docRef, {
			name: category
		})
	})
	await Promise.all(categoriesPromise)
}
