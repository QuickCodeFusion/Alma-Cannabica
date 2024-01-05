import { db } from '@/firebase/config'
import { type Product } from '@/types/Product/type'
import { query, where, collection, getDocs, orderBy, limit, startAfter, doc, getDoc, endBefore, limitToLast, getCountFromServer } from 'firebase/firestore'

export const filters = async (
	name: string,
	minPrice: string,
	maxPrice: string,
	category: string,
	order: string,
	firstProductId: string,
	lastProductId: string,
	pageSize: number = 6): Promise<{ products: Product[], totalPages: number }> => {
	let productsQuery = query(collection(db, 'products'))

	const totalDocs = await getCountFromServer(productsQuery)
	const totalPages = Math.ceil(totalDocs.data().count / pageSize)

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

		default:
			productsQuery = query(productsQuery, orderBy('name', 'asc'))
			break
	}

	if (lastProductId === '' && firstProductId === '') {
		productsQuery = query(productsQuery, limit(pageSize))
	}

	if (lastProductId !== '') {
		const lastProductRef = await getDoc(doc(db, 'products', lastProductId))
		productsQuery = query(productsQuery, startAfter(lastProductRef), limit(pageSize))
	}

	if (firstProductId !== '') {
		const firstProductRef = await getDoc(doc(db, 'products', firstProductId))
		productsQuery = query(productsQuery, endBefore(firstProductRef), limitToLast(pageSize))
	}

	const productsSnapshot = await getDocs(productsQuery)
	let products: Product[] = productsSnapshot.docs.map((doc) => ({
		...(doc.data() as Product),
		itemId: doc.id
	}))

	if (name !== '') {
		products = products?.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()))
		return {
			products,
			totalPages
		}
	}

	return {
		products,
		totalPages
	}
}
