import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const userId = req.nextUrl.searchParams.get('userId') ?? ''
		const userRef = doc(db, 'users', userId)
		const userSnapshot = await getDoc(userRef)
		const user = userSnapshot.data()
		return NextResponse.json(user, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}
