'use client'

import { type CartProduct } from '@/types/User/types'
import { Badge, Chip, Image, Tooltip } from '@nextui-org/react'
import QuantityButton from '../button/quantityButton'
import Price from '../Price'

interface props {
	product: CartProduct
	handleRemoveProduct: (itemId: string) => void
	handleQuantityChange: (itemId: string, action: 'add' | 'remove') => void
	isLoading: boolean
	cartLoading: boolean
}

const CartItem: React.FC<props> = ({ product, handleRemoveProduct, handleQuantityChange, isLoading, cartLoading }): React.JSX.Element | null => {
	const { name, image, quantity, price, itemId } = product
	if (cartLoading) return null
	return (
		<div className='flex flex-col gap-4 justify-end'>
			<div className='flex gap-6 justify-between'>
				<Tooltip
					showArrow={true}
					offset={-5}
					crossOffset={-4}
					content="Eliminar producto"
				>
					<Badge
						placement='top-left'
						color='danger'
						variant='flat'
						onClick={() => { handleRemoveProduct(itemId) }}
						content='X'
						className='text-center cursor-pointer font-bold'
					>
						<Image
							src={image}
							alt={name}
							width={100}
							classNames={{
								wrapper: 'max-h-16 flex',
								img: 'object-cover'
							}}
						/>
					</Badge>
				</Tooltip>
				<div className="flex flex-col gap-4">
					<h1>{name}</h1>
					<Price price={price}/>
				</div>
			</div>
			<div className='flex justify-between items-center gap-4 max-w-full'>
				<Chip className='p-0'
					variant='bordered'
					radius='none'
					classNames={{
						content: 'font-medium'
					}}
				>Total: ${quantity === 0 ? 0 : parseInt(price) * quantity}</Chip>
				<QuantityButton cartLoading={isLoading} isLoading={isLoading} quantity={quantity} handleQuantityChange={handleQuantityChange} itemId={itemId}/>
			</div>
		</div>
	)
}

export default CartItem
