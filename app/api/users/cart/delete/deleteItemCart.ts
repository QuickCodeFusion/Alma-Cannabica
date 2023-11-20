import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

export const deleteItemCart = async (userId: string, cartItemId: string): Promise<void> => {
	const docRef = doc(db, 'users', userId, 'cart', cartItemId)

	await deleteDoc(docRef)
}
