import { type CardProduct } from '@/types/Product/type'
import style from '../landing/landing.module.css'
import { CardFooter, Image, useDisclosure, Card as NextUICard } from '@nextui-org/react'

import ProductModal from '../modal/ProductModal'
import BuyButton from '../button/buyButton'
import AddToCartButton from '../button/addToCartButton'

const Card = ({ product }: { product: CardProduct }): React.JSX.Element => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const { name, price, image, category } = product

	return (
		<div>
			<NextUICard
				className={style.cardCarusel}
				isPressable
				onPress={() => { onOpen() }}
			>
				<Image
					style={{ borderRadius: 0 }}
					className={style.cardImage}
					src={image}
				/>

				<CardFooter className={style.cardFooter}>
					<b className={style.nameProduct}>{name}</b>
					<div className={style.btnCard}>
						<div className={`flex justify-between w-full align-center ${style.datosProduct}`}>
							<p className="text-600">{category}</p>
							<p className="text-600">${price}</p>
						</div>
						<div className={style.containerBtn}>
							<BuyButton product={product}/>
							<AddToCartButton product={product}/>
						</div>
					</div>
				</CardFooter>
			</NextUICard>

			<ProductModal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				product={product}
			/>
		</div>
	)
}

export default Card
