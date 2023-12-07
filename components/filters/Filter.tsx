'use client'
import FilterPrice from './filterPrice/FilterPrice'
import { type ChangeEvent } from 'react'
import FilterSort from './filterSort/FilterSort'
import FilterCategories from './filterCategory/FilterCategory'
import { FilterModal } from './filterModal/FilterModal'
import { Button } from '@nextui-org/react'

interface props {
	isOpen: boolean
	onClose: () => void
	setValueState: React.Dispatch<React.SetStateAction<{
		category: string
		order: string
		name: string
		minPrice: string
		maxPrice: string
	}
	>>
	valueState: {
		category: string
		order: string
		name: string
		minPrice: string
		maxPrice: string
	}
	handleSubmit: () => void
	onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const Filters: React.FC<props> = ({
	isOpen,
	onClose,
	setValueState,
	valueState,
	handleSubmit,
	onChange
}): JSX.Element => {
	return (

		<div className='flex flex-col gap-4 text-center justify-center h-fit p-8 py-14'>
			<FilterModal isOpen={isOpen} onClose={onClose} setValueState={setValueState} valueState={valueState} />

			<FilterPrice valueState={valueState} onChange={onChange} />
			<FilterSort valueState={valueState} onChange={onChange} />
			<FilterCategories valueState={valueState} onChange={onChange} />
			<Button className='w-1/2 self-center' onClick={handleSubmit} variant="flat" color="success">
            Aplicar
			</Button>
		</div>

	)
}
export default Filters
