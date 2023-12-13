import { type Product } from '@/types/Product/type'
import { type CartProduct } from '@/types/User/types'

/**
 * Retrieves the preference URL for the given products.
 *
 * @param {CartProduct[]} products - The products to retrieve the preference URL for.
 * @return {Promise<string>} The preference URL.
 */
export const getPreferenceUrl = async (products: CartProduct[]): Promise<string> => {
	const checkoutProduct = {
		products: [
			...products
		]
	}
	const { URL } = await fetch('/api/checkout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(checkoutProduct)
	})
		.then(async (res) => await res.json())
	return URL
}

/**
 * Retrieves the preference URL for a single product.
 *
 * @param {CartProduct | Product} product - The product to retrieve the preference URL for.
 * @return {Promise<string>} The preference URL for the specified product.
 */
export const getPreferenceUrlSingle = async (product: CartProduct | Product): Promise<string> => {
	const checkoutProduct = {
		products: [
			{
				...product,
				quantity: 1
			}
		]
	}
	const { URL } = await fetch('/api/checkout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(checkoutProduct)
	})
		.then(async (res) => await res.json())
	return URL
}
