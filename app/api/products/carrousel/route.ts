import { db } from '@/firebase/config'
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (): Promise<NextResponse> => {
	try {
		const productsRef = collection(db, 'cardCarrousel')
		const productsSnapshot = await getDocs(productsRef)
		const products = productsSnapshot.docs.map((doc) => (
			{
				itemId: doc.id,
				...doc.data()
			}
		))
		return NextResponse.json(products, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const product = await req.json()
		
		const CarouselProductRef = doc(db, 'cardCarrousel', product.itemId)
		const productRef = doc(db, 'products', product.itemId)

		await setDoc(CarouselProductRef,
			product
		)

		await updateDoc(productRef, {
			inCarousel: true
		})

		return NextResponse.json({ message: 'Product added' }, { status: 201 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const { itemId }: { itemId: string } = await req.json()
		console.log(itemId);
		

		const productsRef = doc(db, 'cardCarrousel', itemId)

		await deleteDoc(productsRef)

		return NextResponse.json({ message: 'Product deleted ' + itemId }, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}
