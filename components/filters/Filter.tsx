'use client'
import FilterPrice from './filterPrice/FilterPrice'
import { type ChangeEvent, useState } from 'react'
import FilterSort from './filterSort/FilterSort'
import FilterCategories from './filterCategory/FilterCategory'
import { Button } from '@nextui-org/react'
import style from './filter.module.css'
import { useSelector } from 'react-redux'
import { useGetFiltersQuery } from '@/redux/service/productsFilterAPI'
import { loadProducts } from '@/redux/feature/productsSlice'
import { useDispatch } from '@/redux/hooks'

const Filters = ({ onFilter, onClose }: { onFilter: boolean, onClose: () => void }): JSX.Element => {
	const dispatch = useDispatch()
	const name = useSelector((state: any) => state.searchBar.value)
	const [valueState, setValueState] = useState({
		category: '',
		order: '',
		name,
		minPrice: '',
		maxPrice: ''
	})
	console.log(valueState)

	const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
		const { name, value } = event.target
		setValueState(prevState => ({
			...prevState,
			[name]: value
		}))
	}
	const { data: products, isLoading, isError } = useGetFiltersQuery({ name: valueState.name, minPrice: valueState.minPrice, maxPrice: valueState.maxPrice, category: valueState.category, order: valueState.order })

	const handleSubmit = (): void => {
		onClose()
		if (isError) {
			dispatch(loadProducts({ products: [], isLoading, isError }))
		} else {
			dispatch(loadProducts({ products, isLoading, isError }))
		}
	}

	return (
		<div className={onFilter ? style.containerII : style.container}>
			<Button onClick={() => { onClose() }} isIconOnly size='sm' color='danger' variant='bordered' radius='full' className={style.closeBtnI }>X</Button>
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
					<Button onClick={handleSubmit} variant="flat" color="success">Aplicar</Button>
				</div>
			</div>
		</div>
	)
}
export default Filters
