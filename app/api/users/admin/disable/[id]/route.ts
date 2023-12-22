import { auth } from '@/firebase/admin-config'
import { db } from '@/firebase/config'
import { doc, updateDoc } from 'firebase/firestore'
import { type NextRequest, NextResponse } from 'next/server'

export const POST = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
): Promise<NextResponse> => {
	try {
		const { id } = params
		const { disabled } = await req.json()
		const updatedUser = await auth.updateUser(id, { disabled })

		const userRef = doc(db, 'users', id)
		await updateDoc(userRef, {
			disabled
		})

		return NextResponse.json({ message: 'OK', user: updatedUser }, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 301 })
	}
}
