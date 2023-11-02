import {
	updateDoc,
	doc,
	increment,
	getDoc,
	deleteDoc
} from 'firebase/firestore'
import { db } from '@/firebase/config'
import { type DocumentData } from 'firebase-admin/firestore'

export const changeQuantity = async (
	userId: string,
	cartItemId: string,
	value: string
): Promise<void> => {
	const docRef = doc(db, 'users', userId, 'cart', cartItemId)
	const productRef = doc(db, 'products', cartItemId)
	const productStock = (await getDoc(productRef)).get('stock')

	if (productStock === 0) {
		throw new Error('Out of stock')
	}

	const productDoc = await getDoc(docRef)

	if (productDoc.exists()) {
		const productData: DocumentData | undefined = productDoc.data()

		if (productData) {
			if (value === 'add') {
				await updateDoc(docRef, {
					quantity: increment(1)
				})
			} else {
				if (productData.quantity === 1) {
					await deleteDoc(docRef)
				}

				if (productData.quantity > 1) {
					await updateDoc(docRef, {
						quantity: increment(-1)
					})
				}
			}
		}
	}
}
