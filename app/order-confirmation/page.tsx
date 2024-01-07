'use client'
import { ModalOption } from "@/components/modal/ModalOption"
import { useSelector } from "react-redux"
import Image from "next/image"
import { Card } from "@nextui-org/react"
import { ModalCart } from "@/components/modal/ModalCart"
const Order = (): JSX.Element => {
	const products = useSelector((state: any) => state.comfirBuy.data)
	console.log(products)
	return (
		<div className='grid grid-cols-1 justify-items-center'>
			<div className='col-span-1 border grid justify-items-center gap-4'>
				<p>Resúmen de orden</p>
				{products && (
					Array.isArray(products) ? (
						products.map((product: any) => (
							<Card className="grid grid-cols-4 gap-4 items-center" key={product.itemId}>
								<Image src={product.image} alt={product.name} height={100} width={100} />
								<p>{product.name}</p>
								<p>Cant: {product.quantity}</p>
								<p>${product.price}</p>
							</Card>
						))
					) : (
						<Card className="grid grid-cols-4 gap-4 items-center" key={products.itemId}>
							<Image src={products.image} alt={products.name} height={100} width={100} />
							<p>{products.name}</p>
							<p>Cant: {products.quantity}</p>
							<p>${products.price}</p>
						</Card>
					)
				)}
				{products && (
					<p>
						Total: ${
							Array.isArray(products)
								? products.reduce((acc, product) => acc + product.quantity * parseInt(product.price), 0)
								: parseInt(products.price)
						}
					</p>
				)}
			</div>
			<div className='col-span-1 border'>
				{products && products.length > 1 ? (<ModalCart products={products} />) : (<ModalOption product={products} />)}
			</div>
		</div>
	)
}

export default Order
