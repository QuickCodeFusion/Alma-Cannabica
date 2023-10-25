import { db } from "@/firebase/config"
import { query, where, collection, getDocs } from "firebase/firestore"

export const filters = async (name : string , price : number) => {
    
    const productRef = query(collection(db, "products"), 
    where("nameToLowerCase", ">=", name.toLocaleLowerCase()),
    where("nameToLowerCase", "<=", name.toLocaleLowerCase()));

    const productsSnapshot = await getDocs(productRef);
    const products = productsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
    }))

    return products
}