'use client'
import { type CartProduct } from '@/types/User/types'
import CartItem from './CartItem'
import { Divider } from '@nextui-org/react'
import { useDispatch } from '@/redux/hooks'
import { updateQuantity } from '@/redux/feature/cartSlice'

const Cart = (
	{
		setItemCount,
		products
	}: { setItemCount: React.Dispatch<React.SetStateAction<number>>
		products: CartProduct[] }
): JSX.Element => {
	const dispatch = useDispatch()
	const handleQuantityChange = (itemId: string, action: 'add' | 'remove'): void => {
		dispatch(updateQuantity({ itemId, action }))
	}
	return (
		<div className='overflow-y-auto overflow-x-hidden flex flex-col gap-1 max-w-md min-w-full'
		>

			{products.length === 0 && (
				<div className='flex justify-center items-center h-full'>
					<p className='text-center'>
						No hay productos en el carrito
					</p>
				</div>
			)}
			{products instanceof Array && products.map((product) => (
				<>
					<CartItem
						key={product.itemId}
						product={product}
						handleQuantityChange={handleQuantityChange}
					/>
					<Divider/>
				</>
			))}
			<p>
				Subtotal: ${products.reduce((acc, product) => acc + parseInt(product.price), 0)}
			</p>
		</div>
	)
}

export default Cart
