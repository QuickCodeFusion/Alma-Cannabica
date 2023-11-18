import { Button, Input, Select, SelectItem, Spacer } from '@nextui-org/react'
import { type productState } from './CreateProduct'

interface props {
	product: productState
	setProduct: React.Dispatch<React.SetStateAction<productState>>
	categories: string[]
	setCategory: React.Dispatch<React.SetStateAction<string[]>>
	categoryInput: string
	setCategoryInput: React.Dispatch<React.SetStateAction<string>>
}

const CategorySelect: React.FC<props> = ({
	product,
	setProduct,
	categories,
	setCategory,
	categoryInput,
	setCategoryInput
}) => {
	return (
		<div className='flex gap-2 items-center'>
			<Select
				variant='underlined'
				isRequired
				label='Seleccione la categoría'
				placeholder='Ingrese la categoría producto'
				name='category'
				selectedKeys={product.category}
				onChange={(e) => { setProduct({ ...product, category: [...product.category, e.target.value] }) }}>
				{categories.map((category) => (
					<SelectItem
						key={category}
						value={category}>
						{category.toLocaleUpperCase()}
					</SelectItem>
				))}
			</Select>
			{product.category.map((category) => (
				<>
					<Button
						onClick={() => {
							setProduct({
								...product,
								category: product.category.filter((c) => c !== category)
							})
							setCategoryInput('')
						}}
						color='danger'
						variant='flat'>
						{category.toLocaleUpperCase()}
					</Button>
					<Spacer/>
				</>
			))}
			<Input
				variant='underlined'
				isClearable
				label='Nueva categoría'
				placeholder='Ingrese la categoría producto'
				name='category'
				value={categoryInput}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						setCategory([
							...categories,
							categoryInput
						])
						setCategoryInput('')
					}
				}}
				onValueChange={setCategoryInput}/>
			<Button
				onClick={() => {
					setCategory([
						...categories,
						categoryInput
					])
					setCategoryInput('')
				}}
				color='success'
				variant='flat'>
						Añadir
			</Button>
		</div>
	)
}

export default CategorySelect
