'use client'
import React, { useState, useEffect } from 'react'
import { Skeleton, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from '@nextui-org/react'
import { ModalProductEdit } from '../ModalAction/ModalProducEdit'
import { useSelector } from '@/redux/hooks'
import { type Product } from '@/types/Product/type'
import { useGetCarouselQuery } from '@/redux/service/carouselAPI'
import { useGetAllProductsQuery } from '@/redux/service/productsAPI'

const AdmProducts = (): React.JSX.Element => {
	const { data: products, refetch: refetchProducts } = useGetAllProductsQuery(null)
	// const { data } = useSelector((state: any) => state.carousel)
	const { data, isLoading, refetch: refetchCarousel } = useGetCarouselQuery(null)
	const [update, setUpdate] = useState<boolean>(false)
	useEffect(() => {
		if (update) {
			refetchProducts()
				.then(() => {
					setUpdate(false)
				})
				.catch((error) => {
					console.error('Error al refrescar el carrusel:', error)
				})
		}
	}, [update, refetchProducts])

	const handleUpdate = (boolean: boolean): void => {
		if (boolean) {
			refetchCarousel()
				.then(() => {
					setUpdate(true)
				})
				.catch((error) => {
					console.error('Error al refrescar el carrusel:', error)
				})
		}
	}

	const columns = [
		{ name: 'PRODUCTOS', uid: 'name' },
		{ name: 'CATEGORIA', uid: 'rols' },
		{ name: 'ACCIONES', uid: 'actions' }

	]
	const renderCell = React.useCallback((product: Product, data: Product[]) => {
		const cells = []

		if (true) {
			cells.push(() => (

				<User
					avatarProps={{ radius: 'lg', src: product.image }}
					name={product.name}
					description={product.inCarousel ? 'Producto en inicio' : ''}

				>
					{product.name}
				</User>
			))
		}

		cells.push(() => (
			product.category instanceof Array
				? product.category.map((category: string) => <Chip color="success" variant="faded">{category}</Chip>)
				: <Chip color="success" variant="faded">{product.category}</Chip>
		))

		if (true) {
			const limit = !!(data && data.length >= 10)
			const exist = !!(data && data.some((item) => item.itemId === product.itemId))
			cells.push(() => (
				<ModalProductEdit product={product} limit={limit} exist={exist} handleUpdate={handleUpdate} />
			))
		}

		return cells
	}, [])

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
				{ data && products
					? (
						<TableBody items={products}>
							{(item: Product) => {
								const cells = renderCell(item, data)
								return (
									<TableRow key={item.itemId}>
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

export default AdmProducts
