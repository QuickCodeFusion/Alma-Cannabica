import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

type Product = {
    name: string;
    description: string;
    price: number;
    image: string;
    itemId: string;
}

/**
 * Updates the properties of a product in the database.
 *
 * @param {Product} product - The product object containing the new property values.
 * @return {Promise<void>} A promise that resolves when the update is complete.
 */
export const editProduct = async  (product: Product) : Promise<void> => {
    const { name, description, price, image, itemId } = product;

    const productRef = doc(db, "products", itemId);

    name && (await updateDoc(productRef, { name }));
    description && (await updateDoc(productRef, { description }));
    price && (await updateDoc(productRef, { price }));
    image && (await updateDoc(productRef, { image }));
}