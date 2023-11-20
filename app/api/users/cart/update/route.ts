import { type NextRequest, NextResponse } from 'next/server'
import { changeQuantity } from './changeQuantity'
export const PUT = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const { userId, cartItemId, value } = await req.json()
		if (!userId || !cartItemId || !value) {
			return NextResponse.json({ error: 'Insufficient data' }, { status: 400 })
		}

		await changeQuantity(userId, cartItemId, value)

		return NextResponse.json({ message: 'Item updated' })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}
