import { Button, Card, useDisclosure } from '@nextui-org/react'
import Filters from './Filter'

const FiltersContainer = (): React.JSX.Element => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
			<Button onClick={() => { onOpen() }} size="sm" radius='none' className='w-screen md:hidden' color="primary" variant="flat">
                Filtros
			</Button>
			<Card classNames={{
				base: 'md:my-10'
			}}>
				<Filters isOpen={isOpen} onClose={onClose}/>

			</Card>
		</>
	)
}

export default FiltersContainer
