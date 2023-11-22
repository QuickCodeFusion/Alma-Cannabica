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

const ProductModal = ({
	isOpen,
	onOpenChange,
	product
}: any): React.JSX.Element => {
	return (
		<>
			<Modal
				classNames={{
					base: 'text-center overflow-auto',
					body: 'flex flex-col text-center',
					footer: 'flex justify-center',
					header: 'flex flex-col gap-1',
					closeButton: 'bg-green-700 text-white opacity-25'
				}}
				backdrop='blur'
				placement='center'
				isOpen={isOpen}
				scrollBehavior='outside'
				onOpenChange={onOpenChange}
				size={window.innerWidth < 768 ? 'full' : '5xl'}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader></ModalHeader>
							<ModalBody>
								<Detail product={product} />
							</ModalBody>
							<ModalFooter>
								<Button color="success" className="text-white">
                                    COMPRAR
								</Button>
								<Button isIconOnly color="success" variant="bordered">
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
