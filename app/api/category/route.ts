import { db } from '@/firebase/config'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (): Promise<NextResponse> => {
	try {
		const categoryRef = collection(db, 'category')
		const categoriesSnapshot = await getDocs(categoryRef)

		const categories = categoriesSnapshot.docs.map((doc) => (
			doc.data().name
		))

		return NextResponse.json(categories, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const { nameCategory } = await req.json()

		await deleteDoc(doc(db, 'category', nameCategory))

		return NextResponse.json({ message: 'Category deleted' }, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}
