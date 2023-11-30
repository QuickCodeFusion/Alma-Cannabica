'use client'
import SubmitButton from '../button/submitButton'
import { useCreateProductMutation } from '@/redux/service/productsAPI'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { Button, Card, Input } from '@nextui-org/react'
import { uploadFile } from '@/utils/uploadFile'
import { productValidate } from '@/utils/validations'
import CategorySelect from './CategorySelect'
import { useGetCategoriesQuery } from '@/redux/service/categoriesAPI'
import { CameraIcon } from '../icons/CameraIcon'
import Detail from '../detail/Detail'

export interface productState {
	name: string
	description: string
	price: string
	image: File | undefined | string
	category: string[]
}

const CreateProduct = (): React.JSX.Element => {
	const defaultUser = 'https://firebasestorage.googleapis.com/v0/b/alma-cannabica-3f2f5.appspot.com/o/default-user-icon-3084929853.jpg?alt=media&token=d78ab167-3602-40dc-b81f-bb3680fa3324'
	const [preview, setPreview] = useState('')
	const [file, setFile] = useState<File>()
	const [isDisabled, setIsDisabled] = useState(true)
	const [categories, setCategory] = useState<string[]>([])
	const [categoryInput, setCategoryInput] = useState<string>('')
	const [product, setProduct] = useState<productState>({
		name: '',
		description: '',
		price: '',
		image: preview ?? defaultUser,
		category: []
	})
	const [loading, setLoading] = useState(false)
	const [createProduct] = useCreateProductMutation()

	const { data } = useGetCategoriesQuery(null)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const file = e.target.files?.[0]
		if (file) {
			setFile(file)
			const reader = new FileReader()
			reader.onloadend = () => {
				setPreview(reader.result as string)
				setProduct({
					...product,
					image: reader.result as string
				})
			}
			reader.readAsDataURL(file)
		} else {
			setProduct({
				...product,
				[e.target.name]: e.target.value
			})
		}
	}

	useEffect(() => {
		productValidate(product, setIsDisabled)
	}, [product])

	useEffect(() => {
		if (data) {
			setCategory(data)
		}
	}, [data])
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		setLoading(true)

		try {
			const { name, description, price, category } = product
			if (file === undefined) {
				throw new Error('No se ha subido una imagen')
			}
			const imageUrl = await uploadFile(file, file.name)

			const normalizedProduct = {
				name,
				description,
				price,
				image: imageUrl,
				category
			}

			await createProduct(normalizedProduct)
			toast.success('Producto creado correctamente')
		} catch (error: any) {
			toast.error('Error al crear Producto: ' + error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='flex flex-col items-center md:h-[80vh]'>
			<h1 className='text-3xl font-bold'>Complete la información del producto</h1>
			<div className='sm:flex  flex-row items-center'>

				<Card className='m-10 p-10 flex justify-center align-middle'>
					<form onSubmit={(e) => { void handleSubmit(e) }} method='POST' className='flex flex-col gap-4 justify-center' >
						<Input
							variant='underlined'
							isRequired
							label='Nombre'
							placeholder='Ingrese un nombre de producto'
							name='name'
							value={product.name}
							onChange={handleChange}/>

						<CategorySelect
							product={product}
							setProduct={setProduct}
							categories={categories}
							setCategory={setCategory}
							categoryInput={categoryInput}
							setCategoryInput={setCategoryInput}/>

						<Input
							variant='underlined'
							label='Descripción'
							placeholder='Ingrese una descripción de producto'
							name='description'
							value={product.description}
							onChange={handleChange}/>

						<Input
							variant='underlined'
							isRequired
							label='Precio'
							placeholder='Ingrese precio del producto'
							name='price'
							value={product.price}
							onChange={handleChange}/>

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
								onChange={(e) => {
									handleChange(e)
								}
								}/>
                                        subir una foto
						</Button>

						<div className='flex justify-center'>
							<SubmitButton loading={loading} isDisabled={isDisabled} title='Create Product'/>
						</div>
					</form>
				</Card>
				<Card className='m-10'>
					<Detail product={product}></Detail>
				</Card>
			</div>
		</div>
	)
}

export default CreateProduct
