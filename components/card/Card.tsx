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
				className='bg-white w-screen h-40 flex flex-row justify-between items-center rounded-none border-y-1 border-y-black/30 shadow-inner md:flex-col md:w-3/4 md:h-fit md:gap-0 md:border md:border-gray-300/30 md:shadow-large md:rounded-lg md:justify-center'
				isPressable
				onPress={() => { onOpen() }}
			>
				<Image
					classNames={{
						img: 'object-contain md:h-full rounded-none md:rounded-lg self-center',
						wrapper: 'w-1/4 bg-no-repeat h-[80%] shadow-sm md:w-full flex items-center justify-center md:h-40 md:pt-2 md:rounded-lg'
					}}
					src={image}
					alt={name}
					fallbackSrc='https://firebasestorage.googleapis.com/v0/b/alma-cannabica-3f2f5.appspot.com/o/default_product.png?alt=media&token=90b8c614-57ea-44df-b341-36e0f41ffd3f'
				/>

				<CardFooter className='w-3/4 grid justify-items-start grid-cols-1 gap-4 md:flex md:flex-col md:justify-center md:w-full md:gap-0.5'>
					<h1 className='text-medium font-semibold place-self-center capitalize'>{name}</h1>
					<Categories categories={category}/>
					<span className='flex w-full justify-between md:flex-col md:gap-0.5 md:justify-center'>
						<Price price={price} className="text-600 self-end md:self-center"/>
						<div className='flex gap-2 justify-between md:justify-center md:gap-'>
							<BuyButton product={product}/>
							<AddToCartButton product={product}/>
						</div>
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
