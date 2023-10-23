import { NextRequest, NextResponse } from "next/server";
import { createUser } from "./createUser";

export const POST = async (req: NextRequest): Promise<NextResponse> => {

    try {

        const {
            name,
            email,
            photoUrl,
            adresses,
            uid,
        } = await req.json();

        await createUser(name, email, photoUrl, adresses, uid);

        return NextResponse.json({ message: `User ${name} created` }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
