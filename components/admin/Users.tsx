'use client'
import { type UserRecord } from 'firebase-admin/auth'
import { Table, TableHeader, TableColumn, TableBody, TableRow, getKeyValue, TableCell } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useDisableUserMutation, useGetAllAuthUsersQuery, useSetAdminMutation } from '@/redux/service/adminAPI'
const Users = (): React.JSX.Element => {
	const { data, isLoading } = useGetAllAuthUsersQuery(null)

	const columns = [{ key: 'uid', label: 'UID' }, { key: 'email', label: 'Email' }]

	const [users, setUsers] = useState<any[]>()

	const [postAdmin] = useSetAdminMutation()

	const [banUser] = useDisableUserMutation()

	useEffect(() => {
		!isLoading ?? setUsers(data?.users)
	}, [data])

	const handleGiveAdmin = (userId: string): void => {
		void postAdmin({
			id: userId,
			admin: true
		})
			.finally(() => {
				location.reload()
			})
	}

	const handleRemoveAdmin = (userId: string): void => {
		void postAdmin({
			id: userId,
			admin: false
		})
			.finally(() => {
				location.reload()
			})
	}

	const handleBan = (userId: string): void => {
		void banUser({
			id: userId,
			disabled: true
		})
			.finally(() => {
				location.reload()
			})
	}

	const handleUnban = (userId: string): void => {
		void banUser({
			id: userId,
			disabled: false
		})
			.finally(() => {
				location.reload()
			})
	}

	return (
		<div >
			<Table>
				<TableHeader columns={columns}>
					{(column) => <TableColumn key={column?.key}>{column?.label}</TableColumn>}
				</TableHeader>
				<TableBody items={users}>
					{(item) => (
						<TableRow key={item?.uid}>
							{(columnKey) => <TableCell>{getKeyValue(item ?? null, columnKey)}</TableCell>}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}

export default Users
