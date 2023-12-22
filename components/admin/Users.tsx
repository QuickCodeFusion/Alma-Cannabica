'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { useSetAdminMutation, useDisableUserMutation, useGetAllAuthUsersQuery } from '@/redux/service/adminAPI'
import UsersTable from './UsersTable'

const Users = (): React.JSX.Element => {
	const [loading, setLoading] = useState(false)
	const { data, isLoading: usersLoading, isError } = useGetAllAuthUsersQuery(null)

	const [postAdmin] = useSetAdminMutation()

	const [disableUser] = useDisableUserMutation()

	const handleGiveAdmin = (userId: string): any => {
		toast.promise(
			postAdmin({
				id: userId,
				admin: true
			})
				.unwrap(),
			{
				loading: 'Cargando...',
				success: ({ user }) => {
					return `Se otorgó admin al usuario ${user.email}`
				},
				error: (error: any) => {
					return 'Algo salió mal: ' + error
				},
				finally: () => { location.reload() }
			}
		)
	}

	const handleRemoveAdmin = (userId: string): any => {
		toast.promise(
			postAdmin({
				id: userId,
				admin: false
			})
				.unwrap(),
			{
				loading: 'Cargando...',
				success: ({ user }) => {
					return `Se quitó admin al usuario ${user.email}`
				},
				error: (error: any) => {
					return 'Algo salió mal: ' + error
				},
				finally: () => { location.reload() }
			}
		)
	}

	const handleBan = (userId: string): any => {
		toast.promise(
			disableUser({
				id: userId,
				disabled: true
			})
				.unwrap(),
			{
				loading: 'Cargando...',
				success: ({ user }) => {
					return `Se deshabilitó al usuario ${user.email}`
				},
				error: (error: any) => {
					return 'Algo salió mal: ' + error
				},
				finally: () => { location.reload() }
			}
		)
	}

	const handleUnban = (userId: string): any => {
		toast.promise(
			disableUser({
				id: userId,
				disabled: true
			})
				.unwrap(),
			{
				loading: 'Cargando...',
				success: ({ user }) => {
					return `Se habilitó nuevamente al usuario ${user.email}`
				},
				error: (error: any) => {
					return 'Algo salió mal: ' + error
				},
				finally: () => { location.reload() }
			}
		)
	}
	return (
		<div >
			<UsersTable users={data?.users} loading={loading} handleBan={handleBan} handleUnban={handleUnban} handleGiveAdmin={handleGiveAdmin} handleRemoveAdmin={handleRemoveAdmin}/>
			{usersLoading && <div>Loading...</div>}
			{isError && <div>Ups! Ha habido un error al cargar la página</div>}
		</div>
	)
}
export default Users
