'use client'
import { Button, Card, useDisclosure } from '@nextui-org/react'
import Filters from './Filter'
import { useDispatch, useSelector } from '@/redux/hooks'
import { type ChangeEvent, useEffect, useState } from 'react'
import { setQuery, type queryState } from '@/redux/feature/searchBarSlice'

const FiltersContainer = (): React.JSX.Element => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const dispatch = useDispatch()
	const { name: searchBarInput } = useSelector((state: { searchBar: queryState }) => state.searchBar.query)

	const [valueState, setValueState] = useState({
		category: '',
		order: '',
		name: '',
		minPrice: '',
		maxPrice: ''
	})

	useEffect(() => {
		setValueState((prevState) => {
			return {
				...prevState,
				name: searchBarInput
			}
		})
	}, [searchBarInput])

	const onChange = (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	): void => {
		const { name, value } = event.target
		setValueState((prevState) => ({
			...prevState,
			[name]: value
		}))
	}

	const handleSubmit = (): void => {
		dispatch(setQuery(valueState))
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
