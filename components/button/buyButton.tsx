'use client'

import { type Product } from '@/types/Product/type'
import { Button, Link, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'
import Detail from '../detail/Detail'
import Whatsapp from '../icons/Whatsapp'

interface props {
	product: Product
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
			<Modal classNames={{
				base: 'text-center',
				body: 'flex flex-col text-center'
			}} backdrop='blur' placement='center' isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								<Detail product={product}/>
							</ModalHeader>
							<ModalBody>
								{`¿Quieres comprar ${product.name}?`}
								<br />
								<Button
									showAnchorIcon
									anchorIcon={<Whatsapp/>}
									color='success'
									as={Link}
									href={'https://youtu.be/dQw4w9WgXcQ'}
									className='text-white'
								>Consultar su disponibilidad</Button>
								<Button
									onClick={onClose}
								>
							Seguir viendo productos
								</Button>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}

export default BuyButton
