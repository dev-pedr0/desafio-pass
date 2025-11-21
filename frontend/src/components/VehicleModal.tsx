"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Aperture, CircleAlert, FileText, ImagePlus, NotebookText, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface VehicleModalProps {
    open: boolean;
    onClose: () => void;
    vehicle: any;
}

const ESTADOS = [
  { nome: "Acre", uf: "AC" },
  { nome: "Alagoas", uf: "AL" },
  { nome: "Amapá", uf: "AP" },
  { nome: "Amazonas", uf: "AM" },
  { nome: "Bahia", uf: "BA" },
  { nome: "Ceará", uf: "CE" },
  { nome: "Distrito Federal", uf: "DF" },
  { nome: "Espírito Santo", uf: "ES" },
  { nome: "Goiás", uf: "GO" },
  { nome: "Maranhão", uf: "MA" },
  { nome: "Mato Grosso", uf: "MT" },
  { nome: "Mato Grosso do Sul", uf: "MS" },
  { nome: "Minas Gerais", uf: "MG" },
  { nome: "Pará", uf: "PA" },
  { nome: "Paraíba", uf: "PB" },
  { nome: "Paraná", uf: "PR" },
  { nome: "Pernambuco", uf: "PE" },
  { nome: "Piauí", uf: "PI" },
  { nome: "Rio de Janeiro", uf: "RJ" },
  { nome: "Rio Grande do Norte", uf: "RN" },
  { nome: "Rio Grande do Sul", uf: "RS" },
  { nome: "Rondônia", uf: "RO" },
  { nome: "Roraima", uf: "RR" },
  { nome: "Santa Catarina", uf: "SC" },
  { nome: "São Paulo", uf: "SP" },
  { nome: "Sergipe", uf: "SE" },
  { nome: "Tocantins", uf: "TO" },
];

//const BASE_URL = "http://localhost:3001";
const BASE_URL = "https://desafio-pass-backend.onrender.com";

