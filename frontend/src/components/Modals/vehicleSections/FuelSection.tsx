import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays, Fuel } from "lucide-react";
import { useState } from "react";
import { FuelModal } from "../FuelModal";

interface FuelSectionProps {
  abastecimentos: any[];
  veiculoId: number;
  onFuelAdded: () => Promise<void>;
}

export function FuelSection({ abastecimentos = [], veiculoId, onFuelAdded }: FuelSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (date: string) =>
    date ? new Date(date).toLocaleDateString("pt-BR") : "—";

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  
  return (
    <div className="flex flex-col gap-8">

      <div className="flex items-center justify-between border-b pb-5 -mx-8 px-8 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Fuel className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold tracking-tight">Histórico de Abastecimentos</h3>
        </div>
        <Button onClick={() => setIsModalOpen(true)} size="lg" className="cursor-pointer rounded-full shadow-lg hover:shadow-xl transition-shadow">
          Novo Abastecimento
        </Button>
      </div>

      <div>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center w-1/5">
                <div className="flex items-center justify-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  Data
                </div>
              </TableHead>
              <TableHead className="text-center w-1/5">Fornecedor</TableHead>
              <TableHead className="text-center w-1/5">Combustível</TableHead>
              <TableHead className="text-center w-1/5">Litros</TableHead>
              <TableHead className="text-center w-1/5">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {abastecimentos.length > 0 ? (
              abastecimentos.map((abs: any) => (
                <TableRow key={abs.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="text-center font-medium">
                    {formatDate(abs.data)}
                  </TableCell>
                  <TableCell className="font-medium text-center ">
                    {abs.fornecedor || "—"}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-medium">
                      {abs.combustivel?.nome || "Não informado"}
                    </span>
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {abs.litros ? `${abs.litros} L` : "—"}
                  </TableCell>
                  <TableCell className="text-center  font-bold">
                    R$ {abs.valor ? formatCurrency(abs.valor) : "—"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-20">
                  <div className="flex flex-col items-center gap-5 text-muted-foreground">
                    <div className="p-8 bg-muted/50 rounded-full">
                      <Fuel className="w-16 h-16" />
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold">Nenhum abastecimento registrado</p>
                      <p className="text-sm text-center">
                        Registre todos os abastecimentos para acompanhar consumo, custo médio e autonomia da frota
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal */}
      <FuelModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        veiculoId={veiculoId}
        onAbastecimentoAdded={async () => {
          await onFuelAdded();
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}