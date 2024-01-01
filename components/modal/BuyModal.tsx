'use client'
import { Button, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import Detail from '../detail/Detail'
import { type Product } from '@/types/Product/type'
import { ModalOption } from './ModalOption'


interface props {
	product: Product
	isOpen: boolean
	onOpenChange: () => void
}

const BuyModal: React.FC<props> = ({ product, isOpen, onOpenChange }): React.JSX.Element => {
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
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							<Detail product={product}/>
						</ModalHeader>
						<ModalBody>
							{`¿Quieres comprar ${product.name}?`}
						</ModalBody>
						<ModalFooter>
							<ModalOption product={product}/>
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
