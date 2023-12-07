'use client'
import { type ChangeEvent } from 'react'
import { Select, SelectItem } from '@nextui-org/react'

interface FiltersSortProps {
	valueState: {
		order: string
	}
	onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const FilterSort: React.FC<FiltersSortProps> = ({ valueState, onChange }) => (
	<Select
		size="sm"
		label="Ordenar"
		color="success"
		variant="underlined"
		placeholder="Seleccione el orden"
		name='order'
		onChange={onChange}
		value={valueState.order}
	>
		<SelectItem key="low" value='low' style={{ width: 160 }}>
					De menor a mayor
		</SelectItem>
		<SelectItem key="high" value='high' style={{ width: 160 }}>
					De mayor a menor
		</SelectItem>
	</Select>
)

export default FilterSort
