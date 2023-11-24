'use client'
import { type Product } from '@/types/Product/type'
import { Button, useDisclosure } from '@nextui-org/react'
import BuyModal from '../modal/BuyModal'

interface props {
	product: Product
}

const BuyButton: React.FC<props> = ({ product }): React.JSX.Element => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<>
			<Button
				onClick={() => { onOpen() }}
				className='text-white bg-green-400 hover:bg-green-500'
			>
            Comprar
			</Button>
			<BuyModal product={product} isOpen={isOpen} onOpenChange={onOpenChange}/>
		</>
	)
}

export default BuyButton
