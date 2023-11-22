'use client'
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from '@nextui-org/react'
import Detail from '../detail/Detail'
import BuyButton from '../button/buyButton'

const ProductModal = ({
	isOpen,
	onOpenChange,
	product
}: any): React.JSX.Element => {
	const sm = window.innerWidth < 768
	return (
		<>
			<Modal
				classNames={{
					base: 'text-center',
					body: 'flex flex-col text-center',
					footer: 'flex justify-around',
					header: 'flex flex-col gap-1',
					closeButton: 'hidden'
				}}
				backdrop='blur'
				placement='top-center'
				isOpen={isOpen}
				scrollBehavior={sm ? 'normal' : 'normal'}
				onOpenChange={onOpenChange}
				size={window.innerWidth < 768 ? 'full' : '5xl'}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalBody>
								<Detail product={product} />
							</ModalBody>
							<ModalFooter>
								<Button onClick={onClose}><p>{sm ? 'Cerrar' : 'Seguir viendo productos'}</p></Button>
								<BuyButton product={product}/>
								<Button className='md:mr-30' isIconOnly color="success" variant="bordered">
									<p className="scale-150 font-bold mb-1">+</p>
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}

export default ProductModal
