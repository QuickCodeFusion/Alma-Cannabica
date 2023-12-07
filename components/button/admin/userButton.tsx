import { Button } from '@nextui-org/react'
import { Disable, Enable, Remove, Grant } from './IconBtn'

const UserButton = ({
	action,
	txtColor,
	btnColor,
	icon,
	loading
}: {
	action: () => void
	txtColor: string
	btnColor: 'primary' | 'success' | 'warning' | 'danger'
	icon: string
	loading: boolean
}): React.JSX.Element => {
	let iconComponent = null

	switch (icon) {
		case 'enable':
			iconComponent = <Enable />
			break
		case 'disable':
			iconComponent = <Disable />
			break
		case 'remove':
			iconComponent = <Remove />
			break
		case 'grant':
			iconComponent = <Grant />
			break
		default:
			break
	}
	return (
		<>
			<Button isLoading={loading} size="sm" radius='full' className={`bg-opacity-20 text-${txtColor}-500`} variant="bordered" color={btnColor} onClick={action} >{iconComponent}</Button>
		</>
	)
}

export default UserButton
