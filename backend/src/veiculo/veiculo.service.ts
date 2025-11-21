import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VeiculoService {
  constructor(private prisma: PrismaService) {}

async findAll(page: number, limit: number) {
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.prisma.veiculo.findMany({
                skip,
                take: limit,
                include: {
                  marca: true,
                  categoria: true,
                  classificacao: true,
                  combustivel: true,
                  companhia: true,
                  tipo_placa: true,
                  usuario: true,
                  abastecimento_veiculo: true,
                  documento_veiculo: true,
                  imagem_veiculo: true,
                  ocorrencia_veiculo: true,
                },
            }),
            this.prisma.veiculo.count(),
        ]);

        return {
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        };
    }

    getCompanhias() {
        return this.prisma.companhia.findMany({
            orderBy: { nome: 'asc' }
        });
    }

    getMarcas() {
        return this.prisma.marca.findMany({
            orderBy: { nome: 'asc' }
        });
    }

    getCategorias() {
        return this.prisma.categoria.findMany({
            orderBy: { nome: 'asc' }
        });
    }

    getClassificacoes() {
        return this.prisma.classificacao.findMany({
            orderBy: { nome: 'asc' }
        });
    }

    getCombustiveis() {
        return this.prisma.combustivel.findMany({
            orderBy: { nome: 'asc' }
        });
    }

    getTiposPlaca() {
        return this.prisma.tipo_placa.findMany({
            orderBy: { nome: 'asc' }
        });
    }

    async updateVehicle(id: number, data: any) {
        return this.prisma.veiculo.update({
            where: { id },
            data,
        });
    }

    async uploadImages(veiculoId: number, files: Express.Multer.File[]) {
        const imagensCriadas: { id: number; url: string; veiculo_id: number; criado_em: Date }[] = [];

        for (const file of files) {
            const img = await this.prisma.imagem_veiculo.create({
            data: {
                veiculo_id: veiculoId,
                url: `/uploads/${file.filename}`,
            },
            });

            imagensCriadas.push(img);
        }

        return imagensCriadas;
        }

    async deleteAllImages(veiculoId: number) {
        await this.prisma.imagem_veiculo.deleteMany({
            where: { veiculo_id: veiculoId },
        });

        return { success: true };
    }
}
