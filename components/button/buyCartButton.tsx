'use client'
import { type CartProduct } from '@/types/User/types'
import { Button, Link } from '@nextui-org/react'
import Whatsapp from '../icons/Whatsapp'

interface props {
	products: CartProduct[]
}

const BuyCartButton: React.FC<props> = ({ products }): React.JSX.Element => {
	return (
		<Button
			isExternal
			showAnchorIcon
			anchorIcon={<Whatsapp/>}
			color='success'
			as={Link}
			href={'https://youtu.be/dQw4w9WgXcQ'}
			className='text-white'
		>Consultar </Button>
	)
}

export default BuyCartButton
