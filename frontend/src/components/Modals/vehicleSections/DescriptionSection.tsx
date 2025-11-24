import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NotebookText } from "lucide-react";

interface DescriptionSectionProps {
  form: any;
  handleChange: (key: string, value: string) => void;
}

export function DescriptionSection({ form, handleChange }: DescriptionSectionProps) {
  return (
    <div className="flex flex-col gap-8 bg-background">

      <div className="flex items-center gap-3 -mx-8 px-8 bg-background/80 backdrop-blur-sm">
        <NotebookText className="w-6 h-6 text-primary" />
        <h3 className="text-2xl font-bold tracking-tight">Descrição</h3>
      </div>

      <div className="pb-8 space-y-6">
        <div className="space-y-3">
          <Label className="text-base font-medium text-foreground">
            Observações e Detalhes do Veículo
          </Label>
          <p className="text-sm text-muted-foreground -mt-1">
            Inclua informações sobre condição geral, equipamentos especiais, histórico de manutenção, reformas, acessibilidade, ar-condicionado, etc.
          </p>
        </div>

        <Textarea
          placeholder="Ex: Veículo reformado em 2023 com novo motor Cummins, ar-condicionado duplo, 44 poltronas leito, acessibilidade (elevador), pintura metálica prata, câmera de ré, GPS embarcado..."
          className="min-h-64 resize-none text-base leading-relaxed placeholder:text-muted-foreground/60 focus-visible:ring-primary/50"
          value={form.descricao || ""}
          onChange={(e) => handleChange("descricao", e.target.value)}
        />

        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span className="italic">Dica: quanto mais completo, melhor para o controle da frota</span>
          <span>{form.descricao?.length || 0} caracteres</span>
        </div>
      </div>
    </div>
  );
}