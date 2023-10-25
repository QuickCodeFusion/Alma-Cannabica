import { NextRequest, NextResponse } from "next/server";
import { createUser } from "./createUser";

export const POST = async (req: NextRequest): Promise<NextResponse> => {

	try {

		const {
			name,
			email,
			uid,
			photoUrl,
			adresses,
		} = await req.json();

		await createUser(name, email, uid, photoUrl, adresses);

		return NextResponse.json({ message: `User ${name} created` }, { status: 201 });

	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
};
