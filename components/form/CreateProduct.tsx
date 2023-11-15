'use client'
import SubmitButton from '../button/submitButton'
import { useCreateProductMutation } from '@/redux/service/productsAPI'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { Input } from '@nextui-org/react'
import { uploadFile } from '@/utils/uploadFile'
import { productValidate } from '@/utils/validations'

const CreateProduct = (): React.JSX.Element => {
	const fields = [{ name: 'name', label: 'Nombre' }, { name: 'description', label: 'Descripción' }, { name: 'price', label: 'Precio' }, { name: 'category', label: 'Categoría' }]
	const [isDisabled, setIsDisabled] = useState(true)
	const [product, setProduct] = useState<{
		name: string
		description: string
		price: string
		image: File | undefined
		category: string
	}>({
		name: '',
		description: '',
		price: '',
		image: undefined,
		category: ''
	})
	const [loading, setLoading] = useState(false)
	const [createProduct] = useCreateProductMutation()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setProduct({
			...product,
			[e.target.name]: e.target.value
		})
		productValidate(product, setIsDisabled)
		console.log(isDisabled, product)
	}

	useEffect(() => {
		productValidate(product, setIsDisabled)
	}, [product])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		setLoading(true)
		const { name, description, price, image, category } = product
		if (image === undefined) throw new Error('No se ha subido una imagen')
		const imageUrl = uploadFile(image, image.name).then((url) => url)

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
				setLoading(false)
			})
			.catch((error: any) => {
				toast.error('Error al crear Producto: ' + error)
			})
	}

	return (
		<div>
			<h1>Create Product</h1>
			<form onSubmit={handleSubmit} method='POST'>
				{fields.map((field) => (
					<Input
						key={field.name}
						variant='underlined'
						isRequired
						label={field.label}
						placeholder={field.label}
						name={field.name}
						value={product[field.name]}
						onChange={handleChange}/>
				))}
				<Input variant='underlined' type='file' isRequired label='Imagen' placeholder='Imagen' name='image' onChange={handleChange}/>
				<SubmitButton loading={loading} isDisabled={isDisabled} title='Create Product' />
			</form>
		</div>
	)
}

export default CreateProduct
