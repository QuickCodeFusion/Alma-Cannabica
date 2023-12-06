'use client'
import { Card, Button } from '@nextui-org/react'
import { useGetCarouselQuery } from '@/redux/service/carouselAPI'
import Link from 'next/link'
import React from 'react'
import LandingCarousel from './LandingCarousel'

const Landing = (): React.JSX.Element => {
	const { data, isLoading } = useGetCarouselQuery(null)

	const frases = [
		`La marihuana medicinal se puede utilizar para: Aliviar el dolor. \n
		Esto incluye distintos tipos de dolor crónico, incluso dolor por lesiones nerviosas.\n
		Controlar las náuseas y los vómitos. 
		`
	]
	const randomIndex = Math.floor(Math.random() * frases.length)
	const randomFrase = frases[randomIndex]

	return (
		<div className='flex justify-center items-center my-12 w-screen'>
			<Card className='w-full md:w-2/3 p-10 text-green-600 font-medium text-2xl text-center shadow-2xl border drop-shadow-2xl gap-8'>
				<div className='flex flex-col items-center gap-4'>
					<h1 className='text-5xl font-semibold my-6'>¿Sabias que...?</h1>
					<p className='text-center'>
						{randomFrase.split('\n').map((line, lineIndex) => (
							<React.Fragment key={lineIndex}>
								{line}
							</React.Fragment>
						))}
					</p>
					<Button
						color="success"
						radius="sm"
						variant="bordered"
						size="lg"
						as={Link}
						href='/products'
						className='
						w-1/4
						font-semibold
						bg-green-400 bg-opacity-75 hover:bg-green-500 hover:bg-opacity-80
						text-black/90
						duration-300'
					>
						Ver tienda
					</Button>
				</div>
				<LandingCarousel products={data ?? []} isLoading={isLoading}/>
			</Card>
		</div>
	)
}

export default Landing
