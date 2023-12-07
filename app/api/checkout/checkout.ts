/* eslint-disable @typescript-eslint/naming-convention */
import MercadoPagoConfig, { Preference } from 'mercadopago'

interface Checkout {
	id: string
	quantity: number
	title: string
	unit_price: number
	picture_url: string
}

export const createPreference = async ({ id, quantity, title, unit_price, picture_url }: Checkout, URL: string): Promise<any> => {
	const client = new MercadoPagoConfig({
		accessToken: process.env.MP_ACCESS_TOKEN ?? 'TEST-7392225776209713-120709-869de9ee1277e414f8c442b5276a2d9b-227708791'
	})

	const preference = new Preference(client)

	const response = await preference.create({
		body: {
			items: [
				{
					id,
					quantity,
					title,
					unit_price,
					picture_url
				}
			],
			back_urls: {
				success: `${URL}/success`,
				failure: `${URL}/failure`,
				pending: `${URL}/pending`
			}
		}
	})

	return response
}
