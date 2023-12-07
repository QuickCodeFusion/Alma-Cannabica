import { type CardProduct } from '@/types/Product/type'
import { CardFooter, Image, useDisclosure, Card as NextUICard } from '@nextui-org/react'
import dynamic from 'next/dynamic'
import BuyButton from '../button/buyButton'
import AddToCartButton from '../button/addToCartButton'
import Price from '../Price'
import Categories from '../Categories'
import NextImage from 'next/image'

const ProductModal = dynamic(async () => await import('../modal/ProductModal'), {
	ssr: false
})

const Card = ({ product, classNames }: { product: CardProduct, classNames?: string | string[] }): React.JSX.Element => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const { name, price, image, category } = product

	return (
		<>
			<NextUICard
				as='div'
				className={`
				${classNames instanceof Array ? classNames.join(' ') : classNames}
				bg-white w-screen h-40
				flex flex-row justify-between items-center
				rounded-none border-y-1 border-y-black/30
				shadow-inner
				md:flex-col md:justify-between md:gap-0
				md:w-3/4 md:h-[350px] md:max-w-[300px] md:min-w-[200px] md:min-h-[350px] md:max-h-[330px]
				md:border md:border-gray-300/30
				md:shadow-large
				md:rounded-lg`}
				isPressable
				onPress={() => { onOpen() }}
			>
				<Image
					classNames={{
						img: 'object-contain md:h-full rounded-none md:rounded-lg self-center',
						wrapper: 'w-1/4 bg-no-repeat h-[80%] shadow-sm md:w-full flex items-center justify-center md:h-40 md:pt-2 md:rounded-lg'
					}}
					src={image}
					width={100}
					height={100}
					alt={name}
					as={NextImage}
					fallbackSrc='https://firebasestorage.googleapis.com/v0/b/alma-cannabica-3f2f5.appspot.com/o/default_product.png?alt=media&token=90b8c614-57ea-44df-b341-36e0f41ffd3f'
				/>

				<CardFooter className='w-3/4 grid justify-items-start grid-cols-1 gap-4 md:flex md:flex-col md:justify-between md:h-fit md:w-full md:gap-2'>
					<h1 className='text-medium font-semibold place-self-center capitalize'>{name}</h1>
					<Categories categories={category}/>
					<span className='flex w-full justify-between md:flex-col md:gap-2 md:justify-center'>
						<Price price={price} className="text-600 self-end md:self-center"/>
						<div className='flex gap-2 justify-around'>
							<BuyButton product={product}/>
							<AddToCartButton product={product}/>
						</div>
					</span>
				</CardFooter>
			</NextUICard>

			{(isOpen) && (
				<ProductModal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					product={product}
				/>
			)}
		</>
	)
}

export default Card
