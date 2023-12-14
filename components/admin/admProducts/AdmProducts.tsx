'use client'
import React from "react";
import {Skeleton, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";
import { ModalProductEdit } from "../ModalAction/ModalProducEdit";
import { useSelector } from '@/redux/hooks'
import { Product } from "@/types/Product/type";
import { useState , useEffect } from "react";
import { useGetCarouselQuery } from "@/redux/service/carouselAPI";
import { useGetAllProductsQuery } from "@/redux/service/productsAPI";

const AdmProducts = (): React.JSX.Element => {
	const { data: products, refetch: refetchProducts } = useGetAllProductsQuery(null);
	//const { data } = useSelector((state: any) => state.carousel)
	const { data , isLoading, refetch: refetchCarousel } = useGetCarouselQuery(null);
	const [update, setUpdate] = useState<boolean>(false);
	useEffect(() => {
		
		if (update) {
		refetchProducts();
		setUpdate(false);
		}
	}, [update, refetchProducts]);
	
	const handleUpdate = async (boolean: boolean) => {
		if (boolean) {
		  try {
			await refetchCarousel();
			setUpdate(true);
		  } catch (error) {
			// Manejar errores si la solicitud de refresco del carrusel falla
			console.error("Error al actualizar el carrusel:", error);
		  }
		}
	  };
	
	
	const columns = [
		{ name: "PRODUCTOS", uid: "name" },
		{ name: "CATEGORIA", uid: "rols" },
		{ name: "ACCIONES", uid: "actions" },

	];
	const renderCell = React.useCallback((product: any, data:Product[]) => {
		const cells = [];


		if (true) {
			cells.push(() => (

				<User
					avatarProps={{ radius: "lg", src: product.image }}
					name={product.name}
					description={data.map((data: Product) => (
						data?.itemId === product?.itemId ? "Producto en Inicio" : ''
					))}

				>
					{product.name}
				</User>
			));
		}
		if (true) {
			Array.isArray(product.category) ? cells.push(() => (
				product.category.map((category: string) => <Chip color="success" variant="faded">{category}</Chip>)
			)) : cells.push(() => (
				<Chip color="success" variant="faded">{product.category}</Chip>
			))
		}

		if (true) {
			const limit = data && data.length >= 10 ? true : false;
			const exist = data && data.some((item) => item.itemId === product.itemId) ? true : false;
			cells.push(() => (
				< >
					<div>
						<ModalProductEdit product={product} limit={limit} exist={exist} handleUpdate={handleUpdate} />
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
				{ data && products ? (
					<TableBody items={products}>
						{(item: Product) => {
							const cells = renderCell(item, data);
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
	);
}

export default AdmProducts
