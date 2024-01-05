import React from 'react'
import { type UserRecord } from 'firebase-admin/auth'
import { Skeleton, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip } from '@nextui-org/react'
import UserButton from '../button/admin/userButton'
import { ModalAction } from './ModalAction/ModalAction'

interface props {
	users: UserRecord[] | undefined
	loading: boolean
	handleBan: (userId: string) => void
	handleUnban: (userId: string) => void
	handleGiveAdmin: (userId: string) => void
	handleRemoveAdmin: (userId: string) => void
}

const UsersTable: React.FC<props> = ({ users, loading, handleBan, handleUnban, handleGiveAdmin, handleRemoveAdmin }): JSX.Element => {
	const columns = [
		{ name: 'NOMBRE', uid: 'name' },
		{ name: 'ROL', uid: 'rols' },
		{ name: 'ACCION', uid: 'actions' }

	]
	const renderCell = React.useCallback((user: any) => {
		const cells = []

		const isAdmin = user.customClaims?.admin ?? false

		cells.push(() => (

			<User
				avatarProps={{ radius: 'lg', src: user.photoUrl }}
				description={user.email}
				name={user.name}

			>
				{user.name}
			</User>
		))
		cells.push(() => (
			<Chip color={isAdmin ? 'warning' : 'primary'} variant="faded">{isAdmin ? 'Admin' : 'User'}
			</Chip>
		))

		cells.push(() => (
			< >
				<div className="sm:relative sm:flex sm:items-center sm:gap-2 hidden">
					{
						user.disabled
							? <UserButton icon='enable' txtColor='green' btnColor='success' action={() => { handleUnban(user.uid) }} loading={loading}/>

							: <UserButton icon='disable' txtColor='red' btnColor='danger' action={() => { handleBan(user.uid) }} loading={loading}/>

					}
					{
						isAdmin
							? <UserButton icon='remove' txtColor='yellow' btnColor='warning' action={() => { handleRemoveAdmin(user.uid) }} loading={loading}/>
							: <UserButton icon='grant' txtColor='blue' btnColor='primary' action={() => { handleGiveAdmin(user.uid) }} loading={loading}/>

					}
				</div>
				<ModalAction user={user} handleBan={handleBan} handleUnban={handleUnban} handleGiveAdmin={handleGiveAdmin} handleRemoveAdmin={handleRemoveAdmin} />
			</>

		))

		return cells
	}, [])

	return (
		<>
			<Table aria-label='Tabla de usuarios'>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn key={column.uid} align="center">
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				{users
					? (
						<TableBody items={users}>
							{(item) => {
								const cells = renderCell(item)
								return (
									<TableRow key={item.uid}>
										{cells.map((cell, index) => (
											<TableCell key={index}>{cell()}</TableCell>
										))}
									</TableRow>
								)
							}}
						</TableBody>
					)
					: (
						<TableBody>
							<TableRow>
								{columns.map((column) => (
									<TableCell key={column.uid}>
										<Skeleton className='rounded'>
										-
										</Skeleton>
									</TableCell>
								))}
							</TableRow>
						</TableBody>
					)}

			</Table>
		</>
	)
}

export default UsersTable
