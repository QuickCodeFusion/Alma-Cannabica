import { type Dispatch } from 'react'

/**
 * Validates the product information and updates the disabled state.
 *
 * @param {Object} product - The product information to validate.
 * @param {string} product.name - The name of the product.
 * @param {File | undefined} product.image - The image file of the product.
 * @param {string} product.description - The description of the product.
 * @param {string} product.price - The price of the product.
 * @param {string} product.category - The category of the product.
 * @param {Dispatch<boolean>} setIsDisabled - The state setter to update the disabled state.
 * @return {void} No return value.
 */
export const productValidate = ({
	name,
	image,
	description,
	price,
	category
}:
{ name: string
	image: File | undefined
	description: string
	price: string
	category: string
},
setIsDisabled: Dispatch<boolean>): void => {
	if (!name || !image || !description || !price || !category) {
		setIsDisabled(true)
	} else {
		setIsDisabled(false)
	}
}
