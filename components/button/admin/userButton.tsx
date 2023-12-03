import { Button } from '@nextui-org/react'
import { Disable, Enable, Remove, Grant } from './IconBtn'


const UserButton = ({
	action,
	txtColor,
	btnColor,
	icon
}: {
	action: () => void
	txtColor: string
	btnColor: 'primary' | 'success' | 'warning' | 'danger'
	icon:string
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
		iconComponent= <Remove/>;
		break;
	case 'grant':
		iconComponent=<Grant/>;
		break;
    default:
      // Manejo para un caso por defecto o un caso no reconocido
      break;
  }
	return (
		<>
			<Button isIconOnly radius='full' className={`bg-opacity-20 text-${txtColor}-500`} variant="light" color={btnColor} onClick={action} >{iconComponent}</Button>
		</>
	)
}

export default UserButton
