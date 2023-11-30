'use client'
import style from './SearchBar.module.css'
import Image from 'next/image'
import { search } from '@/redux/feature/searchBarSlice'
import { useDispatch } from '@/redux/hooks'
import { loadProducts } from '@/redux/feature/productsSlice'
import { useGetFiltersQuery } from '@/redux/service/productsFilterAPI'
import { useState, useEffect } from 'react'
import { Button, Input } from '@nextui-org/react'

const SearchBar = (): React.JSX.Element => {
	const dispatch = useDispatch()
	const [input, setInput] = useState('')
	const [nameProduct, setNameProduct] = useState('')
	const { data: products, isLoading, isError } = useGetFiltersQuery({ name: nameProduct, minPrice: '', maxPrice: '', category: '', order: '' })

	useEffect(() => {
		if (products) dispatch(loadProducts({ products, isLoading, isError }))
	}, [products])

	console.log(products)

	const handleSubmit = (): any => {
		setNameProduct(input)
		dispatch(search(input))
	}

	return (
		<>
			<Input placeholder='Busca productos' radius='full' onValueChange={setInput} size='sm' classNames={{
				input: [
					'text-black',
					'placeholder:text-black/50'
				],
				inputWrapper: [
					'shadow-md',
					'bg-gray-300',
					'group-data-[focus=true]:bg-slate-200',
					'!cursor-text',
					'group-data-[hover=true]:bg-gray-400/60'
				],
				base: 'w-1/2 data-[focus=true]:w-full transition-all duration-500'
			}}/>
			<Button
				onClick={handleSubmit}
				color='default'
				className='bg-transparent'
				isIconOnly
				size='sm'
			>
				<Image
					src='/buscar.png'
					alt='botón de búsqueda'
					width={20}
					height={20}
				/>
			</Button>
		</>
	)
}

export default SearchBar
