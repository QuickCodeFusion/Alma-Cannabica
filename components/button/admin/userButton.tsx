import { Button, Tooltip } from '@nextui-org/react'
import { Disable, Enable, Remove, Grant } from './IconBtn'
import Loading from '@/app/loading'

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
	let iconComponent: JSX.Element | null = null
	let actionTip: string = ''

	switch (icon) {
		case 'enable':
			iconComponent = <Enable />
			actionTip = 'Habilitar Usuario'
			break
		case 'disable':
			iconComponent = <Disable />
			actionTip = 'Deshabilitar Usuario'
			break
		case 'remove':
			iconComponent = <Remove />
			actionTip = 'Quitar Admin'
			break
		case 'grant':
			iconComponent = <Grant />
			actionTip = 'Otorgar Admin'
			break
		default:
			break
	}
	return (
		<Tooltip color={btnColor} showArrow content={actionTip}>
			<Button isLoading={loading} size="sm" radius='full' className={''} color={btnColor} onClick={action} >{loading ? <Loading /> : iconComponent}</Button>
		</Tooltip>
	)
}

export default UserButton
