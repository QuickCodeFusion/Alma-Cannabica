import { Button, ButtonGroup } from '@nextui-org/react'

interface props {
	quantity: number
	handleQuantityChange: (itemId: string, action: 'add' | 'remove') => void
	itemId: string
	isLoading: boolean
}

const QuantityButton: React.FC<props> = ({ quantity, handleQuantityChange, itemId, isLoading }): React.JSX.Element => {
	return (
		<ButtonGroup size='sm'>
			<Button
				isLoading={isLoading}
				isIconOnly
				onClick={() => { handleQuantityChange(itemId, 'add') }}
				color="success"
			>
				+
			</Button>
			<Button
				isDisabled
				isIconOnly
				className='cursor-default text-green-950 font-bold text-md'
				color='success'
				variant='flat'
			>x{quantity}</Button>
			<Button
				isLoading={isLoading}
				isIconOnly
				onClick={() => { handleQuantityChange(itemId, 'remove') }}
				color="success"
			>
				{isLoading ? null : '-'}
			</Button>
		</ButtonGroup>
	)
}

export default QuantityButton
