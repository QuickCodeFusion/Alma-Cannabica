import React from 'react'
import { type UserRecord } from 'firebase-admin/auth'
import { Button } from '@nextui-org/react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue } from "@nextui-org/react";
import UserButton from '../button/admin/userButton'
import Loading from '@/app/loading';

interface props {
	users: UserRecord[] | undefined
	loading: boolean
	handleBan: (userId: string) => void
	handleUnban: (userId: string) => void
	handleGiveAdmin: (userId: string) => void
	handleRemoveAdmin: (userId: string) => void
}
const statusColorMap: Record<string, ChipProps["color"]> = {
	active: "success",
	paused: "danger",
	vacation: "warning",
};

const UsersTable: React.FC<props> = ({ users, loading, handleBan, handleUnban, handleGiveAdmin, handleRemoveAdmin }): JSX.Element => {

	console.log(users);
	const columns = [
		{ name: "NOMBRE", uid: "name" },
		{ name: "ROL", uid: "rols" },
		{ name: "ACCION", uid: "actions" },
		{ name: "AGREGAR", uid: "temp" },
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
				<div className="relative flex items-center gap-2">
					<Tooltip content="Tooltip 3" color="success" offset={-7}>
						{
							loading
								? <Button radius='full' isLoading>Cargando</Button>
								: (
									user.disabled
										? <UserButton title='Habilitar' txtColor='green' btnColor='success' action={() => { handleUnban(user.uid) }} />
										: <UserButton title='Deshabilitar' txtColor='red' btnColor='danger' action={() => { handleBan(user.uid) }} />
								)
						}
					</Tooltip>
				</div>
			));
		}
		if (true) {
			cells.push(() => (
				<div className="relative flex items-center gap-2">
					<Tooltip content="Details">
					{
								loading
									? <Button radius='full' isLoading>Cargando</Button>
									:										(
										user.customClaims?.admin
											? <UserButton title='Quitar Admin' txtColor='yellow' btnColor='warning' action={() => { handleRemoveAdmin(user.uid) }}/>
											: <UserButton title='Otorgar Admin' txtColor='blue' btnColor='primary' action={() => { handleGiveAdmin(user.uid) }}/>
									)
							}
					</Tooltip>
				</div>
			));
		}

		return cells;
	}, []);

	return (
		<Table aria-label="Example table with custom cells">
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
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
				// Aquí puedes mostrar un mensaje o un indicador de carga mientras `users` está vacío o no definido
				<TableBody>
					<TableRow>
						<TableCell>
							<Loading />
						</TableCell>
						<TableCell>
							<Loading />
						</TableCell>
						<TableCell>
							<Loading />
						</TableCell>
						<TableCell>
							<Loading />
						</TableCell>
					</TableRow>
				</TableBody>
			)}

		</Table>
	);
}

export default UsersTable
