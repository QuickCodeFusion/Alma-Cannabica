'use client'
import { Button } from '@nextui-org/react'

const SubmitButton = ({ title, loading }: { title: string, loading: boolean }): React.JSX.Element => {
	return (
		<div>
			{!loading
				? <Button type="submit">{title}</Button>
				: <Button isLoading type="submit"></Button>}
		</div>
	)
}

export default SubmitButton
