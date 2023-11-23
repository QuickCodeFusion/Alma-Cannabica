'use client'
import { Skeleton, Image } from '@nextui-org/react'

const Detail = ({ product }: { product: any }) => {
	return (
		<div>
			<Skeleton
				isLoaded = {product}
			>
				<h1>{product.name}</h1>
				<Image
					src={product.image}
					alt={product.name}
					width={200}
					height={200}
				/>
				<p>{product.description}</p>
				<p>{product.price}</p>
			</Skeleton>
		</div>
	)
}

export default Detail
