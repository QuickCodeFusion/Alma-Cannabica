import { type UserRecord } from 'firebase-admin/auth'
import { Button } from '@nextui-org/react'
import UserButton from '../button/admin/userButton'

interface props {
	users: UserRecord[] | undefined
	loading: boolean
	handleBan: (userId: string) => void
	handleUnban: (userId: string) => void
	handleGiveAdmin: (userId: string) => void
	handleRemoveAdmin: (userId: string) => void
}

const UsersTable: React.FC<props> = ({ users, loading, handleBan, handleUnban, handleGiveAdmin, handleRemoveAdmin }): JSX.Element => {
	return (

		<table className="min-w-full divide-y divide-gray-200">
			<thead className="bg-gray-950">
				<tr>
					<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    UID
					</th>
					<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
					</th>
					<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rango
					</th>
				</tr>
			</thead>
			<tbody className="bg-gray-950 divide-y divide-gray-200">
				{users?.map((user: UserRecord) => (
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
							{
								loading
									? <Button radius='full' isLoading>Cargando</Button>
									:										(
										user.disabled
											? <UserButton title='Habilitar' txtColor='green' btnColor='success' action={() => { handleUnban(user.uid) }}/>
											: <UserButton title='Deshabilitar' txtColor='red' btnColor='danger' action={() => { handleBan(user.uid) }}/>
									)
							}
						</td>
						<td className="px-6 py-4 whitespace-nowrap">
							{
								loading
									? <Button radius='full' isLoading>Cargando</Button>
									:										(
										user.customClaims?.admin
											? <UserButton title='Quitar Admin' txtColor='yellow' btnColor='warning' action={() => { handleRemoveAdmin(user.uid) }}/>
											: <UserButton title='Otorgar Admin' txtColor='blue' btnColor='primary' action={() => { handleGiveAdmin(user.uid) }}/>
									)
							}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default UsersTable
