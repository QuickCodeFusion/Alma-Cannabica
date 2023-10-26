export interface NewProduct {
	name: string
	description: string
	price: number
	image: string
	itemId: string
	category: string
	nameToLowerCase?: string
}

export interface Product {
	name: string
	description: string
	price: number
	image: string
	itemId: string
	category: string
	nameToLowerCase?: string
}
