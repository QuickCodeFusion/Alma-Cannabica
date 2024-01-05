'use client'
import { type ChangeEvent } from 'react'
import { Input } from '@nextui-org/react'

interface FiltersPriceProps {
	valueState: {
		minPrice: string
		maxPrice: string
	}
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const FilterPrice: React.FC<FiltersPriceProps> = ({ valueState, onChange }) => (
	<div className='flex flex-col justify-center items-center w-full'>
		<p className='text-lg font-semibold text-green-500'>Rango de Precios</p>
		<div className='flex gap-2'>
			<Input
				type='number'
				label='Mínimo'
				placeholder='0'
				labelPlacement='outside'
				variant='underlined'
				color='success'
				value={valueState.minPrice}
				name='minPrice'
				onChange={onChange}
				startContent={
					<span className="text-default-400 text-small">$</span>
				}
			/>
			<Input
				type='number'
				label="Máximo"
				placeholder='0'
				labelPlacement='outside'
				variant='underlined'
				color='success'
				value={valueState.maxPrice}
				name='maxPrice'
				onChange={onChange}
				startContent={
					<span className="text-default-400 text-small">$</span>
				}
			/>
		</div>
	</div>
)

export default FilterPrice
