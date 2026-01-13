"use client";

import { useCallback, useEffect, useState } from "react";

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

export function useVehicles(page = 1, limit = 100) {
    const [vehicles, setVehicles] = useState<Veiculo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchVehicles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
        const res = await fetch(`/api/veiculos?page=${page}&limit=${limit}`);
        if (!res.ok) throw new Error("Falha ao carregar veículos");
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.data || [];
        setVehicles(list);
        } catch (err: any) {
        console.error("Erro ao buscar veículos:", err);
        setError(err.message);
        setVehicles([]);
        } finally {
        setLoading(false);
        }
    }, [page, limit]);

    useEffect(() => {
        fetchVehicles();
    }, [fetchVehicles]);

    const refetch = useCallback(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return { vehicles, loading, error, refetch };
}

export async function deleteVehicle(id: number) {
  const res = await fetch(`http://localhost:3001/veiculo/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar veículo");
  }

  return true;
}