'use client'
import { addToCart } from '@/redux/feature/cartSlice'
import { useDispatch } from '@/redux/hooks'
import { type CardProduct, type Product } from '@/types/Product/type'
import { Button } from '@nextui-org/react'

interface props {
	product: Product | CardProduct
}

const AddToCartButton: React.FC<props> = ({ product }): React.JSX.Element => {
	const dispatch = useDispatch()
	const handleClick = (): void => {
		dispatch(addToCart(product))
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
