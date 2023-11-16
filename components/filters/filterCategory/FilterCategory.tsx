'use client'
import { type ChangeEvent } from 'react'
import style from './filterCategories.module.css'
import { Select, SelectItem } from '@nextui-org/react'
import { useGetCategoriesQuery } from '@/redux/service/categoriesAPI'

interface FiltersCategoriesProps {
	valueState: {
		category: string
	}
	onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const FilterCategories: React.FC<FiltersCategoriesProps> = ({ valueState, onChange }) => {
	const { data: categories, isLoading } = useGetCategoriesQuery({})

	return (
		<div className={style.catCont}>
			<Select
				size='sm'
				label='Categorias'
				color='success'
				variant='underlined'
				placeholder='Seleccione'
				className='max-w-xs'
				name='category'
				value={valueState.category}
				onChange={onChange}
				isLoading={isLoading}
			>
				{categories?.map((categories: any) => (
					<SelectItem key={categories} value={categories}>
						{categories}
					</SelectItem>
				))}
			</Select>
		</div>
	)
}

export default FilterCategories
