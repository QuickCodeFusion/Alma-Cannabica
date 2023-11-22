'use client'
import { Skeleton, Image, Card, CardBody } from '@nextui-org/react'
import Price from '../Price'
const Detail = ({ product }: { product: any }): React.JSX.Element => {
	return (
		<Card >
			<CardBody className='grid place-items-center'>
				<Skeleton isLoaded={product.name}>
					<h1>{product.name}</h1>
				</Skeleton>
				<Image
					src={product.image}
					alt={product.name}
					width={200}
					height={200}
				/>
				<Skeleton isLoaded={product.description}>
					<p>{product.description}</p>
				</Skeleton>
				<Price className='text-2xl' price={product.price}/>
			</CardBody>
		</Card>
	)
}

export default Detail
