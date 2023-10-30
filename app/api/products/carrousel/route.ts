import { db } from '@/firebase/config'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (): Promise<NextResponse> => {
	try {
		const productsRef = collection(db, 'cardCarrousel')
		const productsSnapshot = await getDocs(productsRef)
		const products = productsSnapshot.docs.map((doc) => (
			doc.data()
		))
		return NextResponse.json(products, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const { name, price, image } = await req.json()
		const productsRef = collection(db, 'cardCarrousel')
		await addDoc(productsRef, {
			name,
			price,
			image
		})
		return NextResponse.json({ message: 'Product added' }, { status: 201 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}
