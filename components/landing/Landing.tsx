'use client'
import style from './landing.module.css'
import Loading from '@/app/loading'
import { Card, CardFooter, Image, Button } from '@nextui-org/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules'
import { useGetCarouselQuery } from '@/redux/service/carouselAPI'
import { useDispatch, useSelector } from '@/redux/hooks'
import Link from 'next/link'
import React from 'react'

const Landing = () => {
	const { data, error, isLoading } = useGetCarouselQuery(null)

	const frases = [
		`La marihuana medicinal se puede utilizar para: Aliviar el dolor. \n
		Esto incluye distintos tipos de dolor crónico, incluso dolor por lesiones nerviosas.\n
		Controlar las náuseas y los vómitos. 
		`
	]
	const randomIndex = Math.floor(Math.random() * frases.length)
	const randomFrase = frases[randomIndex]

	return (
		<div className='flex justify-center items-center my-24'>
			<Card className='w-1/2 p-10 text-green-600 font-medium text-2xl text-center shadow-2xl border drop-shadow-2xl '>
				<h1 className='text-5xl font-semibold my-6'>¿Sabias que...?</h1>
				<div className='flex flex-col items-center gap-4'>
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
						className='w-1/4 font-semibold bg-green-400 bg-opacity-75 text-black/90 hover:bg-green-500 hover:bg-opacity-80 duration-300'
					>
						Ver tienda
					</Button>
				</div>
				
			</Card>
		</div>
	)
}

export default Landing
