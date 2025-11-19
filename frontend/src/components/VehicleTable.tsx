"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useVehicles } from "../hooks/useVehicles";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function VehicleTable() {
    const { vehicles, loading } = useVehicles();

    if (loading) {
        return (
            <p className="text-sm text-muted-foreground">Carregando...</p>
        );
    }

    return (
        <div className="border rounded-lg p-2 bg-card">
            <ScrollArea className="overflow-auto">
                <div className="w-fit w-full p-2">
                    <Table className="text-xs">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Identificador</TableHead>
                                <TableHead>Criado Em</TableHead>
                                <TableHead>Título</TableHead>
                                <TableHead>Marca</TableHead>
                                <TableHead>Capacidade</TableHead>
                                <TableHead>Placa</TableHead>
                                <TableHead>Companhia</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vehicles.map((vehicle) => (
                                <TableRow key={vehicle.id}>
                                    <TableCell>{vehicle.identificador}</TableCell>
                                    <TableCell>{new Date(vehicle.criado_em).toLocaleDateString("pt-BR")}</TableCell>
                                    <TableCell>
                                        <p>{vehicle.modelo}</p>
                                        <p className="text-[0.65rem] text-muted-foreground">
                                            <span>{vehicle.categoria?.nome} </span>
                                            <span>{vehicle.classificacao?.nome}</span>
                                        </p>
                                    </TableCell>
                                    <TableCell>{vehicle.marca?.nome}</TableCell>
                                    <TableCell className="text-center">{vehicle.capacidade}</TableCell>
                                    <TableCell>{vehicle.placa}</TableCell>
                                    <TableCell>{vehicle.companhia?.nome}</TableCell>
                                    <TableCell className="text-center">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-md ${
                                                vehicle.status === "liberado"
                                                ? "bg-green-500 text-white"
                                                : vehicle.status === "pendente"
                                                ? "bg-yellow-500 text-black"
                                                : "bg-red-500 text-white"
                                            }`}
                                        >
                                            {vehicle.status}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea> 
        </div>
    );
}