'use client'
import Card from '../card/Card'
import { useGetFiltersQuery } from '@/redux/service/productsFilterAPI'
import style from './cards.module.css'
import Loading from '@/app/loading'

const Cards = (): React.JSX.Element => {
	const name = 'pepas'
	const minPrice = '0'
	const maxPrice = '100000'
	const category = 'cremas'
	const { data: products, isLoading, isError } = useGetFiltersQuery({ name, minPrice, maxPrice, category, order: 'low' })
	console.log(products)

	return (
		<div className={style.containerCards}>
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
