'use client'
import SubmitButton from '../button/submitButton'
import { useCreateProductMutation } from '@/redux/service/productsAPI'
import { toast } from 'sonner'
import { useState } from 'react'

const CreateProduct = (): React.JSX.Element => {
	const [product, setProduct] = useState({
		name: '',
		description: '',
		price: '',
		image: ''
	})
	const [loading, setLoading] = useState(false)
	const [createProduct] = useCreateProductMutation()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): any => {
		setProduct({
			...product,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): any => {
		setLoading(true)
		createProduct(product)
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
				<input type='text' placeholder='Name' onChange={handleChange} />
				<input type='text' placeholder='Description' onChange={handleChange} />
				<input type='text' placeholder='Price' onChange={handleChange} />
				<input type='text' placeholder='Image URL' onChange={handleChange} />
				<SubmitButton loading={loading} title='Create Product' />
			</form>
		</div>
	)
}

export default CreateProduct
