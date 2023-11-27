'use client'
import { Popover, PopoverTrigger, PopoverContent, Button, Badge } from '@nextui-org/react'
import Image from 'next/image'
import Cart from '@/components/cart/Cart'
import { useEffect, useState } from 'react'
import { useSelector } from '@/redux/hooks'
import { type CartProduct } from '@/types/User/types'
export const PopoverComponent = (): React.JSX.Element => {
	const [itemCount, setItemCount] = useState(0)
	const products: CartProduct[] = useSelector((state: any) => state.cart.cart)
	useEffect(() => {
		setItemCount(products.reduce((acc: number, product: CartProduct) => acc + product.quantity, 0))
	}, [products])
	const content = (
		<PopoverContent className="w-auto">
			{(titleProps) => (
				<div className="px-1 py-2 w-full">
					<p className="text-small font-bold text-foreground" {...titleProps}>
                        Carrito de compras
					</p>
					<div className="flex flex-col gap-1 w-full max-h-[70vh] p-0">
						<Cart products={products}/>
					</div>
				</div>
			)}
		</PopoverContent>
	)

	return (
		<Badge
			color='success'
			variant='flat'
			content={itemCount}
		>
			<Popover
				showArrow
				offset={10}
				placement="bottom"
				backdrop="blur"
			>
				<PopoverTrigger>
					<Button size="sm" isIconOnly className="bg-white border">
						<Image src="/carrito.png" alt="" width={18} height={18} />
					</Button>
				</PopoverTrigger>
				{content}
			</Popover>
		</Badge>
	)
}
