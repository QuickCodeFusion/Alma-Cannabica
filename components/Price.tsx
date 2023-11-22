'use client'

import { Chip, Skeleton } from '@nextui-org/react'

interface props {
	price: string | number | undefined
	className?: string
}

const Price: React.FC<props> = ({ price, className = '' }): React.JSX.Element => {
	return (
		<Chip size='lg' variant='dot' className={className} radius='sm'>
			<Skeleton className='rounded-sm' isLoaded={!!price}>${price}</Skeleton>
		</Chip>
	)
}

export default Price
