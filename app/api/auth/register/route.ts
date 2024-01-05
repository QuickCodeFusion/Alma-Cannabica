import { type NextRequest, NextResponse } from 'next/server'
import { createUser } from './createUser'
import { headers } from 'next/headers'

export const POST = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const {
			name,
			email,
			photoUrl,
			adresses,
			uid
		} = await req.json()
		const token = headers().get('Authorization')?.split('Bearer ')[1] ?? ''

		await createUser(name, email, uid, token, photoUrl, adresses)

		return NextResponse.json({ message: `User ${name} created` }, { status: 201 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}
