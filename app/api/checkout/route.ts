import { type NextRequest, NextResponse } from 'next/server'
import { createPreference } from './checkout'
import { type CartProduct } from '@/types/User/types'
export type PreferenceProduct = CartProduct & {
	quantity: string
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
	const { product }: { product: PreferenceProduct } = await req.json()
	const URL = req.nextUrl.origin
	const response = await createPreference({
		id: product.itemId,
		quantity: parseInt(product.quantity),
		title: product.name,
		unit_price: parseInt(product.price),
		picture_url: product.image
	}, URL)
	return NextResponse.json({ message: 'OK', response }, { status: 200 })
}
