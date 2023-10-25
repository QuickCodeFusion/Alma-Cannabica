'use client'
import { type UserRecord } from 'firebase-admin/auth'

const UsersList = ({ users }: { users: UserRecord[] }): React.JSX.Element => {
	return (
		<tbody className="bg-gray-950 divide-y divide-gray-200">
			{users.map((user: UserRecord) => (
				<tr key={user.uid}>
					<td className="px-6 py-4 whitespace-nowrap">
						{user.uid}
					</td>
					<td className="px-6 py-4 whitespace-nowrap">
						{user.email}
					</td>
					<td className="px-6 py-4 whitespace-nowrap">
						{user.customClaims?.admin ? 'Admin' : 'User'}
					</td>
					<td className="px-6 py-4 whitespace-nowrap">
						<button color="primary">
							{
								user.disabled

									? <span >Unban</span>
									: <span >Ban</span>
							}
						</button>
					</td>
					<td className="px-6 py-4 whitespace-nowrap">
						<button>
							{
								user.customClaims?.admin

									? <span >Revoke Admin</span>
									: <span >Give Admin</span>
							}
						</button>
					</td>
				</tr>
			))}
		</tbody>
	)
}

export default UsersList