export function VehicleModal({ open, onClose, vehicle }: VehicleModalProps) {
    const [form, setForm] = useState<any>({});
    const [marcas, setMarcas] = useState<any[]>([]);
    const [companhias, setCompanhias] = useState<any[]>([]);
    const [categorias, setCategorias] = useState<any[]>([]);
    const [classificacoes, setClassificacoes] = useState<any[]>([]);
    const [combustiveis, setCombustiveis] = useState<any[]>([]);
    const [tiposPlaca, setTiposPlaca] = useState<any[]>([]);

    useEffect(() => {
        if (!vehicle) return;

        const formatDate = (iso: string) => {
            const d = new Date(iso);
            const day = String(d.getDate()).padStart(2, "0");
            const month = String(d.getMonth() + 1).padStart(2, "0"); // meses começam do 0
            const year = String(d.getFullYear()).slice(-2);
            const hours = String(d.getHours()).padStart(2, "0");
            const minutes = String(d.getMinutes()).padStart(2, "0");
            const seconds = String(d.getSeconds()).padStart(2, "0");
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        };

        setForm({
            id: vehicle.id,
            criado_em: vehicle.criado_em ? formatDate(vehicle.criado_em) : "",
            identificador: vehicle.identificador || "",
            companhia_id: vehicle.companhia?.id || null,
            status: vehicle.status,
            modelo: vehicle.modelo || "",
            ano: vehicle.ano || "",
            marca_id: vehicle.marca?.id || null,
            categoria_id: vehicle.categoria?.id || null,
            classificacao_id: vehicle.classificacao?.id || null,
            capacidade: vehicle.capacidade || "",
            portais: vehicle.portais || "",
            estado: vehicle.estado || "",
            uf: vehicle.uf || "",
            tipo_placa_id: vehicle.tipo_placa?.id || null,
            placa: vehicle.placa || "",
            renavam: vehicle.renavam || "",
            chassi: vehicle.chassi || "",
            revisao_km: vehicle.revisao_km || "",
            combustivel_id: vehicle.combustivel?.id || null,
            descricao: vehicle.descricao ?? "",
            imagem_veiculo: vehicle.imagem_veiculo || [],
        });
    }, [vehicle]);

    useEffect(() => {
        const loaders = [
            { url: `${BASE_URL}/veiculo/marcas`, setter: setMarcas },
            { url: `${BASE_URL}/veiculo/companias`, setter: setCompanhias },
            { url: `${BASE_URL}/veiculo/categorias`, setter: setCategorias },
            { url: `${BASE_URL}/veiculo/classificacoes`, setter: setClassificacoes },
            { url: `${BASE_URL}/veiculo/combustiveis`, setter: setCombustiveis },
            { url: `${BASE_URL}/veiculo/tipos-placa`, setter: setTiposPlaca },
        ];

        loaders.forEach(async ({ url, setter }) => {
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`Erro ao buscar dados de ${url}`);
                const data = await res.json();
                setter(data);
            } catch (err) {
                console.error(err);
                setter([]);
            }
        });
    }, []);

    function handleChange(key: string, value: any) {
        setForm((prev: any) => ({ ...prev, [key]: value }));
        if (key === "estado") {
            const match = ESTADOS.find(e => e.nome.toLowerCase() === value.toLowerCase());
            if (match) setForm((prev: any) => ({ ...prev, uf: match.uf }));
        }
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className=" flex flex-col gap-2 bg-background p-6 rounded-lg shadow-lg w-[700px] max-h-[90vh] overflow-auto border">
                
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Editar Veículo</h2>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onClose}>Fechar</Button>
                        <Button variant="default">Salvar</Button>
                    </div>
                </div>
                

                <div className="grid grid-cols-2 gap-4 bg-card p-2 rounded-md">
                    <div className="flex gap-1 items-center">
                        <CircleAlert className="w-4 h-4"/>
                        <h3 className="text-base font-semibold">Dados Gerais</h3>
                    </div>
                    <div></div>

                    {/* ok */}
                    <div>
                        <Label className="text-md mb-2">ID</Label>
                        <Input value={form.id ?? ""} disabled className="border-none rounded-none border-b"/>
                        <div className="border-t-2"></div>
                    </div>
                    {/* ok */}
                    <div>
                        <Label className="text-md mb-2">Criado em</Label>
                        <Input value={form.criado_em} disabled className="border-none rounded-none border-b"/>
                        <div className="border-t-2"></div>
                    </div>
                    {/* ok */}
                    <div>
                        <Label className="text-md mb-2">Identificador</Label>
                        <Input value={form.identificador} onChange={(e) => handleChange("identificador", e.target.value)} className="border-none rounded-none border-b"/>
                        <div className="border-t-2"></div>
                    </div>
                    {/* ok */}
                    <div>
                        <Label className="text-md mb-2">Companhia</Label>
                        <Select
                            value={form.companhia_id?.toString() || ""}
                            onValueChange={(v) => handleChange("companhia_id", Number(v))} 
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione companhia" />
                            </SelectTrigger>
                            <SelectContent>
                                {companhias.map(c => (
                                <SelectItem key={c.id} value={c.id.toString()}>
                                    {c.nome}
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {/* ok */}
                    <div>
                        <Label className="text-md mb-2">Status</Label>
                        <Input 
                            value={form.status} 
                            disabled 
                            className={`px-2 py-1 text-lg! rounded-full text-center ${
                                form.status === "liberado"
                                ? "bg-chart-2! text-foreground!"
                                : form.status === "pendente"
                                ? "bg-chart-3! text-foreground!"
                                : "bg-chart-5! text-foreground!"
                            }`}
                        />
                    </div>
                    {/* ok */}
                    <div>
                        <Label className="text-md mb-2">Modelo</Label>
                        <Input value={form.modelo} onChange={(e) => handleChange("modelo", e.target.value)} className="border-none rounded-none border-b"/>
                        <div className="border-t-2"></div>
                    </div>
                    {/* ok */}
                    <div>
                        <Label className="text-md mb-2">Ano</Label>
                        <Input value={form.ano} onChange={(e) => handleChange("ano", e.target.value)} className="border-none rounded-none border-b"/>
                        <div className="border-t-2"></div>
                    </div>
                    {/* ok */}
                    <div>
                        <Label className="text-md mb-2">Marca</Label>
                        <Select
                            value={form.marca_id?.toString() || ""}
                            onValueChange={(v) => handleChange("marca_id", Number(v))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione marca" />
                            </SelectTrigger>
                            <SelectContent>
                                {marcas.map(m => (
                                <SelectItem key={m.id} value={m.id.toString()}>
                                    {m.nome}
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {/* ok */}
                    <div>
                        <Label className="text-md mb-2">Categoria</Label>
                        <Select
                            value={form.categoria_id?.toString() || ""}
                            onValueChange={(v) => handleChange("categoria_id", Number(v))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                {categorias.map(c => (
                                <SelectItem key={c.id} value={c.id.toString()}>
                                    {c.nome}
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {/* ok */}
                    <div>
                        <Label className="text-md mb-2">Classificação</Label>
                        <Select
                            value={form.classificacao_id?.toString() || ""}
                            onValueChange={(v) => handleChange("classificacao_id", Number(v))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione classificação" />
                            </SelectTrigger>
                            <SelectContent>
                                {classificacoes.map(c => (
                                <SelectItem key={c.id} value={c.id.toString()}>
                                    {c.nome}
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {/* ok */}
                    <div>
                        <Label className="text-md mb-2">Capacidade</Label>
                        <Input type="number" value={form.capacidade} onChange={(e) => handleChange("capacidade", Number(e.target.value))} className="border-none rounded-none border-b"/>
                        <div className="border-t-2"></div>
                    </div>
                    {/* ok */}
                    <div>
                        <Label className="text-md mb-2">Portas</Label>
                        <Input type="number" value={form.portais} onChange={(e) => handleChange("portais", Number(e.target.value))} className="border-none rounded-none border-b"/>
                        <div className="border-t-2"></div>
                    </div>
                    {/* ok */}
                    <div>
                        <Label className="text-md mb-2">Buscar estado</Label>
                        <Input value={form.estado} onChange={(e) => handleChange("estado", e.target.value)} className="border-none rounded-none border-b"/>
                        <div className="border-t-2"></div>
                    </div>
                    {/* ok */}
                    <div>
                        <Label className="text-md mb-2">UF</Label>
                        <Input value={form.uf} disabled className="border-none rounded-none border-b"/>
                        <div className="border-t-2"></div>
                    </div>
                    {/* ok */}
                    <div>
                        <Label className="text-md mb-2">Tipo de Placa</Label>
                        <Select
                            value={form.tipo_placa_id?.toString() || ""}
                            onValueChange={(v) => handleChange("tipo_placa_id", Number(v))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione tipo de placa" />
                            </SelectTrigger>
                            <SelectContent>
                                {tiposPlaca.map(t => (
                                <SelectItem key={t.id} value={t.id.toString()}>
                                    {t.nome}
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {/* ok */}
                    <div>
                        <Label className="text-md mb-2">Placa</Label>
                        <Input value={form.placa} onChange={(e) => handleChange("placa", e.target.value)} className="border-none rounded-none border-b"/>
                        <div className="border-t-2"></div>
                    </div>
                    {/* ok */}
                    <div>
                        <Label className="text-md mb-2">Renavan</Label>
                        <Input value={form.renavam} onChange={(e) => handleChange("renavam", e.target.value)} className="border-none rounded-none border-b"/>
                        <div className="border-t-2"></div>
                    </div>
                    {/* ok */}
                    <div>
                        <Label className="text-md mb-2">Chassi</Label>
                        <Input value={form.chassi} onChange={(e) => handleChange("chassi", e.target.value)} className="border-none rounded-none border-b"/>
                        <div className="border-t-2"></div>
                    </div>
                    {/* ok */}
                    <div>
                        <Label className="text-md mb-2">Revisão (Km)</Label>
                        <Input type="number" value={form.revisao_km} onChange={(e) => handleChange("revisao_km", Number(e.target.value))} className="border-none rounded-none border-b"/>
                        <div className="border-t-2"></div>
                    </div>

                    <div>
                        <Label className="text-md mb-2">Combustível</Label>
                        <Select
                            value={form.combustivel_id?.toString() || ""}
                            onValueChange={(v) => handleChange("combustivel_id", Number(v))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione combustível" />
                            </SelectTrigger>
                            <SelectContent>
                                {combustiveis.map(c => (
                                <SelectItem key={c.id} value={c.id.toString()}>
                                    {c.nome}
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>                    
                </div>

                <div className="flex flex-col gap-2 bg-card p-2 rounded-md">
                    <div className="flex gap-1 items-center">
                        <NotebookText className="w-4 h-4"/>
                        <h3 className="text-base font-semibold">Descrição</h3>
                    </div>
                    <Textarea
                        placeholder="Insira detalhes adicionais do veículo..."
                        className="w-full min-h-[120px] mt-1"
                        value={form.descricao || ""}
                        onChange={(e) => handleChange("descricao", e.target.value)}
                    />
                </div>

                <div className="gap-2 bg-card p-2 rounded-md">
                    <div className="flex gap-1 items-center">
                        <ImagePlus className="w-4 h-4"/>
                        <h3 className="text-base font-semibold">Imagens do Veículos</h3>
                    </div>
                    <div className="mt-4 flex gap-3">
                        <label className="flex flex-col justify-center cursor-pointer px-3 py-2 bg-primary text-primary-foreground rounded-md w-fit">
                            <div className="flex flex-col items-center gap-4">
                                <Aperture className="w-8 h-8"/>
                                Envie Arquivos
                            </div>
                            <input
                                type="file"
                                multiple
                                className="hidden"
                                onChange={async (e) => {
                                    const files = e.target.files;
                                    if (!files?.length) return;

                                    const formData = new FormData();
                                    for (const f of files) formData.append("files", f);

                                    await fetch(`${BASE_URL}/veiculo/${form.id}/imagens`, {
                                        method: "POST",
                                        body: formData,
                                    });

                                    const updated = await fetch(`${BASE_URL}/veiculo?page=1&limit=1&id=${form.id}`);
                                    const json = await updated.json();
                                    const newVehicle = json.data?.find((v: any) => v.id === form.id);

                                    if (newVehicle) {
                                        setForm((prev: any) => ({
                                            ...prev,
                                            imagem_veiculo: newVehicle.imagem_veiculo
                                        }));
                                    }
                                }}
                            />
                        </label>

                        <div className="flex gap-2 flex-wrap mt-3">
                            {form.imagem_veiculo?.length > 0 ? (
                                form.imagem_veiculo.map((img: any) => (
                                    <img
                                        key={img.id}
                                        src={`${BASE_URL}${img.url}`}
                                        className="w-24 h-24 object-cover rounded-md border shadow-sm mb-4"
                                    />
                                ))
                            ) : (
                                <p className="text-xs text-muted-foreground italic">
                                    Nenhuma imagem enviada
                                </p>
                            )}
                        </div>  
                    </div>
                    {form.imagem_veiculo?.length > 0 && (
                        <button
                            onClick={async () => {
                                await fetch(`${BASE_URL}/veiculo/${form.id}/imagens`, {
                                    method: "DELETE"
                                });

                                setForm((prev: any) => ({
                                    ...prev,
                                    imagem_veiculo: []
                                }));
                            }}
                            className="mt-3 text-sm text-red-600 hover:underline flex gap-1 items-center cursor-pointer"
                        >
                            <Trash2 className="w-4 h-4" />
                            Excluir todas as imagens
                        </button>
                    )}
                </div>

                <div className="gap-2 bg-card p-2 rounded-md">
                    <div className="flex gap-1 items-center">
                        <FileText className="w-4 h-4"/>
                        <h3 className="text-base font-semibold">Documentação</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
