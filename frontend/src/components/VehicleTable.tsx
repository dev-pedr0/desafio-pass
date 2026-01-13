"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteVehicle, useVehicles } from "../hooks/useVehicles";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { PagesButton } from "./PagesButton";
import { ChangePageButton } from "./ChangePageButton";
import { Checkbox } from "@/components/ui/checkbox";
import { VehicleModal } from "./Modals/VehicleModal";
import { NewVehicleModal } from "./Modals/NewVehicleModal";
import { VehicleTableHeader } from "./VehicleTableHeader";

type SearchMode = "identificador" | "titulo" | "placa";
type StatusFilter = "todos" | "pendente" | "liberado" | "cancelado";

export function VehicleTable() {
    const { vehicles, loading, refetch } = useVehicles();
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selected, setSelected] = useState<number[]>([]);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<any>(null);
    const [openCreateModal, setOpenCreateModal] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchMode, setSearchMode] = useState<SearchMode>("identificador");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");

    const filteredVehicles = useMemo(() => {
        if (!vehicles) return [];

        return vehicles.filter((v) => {
        const term = searchTerm.toLowerCase().trim();

        const matchesSearch =
            term === "" ||
            (searchMode === "identificador" &&
            v.identificador?.toLowerCase().includes(term)) ||
            (searchMode === "titulo" && v.modelo?.toLowerCase().includes(term)) ||
            (searchMode === "placa" && v.placa?.toLowerCase().includes(term));

        const matchesStatus =
            statusFilter === "todos" || v.status === statusFilter;

        return matchesSearch && matchesStatus;
        });
    }, [vehicles, searchTerm, searchMode, statusFilter]);

    // Paginação baseada nos veículos já filtrados
    const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + itemsPerPage);

    // Contagem correta de itens totais (filtrados)
    const totalCount = filteredVehicles.length;
    const selectedCount = selected.length;

    // Verifica se toda a página está selecionada
    const isPageFullySelected =
        paginatedVehicles.length > 0 &&
        paginatedVehicles.every((vehicle) => selected.includes(vehicle.id));

    // Funções de navegação
    const goToFirstPage = () => setCurrentPage(1);
    const goToPrevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
    const goToNextPage = () => setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    const goToLastPage = () => setCurrentPage(totalPages);
    const handleItemsPerPage = (n: number) => {
        setItemsPerPage(n);
        setCurrentPage(1);
    };

    // Seleção
    const toggleSelect = (id: number) => {
        setSelected((prev) =>
        prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
        );
    };

    const isSelected = (id: number) => selected.includes(id);

    const toggleSelectAll = () => {
        const pageIds = paginatedVehicles.map((v) => v.id);
        const allSelected = pageIds.every((id) => selected.includes(id));

        if (allSelected) {
        setSelected((prev) => prev.filter((id) => !pageIds.includes(id)));
        } else {
        setSelected((prev) => [...new Set([...prev, ...pageIds])]);
        }
    };

    // Atualiza veículo (após editar) → recarrega tudo (mais simples e seguro)
    const handleVehicleUpdated = () => {
        refetch();
    };

    // Exportar CSV dos veículos filtrados
    const handleExport = () => {
        const headers = [
        "ID",
        "Identificador",
        "Modelo",
        "Placa",
        "Marca",
        "Companhia",
        "Status",
        "Criado em",
        ];

        const rows = filteredVehicles.map((v) => [
        v.id,
        v.identificador || "",
        v.modelo || "",
        v.placa || "",
        v.marca?.nome || "",
        v.companhia?.nome || "",
        v.status || "",
        new Date(v.criado_em).toLocaleDateString("pt-BR"),
        ]);

        const csv = [headers, ...rows].map((row) => row.join(";")).join("\n");
        const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `veiculos_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="border rounded-lg p-2 bg-card">
            <ScrollArea className="overflow-auto">
                
                <VehicleTableHeader
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    searchMode={searchMode}
                    onSearchModeChange={setSearchMode}
                    statusFilter={statusFilter}
                    onStatusFilterChange={setStatusFilter}
                    onRefresh={refetch}
                    onExport={handleExport}
                    onCreateClick={() => setOpenCreateModal(true)}
                />
               
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
                                                onClick={async () => {
                                                    const confirm = window.confirm(
                                                        `Tem certeza que deseja excluir o veículo "${vehicle.identificador || vehicle.modelo}"?`
                                                    );

                                                    if (!confirm) return;

                                                    try {
                                                        await deleteVehicle(vehicle.id);
                                                        refetch();
                                                    } catch (err) {
                                                        alert("Erro ao deletar veículo");
                                                    }
                                                }}
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

            {openCreateModal && (
                <NewVehicleModal
                    open={openCreateModal}
                    onClose={() => setOpenCreateModal(false)}
                    onVehicleCreated={() => {
                        refetch();
                        setOpenCreateModal(false);
                    }}
                />
            )}

            {editingVehicle && (
                <VehicleModal
                    open={openEditModal}
                    onClose={() => {
                        setOpenEditModal(false);
                        setEditingVehicle(null);
                    }}
                    vehicle={editingVehicle}
                    onVehicleUpdated={handleVehicleUpdated}
                />
            )}
        </div>
    );
}