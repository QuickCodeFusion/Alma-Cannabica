'use client'

import { type CartProduct } from '@/types/User/types'
import { Chip, Image } from '@nextui-org/react'

interface props {
	product: CartProduct
	handleRemoveProduct?: () => void
	handleQuantityChange: (itemId: string, action: 'add' | 'remove') => void
}

const CartItem: React.FC<props> = ({ product, handleRemoveProduct, handleQuantityChange }): React.JSX.Element => {
	const { name, image, quantity, price, itemId } = product
	return (
		<div className='flex flex-col gap-0'>
			<div className='flex justify-between'>
				<div className="flex gap-2">
					<Image
						src={image}
						alt={name}
						width={50}
						height={50}/>
					<p>{name}</p>
					<p>x{quantity}</p>
				</div>
				<p>${price}</p>
			</div>
			<Chip onClick={() => { handleQuantityChange(itemId, 'add') }} color="primary">
				+
			</Chip>
			<Chip onClick={() => { handleQuantityChange(itemId, 'remove') }} color="primary">
				-
			</Chip>
			<Chip>Total: {price * quantity}</Chip>
		</div>
	)
}

export default CartItem
