'use client'
import { type CartProduct } from '@/types/User/types'
import CartItem from './CartItem'
import { Divider, Spinner } from '@nextui-org/react'
import { useDispatch } from '@/redux/hooks'
import { loadCart, removeFromCart, updateQuantity } from '@/redux/feature/cartSlice'
import { useAddToCartMutation, useGetCartQuery } from '@/redux/service/cartAPI'
import { useEffect } from 'react'
import { useUserSession } from '@/app/userContext'
import { toast } from 'sonner'

const Cart = (
	{
		setItemCount,
		products
	}: { setItemCount: React.Dispatch<React.SetStateAction<number>>
		products: CartProduct[] }
): JSX.Element => {
	const dispatch = useDispatch()
	const [addToCart] = useAddToCartMutation()

	const { userSession } = useUserSession()

	const total = products instanceof Array ? products.reduce((acc: number, product: CartProduct) => acc + product.quantity * parseInt(product.price), 0) : 0
	const { data, isLoading, isError } = useGetCartQuery(userSession?.uid ?? '')

	useEffect(() => {
		return () => {
			data?.length && dispatch(loadCart({ products: data, isLoading, isError }))
		}
	}, [data])

	const handleQuantityChange = (itemId: string, action: 'add' | 'remove'): void => {
		dispatch(updateQuantity({ itemId, action }))
		addToCart({
			userId: userSession?.uid ?? '',
			itemId,
			value: action
		})
			.then(() => toast.success('Agregado al carrito'))
			.catch((error) => {
				console.error(error)
				toast.error('Error al agregar al carrito')
			})
	}
	const handleRemoveProduct = (itemId: string): void => {
		dispatch(removeFromCart({ itemId }))
	}
	return (
		<div className='overflow-y-auto overflow-x-hidden flex flex-col gap-1 max-w-md min-w-full'
		>
			{isLoading
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
			{products instanceof Array && products.map((product) => (
				<>
					<CartItem
						key={product.itemId}
						product={product}
						handleQuantityChange={handleQuantityChange}
						handleRemoveProduct={handleRemoveProduct}
					/>
					<Divider/>
				</>
			))}
			<p>
				Subtotal: ${total}
			</p>
		</div>
	)
}

export default Cart
