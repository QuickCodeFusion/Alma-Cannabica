import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest): Promise<NextResponse> => {
	try {
		cookies().delete('session')

		return NextResponse.json({ message: 'User has been logged out' }, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}
