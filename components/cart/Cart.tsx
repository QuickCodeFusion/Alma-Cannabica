'use client'
import { type CartProduct } from '@/types/User/types'
import CartItem from './CartProduct'
import { Divider } from '@nextui-org/react'

const Cart = (): JSX.Element => {
	const products: CartProduct[] = [
		{
			id: '1jL1LMg5y02T85UMnQGg',
			name: 'Product',
			quantity: 10,
			price: 10,
			nameToLowerCase: 'product',
			image: 'https://firebasestorage.googleapis.com/v0/b/alma-cannabica-3f2f5.appspot.com/o/images%2Fdefault-user-icon-3084929853.jpg?alt=media&token=a9f35393-85b6-47a4-80eb-5b4d476682b6',
			category: ['category']
		},
		{
			id: '1jL1rMg5y02T85UMnQGg',
			name: 'Product',
			quantity: 1,
			price: 3430,
			nameToLowerCase: 'product',
			image: 'https://firebasestorage.googleapis.com/v0/b/alma-cannabica-3f2f5.appspot.com/o/images%2Fdefault-user-icon-3084929853.jpg?alt=media&token=a9f35393-85b6-47a4-80eb-5b4d476682b6',
			category: ['category']
		},
		{
			id: '1jL1sMg5y02T85UMnQGg',
			name: 'Product',
			quantity: 4,
			price: 630,
			nameToLowerCase: 'product',
			image: 'https://firebasestorage.googleapis.com/v0/b/alma-cannabica-3f2f5.appspot.com/o/images%2Fdefault-user-icon-3084929853.jpg?alt=media&token=a9f35393-85b6-47a4-80eb-5b4d476682b6',
			category: ['category']
		}
	]
	return (
		<div className='overflow-y-auto flex flex-col gap-1 max-w-md min-w-full'
		>

			{products.map((product) => (
				<>
					<CartItem
						key={product.id}
						product={product}
					/>
					<Divider/>
				</>
			))}
		</div>
	)
}

export default Cart
