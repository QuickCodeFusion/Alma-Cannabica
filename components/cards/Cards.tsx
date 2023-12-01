'use client'
import Card from '../card/Card'
import Loading from '@/app/loading'
import { useSelector } from '@/redux/hooks'

const Cards = (): React.JSX.Element => {
	const { products, isLoading, isError } = useSelector((state: any) => state.products)

	return (
		<div className='flex flex-col md:grid md:grid-cols-3 md:grid-rows-3 md:w-2/3 md:gap-y-5 md:justify-items-center md:my-10'>
			{isError && <div>Error</div>}

			{
				isLoading
					? <Loading/>
					:					(
						products?.map((product: any) => {
							return (
								<Card key={product.itemId} product={product}/>
							)
						})
					)
			}
		</div>
	)
}

export default Cards
