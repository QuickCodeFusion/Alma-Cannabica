import { Modal, ModalContent, ModalBody, Button } from '@nextui-org/react'
import FilterPrice from '../filterPrice/FilterPrice'
import FilterSort from '../filterSort/FilterSort'
import FilterCategories from '../filterCategory/FilterCategory'
import { type ChangeEvent } from 'react'

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
	onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
	handleSubmit: () => void
}

export const FilterModal: React.FC<props> = ({ isOpen, onClose, setValueState, valueState, onChange, handleSubmit }): JSX.Element => {
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
