'use client'
import { Button, Card, useDisclosure } from '@nextui-org/react'
import Filters from './Filter'
import { useDispatch, useSelector } from '@/redux/hooks'
import { type ChangeEvent, useEffect, useState } from 'react'
import { useGetFiltersQuery } from '@/redux/service/productsFilterAPI'
import { loadProducts } from '@/redux/feature/productsSlice'

const FiltersContainer = (): React.JSX.Element => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const dispatch = useDispatch()
	const name = useSelector((state: any) => state.searchBar.value)
	const [valueState, setValueState] = useState({
		category: '',
		order: '',
		name,
		minPrice: '',
		maxPrice: ''
	})

	useEffect(() => {
		setValueState((prevState) => {
			return {
				...prevState,
				name
			}
		})
	}, [name])

	const onChange = (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	): void => {
		const { name, value } = event.target
		setValueState((prevState) => ({
			...prevState,
			[name]: value
		}))
	}
	const {
		data: products,
		isLoading,
		isError
	} = useGetFiltersQuery({
		name: valueState.name,
		minPrice: valueState.minPrice,
		maxPrice: valueState.maxPrice,
		category: valueState.category,
		order: valueState.order
	})

	const handleSubmit = (): void => {
		if (isError) {
			dispatch(loadProducts({ products: [], isLoading, isError }))
		} else {
			dispatch(loadProducts({ products, isLoading, isError }))
		}
	}

	return (
		<>
			<Button onClick={() => { onOpen() }} size="sm" radius='none' className='w-screen md:hidden' color="primary" variant="flat">
                Filtros
			</Button>
			<Card className='hidden md:flex' classNames={{
				base: 'md:my-10 h-fit'
			}}>
				<Filters
					isOpen={isOpen}
					onClose={onClose}
					setValueState={setValueState}
					valueState={valueState}
					handleSubmit={handleSubmit}
					onChange={onChange}/>

			</Card>
		</>
	)
}

export default FiltersContainer
