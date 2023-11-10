'use client'
import { useGetAllProductsQuery } from '@/redux/service/productsAPI'
import CardAricule from '../card/Card'
import style from './cards.module.css'
import Loading from '@/app/loading'

const Cards = (): React.JSX.Element => {
	const { data: products, isLoading } = useGetAllProductsQuery(null)

	return (
		<div className={style.containerCards}> 
			{
				isLoading
					? <Loading/>
					:					(
						products?.map((product: any) => {
							return (
								<CardAricule key={product.itemId} product={product}/>
							)
						})
					)
			}
		</div>
	)
}

export default Cards
