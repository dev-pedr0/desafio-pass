import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { FileText } from "lucide-react";
import { useState } from "react";
import { DocumentFormModal } from "../DocumentModal";

interface DocumentsSectionProps {
  documentos: any[];
  veiculoId: number;
  onDocumentAdded: () => Promise<void>;
}

export function DocumentsSection({ documentos, veiculoId, onDocumentAdded }: DocumentsSectionProps) {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  
  const handleOpenModal = () => setIsFormModalOpen(true);
  const handleCloseModal = () => setIsFormModalOpen(false);

  return (
    <div className="flex flex-col gap-4 bg-card p-4 rounded-md">
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5" />
        <h3 className="text-base font-semibold">Documentação</h3>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Documento</TableHead>
            <TableHead className="text-center">Tipo</TableHead>
            <TableHead className="text-center">Vencimento</TableHead>
            <TableHead className="text-center">Antecipação</TableHead>
            <TableHead className="text-center">Dias para Vencimento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documentos?.length > 0 ? (
            documentos.map((doc: any) => (
              <TableRow key={doc.id}>
                <TableCell className="text-center">
                  {doc.arquivo ? (
                    <a href={doc.arquivo} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      Ver arquivo
                    </a>
                  ) : "—"}
                </TableCell>
                <TableCell className="text-center">{doc.tipo || "—"}</TableCell>
                <TableCell className="text-center">
                  {doc.vencimento ? new Date(doc.vencimento).toLocaleDateString("pt-BR") : "—"}
                </TableCell>
                <TableCell className="text-center">{doc.antecipacao ? "Sim" : "Não"}</TableCell>
                <TableCell className="text-center">{doc.dias_para_vencimento ?? "—"}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground italic py-6">
                Nenhum documento cadastrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-center">
        <Button variant="secondary" className="cursor-pointer rounded-full px-8" onClick={handleOpenModal}>
          Adicionar
        </Button>
      </div>

      <DocumentFormModal
        veiculoId={veiculoId}
        open={isFormModalOpen}
        onClose={handleCloseModal}
        onDocumentAdded={async () => {
          await onDocumentAdded();
          setIsFormModalOpen(false);
        }}
      />
    </div>
  );
}