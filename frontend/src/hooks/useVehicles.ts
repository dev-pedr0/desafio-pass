"use client";

import { useEffect, useState } from "react";

export interface Veiculo {
  id: number;
  criado_em: string;
  identificador: string | null;
  modelo: string | null;
  capacidade: number | null;
  placa: string | null;
  status: string | null;
  marca?: { nome: string };
  companhia?: { nome: string };
  classificacao?: { nome: string } | null;
  categoria?: { nome: string } | null;
}

export function useVehicles(page = 1) {
    const [vehicles, setVehicles] = useState<Veiculo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/veiculos?page=${page}&limit=10`)
        .then((res) => res.json())
        .then((data) => {
            setVehicles(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Erro ao buscar veículos:", err);
            setLoading(false);
        });
    }, [page]);

    return { vehicles, loading };
}