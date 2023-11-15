import { auth } from '@/firebase/admin-config'
import { NextResponse } from 'next/server'

export const GET = async (): Promise<NextResponse> => {
	const listUsers = async (nextPageToken?: string): Promise<any> => {
		const listUsersResult = await auth.listUsers()
		const users = listUsersResult.users.map((userRecord) => userRecord.toJSON())
		const result = {
			users: [...users],
			nextPageToken: listUsersResult.pageToken
		}
		return result
	}
	const usersList = await listUsers()

	return NextResponse.json(usersList, { status: 200 })
}
