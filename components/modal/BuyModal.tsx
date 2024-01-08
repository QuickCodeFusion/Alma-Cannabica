'use client'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import Link from 'next/link'
import Detail from '../detail/Detail'
import { type Product } from '@/types/Product/type'
import { setComfirBuy } from '@/redux/feature/comfirBuySlice'
import { useDispatch } from '@/redux/hooks'
import { useState } from 'react'



interface props {
	product: Product
	isOpen: boolean
	onOpenChange: () => void
}

const BuyModal: React.FC<props> = ({ product, isOpen, onOpenChange }): React.JSX.Element => {
	const dispatch = useDispatch()
	const [visible, setVisible] = useState(true)
	const handleconfirmBuy = (data:Product) => {
		dispatch(setComfirBuy({data}));
	};
	return (
		<Modal
			classNames={{
				base: 'text-center',
				body: 'flex flex-col text-center',
				footer: 'flex justify-center'
			}}
			backdrop='blur'
			placement='center'
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			size='5xl'
		>
			<ModalContent className={visible ? '' : 'hidden'}>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							<Detail product={product}/>
						</ModalHeader>
						<ModalBody>
							{`¿Quieres comprar ${product.name}?`}
						</ModalBody>
						<ModalFooter>
							<Button as={Link} href={'/order-confirmation'} color="success" onPress={onClose} onClick={() => handleconfirmBuy(product)}>Comprar</Button>
							<Button
								onClick={onClose}
							>
								Ver más productos
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default BuyModal
