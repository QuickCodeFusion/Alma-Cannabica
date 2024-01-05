import { type NextRequest, NextResponse } from 'next/server'
import { deleteItemCart } from './deleteItemCart'
import { deleteCart } from './deleteCart'

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const { userId, itemId } = await req.json()

		if (!itemId) {
			await deleteCart(userId)
			return NextResponse.json({ message: 'Cart deleted' })
		}

		await deleteItemCart(userId, itemId)

		return NextResponse.json({ message: 'Item deleted' })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}
