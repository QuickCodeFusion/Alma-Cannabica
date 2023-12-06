'use client'
import { type Product } from '@/types/Product/type'
import Card from '../card/Card'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { Skeleton } from '@nextui-org/react'

interface props {
	products: Product[]
	isLoading: boolean
}

const LandingCarousel: React.FC<props> = ({ products, isLoading }): React.JSX.Element => {
	const [slide, setSlide] = useState(0)
	const [size, setSize] = useState(0)
	useEffect(() => {
		if (window) {
			setSize(window.innerWidth)
		}
	}, [])
	const options = {
		centerMode: true,
		lazyLoad: true,
		draggable: true,
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: size < 768 ? 1 : 3,
		slidesToScroll: 3,
		autoplay: false,
		autoplaySpeed: 2000,
		pauseOnHover: true,
		className: '[&_div]:w-[110%] [&_.slick-track]:py-2',
		beforeChange: (current: number, next: number) => {
			setSlide(next)
		}
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
									classNames={slide === index ? 'scale-105' : 'scale-50 '}
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
