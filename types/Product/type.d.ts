export type NewProduct = {
    name: string;
    description: string;
    price: number;
    image: string;
    itemId: string;
    category: string;
    nameToLowerCase?: string;
}

export type Product = {
    name: string;
    description: string;
    price: number;
    image: string;
    itemId: string;
    category: string;
    nameToLowerCase: string;
}
