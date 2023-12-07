'use client'
import Cards from '../cards/Cards'
import FiltersContainer from '../filters/FiltersContainer'
import Pagination from '../pagination/Pagination'

const Products = (): JSX.Element => {
	return (
		<div className='flex flex-col md:flex-row md:items-start md:justify-center md:gap-12 w-full'>
			<FiltersContainer />
			<>
				<Cards />
			</>
			<Pagination/>

		</div>
	)
}

export default Products
