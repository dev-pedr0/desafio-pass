import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CircleAlert } from "lucide-react";

interface Props {
  form: any;
  handleChange: (key: string, value: any) => void;
  marcas: any[];
  companhias: any[];
  categorias: any[];
  classificacoes: any[];
  combustiveis: any[];
  tiposPlaca: any[];
}

export function GeneralDataSection({
  form,
  handleChange,
  marcas,
  companhias,
  categorias,
  classificacoes,
  combustiveis,
  tiposPlaca,
}: Props) {

  const getStatusVariant = () => {
    switch (form.status?.toLowerCase()) {
      case "liberado":
        return "bg-emerald-500/10 text-emerald-700 border-emerald-300";
      case "pendente":
        return "bg-amber-500/10 text-amber-700 border-amber-300";
      case "bloqueado":
      case "inativo":
        return "bg-red-500/10 text-red-700 border-red-300";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

return (
    <div>
      {/* Cabeçalho da seção */}
      <div className="flex items-center gap-3 border-b pb-4 mb-4">
        <CircleAlert className="w-6 h-6 text-primary" />
        <h3 className="text-2xl font-bold">Dados Gerais</h3>
      </div>

      {/* Informações Básicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-sm font-medium text-muted-foreground">ID do Veículo</Label>
          <Input value={form.id ?? "-"} disabled className="mt-1 bg-muted/50" />
        </div>
        <div>
          <Label className="text-sm font-medium text-muted-foreground">Criado em</Label>
          <Input value={form.criado_em ?? "-"} disabled className="mt-1 bg-muted/50" />
        </div>
      </div>

      <Separator className="my-10" />

      {/* Identificação */}
      <div className="space-y-2">
        <h4 className="font-semibold text-lg">Identificação</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Identificador</Label>
            <Input
              value={form.identificador ?? ""}
              onChange={(e) => handleChange("identificador", e.target.value)}
              placeholder="Ex: Ônibus 001"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Companhia</Label>
            <Select
              value={form.companhia_id?.toString() || ""}
              onValueChange={(v) => handleChange("companhia_id", Number(v))}
            >
              <SelectTrigger className="mt-1 w-full h-11">
                <SelectValue placeholder="Selecione a companhia" />
              </SelectTrigger>
              <SelectContent>
                {companhias.map((c) => (
                  <SelectItem key={c.id} value={c.id.toString()}>
                    {c.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Status</Label>
            <div className="mt-1">
              <Badge variant="outline" className={`font-medium px-4 py-1 text-base w-full ${getStatusVariant()}`}>
                {form.status || "Indefinido"}
              </Badge>
            </div>
          </div>
          <div>
            <Label>Modelo</Label>
            <Input
              value={form.modelo ?? ""}
              onChange={(e) => handleChange("modelo", e.target.value)}
              placeholder="Ex: Marcopolo Paradiso"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <Separator className="my-10" />

      {/* Características do Veículo */}
      <div className="space-y-6">
        <h4 className="font-semibold text-lg">Características do Veículo</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label>Ano</Label>
            <Input
              type="number"
              value={form.ano ?? ""}
              onChange={(e) => handleChange("ano", e.target.value)}
              placeholder="2024"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Marca</Label>
            <Select
              value={form.marca_id?.toString() || ""}
              onValueChange={(v) => handleChange("marca_id", Number(v))}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Selecione a marca" />
              </SelectTrigger>
              <SelectContent>
                {marcas.map((m) => (
                  <SelectItem key={m.id} value={m.id.toString()}>
                    {m.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Categoria</Label>
            <Select
              value={form.categoria_id?.toString() || ""}
              onValueChange={(v) => handleChange("categoria_id", Number(v))}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((c) => (
                  <SelectItem key={c.id} value={c.id.toString()}>
                    {c.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Classificação</Label>
            <Select
              value={form.classificacao_id?.toString() || ""}
              onValueChange={(v) => handleChange("classificacao_id", Number(v))}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Selecione a classificação" />
              </SelectTrigger>
              <SelectContent>
                {classificacoes.map((c) => (
                  <SelectItem key={c.id} value={c.id.toString()}>
                    {c.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Capacidade</Label>
            <Input
              type="number"
              value={form.capacidade ?? ""}
              onChange={(e) => handleChange("capacidade", Number(e.target.value) || "")}
              placeholder="44"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Portas</Label>
            <Input
              type="number"
              value={form.portais ?? ""}
              onChange={(e) => handleChange("portais", Number(e.target.value) || "")}
              placeholder="2"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <Separator className="my-10" />

      {/* Placa e Documentação */}
      <div className="space-y-6">
        <h4 className="font-semibold text-lg">Placa e Documentação</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Estado</Label>
            <Input
              value={form.estado ?? ""}
              onChange={(e) => handleChange("estado", e.target.value)}
              placeholder="São Paulo"
              className="mt-1"
            />
          </div>
          <div>
            <Label>UF</Label>
            <Input value={form.uf ?? ""} disabled className="mt-1 bg-muted/50" />
          </div>
          <div>
            <Label>Tipo de Placa</Label>
            <Select
              value={form.tipo_placa_id?.toString() || ""}
              onValueChange={(v) => handleChange("tipo_placa_id", Number(v))}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {tiposPlaca.map((t) => (
                  <SelectItem key={t.id} value={t.id.toString()}>
                    {t.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Placa</Label>
            <Input
              value={form.placa ?? ""}
              onChange={(e) => handleChange("placa", e.target.value.toUpperCase())}
              placeholder="ABC-1234"
              className="mt-1 font-mono"
            />
          </div>
          <div>
            <Label>Renavam</Label>
            <Input
              value={form.renavam ?? ""}
              onChange={(e) => handleChange("renavam", e.target.value)}
              placeholder="12345678901"
              className="mt-1 font-mono"
            />
          </div>
          <div>
            <Label>Chassi</Label>
            <Input
              value={form.chassi ?? ""}
              onChange={(e) => handleChange("chassi", e.target.value.toUpperCase())}
              placeholder="9BWZZZ377VT004251"
              className="mt-1 font-mono"
            />
          </div>
        </div>
      </div>

      <Separator className="my-10" />

      {/* Manutenção e Combustível */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Revisão (KM)</Label>
          <Input
            type="number"
            value={form.revisao_km ?? ""}
            onChange={(e) => handleChange("revisao_km", Number(e.target.value) || "")}
            placeholder="10000"
            className="mt-1"
          />
        </div>
        <div>
          <Label>Combustível</Label>
          <Select
            value={form.combustivel_id?.toString() || ""}
            onValueChange={(v) => handleChange("combustivel_id", Number(v))}
          >
            <SelectTrigger className="mt-1 w-full">
              <SelectValue placeholder="Selecione o combustível" />
            </SelectTrigger>
            <SelectContent>
              {combustiveis.map((c) => (
                <SelectItem key={c.id} value={c.id.toString()}>
                  {c.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}