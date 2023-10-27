'use client'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useSetAdminMutation, useDisableUserMutation, useGetAllAuthUsersQuery } from '@/redux/service/adminAPI'
import { type UserRecord } from 'firebase-admin/auth'
import { Button } from '@nextui-org/react'
import UserButton from '../button/admin/userButton'

// You might import your user data or fetch it from an API here

const Users = (): React.JSX.Element => {
	const [loading, setLoading] = useState(false)
	const { data, isLoading } = useGetAllAuthUsersQuery(null)

	const [postAdmin] = useSetAdminMutation()

	const [disableUser] = useDisableUserMutation()

	console.log(data)
	const handleGiveAdmin = (userId: string): any => {
		setLoading(true)
		postAdmin({
			id: userId,
			admin: true
		})
			.then(() => {
				toast.success('Se otorgo Admin')
				setLoading(false)
				location.reload()
			})
			.catch(error => {
				toast.error('Something went wrong: ' + error)
				console.error(error)
			})
	}

	const handleRemoveAdmin = (userId: string): any => {
		setLoading(true)
		postAdmin({
			id: userId,
			admin: false
		})
			.then(() => {
				toast.success('Se quito Admin')
				location.reload()
				setLoading(false)
			})
			.catch(error => {
				toast.error('Something went wrong: ' + error)
			})
	}

	const handleBan = (userId: string): any => {
		setLoading(true)
		disableUser({
			id: userId,
			disabled: true
		})
			.then(() => {
				toast.success('Usuario desabilitado')
				setLoading(false)
				location.reload()
			})
			.catch(error => {
				toast.error('Something went wrong: ' + error)
			})
	}

	const handleUnban = (userId: string): any => {
		setLoading(true)
		disableUser({
			id: userId,
			disabled: false
		})
			.then(() => {
				toast.success('Usuario habilitado')
				setLoading(false)
				location.reload()
			})
			.catch(error => {
				toast.error('Something went wrong: ' + error)
			})
	}

	return (
		<div >
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
					{data?.users?.map((user: UserRecord) => (
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
												? <UserButton title='Habilitar' txtColor='green' btnColor='success' action={() => handleUnban(user.uid)}/>
												: <UserButton title='Deshabilitar' txtColor='red' btnColor='danger' action={() => handleBan(user.uid)}/>
										)
								}
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								{
									loading
										? <Button radius='full' isLoading>Cargando</Button>
										:										(
											user.customClaims?.admin
												? <UserButton title='Quitar Admin' txtColor='yellow' btnColor='warning' action={() => handleRemoveAdmin(user.uid)}/>
												: <UserButton title='Otorgar Admin' txtColor='blue' btnColor='primary' action={() => handleGiveAdmin(user.uid)}/>
										)
								}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{isLoading && <div>Loading...</div>}
		</div>
	)
}

export default Users
