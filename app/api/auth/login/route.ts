import { InitApp, auth } from '@/firebase/admin-config'
import { cookies, headers } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

InitApp()

/**
 * Sets a session cookie with the provided ID token.
 *
 * @param {string} idToken - The ID token to use for creating the session cookie.
 * @return {Promise<void>} A promise that resolves when the session cookie is set.
 */
const setSessionCookie = async (idToken: string): Promise<void> => {
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

		return NextResponse.json({ message: 'Logged in', userdata: decodedToken }, { status: 200 })
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
