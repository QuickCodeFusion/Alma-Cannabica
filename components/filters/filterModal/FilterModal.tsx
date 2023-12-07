import { Modal, ModalContent, ModalBody, Button } from '@nextui-org/react'
import FilterPrice from '../filterPrice/FilterPrice'
import FilterSort from '../filterSort/FilterSort'
import FilterCategories from '../filterCategory/FilterCategory'
import { type ChangeEvent } from 'react'
import { useGetFiltersQuery } from '@/redux/service/productsFilterAPI'
import { loadProducts } from '@/redux/feature/productsSlice'
import { useDispatch } from '@/redux/hooks'

interface props {
	isOpen: boolean
	onClose: () => void
	setValueState: React.Dispatch<React.SetStateAction<{
		category: string
		order: string
		name: string
		minPrice: string
		maxPrice: string
	}>>
	valueState: {
		category: string
		order: string
		name: string
		minPrice: string
		maxPrice: string
	}
}

export const FilterModal: React.FC<props> = ({ isOpen, onClose, setValueState, valueState }): JSX.Element => {
	const dispatch = useDispatch()

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
		onClose()
		if (isError) {
			dispatch(loadProducts({ products: [], isLoading, isError }))
		} else {
			dispatch(loadProducts({ products, isLoading, isError }))
		}
	}

	return (
		<>
			<Modal backdrop="blur" placement='center' size='3xl' isOpen={isOpen} onClose={onClose}>
				<ModalContent className='
                flex justify-center items-center
                h-1/2 py-10'>
					<ModalBody >
						<div className='flex flex-col text-center gap-5 justify-center h-full'>
							<div>
								<FilterPrice valueState={valueState} onChange={onChange} />
								<FilterSort valueState={valueState} onChange={onChange} />
							</div>
							<div className='font-semibold text-green-500'>
								<FilterCategories valueState={valueState} onChange={onChange} />
							</div>
							<div className=''>
								<Button onClick={handleSubmit} variant="flat" color="success">
                                            Aplicar
								</Button>
							</div>
						</div>
					</ModalBody>
				</ModalContent>

			</Modal>
		</>
	)
}
