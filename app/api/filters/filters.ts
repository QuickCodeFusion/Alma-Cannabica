import { db } from '@/firebase/config'
import { type Product } from '@/types/Product/type'
import { query, where, collection, getDocs, orderBy, limit, startAfter } from 'firebase/firestore'

export const filters = async (name: string, minPrice: string, maxPrice: string, category: string, order: string): Promise<Product[]> => {
	let productRef = query(collection(db, 'products'), limit(6))



	if (category !== '') {
		productRef = query(productRef, where('category', '==', category))
	}

	if (minPrice !== '') {
		productRef = query(productRef, where('price', '>=', parseInt(minPrice)))
	}

	if (maxPrice !== '') {
		productRef = query(productRef, where('price', '<=', parseInt(maxPrice)))
	}

	switch (order) {
		case 'low':
			productRef = query(productRef, orderBy('price', 'asc'))
			break

		case 'high':
			productRef = query(productRef, orderBy('price', 'desc'))
			break
	}

	const productsSnapshot = await getDocs(productRef)
	const products: Product[] = productsSnapshot.docs.map((doc) => ({
		...(doc.data() as Product),
		itemId: doc.id
	}))
	const lastProduct = products[products.length - 1]
	const firstProduct = products[0]

	switch (startProduct) {
		case 'first':
			productRef = query(productRef, startAfter(firstProduct.itemId), limit(6))
			break
		case 'last':
			productRef = query(productRef, startAfter(lastProduct.itemId), limit(6))
			break
	}

	if (name !== '') {
		const data = products?.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()))
		return data
	}

	return products
}
