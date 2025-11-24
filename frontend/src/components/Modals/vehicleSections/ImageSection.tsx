import { SERVER_URL } from "@/url";
import { Aperture, MousePointerClick, Trash2, Upload } from "lucide-react";
import { useState } from "react";

const BASE_URL = SERVER_URL;

interface ImagesSectionProps {
  form: any;
  refreshImages: () => Promise<void>;
}

export function ImagesSection({ form, refreshImages }: ImagesSectionProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = async (files: FileList | null) => {
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
    if (!form.id || !window.confirm("Tem certeza que deseja excluir TODAS as imagens?")) return;

    try {
      await fetch(`${BASE_URL}/veiculo/${form.id}/imagens`, {
        method: "DELETE",
      });
      await refreshImages();
    } catch (err) {
      console.error("Erro ao deletar imagens", err);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleUpload(e.dataTransfer.files);
  };

  return (
    <div className="flex flex-col gap-8">

      <div className="flex items-center gap-3 border-b pb-5 -mx-8 px-8 bg-background/80 backdrop-blur-sm">
        <Aperture className="w-6 h-6 text-primary" />
        <h3 className="text-2xl font-bold tracking-tight">Imagens do Veículo</h3>
      </div>

      <div className="px-8">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border bg-muted/30 hover:bg-muted/50"
          }`}
        >
          <label className="cursor-pointer block">
            <div className="flex flex-col items-center gap-4">
              <div className="p-5 bg-primary/10 rounded-full">
                <Upload className="w-12 h-12 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">
                  Arraste imagens aqui ou clique para selecionar
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Suporta múltiplas imagens (JPG, PNG, WebP)
                </p>
              </div>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleUpload(e.target.files)}
            />
          </label>
        </div>
      </div>

      {/* Galeria de Imagens */}
      <div className="px-8">
        {form.imagem_veiculo?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {form.imagem_veiculo.map((img: any) => (
              <div
                key={img.id}
                className="group relative aspect-square rounded-lg overflow-hidden border bg-muted shadow-sm hover:shadow-lg transition-all duration-200"
              >
                <img
                  src={`${BASE_URL}${img.url}`}
                  alt="Veículo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <a
                    href={`${BASE_URL}${img.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition"
                  >
                    <MousePointerClick className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-4">
              <Aperture className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-lg text-muted-foreground">Nenhuma imagem enviada ainda</p>
            <p className="text-sm text-muted-foreground/80 mt-2">
              Adicione fotos do veículo (frente, traseira, interior, detalhes, etc.)
            </p>
          </div>
        )}
      </div>

      {/* Botão Excluir Todas */}
      {form.imagem_veiculo?.length > 0 && (
        <div className="px-8 pb-6">
          <button
            onClick={handleDeleteAll}
            className="cursor-pointer flex items-center gap-2.5 px-5 py-3 bg-red-500/10 text-red-600 hover:bg-red-500/20 rounded-lg font-medium text-sm transition-all duration-200 border border-red-500/20"
          >
            <Trash2 className="w-4.5 h-4.5" />
            Excluir todas as imagens ({form.imagem_veiculo.length})
          </button>
        </div>
      )}
    </div>
  );
}