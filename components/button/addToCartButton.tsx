'use client'
import { useUserSession } from '@/app/userContext'
import { addToCart } from '@/redux/feature/cartSlice'
import { useDispatch } from '@/redux/hooks'
import { useUpdateCartMutation } from '@/redux/service/cartAPI'
import { type CardProduct, type Product } from '@/types/Product/type'
import { Button, Tooltip } from '@nextui-org/react'
import { toast } from 'sonner'

interface props {
	product: Product | CardProduct
}

const AddToCartButton: React.FC<props> = ({ product }): React.JSX.Element => {
	const dispatch = useDispatch()
	const [addToCartMutation] = useUpdateCartMutation()
	const { userSession } = useUserSession()
	const handleClick = (): void => {
		dispatch(addToCart(product))
		addToCartMutation({
			userId: userSession?.uid ?? '',
			itemId: product.itemId,
			value: 'add'
		})
			.then(() => {
				toast.success('Agregado al carrito')
			})
			.catch((error: any) => {
				console.error(error)
				toast.error('Error al agregar al carrito')
			})
	}

	return (
		<>
			<Tooltip content='Añadir al carrito' color='success' showArrow={true}>
				<Button
					onClick={handleClick}
					isIconOnly
					color="success"
					variant="bordered"
					className='group'
				>
					<p className="text-2xl font-bold group-hover:scale-150 group-hover:text-green-600 group-hover:mb-1 transition duration-500 ease-in-out">
                    +
					</p>
				</Button>
			</Tooltip>

		</>
	)
}

export default AddToCartButton
