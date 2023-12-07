/* eslint-disable @typescript-eslint/naming-convention */
interface props {
	searchParams:
	{
		collection_id: string
		collection_status: 'approved' | 'rejected' | 'in_process'
		payment_id: string
		status: 'approved' | 'rejected' | 'in_process'
		merchant_order_id: string
		preference_id: string
	}
}

const Checkout: React.FC<props> = ({
	searchParams: {
		payment_id,
		status
	}
}): JSX.Element => {
	return (
		<div>
			<h1 className='text-3xl font-bold'>¡Gracias por tu compra!</h1>
			<p className='text-xl'>Tu pago ha sido {status === 'approved' ? 'aprobado' : 'rechazado'}</p>
			<p className='text-md'>Tu ID de pago es: {payment_id}</p>
		</div>
	)
}

export default Checkout
