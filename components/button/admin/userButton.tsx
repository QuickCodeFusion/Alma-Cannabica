import { Button } from '@nextui-org/react'

const UserButton = ({
	title,
	action,
	txtColor,
	btnColor
}: {
	title: string
	action: () => void
	txtColor: string
	btnColor: 'primary' | 'success' | 'warning' | 'danger'
}): React.JSX.Element => {
	return (
		<>
			<Button radius='full' className={`bg-opacity-20 text-${txtColor}-500`} color={btnColor} onClick={action} >{title}</Button>
		</>
	)
}

export default UserButton
