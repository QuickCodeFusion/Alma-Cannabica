import { InitApp, auth } from '@/firebase/admin-config'
import { cookies, headers } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

InitApp()
// Helper function to validate and set the session cookie
const setSessionCookie = async (idToken: string) => {
	const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
	const sessionCookie = await auth.createSessionCookie(idToken, {
		expiresIn
	})
	const options = {
		name: 'session',
		value: sessionCookie,
		maxAge: expiresIn,
		httpOnly: true,
		secure: true
	}

	cookies().set(options)
}

// Login
export const POST = async (req: NextRequest): Promise<NextResponse> => {
	const authorization = headers().get('Authorization')
	try {
		if (!authorization?.startsWith('Bearer ')) {
			throw new Error('Unauthorized')
		}

		const idToken = authorization.split('Bearer ')[1]
		const decodedToken = await auth.verifyIdToken(idToken)

		if (decodedToken) {
			await setSessionCookie(idToken)
		}

		return NextResponse.json({ message: 'Logged in' }, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 301 })
	}
}

// Get user info
export const GET = async (req: NextRequest): Promise<NextResponse> => {
	const sessionToken = cookies().get('session')?.value	??
	headers().get('Authorization')?.split('Bearer ')[1]	??
	''

	try {
		if (!sessionToken) {
			throw new Error('User must be logged in')
		}

		const decodedToken = await auth.verifySessionCookie(sessionToken, true)

		const user = await auth.getUser(decodedToken.uid)

		if (!user) {
			throw new Error('User not found')
		}

		return NextResponse.json(user, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}
