import { addDoc, collection, getDocs, deleteDoc, doc, query, orderBy, limit } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { type NextRequest, NextResponse } from 'next/server'
import { editProduct } from './editProduct'
import { createCategory } from './createCategory'

export const POST = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const { name, description, price, image, category } = await req.json()

		if (!name || !description || !price || !image) {
			throw new Error('Missing data')
		}
		await addDoc(collection(db, 'products'), {
			name,
			nameToLowerCase: name.toLowerCase(),
			description,
			price,
			image,
			category
		})

		await createCategory(category)

		return NextResponse.json({ message: 'Product created' }, { status: 201 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}

export const GET = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const productsQuery = query(collection(db, 'products'), limit(6))

		const productsSnapshot = await getDocs(productsQuery)

		const products = productsSnapshot.docs.map((doc) => ({
			...doc.data(),
			itemId: doc.id
		}))

		return NextResponse.json(products, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const itemId: string = req.nextUrl.searchParams.get('itemId') ?? ''

		const itemRef = doc(db, 'products', itemId)

		await deleteDoc(itemRef)

		return NextResponse.json({ message: 'Product deleted ' + itemId }, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const itemId: string = req.nextUrl.searchParams.get('itemId') ?? ''

		const { name, description, price, image, category } = await req.json()

		const product = {
			name,
			description,
			price,
			image,
			itemId,
			category
		}

		await editProduct(product)

		return NextResponse.json({ message: 'Product updated ' + itemId }, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}
