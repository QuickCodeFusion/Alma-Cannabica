interface BaseProduct {
	name: string
	description: string
	price: number
	image: string
	itemId: string
	category: string[] | string
}

export interface NewProduct extends BaseProduct {
	nameToLowerCase?: string
}

export interface Product extends BaseProduct {
	nameToLowerCase?: string
	inCarousel?: boolean
}

export type CardProduct = BaseProduct

export type CarouselProduct = BaseProduct
