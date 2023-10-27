import { db } from '@/firebase/config'
import { type Product } from '@/types/Product/type'
import { query, where, collection, getDocs, orderBy } from 'firebase/firestore'

export const filters = async (name: string, minPrice: string, maxPrice: string, category: string, order: string): Promise<Product[]> => {
	let productRef = query(collection(db, 'products'))

	if (name === '') {
		productRef = query(collection(db, 'products'))
	}

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
			productRef = query(productRef, orderBy('price', 'desc'))
			break

		case 'high':
			productRef = query(productRef, orderBy('price', 'asc'))
			break
	}

	const productsSnapshot = await getDocs(productRef)
	const products: Product[] = productsSnapshot.docs.map((doc) => ({
		...(doc.data() as Product),
		itemId: doc.id
	}))

	if (name !== '') {
		const data = products?.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()))
		return data
	}

	return products
}
