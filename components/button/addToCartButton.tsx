'use client'
import { useUserSession } from '@/app/userContext'
import { addToCart } from '@/redux/feature/cartSlice'
import { useDispatch } from '@/redux/hooks'
import { useAddToCartMutation } from '@/redux/service/cartAPI'
import { type CardProduct, type Product } from '@/types/Product/type'
import { Button } from '@nextui-org/react'
import { toast } from 'sonner'

interface props {
	product: Product | CardProduct
}

const AddToCartButton: React.FC<props> = ({ product }): React.JSX.Element => {
	const dispatch = useDispatch()
	const [addToCartMutation] = useAddToCartMutation()
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
			.catch((error) => {
				console.error(error)
				toast.error('Error al agregar al carrito')
			})
	}

	return (
		<>
			<Button
				onClick={handleClick}
				isIconOnly
				color="success"
				variant="bordered"
			>
				<p className="scale-150 font-bold mb-1">
                    +
				</p>
			</Button>
		</>
	)
}

export default AddToCartButton
