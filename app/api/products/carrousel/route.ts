import { db } from '@/firebase/config'
import { type CarouselProduct, type Product } from '@/types/Product/type'
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
		const product: Product = await req.json()

		const CarouselProductRef = doc(db, 'cardCarrousel', product.itemId)
		const productRef = doc(db, 'products', product.itemId)

		const carouselProduct: CarouselProduct = {
			category: product.category,
			description: product.description,
			image: product.image,
			itemId: product.itemId,
			name: product.name,
			price: product.price
		}

		await setDoc(CarouselProductRef,
			carouselProduct
		)

		await updateDoc(productRef, {
			inCarousel: true
		})

		return NextResponse.json({ message: 'Product added', product: carouselProduct }, { status: 201 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const { itemId }: { itemId: string } = await req.json()

		const CarouselProductRef = doc(db, 'cardCarrousel', itemId)

		await deleteDoc(CarouselProductRef)

		const productRef = doc(db, 'products', itemId)

		await updateDoc(productRef, {
			inCarousel: false
		})

		return NextResponse.json({ message: `Product ${itemId} deleted` }, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}
