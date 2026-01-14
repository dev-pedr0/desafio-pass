import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, AlertTriangle, Calendar, FileWarning, TriangleAlert } from "lucide-react";
import { OccurrenceFormModal } from "../OccurenceModal";
import { useState } from "react";
import { SERVER_URL } from "@/url";

interface OccurrencesSectionProps {
  ocorrencias: any[];
  veiculoId: number;
  onOccurrenceAdded: () => Promise<void>;
}

export function OccurrencesSection({ ocorrencias = [], veiculoId, onOccurrenceAdded }: OccurrencesSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOccurrence, setSelectedOccurrence] = useState<any | null>(null);

  const formatDate = (dateString: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir esta ocorrência?")) return;

    const res = await fetch(`${SERVER_URL}/veiculo/ocorrencias/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Erro ao deletar ocorrência");
      return;
    }

    await onOccurrenceAdded();
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between border-b pb-5 -mx-8 px-8 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold tracking-tight">Ocorrências do Veículo</h3>
        </div>
        <Button onClick={() => {
            setSelectedOccurrence(null);
            setIsModalOpen(true);
          }}  size="lg" className="cursor-pointer rounded-full shadow-lg hover:shadow-xl transition-shadow">
          Nova Ocorrência
        </Button>
      </div>

      <div className="px-8 pb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/5">
                <div className="flex items-center gap-2 justify-center">
                  <Calendar className="w-4 h-4" />
                  Data
                </div>
              </TableHead>
              <TableHead className="w-1/5">Tipo de Ocorrência</TableHead>
              <TableHead className="text-center w-1/5">Seriedade</TableHead>
              <TableHead className="text-center w-1/5">Arquivo</TableHead>
              <TableHead className="text-center w-1/5">Ações</TableHead>          
            </TableRow>
          </TableHeader>
          <TableBody>
            {ocorrencias.length > 0 ? (
              ocorrencias.map((oc: any) => {
                return (
                  <TableRow
                    key={oc.id}
                    onClick={() => {
                      setSelectedOccurrence(oc);
                      setIsModalOpen(true);
                    }}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell className="text-center font-medium">
                      {formatDate(oc.data)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {oc.tipo_ocorrencia?.nome || "Não informado"}
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
                    <TableCell className="text-center">
                      {oc.anexo ? (
                        <a
                          href={`${SERVER_URL}/veiculo/ocorrencias/arquivo/${oc.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Ver arquivo
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        className="cursor-pointer"
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(oc.id);
                        }}
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-16">
                  <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <div className="p-6 bg-muted/50 rounded-full">
                      <AlertTriangle className="w-12 h-12" />
                    </div>
                    <div className="space-y-1 text-center">
                      <p className="text-lg font-medium">Nenhuma ocorrência registrada</p>
                      <p className="text-sm max-w-md">
                        Multas, sinistros, avarias, manutenções corretivas e outros eventos devem ser registrados aqui
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal de Nova Ocorrência */}
      <OccurrenceFormModal
        open={isModalOpen}
         onClose={() => {
          setIsModalOpen(false);
          setSelectedOccurrence(null);
        }}
        veiculoId={veiculoId}
        occurrence={selectedOccurrence}
        onOccurrenceAdded={async () => {
          await onOccurrenceAdded();
          setIsModalOpen(false);
          setSelectedOccurrence(null);
        }}
      />
    </div>
  );
}