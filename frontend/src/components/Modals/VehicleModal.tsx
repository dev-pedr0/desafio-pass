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

interface VehicleModalProps {
    open: boolean;
    onClose: () => void;
    vehicle: any;
    onVehicleUpdated?: (updatedVehicle: any) => void;
}

const USE_EFFECT_URL = SERVER_URL;

export function VehicleModal({ open, onClose, vehicle, onVehicleUpdated }: VehicleModalProps) {
  const [vehicleData, setVehicleData] = useState<any>(null);

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

          // Atualiza a tabela da listagem!
          onVehicleUpdated?.(updatedVehicle);

          // Fecha o modal com sucesso
          onClose();
          } catch (err) {
          console.error("Erro ao salvar veículo:", err);
          alert("Erro ao salvar. Veja o console.");
          } finally {
          setIsSaving(false);
          }
      };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 min-w-50">
      <div className="flex flex-col gap-4 bg-background p-6 rounded-lg shadow-lg w-[720px] max-h-[90vh] overflow-y-auto border">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Editar Veículo</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="cursor-pointer">Fechar</Button>
            <Button className="cursor-pointer" onClick={handleSave}>
                {isSaving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>

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

        <DescriptionSection form={form} handleChange={handleChange} />

        <ImagesSection form={form} refreshImages={refreshImages} />

        <DocumentsSection
          veiculoId={form.id}
          onDocumentAdded={refreshDocuments}
          documentos={form.documento_veiculo || []}
        />

        <OccurrencesSection 
          ocorrencias={form.ocorrencia_veiculo}
          veiculoId={form.id} 
          onOccurrenceAdded={refreshOccurrences}
        />

        <FuelSection 
          abastecimentos={form.abastecimento_veiculo}
          veiculoId={form.id}
          onFuelAdded={refreshFuel}
        />
      </div>
    </div>
  );
}