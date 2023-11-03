import { type UserRecord } from 'firebase-admin/auth'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export const middleware = async (req: NextRequest): Promise<NextResponse> => {
	const sessionToken = cookies().get('session')?.value ?? ''

	if (!sessionToken) {
		return NextResponse.json({ error: 'User not logged in' }, { status: 401 })
	}

	const user: UserRecord = await fetch(`${req.nextUrl.origin}/api/auth/login`, {
		headers: {
			Authorization: `Bearer ${sessionToken}`
		}
	}).then(async res => await res.json())

	if (req.nextUrl.pathname.startsWith('/admin-dashboard') && !user.customClaims?.admin) {
		return NextResponse.json({ error: `User ${user.email} is not an admin` }, { status: 401 })
	}
	return NextResponse.next()
}

export const config = {
	matcher: ['/api/users/:path*', '/admin-dashboard/:path*']
}
