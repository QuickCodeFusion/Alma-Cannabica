import { listUsers } from '@/utils/usersUtils'
import { NextResponse } from 'next/server'

export const GET = async (): Promise<NextResponse> => {
	const usersList = await listUsers()

	return NextResponse.json(usersList, { status: 200 })
}
