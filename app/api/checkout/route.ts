import { type NextRequest, NextResponse } from 'next/server'
import { createPreference } from './checkout'
import { type CartProduct } from '@/types/User/types'
export type PreferenceProduct = CartProduct & {
	quantity: string
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
	const { products }: { products: PreferenceProduct[] } = await req.json()
	const URL = req.nextUrl.origin
	const response = await createPreference(products, URL)

	if (!response) return NextResponse.json({ message: 'Error while creating preference' }, { status: 400 })
	return NextResponse.json({ message: 'OK', preference_id: response.preference_id, URL: response.URL, payer: response.payer }, { status: 200 })
}
