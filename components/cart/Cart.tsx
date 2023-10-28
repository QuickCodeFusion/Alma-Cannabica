'use client'
import style from './cart.module.css'

const Cart = (): JSX.Element => {
	return (
		<div>
			{
				<div className={style.container}>
					<div>
						<div>
							<h1>Cart</h1>
						</div>
						<div>
							<p>products</p>
						</div>
					</div>
				</div>
			}
		</div>
	)
}

export default Cart
