/* eslint-disable @typescript-eslint/naming-convention */
import MercadoPagoConfig, { Preference } from 'mercadopago'
import { type PreferenceProduct } from './route'
import { type Items } from 'mercadopago/dist/clients/commonTypes'

export const createPreference = async (products: PreferenceProduct[], URL: string): Promise<string | undefined> => {
	const client = new MercadoPagoConfig({
		accessToken: process.env.MP_ACCESS_TOKEN ?? ''
	})

	const preference = new Preference(client)

	const preferenceProducts: Items[] = products.map((product) => ({
		id: product.itemId,
		quantity: parseInt(product.quantity),
		title: product.name,
		unit_price: parseInt(product.price),
		picture_url: product.image
	}))

	const response = await preference.create({
		body: {
			items: preferenceProducts,
			back_urls: {
				success: `${URL}/success`,
				failure: `${URL}/failure`,
				pending: `${URL}/pending`
			}
		}
	})

	return response.init_point
}
