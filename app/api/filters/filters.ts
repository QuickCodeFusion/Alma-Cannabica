import { db } from '@/firebase/config'
import { type Product } from '@/types/Product/type'
import { query, where, collection, getDocs, orderBy, limit, startAfter, doc, getDoc, endBefore, startAt } from 'firebase/firestore'
import { backPaginator } from './backPaginator'

export const filters = async (name: string, minPrice: string, maxPrice: string, category: string, order: string, firstProductId: string, lastProductId: string): Promise<Product[]> => {
	let productRef = query(collection(db, 'products'), orderBy('name', 'asc'), limit(6))

	if (lastProductId !== '') {
		const lastProductRef = await getDoc(doc(db, 'products', lastProductId))
		productRef = query(productRef, startAfter(lastProductRef), limit(2))
	}

	if (firstProductId !== '') {
		const firstProductRef = await getDoc(doc(db, 'products', firstProductId))
		const firstProductRef2 = await backPaginator(firstProductId)
		productRef = query(productRef, startAt(firstProductRef2), endBefore(firstProductRef), limit(2))
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

	if (name !== '') {
		const data = products?.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()))
		return data
	}

	return products
}
