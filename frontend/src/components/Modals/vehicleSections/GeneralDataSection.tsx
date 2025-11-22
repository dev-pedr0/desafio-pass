import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
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
    return (
    <div className="grid grid-cols-2 gap-4 bg-card p-4 rounded-md">
      <div className="flex gap-2 items-center col-span-2">
        <CircleAlert className="w-5 h-5" />
        <h3 className="text-base font-semibold">Dados Gerais</h3>
      </div>

      {/* ID */}
      <div>
        <Label className="text-base">ID</Label>
        <Input value={form.id ?? ""} disabled className="border-none border-b rounded-none" />
        <div className="border-t-2"></div>
      </div>

      {/* Criado em */}
      <div>
        <Label className="text-base">Criado em</Label>
        <Input value={form.criado_em ?? ""} disabled className="border-none border-b rounded-none" />
        <div className="border-t-2"></div>
      </div>

      {/* Identificador */}
      <div>
        <Label className="text-base">Identificador</Label>
        <Input
          value={form.identificador ?? ""}
          onChange={(e) => handleChange("identificador", e.target.value)}
          className="border-none border-b rounded-none"
        />
        <div className="border-t-2"></div>
      </div>

      {/* Companhia */}
      <div>
        <Label className="text-base">Companhia</Label>
        <Select
          value={form.companhia_id?.toString() || ""}
          onValueChange={(v) => handleChange("companhia_id", Number(v))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione companhia" />
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

      {/* Status (só leitura) */}
      <div>
        <Label className="text-base">Status</Label>
        <Input
          value={form.status ?? ""}
          disabled
          className={`text-center rounded-full ${
            form.status === "liberado"
              ? "bg-chart-2! text-foreground!"
              : form.status === "pendente"
              ? "bg-chart-3! text-foreground!"
              : "bg-chart-5! text-foreground!"
          }`}
        />
      </div>

      {/* Modelo */}
      <div>
        <Label className="text-base">Modelo</Label>
        <Input
          value={form.modelo ?? ""}
          onChange={(e) => handleChange("modelo", e.target.value)}
          className="border-none border-b rounded-none"
        />
        <div className="border-t-2"></div>
      </div>

      {/* Ano */}
      <div>
        <Label className="text-base">Ano</Label>
        <Input
          value={form.ano ?? ""}
          onChange={(e) => handleChange("ano", e.target.value)}
          className="border-none border-b rounded-none"
        />
        <div className="border-t-2"></div>
      </div>

      {/* Marca */}
      <div>
        <Label className="text-base">Marca</Label>
        <Select
          value={form.marca_id?.toString() || ""}
          onValueChange={(v) => handleChange("marca_id", Number(v))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione marca" />
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

      {/* Categoria */}
      <div>
        <Label className="text-base">Categoria</Label>
        <Select
          value={form.categoria_id?.toString() || ""}
          onValueChange={(v) => handleChange("categoria_id", Number(v))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione categoria" />
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

      {/* Classificação */}
      <div>
        <Label className="text-base">Classificação</Label>
        <Select
          value={form.classificacao_id?.toString() || ""}
          onValueChange={(v) => handleChange("classificacao_id", Number(v))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione classificação" />
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

      {/* Capacidade */}
      <div>
        <Label className="text-base">Capacidade</Label>
        <Input
          type="number"
          value={form.capacidade ?? ""}
          onChange={(e) => handleChange("capacidade", Number(e.target.value) || "")}
          className="border-none border-b rounded-none"
        />
        <div className="border-t-2"></div>
      </div>

      {/* Portas */}
      <div>
        <Label className="text-base">Portas</Label>
        <Input
          type="number"
          value={form.portais ?? ""}
          onChange={(e) => handleChange("portais", Number(e.target.value) || "")}
          className="border-none border-b rounded-none"
        />
        <div className="border-t-2"></div>
      </div>

      {/* Estado */}
      <div>
        <Label className="text-base">Estado</Label>
        <Input
          value={form.estado ?? ""}
          onChange={(e) => handleChange("estado", e.target.value)}
          placeholder="Ex: São Paulo"
          className="border-none border-b rounded-none"
        />
        <div className="border-t-2"></div>
      </div>

      {/* UF (auto-preenchido) */}
      <div>
        <Label className="text-base">UF</Label>
        <Input value={form.uf ?? ""} disabled className="border-none border-b rounded-none" />
        <div className="border-t-2"></div>
      </div>

      {/* Tipo de Placa */}
      <div>
        <Label className="text-base">Tipo de Placa</Label>
        <Select
          value={form.tipo_placa_id?.toString() || ""}
          onValueChange={(v) => handleChange("tipo_placa_id", Number(v))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione tipo" />
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

      {/* Placa */}
      <div>
        <Label className="text-base">Placa</Label>
        <Input
          value={form.placa ?? ""}
          onChange={(e) => handleChange("placa", e.target.value)}
          className="border-none border-b rounded-none"
        />
        <div className="border-t-2"></div>
      </div>

      {/* Renavam */}
      <div>
        <Label className="text-base">Renavam</Label>
        <Input
          value={form.renavam ?? ""}
          onChange={(e) => handleChange("renavam", e.target.value)}
          className="border-none border-b rounded-none"
        />
        <div className="border-t-2"></div>
      </div>

      {/* Chassi */}
      <div>
        <Label className="text-base">Chassi</Label>
        <Input
          value={form.chassi ?? ""}
          onChange={(e) => handleChange("chassi", e.target.value)}
          className="border-none border-b rounded-none"
        />
        <div className="border-t-2"></div>
      </div>

      {/* Revisão KM */}
      <div>
        <Label className="text-base">Revisão (Km)</Label>
        <Input
          type="number"
          value={form.revisao_km ?? ""}
          onChange={(e) => handleChange("revisao_km", Number(e.target.value) || "")}
          className="border-none border-b rounded-none"
        />
        <div className="border-t-2"></div>
      </div>

      {/* Combustível */}
      <div className="text-base">
        <Label>Combustível</Label>
        <Select
          value={form.combustivel_id?.toString() || ""}
          onValueChange={(v) => handleChange("combustivel_id", Number(v))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione combustível" />
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
  );
}