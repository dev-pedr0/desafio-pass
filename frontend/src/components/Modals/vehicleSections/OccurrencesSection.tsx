import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TriangleAlert } from "lucide-react";
import { OccurrenceFormModal } from "../OccurenceModal";
import { useState } from "react";

interface OccurrencesSectionProps {
  ocorrencias: any[];
  veiculoId: number;
  onOccurrenceAdded: () => Promise<void>;
}

export function OccurrencesSection({ ocorrencias = [], veiculoId, onOccurrenceAdded }: OccurrencesSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 bg-card p-4 rounded-md">
      <div className="flex items-center gap-2">
        <TriangleAlert className="w-5 h-5" />
        <h3 className="text-base font-semibold">Ocorrências</h3>
      </div>

      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3 text-center">Data da Ocorrência</TableHead>
            <TableHead className="w-1/3 text-center">Tipo</TableHead>
            <TableHead className="w-1/3 text-center">Seriedade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ocorrencias?.length > 0 ? (
            ocorrencias.map((oc: any) => (
              <TableRow key={oc.id}>
                <TableCell className="text-center">
                  {oc.data ? new Date(oc.data).toLocaleDateString("pt-BR") : "—"}
                </TableCell>
                <TableCell className="text-center">
                  {oc.tipo_ocorrencia?.nome || "—"}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      oc.seriedade_ocorrencia?.nome === "Alta"
                        ? "bg-red-100 text-chart-5"
                        : oc.seriedade_ocorrencia?.nome === "Média"
                        ? "bg-yellow-100 text-chart-3"
                        : "bg-green-100 text-chart-2"
                    }`}
                  >
                    {oc.seriedade_ocorrencia?.nome || "—"}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground italic py-6">
                Nenhum registro de ocorrência
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-center">
        <Button variant="secondary" className="cursor-pointer rounded-full px-8" onClick={() => setIsModalOpen(true)}>
          Adicionar
        </Button>
      </div>

      <OccurrenceFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        veiculoId={veiculoId}
        onOccurrenceAdded={async () => {
          await onOccurrenceAdded();
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}