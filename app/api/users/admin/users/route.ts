import { db } from '@/firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export const GET = async (): Promise<NextResponse> => {
	try {
		const usersCollection = collection(db, 'users')

		const usersSnapshot = await getDocs(usersCollection)

		const usersList = await Promise.all(
			usersSnapshot.docs.map(async (doc) => {
				return {
					...doc.data(),
					uid: doc.id
				}
			})
		)

		return NextResponse.json({ users: usersList }, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}
