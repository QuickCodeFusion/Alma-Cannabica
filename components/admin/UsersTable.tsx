import React from 'react'
import { type UserRecord } from 'firebase-admin/auth'
import { Button } from '@nextui-org/react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";
import UserButton from '../button/admin/userButton'
import { ModalAction } from './ModalAction/ModalAction';

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
		{ name: "NOMBRE", uid: "name" },
		{ name: "ROL", uid: "rols" },
		{ name: "ACCION", uid: "actions" },

	];
	const renderCell = React.useCallback((user: any) => {
		const cells = [];

		if (user.name !== "") {
			cells.push(() => (

				<User
					avatarProps={{ radius: "lg", src: user.photoUrl }}
					description={user.email}
					name={user.name}

				>
					{user.name}
				</User>
			));
		}
		if (true) {
			cells.push(() => (
				<Chip color="warning" variant="faded">{user.customClaims?.admin ? 'Admin' : 'User'}
				</Chip>
			))
		}

		if (user.email !== "") {
			cells.push(() => (
				< >
					<div className="sm:relative sm:flex sm:items-center sm:gap-2 hidden">
						<Tooltip content='temporal'>
							{
								loading
									? <Button radius='full' isLoading>Cargando</Button>
									: (
										user.disabled
											? <UserButton onClose={() => { }} icon='enable' txtColor='green' btnColor='success' action={() => { handleUnban(user.uid) }} />
											: <UserButton onClose={() => { }} icon='disable' txtColor='red' btnColor='danger' action={() => { handleBan(user.uid) }} />
									)
							}
						</Tooltip >
						<Tooltip content='temporal'>
							{
								loading
									? <Button radius='full' isLoading>Cargando</Button>
									: (
										user.customClaims?.admin
											? <UserButton onClose={() => { }} icon='remove' txtColor='yellow' btnColor='warning' action={() => { handleRemoveAdmin(user.uid) }} />
											: <UserButton onClose={() => { }} icon='grant' txtColor='blue' btnColor='primary' action={() => { handleGiveAdmin(user.uid) }} />
									)
							}

						</Tooltip>
					</div>
					<ModalAction user={user} handleBan={handleBan} handleUnban={handleUnban} handleGiveAdmin={handleGiveAdmin} handleRemoveAdmin={handleRemoveAdmin} />
				</>

			));
		}


		return cells;
	}, []);

	return (
		<>
			<Table aria-label="Example table with custom cells">
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn key={column.uid} align="center">
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				{users ? (
					<TableBody items={users}>
						{(item) => {
							const cells = renderCell(item);
							return (
								<TableRow key={item.uid}>
									{cells.map((cell, index) => (
										<TableCell key={index}>{cell()}</TableCell>
									))}
								</TableRow>
							);
						}}
					</TableBody>
				) : (
					<TableBody>
						<TableRow>
							{columns.map((column) => (
								<TableCell key={column.uid}>-</TableCell>
							))}
						</TableRow>
					</TableBody>
				)}

			</Table>
		</>
	);
}

export default UsersTable
