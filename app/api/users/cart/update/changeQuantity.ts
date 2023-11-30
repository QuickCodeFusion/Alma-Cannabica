import {
	updateDoc,
	doc,
	increment,
	getDoc,
	deleteDoc,
	setDoc
} from 'firebase/firestore'
import { db } from '@/firebase/config'

export const changeQuantity = async (
	userId: string,
	cartItemId: string,
	action: string
): Promise<void> => {
	const cartItemRef = doc(db, 'users', userId, 'cart', cartItemId)
	const productRef = doc(db, 'products', cartItemId)
	const productSnapshot = await getDoc(productRef)

	const stock = productSnapshot.get('stock')

	if (stock === 0) {
		throw new Error('Out of stock')
	}

	const cartItemSnapshot = await getDoc(cartItemRef)
	const quantity = cartItemSnapshot.data()?.quantity ?? 0

	if (!cartItemSnapshot.exists()) {
		await setDoc(cartItemRef, {
			...productSnapshot.data(),
			quantity: 1
		})
		return
	}

	if (action === 'add' && quantity > 0) {
		await updateDoc(cartItemRef, { quantity: increment(1) })
		return
	}

	if (action === 'remove' && quantity > 1) {
		await updateDoc(cartItemRef, { quantity: increment(-1) })
	} else {
		await deleteDoc(cartItemRef)
	}
}
