'use client'
import { type Product } from '@/types/Product/type'
import Card from '../card/Card'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { Skeleton } from '@nextui-org/react'
import Arrow from '../icons/Arrow'
import { type LazyLoadTypes } from 'react-slick'

interface props {
	products: Product[]
	isLoading: boolean
}

const LandingCarousel: React.FC<props> = ({ products, isLoading }): React.JSX.Element => {
	const [slide, setSlide] = useState(0)
	const options = {
		centerMode: true,
		lazyLoad: 'ondemand' as LazyLoadTypes,
		draggable: true,
		dots: true,
		adaptiveHeight: true,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnHover: true,
		centerPadding: '0px',
		className: 'px-0.5 ',
		nextArrow: <Arrow className='text-green-500' direction='right' />,
		prevArrow: <Arrow className='text-green-500' direction='left' />,
		beforeChange: (current: number, next: number) => {
			setSlide(next)
		},
		responsive: [
			{
				breakpoint: 648,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: false,
					centerPadding: '15px'
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false,
					centerPadding: '5px',
					centerMode: false
				}
			}
		]
	}
	return (
		<div className='w-full'>
			{
				isLoading
					? <Skeleton className='rounded'>
						<div className='w-full h-[25vh]'>a</div>
					</Skeleton>
					: (
						<Slider {...options}>
							{products?.map((product, index) => (
								<Card
									classNames={slide === index ? 'scale-100' : 'scale-50'}
									key={product.itemId}
									product={product}
								/>
							))}
						</Slider>
					)
			}
		</div>
	)
}

export default LandingCarousel
