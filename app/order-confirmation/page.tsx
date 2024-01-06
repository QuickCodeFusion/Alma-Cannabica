'use client'

const Order = (): JSX.Element => {
	return (
		<div className='grid grid-cols-3'>
			<div className='col-span-2'>
				<p>Componente de confirmacion de compra</p>
			</div>
			<div className='col-span-1'>
				<p>Resúmen de orden</p>
			</div>
		</div>
	)
}

export default Order
