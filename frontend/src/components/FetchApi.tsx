"use client"

import { useEffect, useState } from "react";

type Vehicle = {
    id: number;
    identificador?: string;
    modelo?: string;
    status?: string;    
};

export function FetchApi() {
    const [veiculos, setVeiculos] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //fetch("http://localhost:3001/veiculo")
        fetch("https://desafio-pass-backend.onrender.com")
        .then((res) => res.json())
        .then((data) => {
            setVeiculos(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Carregando veículos...</div>;
    }

    return (
        <div>
           <h2 className="text-lg font-semibold mb-2">Veículos</h2>
           <ul className="list-disc pl-5">
               {veiculos.map((veiculo) => (
                <li key={veiculo.id}>
                    {veiculo.identificador || "Sem identificador"} - {veiculo.modelo || "Sem modelo"} -{" "}
                    {veiculo.status || "Sem status"} 
                </li>
               ))} 
           </ul>
        </div>
    );
}