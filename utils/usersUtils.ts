import { auth } from '@/firebase/admin-config'

export const listUsers = async (nextPageToken?: string): Promise<any> => {
	const listUsersResult = await auth.listUsers()
	const users = listUsersResult.users.map((userRecord) => userRecord.toJSON())
	const result = {
		users: [...users],
		nextPageToken: listUsersResult.pageToken
	}
	return result
}
