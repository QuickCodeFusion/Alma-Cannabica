'use client'
import style from './SearchBar.module.css'
import Image from 'next/image'
import { search } from '@/redux/feature/searchBarSlice'
import { useDispatch } from '@/redux/hooks'

const SearchBar = (): React.JSX.Element => {
	const dispatch = useDispatch()
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): any => {
		const value = event.target.value
		dispatch(search(value))
	}

	return (
		<div className={style.searchBar}>
			<div>
				<input type="text" onChange={handleChange} className={style.input} />
			</div>
			<div className="hidden sm:flex">
				<Image src="/buscar.png" alt="Buscar" width={20} height={20}></Image>
			</div>
		</div>
	)
}

export default SearchBar
