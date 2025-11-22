import { SERVER_URL } from "@/url";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const BASE_URL = SERVER_URL;

    try {
        const { searchParams } = new URL(request.url);
        const page = searchParams.get("page") ?? "1";
        const limit = searchParams.get("limit") ?? "10";

        const res = await fetch(`${BASE_URL}/veiculo?page=${page}&limit=${limit}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Erro ao buscar veículos do backend");
        }

        const data = await res.json();
        //console.log(data);
        return NextResponse.json(data);
        
    } catch (error) {
        console.error("API ERROR:", error);
        return NextResponse.json(
            { error: "Erro ao buscar veículos" },
            { status: 500 }
        );
    }
}