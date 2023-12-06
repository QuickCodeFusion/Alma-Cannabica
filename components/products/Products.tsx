'use client'
import Cards from '../cards/Cards'
import FiltersContainer from '../filters/FiltersContainer'

const Products = (): JSX.Element => {
	return (
		<div className='flex flex-col md:flex-row md:items-start md:justify-center md:gap-[15%] w-full'>
			<FiltersContainer />
			<>
				<Cards />
			</>
		</div>
	)
}

export default Products
