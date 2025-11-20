"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useVehicles } from "../hooks/useVehicles";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SearchSection } from "./SearchSection";
import { tableButtons } from "../data/content";
import { GenericButtons } from "./GenericButtons";
import { Button } from "@/components/ui/button";
import { ChevronDown, CloudDownload, Plus, RotateCw } from "lucide-react";
import { useState } from "react";
import { PagesButton } from "./PagesButton";

export function VehicleTable() {
    const {vehicles, loading } = useVehicles();
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(vehicles.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedVehicles = vehicles.slice(startIndex, startIndex + itemsPerPage);

    function goToFirstPage() {
        setCurrentPage(1);
    }

    function goToPrevPage() {
        setCurrentPage((prev) => Math.max(1, prev - 1));
    }

    function goToNextPage() {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    }

    function goToLastPage() {
        setCurrentPage(totalPages);
    }

    function handleItemsPerPage(n: number) {
        setItemsPerPage(n);
        setCurrentPage(1);
    }

    if (loading) {
        return (
            <p className="text-sm text-muted-foreground">Carregando...</p>
        );
    }

    return (
        <div className="border rounded-lg p-2 bg-card">
            <ScrollArea className="overflow-auto">
                <div className="flex gap-2 justify-between items-center pb-3 border-b">
                    <div className="flex gap-2 items-center">
                        <SearchSection inputClassName=""/>
                        <GenericButtons items={tableButtons}/>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Button 
                            size="sm" 
                            variant="outline" 
                            className="rounded-md cursor-pointer focus:ring-2 focus:ring-ring"
                            >
                            <RotateCw className="h-4 w-4"/>
                            <span className="text-md">Atualizar</span>
                        </Button>
                        <Button 
                            size="sm" 
                            variant="outline" 
                            className="rounded-md cursor-pointer focus:ring-2 focus:ring-ring"
                            >
                            <CloudDownload className="h-4 w-4"/>
                            <span className="text-md">Export</span>
                            <div className="w-px h-full bg-border"></div>
                            <ChevronDown className="h-4 w-4"/>
                        </Button>
                        <div className="w-px h-6 bg-border"></div>
                        <Button 
                            size="sm" 
                            variant="default" 
                            className="rounded-md cursor-pointer focus:ring-2 focus:ring-ring"
                            >
                            <Plus className="h-4 w-4"/>
                            <span className="text-md">Adicionar</span>
                        </Button>
                    </div>
                </div>
                <div className="w-full p-2">
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
                            {paginatedVehicles.map((vehicle) => (
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
            <div className="flex items-center">
                <PagesButton
                    itemsPerPage={itemsPerPage}
                    onChange={(n) => handleItemsPerPage(n)}
                />
            </div>
        </div>
    );
}