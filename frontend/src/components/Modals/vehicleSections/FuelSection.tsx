import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Fuel } from "lucide-react";
import { useState } from "react";
import { FuelModal } from "../FuelModal";

interface FuelSectionProps {
  abastecimentos: any[];
  veiculoId: number;
  onFuelAdded: () => Promise<void>;
}

export function FuelSection({ abastecimentos = [], veiculoId, onFuelAdded }: FuelSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className="flex flex-col gap-4 bg-card p-4 rounded-md">
      <div className="flex items-center gap-2">
        <Fuel className="w-5 h-5" />
        <h3 className="text-base font-semibold">Abastecimentos</h3>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Data</TableHead>
            <TableHead className="text-center">Fornecedor</TableHead>
            <TableHead className="text-center">Combustível</TableHead>
            <TableHead className="text-center">Litros</TableHead>
            <TableHead className="text-center">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {abastecimentos?.length > 0 ? (
            abastecimentos.map((abs: any) => (
              <TableRow key={abs.id}>
                <TableCell className="text-center">
                  {abs.data ? new Date(abs.data).toLocaleDateString("pt-BR") : "—"}
                </TableCell>
                <TableCell className="text-center">{abs.fornecedor || "—"}</TableCell>
                <TableCell className="text-center">
                  <span className="inline-block px-2 py-1 text-xs bg-emerald-50 text-chart-2 rounded">
                    {abs.combustivel?.nome || "—"}
                  </span>
                </TableCell>
                <TableCell className="text-center font-medium">
                  {abs.litros ? `${abs.litros} L` : "—"}
                </TableCell>
                <TableCell className="text-center font-semibold text-chart-2">
                  {abs.valor ? `R$ ${Number(abs.valor).toFixed(2)}` : "—"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground italic py-6">
                Nenhum abastecimento registrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-center">
        <Button
          variant="secondary"
          className="rounded-full px-8 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          Adicionar
        </Button>
      </div>

      <FuelModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        veiculoId={veiculoId}
        onAbastecimentoAdded={onFuelAdded}
      />
    </div>
  );
}