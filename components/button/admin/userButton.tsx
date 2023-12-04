import { Button } from '@nextui-org/react'
import { Disable, Enable, Remove, Grant } from './IconBtn'


const UserButton = ({
	action,
	onClose,
	txtColor,
	btnColor,
	icon,
}: {
	action: () => void
	onClose: () => void
	txtColor: string
	btnColor: 'primary' | 'success' | 'warning' | 'danger'
	icon: string
}): React.JSX.Element => {
	let iconComponent = null;

	switch (icon) {
		case 'enable':
			iconComponent = <Enable />;
			break;
		case 'disable':
			iconComponent = <Disable />;
			break;
		case 'remove':
			iconComponent = <Remove />;
			break;
		case 'grant':
			iconComponent = <Grant />;
			break;
		default:
			// Manejo para un caso por defecto o un caso no reconocido
			break;
	}
	return (
		<>
			<Button size="sm" radius='full' className={`bg-opacity-20 text-${txtColor}-500`} variant="bordered" color={btnColor} onClick={() => {action; onClose();}} >{iconComponent}</Button>
		</>
	)
}

export default UserButton
