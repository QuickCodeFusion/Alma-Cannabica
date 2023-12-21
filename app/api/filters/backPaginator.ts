import { db } from '@/firebase/config'
import { type Product } from '@/types/Product/type'
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'

/**
 * Retrieves the previous product based on the provided first product ID.
 *
 * @param {string} firstProductId - The ID of the first product.
 * @return {Promise<any>} - A promise that resolves with the previous product.
 */
export const backPaginator = async (firstProductId: string): Promise<any> => {
	if (firstProductId !== '') {
		const productRef = query(collection(db, 'products'), orderBy('name', 'asc'))
		const productsSnapshot = await getDocs(productRef)
		const products: Product[] = productsSnapshot.docs.map((doc) => ({
			...(doc.data() as Product),
			itemId: doc.id
		}))

		const index = products.findIndex((product) => product.itemId === firstProductId)

		if (index !== -1 && index >= 2) {
			const productId = products[index - 2].itemId
			return productId && await getDoc(doc(db, 'products', productId))
		}

		return products[0].itemId
	}
}
