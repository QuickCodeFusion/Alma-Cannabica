import { type NextRequest, NextResponse } from 'next/server'
import { filters } from './filters'

export const GET = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const name: string = req.nextUrl.searchParams.get('name') ?? ''
		const minPrice: string = req.nextUrl.searchParams.get('minPrice') ?? ''
		const maxPrice: string = req.nextUrl.searchParams.get('maxPrice') ?? ''
		const category: string = req.nextUrl.searchParams.get('category') ?? ''
		const order: string = req.nextUrl.searchParams.get('order') ?? ''
		const firstProductId: string = req.nextUrl.searchParams.get('firstProductId') ?? ''
		const lastProductId: string = req.nextUrl.searchParams.get('lastProductId') ?? ''

		const data = await filters(name, minPrice, maxPrice, category, order, firstProductId, lastProductId)

		return NextResponse.json(data, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}
