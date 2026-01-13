import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SERVER_URL } from "@/url";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";

const BASE_URL = SERVER_URL;

interface DocumentFormModalProps {
    veiculoId: number;
    open: boolean;
    onClose: () => void;
    onDocumentAdded: () => Promise<void>;
}

interface DocumentForm {
    tipo: string;
    vencimento: Date | null;
    antecipacao: boolean;
    dias_para_vencimento: number | null;
    arquivo: File | null;
}

export function DocumentFormModal({ veiculoId, open, onClose, onDocumentAdded }: DocumentFormModalProps) {
    const [form, setForm] = useState<DocumentForm>({
        tipo: "",
        vencimento: null,
        antecipacao: false,
        dias_para_vencimento: null,
        arquivo: null,
    });
    const [isSaving, setIsSaving] = useState(false);

    const showError = (message: string) => {
        console.error("ERRO DE VALIDAÇÃO:", message);
    };

    const handleChange = (key: keyof DocumentForm, value: any) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        handleChange("arquivo", file);
    };

    const handleSave = async () => {
        if (!form.tipo.trim() || !form.arquivo) {
            showError("Por favor, preencha o Tipo e selecione o Arquivo.");
            return;
        }

        setIsSaving(true);
        
        const formData = new FormData();
        
        formData.append("arquivo", form.arquivo);
        
        formData.append("tipo", form.tipo.trim());
        formData.append("antecipacao", form.antecipacao ? "true" : "false");
        
        if (form.vencimento) {
            formData.append("vencimento", form.vencimento.toISOString());
        }
        
        if (form.dias_para_vencimento !== null) {
            formData.append("dias_para_vencimento", form.dias_para_vencimento.toString());
        }

        try {
            const res = await fetch(`${BASE_URL}/veiculo/${veiculoId}/documentos`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Erro do backend ao salvar documento:", res.status, errorText);
                showError(`Erro ao salvar documento: ${res.status}`);
                throw new Error(`Erro ao salvar documento: ${res.status}`);
            }

            await onDocumentAdded();
            
            onClose();
            setForm({
                tipo: "",
                vencimento: null,
                antecipacao: false,
                dias_para_vencimento: null,
                arquivo: null,
            });

        } catch (err) {
            console.error("Erro ao salvar documento:", err);
            showError("Erro ao salvar. Verifique o console.");
        } finally {
            setIsSaving(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
            <div className="bg-background p-6 rounded-lg shadow-2xl w-[500px] max-w-[90vw] flex flex-col gap-5">
                <h3 className="text-xl font-bold">Adicionar Novo Documento</h3>
                
                <div className="grid gap-4">
                    {/* Campo Tipo */}
                    <div className="space-y-2">
                        <Label htmlFor="tipo">Tipo de Documento <span className="text-red-500">*</span></Label>
                        <Input 
                            id="tipo"
                            value={form.tipo}
                            onChange={(e) => handleChange("tipo", e.target.value)}
                            placeholder="Ex: Licenciamento, IPVA, Seguro"
                        />
                    </div>

                    {/* Campo Vencimento (DatePicker) */}
                    <div className="space-y-2">
                        <Label htmlFor="vencimento">Data de Vencimento</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className="w-full justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {form.vencimento ? format(form.vencimento, "PPP", { locale: ptBR }) : <span>Selecione a data</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 z-70">
                                <Calendar
                                    mode="single"
                                    selected={form.vencimento || undefined}
                                    onSelect={(date) => handleChange("vencimento", date || null)}
                                    initialFocus
                                    locale={ptBR}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Checkbox Antecipação */}
                    <div className="flex items-center space-x-2 pt-2">
                        <Checkbox
                            id="antecipacao"
                            checked={form.antecipacao}
                            onCheckedChange={(checked) => handleChange("antecipacao", checked)}
                        />
                        <Label htmlFor="antecipacao" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Avisar sobre vencimento?
                        </Label>
                    </div>

                    {/* Campo Dias para Vencimento */}
                    {form.antecipacao && (
                        <div className="space-y-2">
                            <Label htmlFor="dias">Dias de Antecipação</Label>
                            <Input
                                id="dias"
                                type="number"
                                min="1"
                                value={form.dias_para_vencimento || ""}
                                onChange={(e) => handleChange("dias_para_vencimento", Number(e.target.value) || null)}
                                placeholder="Ex: 30"
                            />
                        </div>
                    )}

                    {/* Campo Arquivo */}
                    <div className="space-y-2">
                        <Label htmlFor="arquivo">Arquivo (PDF, Imagem, DOCX) <span className="text-red-500">*</span></Label>
                        <Input
                            id="arquivo"
                            type="file"
                            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                            onChange={handleFileChange}
                        />
                        {form.arquivo && (
                            <p className="text-xs text-green-600">Arquivo selecionado: {form.arquivo.name}</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={onClose} disabled={isSaving} className="cursor-pointer">
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving} className="cursor-pointer">
                        {isSaving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Salvando...
                            </>
                        ) : (
                            "Salvar Documento"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}