import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config"; 
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

	try {
		const { name, description, price, image} = await req.json();  
 
		if (!name || !description || !price || !image) {
			throw new Error("Missing data");
		}
		await addDoc(collection(db, "products"), {
			name,
			description,
			price,
			image
		});
		return NextResponse.json({ message: "Product created" }, { status: 201 });
	} catch (error : any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}

};

