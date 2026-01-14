import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { FileText, Trash2 } from "lucide-react";
import { useState } from "react";
import { DocumentFormModal } from "../DocumentModal";
import { SERVER_URL } from "@/url";

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

  const handleDeleteDocument = async (documentoId: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este documento?")) return;

    try {
      const res = await fetch(`${SERVER_URL}/veiculo/${veiculoId}/documentos/${documentoId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }
      await onDocumentAdded();
    } catch (err) {
      console.error("Erro ao deletar documento:", err);
      alert("Erro ao excluir documento");
    }
  }

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
              <TableHead className="text-center w-1/6">Documento</TableHead>
              <TableHead className="text-center w-1/6">Tipo</TableHead>
              <TableHead className="text-center w-1/6">Vencimento</TableHead>
              <TableHead className="text-center w-1/6">Antecipação</TableHead>
              <TableHead className="text-center w-1/6">Dias para Vencimento</TableHead>
              <TableHead className="text-center w-1/6">Ações</TableHead>
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
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-500/10 cursor-pointer"
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-16">
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