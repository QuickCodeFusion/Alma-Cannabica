import { type CardProduct } from '@/types/Product/type'
import { Image } from '@nextui-org/react'

const Card = ({ product }: { product: CardProduct }): React.JSX.Element => {
	const { name, price, image, category } = product

	return (
		<div>
			<div>
				<Image src={image}/>
				<h1>{name}</h1>
				<p>{price}</p>
				<p>{category}</p>
			</div>

		</div>
	)
}

export default Card
