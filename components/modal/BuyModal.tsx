'use client'
import { Button, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import Detail from '../detail/Detail'
import { type Product } from '@/types/Product/type'
import { useEffect, useState } from 'react'
import { getPreferenceUrlSingle } from '@/utils/checkoutUtils'
import { toast } from 'sonner'
import { MercadoPagoIcon } from '../icons/MercadoPago'

interface props {
	product: Product
	isOpen: boolean
	onOpenChange: () => void
}

const BuyModal: React.FC<props> = ({ product, isOpen, onOpenChange }): React.JSX.Element => {
	const [preferenceUrl, SetPreferenceUrl] = useState<string>('')

	useEffect(() => {
		if (product && isOpen) {
			getPreferenceUrlSingle(product)
				.then((url) => {
					SetPreferenceUrl(url)
				})
				.catch((error) => {
					console.error(error)
					toast.error(error.message)
				})
		}
	}, [product, isOpen])
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
							<Button
								isExternal
								showAnchorIcon
								anchorIcon={<MercadoPagoIcon/>}
								color='success'
								as={Link}
								href={preferenceUrl}
								className='text-white text-lg'
							>Comprar</Button>
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
