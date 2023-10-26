import { db } from '@/firebase/config'
import { doc, updateDoc, getDoc } from 'firebase/firestore'

export const updateAddress = async (
	userId: string,
	address: string,
	nameAddress: string
): Promise<void> => {
	const docRef = doc(db, 'users', userId)

	const userDoc = await getDoc(docRef)

	if (userDoc.exists()) {
		const userData = userDoc.data()

		const addresses = userData.addresses || []

		const existingAddress = addresses.find(
			(obj: { nameAddress: string }) => obj.nameAddress === nameAddress
		)

		if (existingAddress) {
			existingAddress.address = address
		} else {
			addresses.push({ nameAddress, address })
		}

		await updateDoc(docRef, { addresses })
	}
}
