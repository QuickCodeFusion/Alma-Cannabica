'use client'
import { Skeleton, Image, Card, CardBody } from '@nextui-org/react'
import Price from '../Price'
import Categories from '../Categories'
import { useEffect, useState } from 'react'
const Detail = ({ product }: { product: any }): React.JSX.Element => {
	const [photo, setPhoto] = useState('')
	const { name, price, image, category, description } = product
	useEffect(() => {
		setPhoto(image)
		console.log(product)
	}, [product])
	return (
		<Card >
			<CardBody className='grid place-items-center gap-4'>
				<Skeleton isLoaded={name}>
					<h1>{name}</h1>
				</Skeleton>
				<Image
					src={photo}
					alt={name}
					width={200}
					height={200}
				/>
				<Skeleton isLoaded={category[0]} className='rounded-md'>
					<Categories
						key={category}
						categories={category}
					/>
				</Skeleton>
				<Skeleton isLoaded={description}>
					<p>{description}</p>
				</Skeleton>
				<Price className='text-2xl' price={price}/>
			</CardBody>
		</Card>
	)
}

export default Detail
