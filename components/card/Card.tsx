import { type CardProduct } from '@/types/Product/type'
import style from '../landing/landing.module.css'
import { CardFooter, Image, Button, useDisclosure, Card as NextUICard, Tooltip } from '@nextui-org/react'
import ProductModal from '../modal/ProductModal'
import BuyButton from '../button/buyButton'

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
						<div className="flex justify-between w-full align-center">
							<p className="text-600">{category}</p>
							<p className="text-600">${price}</p>
						</div>
						<div className={style.containerBtn}>
							<BuyButton product={product}/>
							<Tooltip  content="Añadir al carrito">
								<Button isIconOnly color="success" variant="bordered">
									<p className="scale-150 font-bold mb-1 hover:scale-[200%]">+</p>
								</Button>
							</Tooltip>
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
