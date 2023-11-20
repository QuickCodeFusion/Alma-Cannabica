'use client'
import { type ChangeEvent } from 'react'
import style from './filterSort.module.css'
import { Select, SelectItem } from '@nextui-org/react'

interface FiltersSortProps {
	valueState: {
		order: string
	}
	onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const FilterSort: React.FC<FiltersSortProps> = ({ valueState, onChange }) => (
	<div>
		<div className={style.catCont}>
			<Select
				size="sm"
				label="Ordenar"
				color="success"
				variant="underlined"
				placeholder="None"
				name='order'
				onChange={onChange}
				value={valueState.order}
			>
				<SelectItem key="" value=''>
					None
				</SelectItem>
				<SelectItem key="low" value='low' style={{ width: 160 }}>
					De menor a mayor
				</SelectItem>
				<SelectItem key="high" value='high' style={{ width: 160 }}>
					De mayor a menor
				</SelectItem>
			</Select>
		</div>
	</div>
)

export default FilterSort
