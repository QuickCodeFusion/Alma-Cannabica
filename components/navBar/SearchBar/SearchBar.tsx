'use client'
import Image from 'next/image'
import { search } from '@/redux/feature/searchBarSlice'
import { useDispatch } from '@/redux/hooks'
import { useState } from 'react'
import { Button, Input } from '@nextui-org/react'

const SearchBar = (): React.JSX.Element => {
	const [input, setInput] = useState('')
	const dispatch = useDispatch()

	const handleSubmit = (): any => {
		dispatch(search(input))
	}

	return (
		<>
			<Input placeholder='Busca productos' radius='full' onValueChange={setInput} size='sm' classNames={{
				input: [
					'text-black',
					'placeholder:text-black/50'
				],
				inputWrapper: [
					'shadow-md',
					'bg-gray-300',
					'group-data-[focus=true]:bg-slate-200',
					'!cursor-text',
					'group-data-[hover=true]:bg-gray-400/60'
				],
				base: 'w-1/2 data-[focus=true]:w-full transition-all duration-500'
			}}/>
			<Button
				onClick={handleSubmit}
				color='default'
				className='bg-transparent'
				isIconOnly
				size='sm'
			>
				<Image
					src='/buscar.png'
					alt='botón de búsqueda'
					width={20}
					height={20}
				/>
			</Button>
		</>
	)
}

export default SearchBar
