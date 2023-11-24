'use client'

import { type CartProduct } from '@/types/User/types'
import { Chip, Image } from '@nextui-org/react'

interface props {
	product: CartProduct
	handleRemoveProduct?: () => void
	handleQuantityChange?: () => void
}

const CartItem: React.FC<props> = ({ product, handleRemoveProduct, handleQuantityChange }): React.JSX.Element => {
	const { name, image, quantity, price } = product
	return (
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
	)
}

export default CartItem
