'use client'
import { type ChangeEvent } from 'react'
import style from './filterCategories.module.css'
import {Select, SelectItem} from "@nextui-org/react";

interface FiltersCategoriesProps {
	valueState: {
		category: string
	}
	onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const FilterCategories: React.FC<FiltersCategoriesProps> = ({ valueState, onChange }) => {
	const categories = ['Seleccione','cremas', 'Aceites', 'Cerveza']

	return (
		<div className={style.catCont}>
			<Select 
            size='sm'
            label='Categorias' 
			color='success'
			variant='underlined'
			placeholder='Seleccione'
            className='max-w-xs'
			onChange={onChange}
            
          >
            {categories.map((categories, index) => (
              <SelectItem  key={index} value={categories}>
                {categories}
              </SelectItem>
            ))}
          </Select>
		</div>
	)
}

export default FilterCategories
