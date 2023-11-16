'use client'
import SubmitButton from '../button/submitButton'
import { useCreateProductMutation } from '@/redux/service/productsAPI'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { Input } from '@nextui-org/react'
import { uploadFile } from '@/utils/uploadFile'
import { productValidate } from '@/utils/validations'
import CategorySelect from './CategorySelect'

export interface productState {
	name: string
	description: string
	price: string
	image: File | undefined
	category: string[]
}

const CreateProduct = (): React.JSX.Element => {
	const [isDisabled, setIsDisabled] = useState(true)
	const [categories, setCategory] = useState<string[]>([])
	const [categoryInput, setCategoryInput] = useState<string>('')
	const [product, setProduct] = useState<productState>({
		name: '',
		description: '',
		price: '',
		image: undefined,
		category: []
	})
	const [loading, setLoading] = useState(false)
	const [createProduct] = useCreateProductMutation()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.target.name === 'image') {
			setProduct({
				...product,
				[e.target.name]: e.target.files?.[0]
			})
		} else {
			setProduct({
				...product,
				[e.target.name]: e.target.value
			})
		}
	}

	useEffect(() => {
		console.log(product)
		productValidate(product, setIsDisabled)
	}, [product])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		setLoading(true)
		const { name, description, price, image, category } = product
		if (image === undefined) throw new Error('No se ha subido una imagen')
		const imageUrl = await uploadFile(image, image.name)

		const normalizedProduct = {
			name,
			description,
			price,
			image: imageUrl,
			category
		}
		createProduct(normalizedProduct)
			.then(() => {
				toast.success('Producto creado correctamente')
			})
			.catch((error: any) => {
				toast.error('Error al crear Producto: ' + error)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<div>
			<h1>Complete la información del producto</h1>
			<form onSubmit={handleSubmit} method='POST'>
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

				<Input 
					variant='underlined' 
					type='file' 
					isRequired 
					label='Imagen' 
					placeholder='Imagen' 
					name='image' 
					onChange={handleChange}/>
				
				<SubmitButton loading={loading} isDisabled={isDisabled} title='Create Product' />
			</form>
		</div>
	)
}

export default CreateProduct
