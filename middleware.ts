import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { auth } from './firebase/admin-config'

export const middleware = async (req: NextRequest): Promise<NextResponse> => {
	// const sessionToken = cookies().get('session')?.value ?? ''

	// if (!sessionToken) {
	// 	return NextResponse.redirect(new URL('/login', req.url))
	// }

	// const decodedToken = await auth.verifySessionCookie(sessionToken, true)

	// if (!decodedToken) {
	// 	return NextResponse.redirect(new URL('/login', req.url))
	// }

	// const user = await auth.getUser(decodedToken.uid)

	// if (!user.customClaims?.admin) {
	// 	// TODO: Add protection to future admin routes
	// }
	return NextResponse.next()
}

export const config = {
	matcher: ['/api/users/:path*']
}
