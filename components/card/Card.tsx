import { type CardProduct } from '@/types/Product/type'
import style from '../landing/landing.module.css'
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

const CardAricule = ({ product }: { product: CardProduct }): React.JSX.Element => {
	const { name, price, image, category } = product

	return (
		<div>
			<Card className={style.cardCarusel} isPressable onPress={() => console.log("item pressed")}>
				<Image
					style={{ borderRadius: 0 }}
					className={style.cardImage}
					src={image}
				/>

				<CardFooter className={style.cardFooter}>
					<b className={style.nameProduct}>{name}</b>
					<div className={style.btnCard}>
						<div className={style.containerBtn}>
							<Button isIconOnly color="success" variant="bordered" >
								+
							</Button>
							<Button  className="bg-gradient-to-tr from-green-500 to-blue-500 text-white mt-1">
								COMPRAR
							</Button>
						</div>
						<div className='flex-col direction-colum h-20'>
						<p className="text-600">{category}</p>
						<p className="text-600 mt-5">${price}</p>
						</div>
					</div>
				</CardFooter>
			</Card>

		</div>
	)
}

export default CardAricule
