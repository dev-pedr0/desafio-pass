import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:3001";
//const BASE_URL = "https://desafio-pass-backend.onrender.com";

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

export function useVehicleForm(vehicle: any) {
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
            documento_veiculo: vehicle.documento_veiculo || [],
            ocorrencia_veiculo: vehicle.ocorrencia_veiculo || [],
            abastecimento_veiculo: vehicle.abastecimento_veiculo || [],
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
        setForm((prev: any) => {
        const newForm = { ...prev, [key]: value };
        if (key === "estado") {
            const match = ESTADOS.find(e => e.nome.toLowerCase() === value.toLowerCase());
            if (match) newForm.uf = match.uf;
        }
        return newForm;
        });
    }

    const refreshImages = async () => {
        if (!form.id) return;
        const res = await fetch(`${BASE_URL}/veiculo?page=1&limit=1&id=${form.id}`);
        const json = await res.json();
        const newVehicle = json.data?.find((v: any) => v.id === form.id);
        if (newVehicle) {
        setForm((prev: any) => ({ ...prev, imagem_veiculo: newVehicle.imagem_veiculo }));
        }
    };

    return {
        form,
        handleChange,
        refreshImages,
        marcas,
        companhias,
        categorias,
        classificacoes,
        combustiveis,
        tiposPlaca,
        BASE_URL,
  };
}