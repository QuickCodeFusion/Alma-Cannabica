'use client'

import { nextPageQuery, prevPageQuery } from '@/redux/feature/searchBarSlice'
import { useDispatch } from '@/redux/hooks'
import { Button } from '@nextui-org/react'
import { useState } from 'react'

interface props {
	firstProductId: string
	lastProductId: string
	totalPages: number
}

const Pagination: React.FC<props> = ({ firstProductId, lastProductId, totalPages }): React.JSX.Element => {
	const [page, setPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const dispatch = useDispatch()
	const handlePageChange = (action: string): void => {
		setIsLoading(true)
		if (action === 'prev') {
			dispatch(prevPageQuery(firstProductId))
			setPage(page - 1)
			setTimeout(() => { setIsLoading(false) }, 1000)
		} else {
			dispatch(nextPageQuery(lastProductId))
			setPage(page + 1)
			setTimeout(() => { setIsLoading(false) }, 1000)
		}
	}
	return (
		<>
			<span className='hidden md:flex gap-4 my-2 justify-center'>
				<Button
					className='disabled:'
					isDisabled={page === 1}
					isLoading={isLoading}
					color='success'
					onClick={() => { handlePageChange('prev') }}
				>
					{isLoading ? null : 'Anterior'}
				</Button>
				<span className='text-xl font-bold text-green-950'>{page} de {totalPages}</span>
				<Button
					isDisabled={page === totalPages}
					color='success'
					onClick={() => { handlePageChange('next') }}
					isLoading={isLoading}
				>
					{isLoading ? null : 'Siguiente'}
				</Button>
			</span>
			<Button
				color='success'
				className='md:hidden self-center my-2'
				onClick={() => { handlePageChange('next') }}
			>Ver más</Button>
		</>
	)
}

export default Pagination
