import { Button, Modal, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

interface props {
	isOpen: boolean
	onOpenChange: () => void
	removeCart: (userId: string) => void
	userId: string
}

const ConfirmModal: React.FC<props> = ({ isOpen, onOpenChange, removeCart, userId }): React.JSX.Element => {
	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			backdrop='blur'
			placement='top-center'
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							<h1>¿Estas seguro de que deseas vaciar tu carrito?</h1>
						</ModalHeader>
						<ModalFooter>
							<Button
								color='danger'
								onClick={() => {
									removeCart(userId)
									onClose()
								}}
							>
                                Si
							</Button>
							<Button
								color='primary'
								onClick={onClose}
							>
                                No
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default ConfirmModal
