'use client'
import Card from '../card/Card'
import style from './cards.module.css'
import Loading from '@/app/loading'
import { useSelector } from '@/redux/hooks'

const Cards = (): React.JSX.Element => {
	const { products, isLoading, isError } = useSelector((state: any) => state.products)

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
