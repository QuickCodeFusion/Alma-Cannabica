'use client'
import FilterPrice from './filterPrice/FilterPrice'
import { type ChangeEvent, useState } from 'react'
import FilterSort from './filterSort/FilterSort'
import FilterCategories from './filterCategory/FilterCategory'
import { Button } from '@nextui-org/react'
import style from './filter.module.css'

const Filters = (): JSX.Element => {
	const [valueState, setValueState] = useState({
		category: '',
		order: '',
		name: '',
		minPrice: '',
		maxPrice: ''

	})

	const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
		const { name, value } = event.target
		setValueState(prevState => ({
			...prevState,
			[name]: value
		}))
	}

	return (
		<div className={style.container}>
			<div className={style.subContainer}>
				<div>
					<FilterPrice valueState={valueState} onChange={onChange} />
				</div>
				<div>
					<FilterSort valueState={valueState} onChange={onChange} />
				</div>
				<div>
					<FilterCategories valueState={valueState} onChange={onChange} />
				</div>
				<div className={style.button}>
					<Button color="success">Aplicar</Button>
				</div>
			</div>
		</div>
	)
}
export default Filters
