'use client'
import { type CartProduct } from '@/types/User/types'
import { Button, Link } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { getPreferenceUrl } from '@/utils/checkoutUtils'
import { toast } from 'sonner'

interface props {
	products: CartProduct[]
}

const BuyCartButton: React.FC<props> = ({ products }): React.JSX.Element => {
	const [preferenceUrl, SetPreferenceUrl] = useState<string>('')

	useEffect(() => {
		if (products) {
			getPreferenceUrl(products)
				.then((url) => {
					SetPreferenceUrl(url)
				})
				.catch((error) => {
					console.error(error)
					toast.error(error.message)
				})
		}
	}, [products])

	return (
		<Button
			isExternal
			showAnchorIcon
			color='success'
			as={Link}
			href={preferenceUrl}
			className='text-white'
		>Comprar con Mercado Pago</Button>
	)
}

export default BuyCartButton
