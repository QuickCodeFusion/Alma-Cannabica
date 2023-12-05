'use client'
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";
import { ModalProductEdit } from "../ModalAction/ModalProducEdit";
import { useSelector } from '@/redux/hooks'


const AdmProducts = ():React.JSX.Element => {
	const { products, isLoading, isError } = useSelector((state: any) => state.products)
	console.log(products);
	const columns = [
		{ name: "PRODUCTOS", uid: "name" },
		{ name: "CATEGORIA", uid: "rols" },
		{ name: "ACCIONES", uid: "actions" },

	];
	const renderCell = React.useCallback((product: any) => {
		const cells = [];

		if (true) {
			cells.push(() => (

				<User
					avatarProps={{ radius: "lg", src: product.image }}
					name={product.name}

				>
					{product.name}
				</User>
			));
		}
		if (true) {
			cells.push(() => (
				<Chip color="success" variant="faded">{product.category}
				</Chip>
			))
		}

		if (true) {
			cells.push(() => (
				< >
					<div>
						<ModalProductEdit product={product} />
					</div>
					
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
				{products ? (
					<TableBody items={products}>
						{(item) => {
							const cells = renderCell(item);
							return (
								<TableRow key={item.itemId}>
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

export default AdmProducts
