'use client'
import style from './SearchBar.module.css'
import Image from 'next/image'
import { search } from '@/redux/feature/searchBarSlice'
import { useDispatch } from '@/redux/hooks'
import { loadProducts } from '@/redux/feature/productsSlice'
import { useGetFiltersQuery } from '@/redux/service/productsFilterAPI'
import { useState } from 'react'

const SearchBar = (): React.JSX.Element => {
	const dispatch = useDispatch()
	const [nameProduct, setNameProduct] = useState('')

	const { data: products } = useGetFiltersQuery({ nameProduct })

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): any => {
		const value = event.target.value
		setNameProduct(value)
	}
	const handleSubmit = (): any => {
		dispatch(search(nameProduct))
		dispatch(loadProducts(products))
	}

	return (
		<div className={style.searchBar}>
			<div>
				<input type="text" onChange={handleChange} className={style.input} />
			</div>
			<div className="hidden sm:flex">
				<button className={style.button} onClick={handleSubmit}>
					<Image src="/buscar.png" alt="Buscar" width={20} height={20}></Image>
				</button>
			</div>
		</div>
	)
}

export default SearchBar
