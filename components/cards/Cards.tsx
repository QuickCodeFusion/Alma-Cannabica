'use client'
import Card from '../card/Card'
import Loading from '@/app/loading'

const Cards = ({ products, isLoading, isError }: { products: any, isLoading: boolean, isError: boolean }): React.JSX.Element => {
	return (
		<div className='md:grid md:grid-cols-3 md:grid-rows-2 md:gap-16 md:my-10'>
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
