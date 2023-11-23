import { useState } from 'react'
import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

const UpdatePhoto = ({ isOpen, onClose, onOpenChange }: { isOpen: boolean, onClose: () => void, onOpenChange: () => void }): React.JSX.Element => {
	const [photo, setPhoto] = useState<File | string>('')
	const [preview, setPreview] = useState('')

	const defaultUser = 'https://firebasestorage.googleapis.com/v0/b/alma-cannabica-3f2f5.appspot.com/o/default-user-icon-3084929853.jpg?alt=media&token=d78ab167-3602-40dc-b81f-bb3680fa3324'

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const file = e.target.files?.[0]

		if (file) {
			setPhoto(file)
			const reader = new FileReader()
			reader.onloadend = () => {
				setPreview(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<div>
			<Modal backdrop={'blur'} isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
							<ModalBody>
								<div className="flex flex-col gap-8 h-[50vh] border-x-stone-300  justify-center align-center">
									<div className="flex justify-center align-center ">
										{ <Image width={200} height={200} src={preview || defaultUser} alt="Imagen previa" />}
									</div>
									<div className="flex  align-center justify-end">
										<input type="file" name="file" accept="image/*" onChange={handleFileChange} />
									</div>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
								</Button>
								<Button color="primary" >
                                    Subir
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	)
}

export default UpdatePhoto
