import { SERVER_URL } from "@/url";
import { Aperture, Trash2 } from "lucide-react";

const BASE_URL = SERVER_URL;

interface ImagesSectionProps {
  form: any;
  refreshImages: () => Promise<void>;
}

export function ImagesSection({ form, refreshImages }: ImagesSectionProps) {
  
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length || !form.id) return;

    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

    try {
      await fetch(`${BASE_URL}/veiculo/${form.id}/imagens`, {
        method: "POST",
        body: formData,
      });
      await refreshImages();
    } catch (err) {
      console.error("Erro ao enviar imagens", err);
    }
  };

  const handleDeleteAll = async () => {
    if (!form.id) return;

    try {
      await fetch(`${BASE_URL}/veiculo/${form.id}/imagens`, {
        method: "DELETE",
      });
      await refreshImages();
    } catch (err) {
      console.error("Erro ao deletar imagens", err);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-card p-4 rounded-md">
      <div className="flex items-center gap-2">
        <Aperture className="w-5 h-5" />
        <h3 className="text-base font-semibold">Imagens do Veículo</h3>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        {/* Botão de upload */}
        <label className="flex flex-col items-center justify-center gap-3 px-6 py-8 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition">
          <Aperture className="w-10 h-10" />
          <span className="text-sm font-medium">Enviar Imagens</span>
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} />
        </label>

        {/* Galeria de imagens */}
        <div className="flex flex-wrap gap-3">
          {form.imagem_veiculo?.length > 0 ? (
            form.imagem_veiculo.map((img: any) => (
              <img
                key={img.id}
                src={`${BASE_URL}${img.url}`}
                alt="Veículo"
                className="w-28 h-28 object-cover rounded-md border shadow-sm"
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground italic self-center">
              Nenhuma imagem enviada
            </p>
          )}
        </div>
      </div>

      {/* Botão de excluir todas */}
      {form.imagem_veiculo?.length > 0 && (
        <button
          onClick={handleDeleteAll}
          className="cursor-pointer flex items-center gap-2 text-sm text-red-600 hover:text-red-700 hover:underline self-start"
        >
          <Trash2 className="w-4 h-4" />
          Excluir todas as imagens
        </button>
      )}
    </div>
  );
}