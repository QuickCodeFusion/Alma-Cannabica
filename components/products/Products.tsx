'use client'
import { useSelector } from '@/redux/hooks'
import Cards from '../cards/Cards'
import FiltersContainer from '../filters/FiltersContainer'
import Pagination from '../pagination/Pagination'
import { useGetFiltersQuery } from '@/redux/service/productsFilterAPI'
import { useEffect, useState } from 'react'

const Products = (): JSX.Element => {
	const query = useSelector((state: any) => state.searchBar.query)

	const [products, setProducts] = useState([])

	const { data, isLoading, isError } = useGetFiltersQuery(query)

	useEffect(() => {
		data && setProducts(data)
	}, [data])

	return (
		<div className='flex flex-col md:flex-row md:items-start md:justify-center md:gap-12 w-full '>
			<FiltersContainer />
			<>
				{!isLoading && !isError && products.length === 0 && (
					<div className='flex flex-col items-center justify-center w-full h-full'>
						<h1 className='text-3xl font-bold'>No hay resultados</h1>
					</div>
				)}
				<Cards products={products} isLoading={isLoading} isError={isError}/>
			</>
			<Pagination/>

		</div>
	)
}

export default Products
