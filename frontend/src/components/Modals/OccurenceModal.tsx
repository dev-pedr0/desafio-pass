import { Label } from "@/components/ui/label";
import { SERVER_URL } from "@/url";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const BASE_URL = SERVER_URL;

interface OccurrenceFormModalProps {
  open: boolean;
  onClose: () => void;
  veiculoId: number;
  onOccurrenceAdded: () => Promise<void>;
}

export function OccurrenceFormModal({
  open,
  onClose,
  veiculoId,
  onOccurrenceAdded,
}: OccurrenceFormModalProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [tipos, setTipos] = useState<any[]>([]);
    const [seriedades, setSeriedades] = useState<any[]>([]);
    const [form, setForm] = useState({
        data: null as Date | null,
        classificacao_id: "",
        seriedade_id: "",
        descricao: "",
        anexo: null as File | null,
    });

    useEffect(() => {
        if (!open) return;
        Promise.all([
            fetch(`${BASE_URL}/veiculo/ocorrencia/tipos`).then(r => r.json()),
            fetch(`${BASE_URL}/veiculo/ocorrencia/seriedades`).then(r => r.json()),
        ]).then(([t, s]) => {
            setTipos(t);
            setSeriedades(s);
        });
    }, [open]);

    const handleSave = async () => {
        if (!form.classificacao_id || !form.seriedade_id) {
        alert("Tipo e Seriedade são obrigatórios");
        return;
        }

        setIsSaving(true);
        const formData = new FormData();
        formData.append("classificacao_id", form.classificacao_id);
        formData.append("seriedade_id", form.seriedade_id);
        if (form.data) formData.append("data", form.data.toISOString().split("T")[0]);
        if (form.descricao) formData.append("descricao", form.descricao);
        if (form.anexo) formData.append("anexo", form.anexo);

        try {
        const res = await fetch(`${BASE_URL}/veiculo/${veiculoId}/ocorrencias`, {
            method: "POST",
            body: formData,
        });

        if (!res.ok) throw new Error("Erro ao salvar ocorrência");

        await onOccurrenceAdded();
        onClose();
        // reset
        setForm({ data: null, classificacao_id: "", seriedade_id: "", descricao: "", anexo: null });
        } catch (err) {
            console.error(err);
            alert("Erro ao salvar ocorrência");
        } finally {
            setIsSaving(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-background p-6 rounded-lg shadow-xl w-[520px] max-w-[95vw] flex flex-col gap-5">
            <h3 className="text-xl font-bold">Nova Ocorrência</h3>

            <div className="grid gap-4">
            <div className="space-y-2">
                <Label>Data da Ocorrência</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.data ? format(form.data, "PPP", { locale: ptBR }) : "Selecione"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={form.data || undefined}
                            onSelect={(d) => setForm(prev => ({ ...prev, data: d || null }))}
                            locale={ptBR}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="space-y-2">
                <Label>Tipo de Ocorrência <span className="text-red-500">*</span></Label>
                <Select value={form.classificacao_id} onValueChange={v => setForm(prev => ({ ...prev, classificacao_id: v }))}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo"/>
                    </SelectTrigger>
                    <SelectContent>
                        {tipos.map(t => (
                        <SelectItem key={t.id} value={String(t.id)}>{t.nome}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label>Seriedade <span className="text-red-500">*</span></Label>
                <Select value={form.seriedade_id} onValueChange={v => setForm(prev => ({ ...prev, seriedade_id: v }))}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione a seriedade"/>
                    </SelectTrigger>
                    <SelectContent>
                        {seriedades.map(s => (
                        <SelectItem key={s.id} value={String(s.id)}>{s.nome}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea
                    placeholder="Detalhes da ocorrência..."
                    value={form.descricao}
                    onChange={e => setForm(prev => ({ ...prev, descricao: e.target.value }))}
                    rows={4}
                />
            </div>

            <div className="space-y-2">
                <Label>Anexo (PDF, imagem, etc.)</Label>
                <Input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    onChange={e => setForm(prev => ({ ...prev, anexo: e.target.files?.[0] || null }))}
                />
            </div>
            </div>

            <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={onClose} disabled={isSaving} className="cursor-pointer">Cancelar</Button>
                <Button onClick={handleSave} disabled={isSaving} className="cursor-pointer">
                    {isSaving ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                    </>
                    ) : "Salvar Ocorrência"}
                </Button>
            </div>
        </div>
        </div>
    );
}