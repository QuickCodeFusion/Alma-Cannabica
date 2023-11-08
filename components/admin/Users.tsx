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
			.catch(error => {
				alert('Something went wrong: ' + error)
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
			<UsersTable users={data?.users} loading={loading} handleBan={handleBan} handleUnban={handleUnban} handleGiveAdmin={handleGiveAdmin} handleRemoveAdmin={handleRemoveAdmin}/>
			{usersLoading && <div>Loading...</div>}
			{isError && <div>Ups! Ha habido un error al cargar la página</div>}
		</div>
	)
}

export default Users
