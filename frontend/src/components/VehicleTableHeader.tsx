"use client";

import { Button } from "@/components/ui/button";
import { SearchSection } from "./SearchSection";
import { cardMenu, tableButtons } from "../data/content";
import { ChevronDown, CloudDownload, Funnel, Plus, RotateCw } from "lucide-react";
import { useLocale } from "../context/LocaleContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type SearchMode = "identificador" | "titulo" | "placa";
type StatusFilter = "todos" | "pendente" | "liberado" | "cancelado";

interface VehicleTableHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  searchMode: SearchMode;
  onSearchModeChange: (mode: SearchMode) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (status: StatusFilter) => void;
  onRefresh: () => void;
  onExport: () => void;
  onCreateClick: () => void;
  loading: boolean;
}

export function VehicleTableHeader({
  searchTerm,
  onSearchChange,
  searchMode,
  onSearchModeChange,
  statusFilter,
  onStatusFilterChange,
  onRefresh,
  onExport,
  onCreateClick,
  loading,
}: VehicleTableHeaderProps) {
  const { t } = useLocale();

  const modeLabels = {
    identificador: "Identificador",
    titulo: "Título",
    placa: "Placa",
  };

  const statusLabels = {
    todos: "Todos",
    pendente: "Pendente",
    liberado: "Liberado",
    cancelado: "Cancelado",
  };

  return (
    <div className="flex gap-2 justify-between items-center pb-3 border-b">
      {/* Lado esquerdo */}
        <div className="flex gap-2 items-center">
            <SearchSection
                inputClassName="w-80"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={`Buscar por ${modeLabels[searchMode].toLowerCase()}...`}
            />

            {/* Modo */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" className="gap-2">
                    <Funnel className="h-4 w-4" />
                    {modeLabels[searchMode]}
                    <ChevronDown className="h-3 w-3" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => onSearchModeChange("identificador")}>
                    Identificador
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onSearchModeChange("titulo")}>
                    Título
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onSearchModeChange("placa")}>
                    Placa
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Status */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" className="gap-2">
                    <Funnel className="h-4 w-4" />
                    {statusLabels[statusFilter]}
                    <ChevronDown className="h-3 w-3" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => onStatusFilterChange("todos")}>
                    Todos
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusFilterChange("pendente")}>
                    Pendente
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusFilterChange("liberado")}>
                    Liberado
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusFilterChange("cancelado")}>
                    Cancelado
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

      {/* Lado direito */}
      <div className="flex gap-2 items-center">
        {/* Atualizar */}
        <Button
            size="sm"
            variant="outline"
            className="rounded-md cursor-pointer focus:ring-2 focus:ring-ring"
            onClick={onRefresh}
            disabled={loading}
        >
          <RotateCw
            className={`h-4 w-4 transition-transform ${
              loading ? "animate-spin" : ""
            }`}
          />
          <span className="text-md">{t(cardMenu[0].name)}</span>
        </Button>

        {/* Exportar */}
        <Button
            size="sm"
            variant="outline"
            className="rounded-md cursor-pointer focus:ring-2 focus:ring-ring"
            onClick={onExport}
        >
          <CloudDownload className="h-4 w-4" />
          <span className="text-md">{t(cardMenu[1].name)}</span>
          <div className="w-px h-full bg-border mx-2" />
          <ChevronDown className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border" />

        {/* Novo Veículo */}
        <Button
          size="sm"
          variant="default"
          className="rounded-md cursor-pointer focus:ring-2 focus:ring-ring"
          onClick={onCreateClick}
        >
          <Plus className="h-4 w-4" />
          <span className="text-md">{t(cardMenu[2].name)}</span>
        </Button>
      </div>
    </div>
  );
}