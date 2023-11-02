import { type NextRequest, NextResponse } from 'next/server'
import { addToCart } from './addToCart'

export const POST = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const { userId, cartItemId, value } = await req.json()
		await addToCart(userId, cartItemId, value)
		return NextResponse.json(
			{ message: 'Product added to cart' },
			{ status: 201 }
		)
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 404 })
	}
}
