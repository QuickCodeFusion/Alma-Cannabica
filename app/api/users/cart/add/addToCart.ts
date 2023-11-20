import { db } from '@/firebase/config'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'

export const addToCart = async (userId: string, cartItemId: string, value: string): Promise<void> => {
	const cartDoc = doc(db, 'users', userId, 'cart', cartItemId)
	const cartDocSnapshot = await getDoc(cartDoc)

	if (cartDocSnapshot.exists()) {
		const cartData = cartDocSnapshot.data()
		const quantity = cartData.quantity ?? 0
		if (quantity > 0) {
			await addToCart(userId, cartItemId, value)
		}
	}

	const cartItemCollection = collection(db, 'users', userId, 'cart')

	const product = await getDoc(doc(db, 'products', cartItemId))
	await setDoc(doc(cartItemCollection, cartItemId), {
		...product.data(),
		quantity: 1
	})
}
