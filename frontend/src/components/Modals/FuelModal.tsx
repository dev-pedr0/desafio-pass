import { Label } from "@/components/ui/label";
import { SERVER_URL } from "@/url"
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BASE_URL = SERVER_URL;

interface FuelModalProps {
  open: boolean;
  onClose: () => void;
  veiculoId: number;
  onAbastecimentoAdded: () => Promise<void>;
}

export function FuelModal({ open, onClose, veiculoId, onAbastecimentoAdded }: FuelModalProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [combustiveis, setCombustiveis] = useState<any[]>([]);

    const [form, setForm] = useState({
        data: null as Date | null,
        fornecedor: "",
        combustivel_id: "",
        litros: "",
        valor: "",
    });

    useEffect(() => {
        if (open) {
            fetch(`${BASE_URL}/veiculo/combustiveis`)
                .then(r => r.json())
                .then(setCombustiveis);
        }
    }, [open]);

    const handleSave = async () => {
        if (!form.combustivel_id || !form.litros || !form.valor) {
            alert("Combustível, litros e valor são obrigatórios");
            return;
        }

        setIsSaving(true);

        const payload = {
            data: form.data ? form.data.toISOString().split("T")[0] : null,
            fornecedor: form.fornecedor || null,
            combustivel_id: form.combustivel_id,
            litros: form.litros,
            valor: form.valor,
        };

        try {
            const res = await fetch(`${SERVER_URL}/veiculo/${veiculoId}/abastecimentos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Erro ao salvar");

        await onAbastecimentoAdded();
        onClose();

        setForm({
            data: null,
            fornecedor: "",
            combustivel_id: "",
            litros: "",
            valor: "",
        });
        } catch (err) {
            alert("Erro ao salvar abastecimento");
            console.log(err);
        } finally {
            setIsSaving(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-lg shadow-xl w-[520px] max-w-[95vw] flex flex-col gap-5">
                <h3 className="text-xl font-bold">Novo Abastecimento</h3>

                <div className="grid gap-4">
                    <div className="space-y-2">
                        <Label>Data do Abastecimento</Label>
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
                        <Label>Fornecedor</Label>
                        <Input
                            placeholder="Ex: Posto Ipiranga"
                            value={form.fornecedor}
                            onChange={e => setForm(prev => ({ ...prev, fornecedor: e.target.value }))}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Combustível <span className="text-red-500">*</span></Label>
                        <Select value={form.combustivel_id} onValueChange={v => setForm(prev => ({ ...prev, combustivel_id: v }))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                                {combustiveis.map(c => (
                                <SelectItem key={c.id} value={String(c.id)}>{c.nome}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <Label>Litros <span className="text-chart-5">*</span></Label>
                            <Input
                                type="number"
                                step="0.01"
                                placeholder="0,00"
                                value={form.litros}
                                onChange={e => setForm(prev => ({ ...prev, litros: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Valor Total <span className="text-chart-5">*</span></Label>
                            <Input
                                type="number"
                                step="0.01"
                                placeholder="R$ 0,00"
                                value={form.valor}
                                onChange={e => setForm(prev => ({ ...prev, valor: e.target.value }))}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose} disabled={isSaving} className="cursor-pointer">
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving} className="cursor-pointer">
                        {isSaving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Salvando...
                        </>
                        ) : "Salvar Abastecimento"}
                    </Button>
                </div>
            </div>
        </div>
    );
}