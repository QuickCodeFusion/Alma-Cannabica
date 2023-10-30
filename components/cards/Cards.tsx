'use client'
import { useGetAllProductsQuery } from '@/redux/service/productsAPI'
import Card from '../card/Card'

const Cards = (): React.JSX.Element => {
	const { data: products, isLoading } = useGetAllProductsQuery(null)

	return (
		<div>
			{
				isLoading
					? <div>Loading...</div>
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
