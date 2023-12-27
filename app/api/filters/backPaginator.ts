import { db } from '@/firebase/config'
import { type Product } from '@/types/Product/type'
import { type Query, doc, getDoc, getDocs, type DocumentSnapshot, type DocumentData } from 'firebase/firestore'

/**
 * Generates a paginated result by going back from a given product ID.
 *
 * @param {string} firstProductId - The ID of the first product to start pagination from.
 * @param {Query} productsQuery - The query used to fetch the products.
 * @return {Promise<string>} - A promise that resolves to the paginated result.
 */
export const prevPaginator = async (firstProductId: string, productsQuery: Query): Promise<string | DocumentSnapshot<DocumentData, DocumentData>> => {
	if (firstProductId === '') {
		throw new Error('First product ID is required')
	}
	if (!productsQuery) {
		throw new Error('Products query is required')
	}

	const productsSnapshot = await getDocs(productsQuery)
	const products: Product[] = productsSnapshot.docs.map((doc) => ({
		...(doc.data() as Product),
		itemId: doc.id
	}))

	const index = products.findIndex((product) => product.itemId === firstProductId)

	if (index >= 2) {
		const productId = products[index - 2].itemId
		return productId && (await getDoc(doc(db, 'products', productId)))
	}

	return products[0]?.itemId
}
