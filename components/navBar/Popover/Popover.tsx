'use client'
import { Popover, PopoverTrigger, PopoverContent, Button, Badge, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import Cart from '@/components/cart/Cart'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from '@/redux/hooks'
import { type CartProduct } from '@/types/User/types'
import { useUserSession } from '@/app/userContext'
import { useClearCartMutation } from '@/redux/service/cartAPI'
import { clearCart } from '@/redux/feature/cartSlice'
import { toast } from 'sonner'
import ConfirmModal from '@/components/modal/confirmModal'
export const PopoverComponent = (): React.JSX.Element => {
	const [itemCount, setItemCount] = useState(0)
	const products: CartProduct[] = useSelector((state: any) => state.cart.cart)
	const dispatch = useDispatch()
	const [clearCartMutate] = useClearCartMutation()
	const { userSession } = useUserSession()
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const removeCart = (userId: string): void => {
		dispatch(clearCart())
		clearCartMutate(userId)
			.then(() => {
				toast.success('Se vació el carrito')
			})
			.catch((error: any) => {
				console.error(error)
				toast.error('Error al vaciar el carrito')
			})
	}

	useEffect(() => {
		setItemCount(products.reduce((acc: number, product: CartProduct) => acc + product.quantity, 0))
	}, [products])
	const content = (
		<PopoverContent className="w-auto">
			{(titleProps) => (
				<div className="px-1 py-2 w-full">
					<span className="flex justify-between items-center gap-4">
						<h1 className="text-small font-bold text-foreground" {...titleProps}>
                        Carrito de compras
						</h1>
						<Button
							size="sm"
							color='danger'
							onClick={onOpen}
						>
						Vaciar
						</Button>
					</span>

					<div className="flex flex-col gap-1 w-full max-h-[70vh] p-0">
						<Cart products={products}/>
					</div>
					<ConfirmModal
						isOpen={isOpen}
						onOpenChange={onOpenChange}
						removeCart={removeCart}
						userId={userSession?.uid ?? 'guest'}
					/>
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
				backdrop={isOpen ? 'transparent' : 'blur'}
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
