'use client'

import { Chip, Skeleton } from '@nextui-org/react'

interface props {
	price: string | number | undefined
	className?: string
}

const Price: React.FC<props> = ({ price, className = '' }): React.JSX.Element => {
	return (
		<Chip size='lg' color='success' variant='bordered' className={className} classNames={{
			content: 'px-0',
			base: 'border-black/20'
		}} radius='sm'>
			<Skeleton className='rounded-sm' isLoaded={!!price}>${price}</Skeleton>
		</Chip>
	)
}

export default Price
