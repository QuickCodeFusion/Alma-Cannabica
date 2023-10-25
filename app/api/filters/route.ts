import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase/config";
import { filters } from "./filters";


export const GET = async (req: NextRequest) => {
    try {
        const name: string = req.nextUrl.searchParams.get("name") || "";
        const price: string = req.nextUrl.searchParams.get("price") || '';
        const category: string = req.nextUrl.searchParams.get("category") || "";

        const data = await filters(name, 0);

        return NextResponse.json(data, { status: 200 });


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}