import { addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config"; 
import { NextRequest, NextResponse } from "next/server";
import { editProduct } from "./editProduct";

export const POST = async (req: NextRequest) => {

	try {
		const { name, description, price, image} = await req.json();  
 
		if (!name || !description || !price || !image) {
			throw new Error("Missing data");
		}
		await addDoc(collection(db, "products"), {
			name,
            nameToLowerCase: name.toLowerCase(),
			description,
			price,
			image,
		});
		return NextResponse.json({ message: "Product created" }, { status: 201 });
	} catch (error : any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}

};

export const GET = async (req: NextRequest) => {
    try {
        const productsSnapshot = await getDocs(collection(db, "products"));
        const products = productsSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));
        
        return NextResponse.json(products, { status: 200 });
        
    } catch (error : any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};

export const DELETE = async (req: NextRequest) => {
    try {
        const itemId : string = req.nextUrl.searchParams.get("itemId") || "";

        const itemRef = doc(db, "products", itemId);

        await deleteDoc(itemRef);

        return NextResponse.json({ message: "Product deleted " + itemId }, { status: 200 });
        
    } catch (error : any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export const PUT = async (req: NextRequest) => {
    try {
        const itemId : string = req.nextUrl.searchParams.get("itemId") || "";

        const { name, description, price, image } = await req.json();

        const product = {
            name,
            description,
            price,
            image,
            itemId
        }

        await editProduct(product);

        return NextResponse.json({ message: "Product updated " + itemId }, { status: 200 });
        
    } catch (error : any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
