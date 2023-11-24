'use client'
import { type CartProduct } from '@/types/User/types'
import CartItem from './CartProduct'
import { Divider } from '@nextui-org/react'
import { useDispatch, useSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import { updateQuantity } from '@/redux/feature/cartSlice'

const Cart = (): JSX.Element => {
	const dispatch = useDispatch()
	const products: CartProduct[] = useSelector((state: any) => state.cart.cart)
	useEffect(() => {
		console.log(products)
	}, [products])

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
