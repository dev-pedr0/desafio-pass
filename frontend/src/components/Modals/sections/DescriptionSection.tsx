import { Textarea } from "@/components/ui/textarea";
import { NotebookText } from "lucide-react";

interface DescriptionSectionProps {
  form: any;
  handleChange: (key: string, value: string) => void;
}

export function DescriptionSection({ form, handleChange }: DescriptionSectionProps) {
  return (
    <div className="flex flex-col gap-4 bg-card p-4 rounded-md">
      <div className="flex items-center gap-2">
        <NotebookText className="w-5 h-5" />
        <h3 className="text-base font-semibold">Descrição</h3>
      </div>

      <Textarea
        placeholder="Insira detalhes adicionais do veículo (condição, observações, histórico, etc.)..."
        className="min-h-32 resize-none"
        value={form.descricao || ""}
        onChange={(e) => handleChange("descricao", e.target.value)}
      />
    </div>
  );
}