"use client";

import { Button } from "@/components/ui/button";
import { useVehicleForm } from "@/src/hooks/useVehicleForm";
import { GeneralDataSection } from "./vehicleSections/GeneralDataSection";
import { ImagesSection } from "./vehicleSections/ImageSection";
import { DescriptionSection } from "./vehicleSections/DescriptionSection";
import { DocumentsSection } from "./vehicleSections/DocumentsSection";
import { OccurrencesSection } from "./vehicleSections/OccurrencesSection";
import { FuelSection } from "./vehicleSections/FuelSection";
import { useEffect, useRef, useState } from "react";
import { SERVER_URL } from "@/url";
import { Bus, Loader2, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface VehicleModalProps {
    open: boolean;
    onClose: () => void;
    vehicle: any;
    onVehicleUpdated?: (updatedVehicle: any) => void;
}

const USE_EFFECT_URL = SERVER_URL;

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

export function VehicleModal({ open, onClose, vehicle, onVehicleUpdated }: VehicleModalProps) {
  const [vehicleData, setVehicleData] = useState<any>(null);
  const [activeSection, setActiveSection] = useState("general");

  const sectionRefs = {
    general: useRef<HTMLDivElement>(null),
    description: useRef<HTMLDivElement>(null),
    images: useRef<HTMLDivElement>(null),
    documents: useRef<HTMLDivElement>(null),
    occurrences: useRef<HTMLDivElement>(null),
    fuel: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    if (!open || !vehicle.id) {
      setVehicleData(null);
      return;
    }

    fetch(`${USE_EFFECT_URL}/veiculo/${vehicle.id}`)
      .then(r => r.json())
      .then(data => setVehicleData(data));
  }, [open, vehicle.id]);
  
  const {
      form,
      marcas,
      companhias,
      categorias,
      classificacoes,
      combustiveis,
      tiposPlaca,
      BASE_URL,
      handleChange,
      refreshDocuments,
      refreshImages,
      refreshOccurrences,
      refreshFuel,
  } = useVehicleForm(vehicleData);

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!form.id) return;

    setIsSaving(true);

    try {
        const payload: Partial<any> = {};

        if (form.identificador?.trim()) payload.identificador = form.identificador.trim();
        if (form.companhia_id) payload.companhia_id = form.companhia_id;
        if (form.modelo?.trim()) payload.modelo = form.modelo.trim();

        if (form.ano && form.ano.toString().trim()) payload.ano = Number(form.ano);
        if (form.capacidade && form.capacidade.toString().trim()) payload.capacidade = Number(form.capacidade);
        if (form.portais && form.portais.toString().trim()) payload.portais = Number(form.portais);
        if (form.revisao_km && form.revisao_km.toString().trim()) payload.revisao_km = Number(form.revisao_km);

        if (form.marca_id) payload.marca_id = form.marca_id;
        if (form.categoria_id) payload.categoria_id = form.categoria_id;
        if (form.classificacao_id) payload.classificacao_id = form.classificacao_id;
        if (form.estado?.trim()) payload.estado = form.estado.trim();
        if (form.uf?.trim()) payload.uf = form.uf.trim();
        if (form.tipo_placa_id) payload.tipo_placa_id = form.tipo_placa_id;
        if (form.placa?.trim()) payload.placa = form.placa.trim();
        if (form.renavam?.trim()) payload.renavam = form.renavam.trim();
        if (form.chassi?.trim()) payload.chassi = form.chassi.trim();
        if (form.combustivel_id) payload.combustivel_id = form.combustivel_id;
        if (form.descricao?.trim()) payload.descricao = form.descricao.trim();

        const res = await fetch(`${BASE_URL}/veiculo/${form.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Erro do backend:", res.status, errorText);
            throw new Error(`Erro ${res.status}: ${errorText}`);
        }

        const updatedVehicle = await res.json();

        onVehicleUpdated?.(updatedVehicle);

        onClose();
      } catch (err) {
        console.error("Erro ao salvar veículo:", err);
        alert("Erro ao salvar. Veja o console.");
      } finally {
        setIsSaving(false);
      }
    };

  const scrollToSection = (id: keyof typeof sectionRefs) => {
    sectionRefs[id].current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl border w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        
        <div className="flex items-center justify-between p-6 border-b bg-background">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <Bus className="h-7 w-7 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold">Editar Veículo</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-muted cursor-pointer"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex overflow-x-auto border-b bg-muted/30 px-6 scrollbar-hide">
          {Object.entries(SECTION_TITLES).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveSection(id as SectionId)}
              className={cn(
                "px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all",
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
                ocorrencias={form.ocorrencia_veiculo}
                veiculoId={form.id}
                onOccurrenceAdded={refreshOccurrences}
              />
            )}

            {activeSection === "fuel" && (
              <FuelSection
                abastecimentos={form.abastecimento_veiculo}
                veiculoId={form.id}
                onFuelAdded={refreshFuel}
              />
            )}
          </div>
        </div>

        <div className="p-6 border-t bg-background flex justify-end">
          <Button size="lg" onClick={handleSave} disabled={isSaving} className="min-w-40 cursor-pointer">
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar Alterações"
            )}
          </Button>
        </div>

      </div>
    </div>
  );
}