'use client'
import { type CardProduct, type Product } from '@/types/Product/type'
import { Button, useDisclosure } from '@nextui-org/react'
import BuyModal from '../modal/BuyModal'

interface props {
	product: Product | CardProduct
}

const BuyButton: React.FC<props> = ({ product }): React.JSX.Element => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<>
			<Button
				onClick={() => { onOpen() }}
				color="success"
				className='text-white'
			>
            Comprar
			</Button>
			<BuyModal product={product} isOpen={isOpen} onOpenChange={onOpenChange}/>
		</>
	)
}

export default BuyButton
