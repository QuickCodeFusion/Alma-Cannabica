import { type CardProduct } from '@/types/Product/type'
import { CardFooter, Image, useDisclosure, Card as NextUICard } from '@nextui-org/react'
import ProductModal from '../modal/ProductModal'
import BuyButton from '../button/buyButton'
import AddToCartButton from '../button/addToCartButton'
import Price from '../Price'
import Categories from '../Categories'

const Card = ({ product }: { product: CardProduct }): React.JSX.Element => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const { name, price, image, category } = product

	return (
		<>
			<NextUICard
				className='w-screen h-40 flex flex-row justify-between items-center rounded-none border-y-1 border-y-black/30 shadow-inner md:flex-col md:w-full md:h-full md:gap-0 md:border md:rounded-lg md:shadow-large md:justify-around'
				isPressable
				onPress={() => { onOpen() }}
			>
				<Image
					classNames={{
						img: 'object-cover md:max-h-full rounded-none md:rounded-lg self-center',
						wrapper: 'object-cover md:min-w-2/3 min-w-[30%] bg-no-repeat h-[80%] md:h-1/3 flex justify-center items-center shadow-sm'
					}}
					src={image}
					alt={name}
					fallbackSrc='https://firebasestorage.googleapis.com/v0/b/alma-cannabica-3f2f5.appspot.com/o/default_product.png?alt=media&token=90b8c614-57ea-44df-b341-36e0f41ffd3f'
				/>

				<CardFooter className='grid justify-items-end grid-cols-1 gap-4 md:flex md:flex-col md:justify-center'>
					<h1 className='text-xl place-self-center'>{name}</h1>
					<Categories categories={category}/>
					<span className='flex w-full justify-between md:flex-col-reverse md:gap-4 md:justify-center'>
						<div className='flex gap-2 justify-between'>
							<BuyButton product={product}/>
							<AddToCartButton product={product}/>
						</div>
						<Price price={price} className="text-600 self-end md:self-center"/>
					</span>
				</CardFooter>
			</NextUICard>

			<ProductModal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				product={product}
			/>
		</>
	)
}

export default Card
