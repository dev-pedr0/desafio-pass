import { NextResponse } from "next/server";

export async function GET() {
    try {
        //const URL = "https://desafio-pass-backend.onrender.com";
        const URL = "http://localhost:3001";

        const res = await fetch(`${URL}/veiculo`, {
           cache: "no-store", 
        });

        if (!res.ok) {
            throw new Error("Erro ao buscar veículos do backend");
        }

        const data = await res.json();
        return NextResponse.json(data);
        
    } catch (error) {
        console.error("API ERROR:", error);
        return NextResponse.json(
            { error: "Erro ao buscar veículos" },
            { status: 500 }
        );
    }
}