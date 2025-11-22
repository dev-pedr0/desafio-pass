"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useVehicles } from "../hooks/useVehicles";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SearchSection } from "./SearchSection";
import { tableButtons } from "../data/content";
import { GenericButtons } from "./GenericButtons";
import { Button } from "@/components/ui/button";
import { ChevronDown, CloudDownload, Pencil, Plus, RotateCw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { PagesButton } from "./PagesButton";
import { ChangePageButton } from "./ChangePageButton";
import { Checkbox } from "@/components/ui/checkbox";
import { VehicleModal } from "./Modals/VehicleModal";

export function VehicleTable() {
    const { vehicles, loading } = useVehicles();
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selected, setSelected] = useState<number[]>([]);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<any>(null);
    const [vehicleList, setVehicleList] = useState<any[]>([]);

    useEffect(() => {
        if (vehicles) {
            setVehicleList(vehicles);
        }
    }, [vehicles]);

    const totalPages = Math.ceil(vehicleList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedVehicles = vehicleList.slice(startIndex, startIndex + itemsPerPage);
    
    const isPageFullySelected =
        paginatedVehicles.length > 0 &&
        paginatedVehicles.every((vehicle) => selected.includes(vehicle.id));

    const selectedCount = selected.length;
    const totalCount = vehicleList.length;
    
    function goToFirstPage() { setCurrentPage(1); }
    function goToPrevPage() { setCurrentPage((prev) => Math.max(1, prev - 1)); }
    function goToNextPage() { setCurrentPage((prev) => Math.min(totalPages, prev + 1)); }
    function goToLastPage() { setCurrentPage(totalPages); }
    function handleItemsPerPage(n: number) { setItemsPerPage(n); setCurrentPage(1); }

    function toggleSelect(id: number) {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((v) => v !== id)
                : [...prev, id]
        );
    }
    
    function isSelected(id: number) {
        return selected.includes(id);
    }

    function toggleSelectAll() {
        const pageIds = paginatedVehicles.map((v) => v.id);
        const isAllSelected = pageIds.every((id) => selected.includes(id));

        if (isAllSelected) {
            setSelected((prev) => prev.filter((id) => !pageIds.includes(id)));
        } else {
            setSelected((prev) => [...new Set([...prev, ...pageIds])]);
        }
    }

    const handleVehicleUpdated = (updatedVehicle: any) => {
        setVehicleList((prev) =>
            prev.map((v) => (v.id === updatedVehicle.id ? updatedVehicle : v))
        );
    };

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
                <div className="w-full max-h-150 p-2">
                    <Table className="text-xs">
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <Checkbox 
                                        checked={isPageFullySelected}
                                        onCheckedChange={toggleSelectAll}
                                    />
                                </TableHead>
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
                                <TableRow 
                                    key={vehicle.id}
                                    className={`group relative hover:bg-accent/40 transition ${
                                        isSelected(vehicle.id) ? "bg-muted/50 border-l-2 border-l-white" : ""
                                    }`}
                                >
                                    <TableCell className="w-12 relative">
                                        <Checkbox
                                        checked={isSelected(vehicle.id)}
                                        onCheckedChange={() => toggleSelect(vehicle.id)}
                                        />

                                        {/* Botões flutuantes – agora ficam por cima da célula do checkbox */}
                                        <div className="
                                            absolute left-10 top-1/2 -translate-y-1/2 
                                            hidden group-hover:flex gap-2 z-20 
                                            bg-card border shadow-md rounded-md px-2 py-1
                                        ">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="cursor-pointer h-7 w-7 p-0"
                                                onClick={() => {
                                                    setEditingVehicle(vehicle);
                                                    setOpenEditModal(true);
                                                }}
                                            >
                                                <Pencil className="w-3.5 h-3.5"/>
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="cursor-pointer h-7 w-7 p-0 text-destructive"
                                                onClick={() => console.log("Deletar", vehicle.id)}
                                            >
                                                <Trash2 className="w-3.5 h-3.5"/>
                                            </Button>
                                        </div>
                                    </TableCell>
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
                                                ? "bg-chart-2 text-foreground"
                                                : vehicle.status === "pendente"
                                                ? "bg-chart-3 text-foreground"
                                                : "bg-chart-5 text-foreground"
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
                <ScrollBar orientation="vertical" />
            </ScrollArea>
            <div className="flex items-center p-2 justify-between">
                <span className="text-sm text-muted-foreground">
                    {selectedCount} de {totalCount} linha(s) selecionada(s)
                </span>
                <PagesButton
                    itemsPerPage={itemsPerPage}
                    onChange={(n) => handleItemsPerPage(n)}
                />
                <div className="flex gap-2 items-center">
                    <span className="font-medium text-sm">Página {currentPage} de {totalPages}</span>
                    <ChangePageButton
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onFirst={goToFirstPage}
                        onPrev={goToPrevPage}
                        onNext={goToNextPage}
                        onLast={goToLastPage}
                    />
                </div>
            </div>
            {editingVehicle && (
                <VehicleModal
                    open={openEditModal}
                    onClose={() => {
                        setOpenEditModal(false);
                        setEditingVehicle(null);
                    }}
                    vehicle={editingVehicle}
                    onVehicleUpdated={handleVehicleUpdated} // ← aqui atualiza a tabela!
                />
            )}
        </div>
    );
}