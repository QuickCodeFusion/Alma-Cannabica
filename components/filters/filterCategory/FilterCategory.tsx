'use client'
import { type ChangeEvent } from 'react'
import style from './filterCategories.module.css'

interface FiltersCategoriesProps {
	valueState: {
		category: string
	}
	onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const FilterCategories: React.FC<FiltersCategoriesProps> = ({ valueState, onChange }) => {
	const categories = ['cremas', 'Aceites', 'Cerveza'].map((category) => (
		<option key={category} value={category}>
			{category}
		</option>
	))

	return (
		<div className={style.catCont}>
			<label htmlFor='category' className={style.catTitle}>Categories</label>
			<select name='category' value={valueState.category} onChange={onChange} className={style.selectCat}>
				<option value=''>Select a category</option>
				{
					categories
				}
			</select>
		</div>
	)
}

export default FilterCategories
