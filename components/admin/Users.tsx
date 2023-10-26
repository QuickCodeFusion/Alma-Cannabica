'use client'
import { useEffect, useState } from 'react'
import { useSetAdminMutation, useDisableUserMutation, useGetAllAuthUsersQuery } from '@/redux/service/adminAPI'
import { type UserRecord } from 'firebase-admin/auth'
import { Button } from '@nextui-org/react'

// You might import your user data or fetch it from an API here

const Users = (): React.JSX.Element => {
	const { data, isLoading } = useGetAllAuthUsersQuery(null)

	const [postAdmin] = useSetAdminMutation()

	const [disableUser] = useDisableUserMutation()

	const handleGiveAdmin = (userId: string): any => {
		postAdmin({
			id: userId,
			admin: true
		})
			.then(() => {
				console.log('done')
				location.reload()
			})
			.catch(error => {
				alert('Something went wrong: ' + error)
				console.error(error)
			})
	}

	const handleRemoveAdmin = (userId: string): any => {
		postAdmin({
			id: userId,
			admin: false
		})
			.then(() => {
				location.reload()
			})
			.catch(error => {
				alert('Something went wrong: ' + error)
			})
	}

	const handleBan = async (userId: string): Promise<void> => {
		try {
			await disableUser({
				id: userId,
				disabled: true
			})
			location.reload()
		} catch (error) {
			alert('Something went wrong')
		}
	}

	const handleUnban = async (userId: string): Promise<void> => {
		try {
			await disableUser({
				id: userId,
				disabled: false
			})
			location.reload()
		} catch (error) {
			alert('Something went wrong')
		}
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
									user.disabled

										? <Button onClick={() => handleUnban(user.uid)} >Unban</Button>
										: <Button onClick={() => handleBan(user.uid)} >Ban</Button>
								}
						</td>
						<td className="px-6 py-4 whitespace-nowrap">
								{
									user.customClaims?.admin

										? <Button onClick={() => handleRemoveAdmin(user.uid)}>Revoke Admin</Button>
										: <Button onClick={() => handleGiveAdmin(user.uid)} >Give Admin</Button>
								}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Users
