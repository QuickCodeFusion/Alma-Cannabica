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
		<PopoverContent className="w-[240px]">
			{(titleProps) => (
				<div className="px-1 py-2 w-full">
					<p className="text-small font-bold text-foreground" {...titleProps}>
                        Carrito de compras
					</p>
					<div className="mt-2 flex flex-col gap-2 w-full max-h-96">
						<Cart setItemCount={setItemCount} products={products}/>
					</div>
				</div>
			)}
		</PopoverContent>
	)

	return (
		<div className="flex flex-wrap gap-4">
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
		</div>
	)
}
