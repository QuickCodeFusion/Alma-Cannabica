import { useState } from 'react'
import { Button, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { CameraIcon } from '../icons/CameraIcon'

const UpdatePhoto = ({ isOpen, onClose, onOpenChange, setFile }: { isOpen: boolean, onClose: (file: File | string) => void, onOpenChange: () => void, setFile: (file: File) => void }): React.JSX.Element => {
	const [photo, setPhoto] = useState<File | string>('')
	const [preview, setPreview] = useState('')

	const defaultUser = 'https://firebasestorage.googleapis.com/v0/b/alma-cannabica-3f2f5.appspot.com/o/default-user-icon-3084929853.jpg?alt=media&token=d78ab167-3602-40dc-b81f-bb3680fa3324'

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): any => {
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
					{() => (
						<>
							<ModalHeader className="flex flex-col gap-1">Suba una foto</ModalHeader>
							<ModalBody>
								<div className="flex flex-col gap-8 h-[50vh] border-x-stone-300  justify-center align-center">
									<div className="flex justify-center align-center ">
										<Image width={400} height={300} src={preview || defaultUser} alt="Imagen previa" className='rounded-full'/>
									</div>
								</div>
							</ModalBody>
							<ModalFooter className='flex justify-center'>
								<Button
									endContent={<CameraIcon />}
									className='w-full'
									name='image'
									color='success'
									onClick={() => document.getElementById('fileInput')?.click()}
								>
									<Input
										id='fileInput'
										className='hidden'
										type='file'
										isRequired
										name='image'
										onChange={e => {
											handleFileChange(e)
											onClose(e.target.files?.[0] ?? defaultUser)
											photo instanceof File && setFile(photo)
										}
										}/>
                                        subir una foto
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
