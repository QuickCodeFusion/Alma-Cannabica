'use client'
import { Button } from '@nextui-org/react'

const SubmitButton = ({ title, loading, isDisabled }: { title: string, loading: boolean, isDisabled?: boolean }): React.JSX.Element => {
	return (
		<>
			{!loading
				? <Button isDisabled={isDisabled ?? false} type="submit">{title}</Button>
				: <Button isLoading isDisabled type="submit"></Button>}
		</>
	)
}

export default SubmitButton
