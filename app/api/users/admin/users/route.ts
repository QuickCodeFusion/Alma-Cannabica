import { db } from '@/firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export const GET = async (): Promise<NextResponse> => {
	const usersCollection = collection(db, 'users')

	const usersSnapshot = await getDocs(usersCollection)

	const usersList = usersSnapshot.docs.map(async (doc) => {
		const claimsCollection = collection(db, 'users', doc.id, 'claims')
		const claimsSnapshot = await getDocs(claimsCollection)
		const claims = claimsSnapshot.docs.map((claim) => {
			return claim.data()
		})
		return {
			uid: doc.id,
			disabled: doc.data().disabled ?? false,
			customClaims: { ...claims } ?? { admin: false },
			...doc.data()
		}
	})

	return NextResponse.json({ users: usersList }, { status: 200 })
}
