// components/vehicles/VehicleCreateModal.tsx (ou onde preferir)
"use client";

import { Button } from "@/components/ui/button";
import { useVehicleForm } from "@/src/hooks/useVehicleForm";
import { GeneralDataSection } from "./vehicleSections/GeneralDataSection";
import { ImagesSection } from "./vehicleSections/ImageSection";
import { DescriptionSection } from "./vehicleSections/DescriptionSection";
import { DocumentsSection } from "./vehicleSections/DocumentsSection";
import { OccurrencesSection } from "./vehicleSections/OccurrencesSection";
import { FuelSection } from "./vehicleSections/FuelSection";
import { useEffect, useState } from "react";
import { SERVER_URL } from "@/url";
import { Loader2, Plus, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

const BASE_URL = SERVER_URL;

interface VehicleCreateModalProps {
  open: boolean;
  onClose: () => void;
  onVehicleCreated?: (newVehicle: any) => void;
}

type SectionId =
  | "general"
  | "description"
  | "images"
  | "documents"
  | "occurrences"
  | "fuel";

const SECTION_TITLES: Record<SectionId, string> = {
  general: "Dados Gerais",
  description: "Descrição",
  images: "Imagens",
  documents: "Documentos",
  occurrences: "Ocorrências",
  fuel: "Abastecimento",
};

export function NewVehicleModal({
  open,
  onClose,
  onVehicleCreated,
}: VehicleCreateModalProps) {
  const [activeSection, setActiveSection] = useState<SectionId>("general");
  const [isSaving, setIsSaving] = useState(false);

  // Passamos null para o hook → ele inicia com form vazio
  const {
    form,
    marcas,
    companhias,
    categorias,
    classificacoes,
    combustiveis,
    tiposPlaca,
    handleChange,
    refreshImages,
    refreshDocuments,
    refreshOccurrences,
    refreshFuel,
  } = useVehicleForm(null);

  const handleCreate = async () => {
    setIsSaving(true);

    try {
      const payload: any = {
        identificador: form.identificador?.trim() || null,
        companhia_id: form.companhia_id || null,
        modelo: form.modelo?.trim() || null,
        ano: form.ano ? Number(form.ano) : null,
        capacidade: form.capacidade ? Number(form.capacidade) : null,
        portais: form.portais ? Number(form.portais) : null,
        revisao_km: form.revisao_km ? Number(form.revisao_km) : null,
        marca_id: form.marca_id || null,
        categoria_id: form.categoria_id || null,
        classificacao_id: form.classificacao_id || null,
        estado: form.estado?.trim() || null,
        uf: form.uf?.trim() || null,
        tipo_placa_id: form.tipo_placa_id || null,
        placa: form.placa?.trim() || null,
        renavam: form.renavam?.trim() || null,
        chassi: form.chassi?.trim() || null,
        combustivel_id: form.combustivel_id || null,
        descricao: form.descricao?.trim() || null,
      };

      // Remove propriedades com valor null/undefined para não dar erro no backend
      Object.keys(payload).forEach(
        (key) => (payload[key] === null || payload[key] === undefined) && delete payload[key]
      );

      const res = await fetch(`${BASE_URL}/veiculo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erro ${res.status}: ${errorText}`);
      }

      const newVehicle = await res.json();
      onVehicleCreated?.(newVehicle);
      onClose();
    } catch (err: any) {
      console.error("Erro ao criar veículo:", err);
      alert(err.message || "Erro ao criar veículo. Veja o console.");
    } finally {
      setIsSaving(false);
    }
  };

  // Resetar form quando modal fecha
  useEffect(() => {
    if (!open) {
      setActiveSection("general");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl border w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b bg-background">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <Plus className="h-7 w-7 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold">Criar Novo Veículo</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="cursor-pointer rounded-full hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex justify-around overflow-x-auto border-b bg-background px-6 scrollbar-hide pb-5">
          {Object.entries(SECTION_TITLES).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveSection(id as SectionId)}
              className={cn(
                "cursor-pointer hover:bg-muted hover:rounded-md px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all",
                activeSection === id
                  ? "border-primary text-foreground font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            {activeSection === "general" && (
              <GeneralDataSection
                form={form}
                handleChange={handleChange}
                marcas={marcas}
                companhias={companhias}
                categorias={categorias}
                classificacoes={classificacoes}
                combustiveis={combustiveis}
                tiposPlaca={tiposPlaca}
              />
            )}
            {activeSection === "description" && (
              <DescriptionSection form={form} handleChange={handleChange} />
            )}
            {activeSection === "images" && (
              <ImagesSection form={form} refreshImages={refreshImages} />
            )}
            {activeSection === "documents" && (
              <DocumentsSection
                veiculoId={form.id}
                onDocumentAdded={refreshDocuments}
                documentos={form.documento_veiculo || []}
              />
            )}
            {activeSection === "occurrences" && (
              <OccurrencesSection
                ocorrencias={form.ocorrencia_veiculo || []}
                veiculoId={form.id}
                onOccurrenceAdded={refreshOccurrences}
              />
            )}
            {activeSection === "fuel" && (
              <FuelSection
                abastecimentos={form.abastecimento_veiculo || []}
                veiculoId={form.id}
                onFuelAdded={refreshFuel}
              />
            )}
          </div>
        </div>

        <div className="p-6 border-t bg-background flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="cursor-pointer">
            Cancelar
          </Button>
          <Button size="default" onClick={handleCreate} disabled={isSaving} className="cursor-pointer">
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Criando...
              </>
            ) : (
              "Criar Veículo"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}