'use client'
import { type CartProduct } from '@/types/User/types'
import CartItem from './CartItem'
import { Divider, Spinner } from '@nextui-org/react'
import { useDispatch } from '@/redux/hooks'
import { loadCart, removeFromCart, updateQuantity } from '@/redux/feature/cartSlice'
import { useUpdateCartMutation, useGetCartQuery, useClearCartMutation } from '@/redux/service/cartAPI'
import { useEffect, useState } from 'react'
import { useUserSession } from '@/app/userContext'
import { toast } from 'sonner'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { setComfirBuy } from '@/redux/feature/comfirBuySlice'
const Cart = (
	{
		products
	}: {
		products: CartProduct[] }
): JSX.Element => {
	const dispatch = useDispatch()
	const [updateCart] = useUpdateCartMutation()
	const [clearCart] = useClearCartMutation()

	const [isLoading, setIsLoading] = useState(false)

	const { userSession } = useUserSession()

	const total = products instanceof Array ? products.reduce((acc: number, product: CartProduct) => acc + product.quantity * parseInt(product.price), 0) : 0
	const { data, isLoading: cartLoading, isError } = useGetCartQuery(userSession?.uid ?? '')

	const handleconfirmBuy = (data: CartProduct[]) => {
		dispatch(setComfirBuy({ data }))
	}

	useEffect(() => {
		data?.length && dispatch(loadCart({ products: data, cartLoading, isError }))
	}, [data])

	const handleQuantityChange = (itemId: string, action: 'add' | 'remove'): void => {
		setIsLoading(true)
		dispatch(updateQuantity({ itemId, action }))
		updateCart({
			userId: userSession?.uid ?? 'guest',
			itemId,
			value: action
		})
			.then(() => toast.success(`Se ${action === 'add' ? 'agregó al carrito' : 'quitó del carrito'}`))
			.catch((error: any) => {
				console.error(error)
				toast.error('Error al modificar el carrito')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}
	const handleRemoveProduct = (itemId: string): void => {
		setIsLoading(true)
		dispatch(removeFromCart({ itemId }))
		clearCart({
			userId: userSession?.uid ?? 'guest',
			itemId
		})
			.then(() => toast.success('Se quitó del carrito'))
			.catch((error: any) => {
				console.error(error)
				toast.error('Error al modificar el carrito')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}
	return (
		<div className='overflow-y-auto overflow-x-hidden flex flex-col gap-1 p-0 justify-center min-w-full'
		>
			{cartLoading
				? (
					<div className='flex justify-center items-center h-full'>
						<p className='text-center'>
						Cargando...
						</p>
						<Spinner color="success" size="lg"/>
					</div>
				)
				: products.length === 0 && (
					<div className='flex justify-center items-center h-full'>
						<p className='text-center'>
						No hay productos en el carrito
						</p>
					</div>
				)}
			<div className='overflow-y-auto flex flex-col justify-between min-w-full gap-1 p-1.5 shadow-[inset_0_-5px_6px_rgba(0,0,0,0.1)]'>
				{!cartLoading && products instanceof Array && products.map((product) => (
					<>
						<Divider/>
						<CartItem
							key={product.itemId}
							product={product}
							handleQuantityChange={handleQuantityChange}
							handleRemoveProduct={handleRemoveProduct}
							isLoading={isLoading}
							cartLoading={cartLoading}
						/>
					</>
				))}
			</div>

			<Divider/>
			<span className='flex justify-between items-center gap-4'>
				<h1 className='text-center font-bold text-medium'>
				Subtotal: ${total.toLocaleString()}
				</h1>

				{/* <BuyCartButton products={products}/> */}
				<Button as={Link} href={'/order-confirmation'} color="success" className='text-white' disabled={products.length === 0} onClick={() => handleconfirmBuy(products)}  >Comprar</Button>
			</span>

		</div>
	)
}

export default Cart
