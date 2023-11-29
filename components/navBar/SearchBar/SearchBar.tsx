'use client'
import style from './SearchBar.module.css'
import Image from 'next/image'
import { search } from '@/redux/feature/searchBarSlice'
import { useDispatch } from '@/redux/hooks'
import { loadProducts } from '@/redux/feature/productsSlice'
import { useGetFiltersQuery } from '@/redux/service/productsFilterAPI'
import { useState, useEffect } from 'react'

const SearchBar = (): React.JSX.Element => {
	const dispatch = useDispatch()
	const [input, setInput] = useState('')
	const [nameProduct, setNameProduct] = useState('')
	const { data: products, isLoading, isError } = useGetFiltersQuery({ name: nameProduct, minPrice: '', maxPrice: '', category: '', order: '' })

	useEffect(() => {
		if (products) dispatch(loadProducts({ products, isLoading, isError }))
	}, [products])

	console.log(products)
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): any => {
		const value = event.target.value
		setInput(value)
	}

	const handleSubmit = (): any => {
		setNameProduct(input)
		dispatch(search(input))
	}

	return (
		<>
				<input type="text" onChange={handleChange} className={style.input} />
				<button className={style.button} onClick={handleSubmit}>
					<Image src="/buscar.png" alt="Buscar" width={20} height={20}></Image>
				</button>
		</>
	)
}

export default SearchBar
