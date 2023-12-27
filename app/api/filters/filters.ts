import { db } from '@/firebase/config'
import { type Product } from '@/types/Product/type'
import { query, where, collection, getDocs, orderBy, limit, startAfter, doc, getDoc, endBefore, startAt } from 'firebase/firestore'
import { prevPaginator } from './backPaginator'

export const filters = async (name: string, minPrice: string, maxPrice: string, category: string, order: string, firstProductId: string, lastProductId: string): Promise<Product[]> => {
	let productsQuery = query(collection(db, 'products'), limit(6), orderBy('price', 'asc'))

	if (category !== '') {
		const categories = Array.isArray(category) ? category : [category]
		productsQuery = query(productsQuery, where('category', 'array-contains-any', categories))
	}

	if (minPrice !== '' || maxPrice !== '') {
		const min = parseInt(minPrice) - 1 || 1
		const max = parseInt(maxPrice) + 1 || 1000000
		productsQuery = query(productsQuery, where('price', '>=', min), where('price', '<=', max))
	}

	switch (order) {
		case 'low':
			productsQuery = query(productsQuery, orderBy('price', 'asc'))
			break

		case 'high':
			productsQuery = query(productsQuery, orderBy('price', 'desc'))
			break
	}

	if (lastProductId !== '') {
		const lastProductRef = await getDoc(doc(db, 'products', lastProductId))
		productsQuery = query(productsQuery, startAfter(lastProductRef), limit(2))
	}

	if (firstProductId !== '') {
		const firstProductRef = await getDoc(doc(db, 'products', firstProductId))
		const firstProductRef2 = await prevPaginator(firstProductId, productsQuery)
		productsQuery = query(productsQuery, startAt(firstProductRef2), endBefore(firstProductRef), limit(2))
	}

	const productsSnapshot = await getDocs(productsQuery)
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
