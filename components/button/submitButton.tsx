'use client'
import { Button, type ButtonProps } from '@nextui-org/react'

interface Props extends ButtonProps {
	title: string
	loading?: boolean
	isDisabled?: boolean
}

const SubmitButton: React.FC<Props> = ({ title, loading, isDisabled, ...props }): React.JSX.Element => {
	return (
		<>
			{!loading
				? <Button {...props} isDisabled={isDisabled ?? false} type="submit">{title}</Button>
				: <Button {...props} isLoading isDisabled type="submit"></Button>}
		</>
	)
}

export default SubmitButton
