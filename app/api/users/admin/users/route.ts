import { db } from '@/firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export const GET = async (): Promise<NextResponse> => {
	const usersCollection = collection(db, 'users')

	const usersSnapshot = await getDocs(usersCollection)

	const usersList = usersSnapshot.docs.map((doc) => {
		return {
			uid: doc.id,
			...doc.data()
		}
	})

	return NextResponse.json(usersList, { status: 200 })
}
