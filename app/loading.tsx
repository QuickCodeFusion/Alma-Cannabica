import { Spinner } from '@nextui-org/react'

const Loading = (): React.JSX.Element => {
	return (
		<Spinner
			label="Cargando..."
			labelColor="success"
			color="success"
			aria-label="Loading Spinner"
			size="lg"
		/>
	)
}

export default Loading
