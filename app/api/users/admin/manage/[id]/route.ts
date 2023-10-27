import { auth } from '@/firebase/admin-config'
import { type NextRequest, NextResponse } from 'next/server'

export const POST = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
): Promise<NextResponse> => {
	try {
		const { id } = params
		const { admin } = await req.json()
		await auth.setCustomUserClaims(id, { admin })

		return NextResponse.json({ message: 'OK' }, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 301 })
	}
}
