import { listUsers } from '@/utils/usersUtils'
import { type UserRecord } from 'firebase-admin/auth'
import UsersList from './UsersList'
const Users = async (): Promise<React.JSX.Element> => {
	const usersList = await listUsers()
	const users = usersList.users

	// const [postAdmin] = usePostAdminMutation()

	// const [banUser] = useBanUserMutation()

	const handleGiveAdmin = (userId: string) => {
		// postAdmin({
		// 	id: userId,
		// 	admin: true
		// })
		// 	.finally(() => {
		// 		location.reload()
		// 	})
	}

	const handleRemoveAdmin = (userId: string) => {
		// postAdmin({
		// 	id: userId,
		// 	admin: false
		// })
		// 	.finally(() => {
		// 		location.reload()
		// 	})
	}

	const handleBan = (userId: string) => {
		// banUser({
		// 	id: userId,
		// 	disabled: true
		// })
		// 	.finally(() => {
		// 		location.reload()
		// 	})
	}

	const handleUnban = (userId: string): void => {
		// banUser({
		// 	id: userId,
		// 	disabled: false
		// })
		// 	.finally(() => {
		// 		location.reload()
		// 	})
	}

	return (
		<div >

			<table className="min-w-[50%] divide-y divide-gray-200">
				<thead className="bg-gray-950">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            UID
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
						</th>
					</tr>
				</thead>
				<UsersList users={users}/>
			</table>
		</div>
	)
}

export default Users
