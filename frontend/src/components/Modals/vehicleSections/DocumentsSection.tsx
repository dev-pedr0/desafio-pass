import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { AlertCircle, Badge, CheckCircle2, Clock, FileText } from "lucide-react";
import { useState } from "react";
import { DocumentFormModal } from "../DocumentModal";

interface DocumentsSectionProps {
  documentos: any[];
  veiculoId: number;
  onDocumentAdded: () => Promise<void>;
}

export function DocumentsSection({ documentos, veiculoId, onDocumentAdded }: DocumentsSectionProps) {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return dateString ? new Date(dateString).toLocaleDateString("pt-BR") : "—";
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b pb-5 -mx-8 px-8 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold tracking-tight">Documentação do Veículo</h3>
        </div>
        <Button onClick={() => setIsFormModalOpen(true)} size="lg" className="cursor-pointer rounded-full shadow-lg hover:shadow-xl transition-shadow">
          Adicionar Documento
        </Button>
      </div>

      {/* Tabela */}
      <div className="px-8 pb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center w-1/5">Documento</TableHead>
              <TableHead className="text-center w-1/5">Tipo</TableHead>
              <TableHead className="text-center w-1/5">Vencimento</TableHead>
              <TableHead className="text-center w-1/5">Antecipação</TableHead>
              <TableHead className="text-center w-1/5">Dias para Vencimento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documentos?.length > 0 ? (
              documentos.map((doc: any) => {
                return (
                  <TableRow key={doc.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">
                      {doc.arquivo ? (
                        <a
                          href={doc.arquivo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium flex items-center gap-2"
                        >
                          <FileText className="w-4 h-4" />
                          Ver documento
                        </a>
                      ) : (
                        <span className="text-muted-foreground">Sem arquivo</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">{doc.tipo || "—"}</TableCell>
                    <TableCell className="text-center font-medium">
                      {formatDate(doc.vencimento)}
                    </TableCell>
                    <TableCell className="text-center">
                      {doc.antecipacao ? "Sim" : "Não"}
                    </TableCell>
                    <TableCell className="text-center">
                      {doc.dias_para_vencimento ?? "—"}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-16">
                  <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <div className="p-6 bg-muted/50 rounded-full">
                      <FileText className="w-12 h-12" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-lg font-medium">Nenhum documento cadastrado</p>
                      <p className="text-sm">Adicione CRLV, licenças, seguros, apólices e outros documentos importantes</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DocumentFormModal
        veiculoId={veiculoId}
        open={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onDocumentAdded={async () => {
          await onDocumentAdded();
          setIsFormModalOpen(false);
        }}
      />
    </div>
  );
}