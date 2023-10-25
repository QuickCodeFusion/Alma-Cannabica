import { Button } from '@nextui-org/react'

const userButton = ({
	title,
	action,
	isAdmin,
	isDisabledUser
}: {
	title: string
	action: () => void
	isAdmin?: boolean
	isDisabledUser?: boolean
}): React.JSX.Element => {
	return (
		<div>
			<Button onClick={action} >{title}</Button>
		</div>
	)
}

export default userButton
