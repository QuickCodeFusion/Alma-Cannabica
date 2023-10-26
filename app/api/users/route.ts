import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { type NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { auth } from '@/firebase/admin-config'
import { updateAddress } from './updateAddresses'

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

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const sessionToken = cookies().get('session')?.value ?? ''

		if (!sessionToken) {
			throw new Error('User must be logged in')
		}

		const { uid } = await auth.verifySessionCookie(sessionToken, true)

		const { name, email, photoUrl, address, nameAddress } = await req.json()


		const userRef = doc(db, 'users', uid)
		name && (await updateDoc(userRef, { name }))
		email && (await updateDoc(userRef, { email }))
		photoUrl && (await updateDoc(userRef, { photoUrl }))
    
		if (address && nameAddress) {
			await updateAddress(uid, address, nameAddress)
		}

		return NextResponse.json({ message: 'User updated' }, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}
