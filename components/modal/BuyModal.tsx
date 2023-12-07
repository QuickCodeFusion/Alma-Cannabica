'use client'
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react'
import { Button, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import Detail from '../detail/Detail'
import Whatsapp from '../icons/Whatsapp'
import { type Product } from '@/types/Product/type'
import { useEffect, useState } from 'react'

interface props {
	product: Product
	isOpen: boolean
	onOpenChange: () => void
}

const BuyModal: React.FC<props> = ({ product, isOpen, onOpenChange }): React.JSX.Element => {
	const [preferenceId, setPreferenceId] = useState<string>('')
	const getPreferenceId = async () => {
		const checkoutProduct = {
			products: [
				{
					...product,
					quantity: 1
				}
			]
		}
		const { URL } = await fetch('/api/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(checkoutProduct)
		})
			.then(async (res) => await res.json())
		return URL
	}
	useEffect(() => {
		initMercadoPago('TEST-cb8c2c43-27a1-4a28-9aad-98feea3912f2')
		getPreferenceId()
			.then((URL) => {
				setPreferenceId(URL)
				console.log(URL, 'ESTE ES EL PREF')
			})
			.catch((error) => {
				console.log(error, 'ESTE ES EL ERROR AAAAAAAAAAAAAAA')
			})
	}, [])
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
								color='primary'
								href={preferenceId}
								isExternal
								as={Link}
							>
								Comprar con Mercado Pago
							</Button>
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
