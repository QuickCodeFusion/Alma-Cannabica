import { deleteDoc, collection, getDocs, doc } from 'firebase/firestore'
import { db } from '@/firebase/config'
export const deleteCart = async (userId: string): Promise<void> => {
	const collectionRef = collection(db, 'users', userId, 'cart')

	const querySnapshot = await getDocs(collectionRef)
	querySnapshot.forEach((queryDoc) => {
		const docRef = doc(db, 'users', userId, 'cart', queryDoc.id)
	    deleteDoc(docRef)
	})
}
