import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VeiculoService {
  constructor(private prisma: PrismaService) {}

  /** Busca um veículo completo pelo ID com todas as relações */
  async findOne(id: number) {
    return this.prisma.veiculo.findUnique({
      where: { id },
      include: {
        marca: true,
        categoria: true,
        classificacao: true,
        combustivel: true,
        companhia: true,
        tipo_placa: true,
        usuario: true,
        documento_veiculo: true,
        imagem_veiculo: true,
        ocorrencia_veiculo: {
          include: {
            tipo_ocorrencia: true,
            seriedade_ocorrencia: true,
          },
        },
        abastecimento_veiculo: {
          include: { combustivel: true },
          orderBy: { data: 'desc' },
        },
      },
    });
  }

  /** Lista veículos com paginação (usado na tabela principal) */
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

  /** Cria um novo veículo (usado no modal de criação) */
  async create(data: any) {
    try {
      const totalVehicles = await this.prisma.veiculo.count();
      const novoId = totalVehicles + 1;

      const cleanData: any = {
        id: novoId,
        identificador: data.identificador?.trim() || null,
        companhia_id: data.companhia_id ? Number(data.companhia_id) : null,
        modelo: data.modelo?.trim() || null,
        ano: data.ano ? Number(data.ano) : null,
        marca_id: data.marca_id ? Number(data.marca_id) : null,
        categoria_id: data.categoria_id ? Number(data.categoria_id) : null,
        classificacao_id: data.classificacao_id ? Number(data.classificacao_id) : null,
        capacidade: data.capacidade ? Number(data.capacidade) : null,
        portais: data.portais ? Number(data.portais) : null,
        estado: data.estado?.trim() || null,
        uf: data.uf?.trim() || null,
        tipo_placa_id: data.tipo_placa_id ? Number(data.tipo_placa_id) : null,
        placa: data.placa?.trim() || null,
        renavam: data.renavam?.trim() || null,
        chassi: data.chassi?.trim() || null,
        revisao_km: data.revisao_km ? Number(data.revisao_km) : null,
        combustivel_id: data.combustivel_id ? Number(data.combustivel_id) : null,
        descricao: data.descricao?.trim() || null,

        usuario_id: 1,
        status: 'pendente' as const,
      };

      // Remove campos nulos/undefined (Prisma não aceita bem)
      Object.keys(cleanData).forEach((key) => {
        if (cleanData[key] === null || cleanData[key] === undefined) {
          delete cleanData[key];
        }
      });

      return await this.prisma.veiculo.create({
        data: cleanData,
        include: {
          marca: true,
          categoria: true,
          classificacao: true,
          combustivel: true,
          companhia: true,
          tipo_placa: true,
          documento_veiculo: true,
          imagem_veiculo: true,
          ocorrencia_veiculo: {
            include: {
              tipo_ocorrencia: true,
              seriedade_ocorrencia: true,
            },
          },
          abastecimento_veiculo: {
            include: { combustivel: true },
            orderBy: { data: 'desc' },
          },
        },
      });
    } catch (error: any) {
      console.error('Erro fatal ao criar veículo:', error);
      throw new Error(`Erro ao criar veículo: ${error.message}`);
    }
  }

  /** Atualiza os dados de um veículo existente */
  async updateVehicle(id: number, data: any) {
    return this.prisma.veiculo.update({
      where: { id },
      data,
    });
  }

/**Funções de busca dos dados auxiliares */
  getCompanhias() {
    return this.prisma.companhia.findMany({ orderBy: { nome: 'asc' } });
  }

  getMarcas() {
    return this.prisma.marca.findMany({ orderBy: { nome: 'asc' } });
  }

  getCategorias() {
    return this.prisma.categoria.findMany({ orderBy: { nome: 'asc' } });
  }

  getClassificacoes() {
    return this.prisma.classificacao.findMany({ orderBy: { nome: 'asc' } });
  }

  getCombustiveis() {
    return this.prisma.combustivel.findMany({ orderBy: { nome: 'asc' } });
  }

  getTiposPlaca() {
    return this.prisma.tipo_placa.findMany({ orderBy: { nome: 'asc' } });
  }

/**Registra uma nova imagem a um veículo */
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

/**Registra um novo documento a um veículo */
  async uploadDocument(veiculoId: number, file: Express.Multer.File, data: any) {
    const arquivoUrl = `/uploads/documentos/${file.filename}`;
    const vencimento = data.vencimento ? new Date(data.vencimento) : null;
    const antecipacao = data.antecipacao === 'true';
    const dias_para_vencimento = data.dias_para_vencimento ? parseInt(data.dias_para_vencimento) : null;

    return this.prisma.documento_veiculo.create({
      data: {
        tipo: data.tipo,
        arquivo: arquivoUrl,
        vencimento,
        antecipacao,
        dias_para_vencimento,
        veiculo: { connect: { id: veiculoId } },
      },
    });
  }

    /**Cria novo registro de ocorrência de veículo */
  async createOccurrence(veiculoId: number, file: Express.Multer.File | undefined, data: any) {
    const anexoUrl = file ? `/uploads/ocorrencias/${file.filename}` : null;

    return this.prisma.ocorrencia_veiculo.create({
      data: {
        veiculo: { connect: { id: veiculoId } },
        data: data.data ? new Date(data.data) : null,
        descricao: data.descricao || null,
        anexo: anexoUrl,
        tipo_ocorrencia: data.classificacao_id
          ? { connect: { id: Number(data.classificacao_id) } }
          : undefined,
        seriedade_ocorrencia: data.seriedade_id
          ? { connect: { id: Number(data.seriedade_id) } }
          : undefined,
      },
      include: {
        tipo_ocorrencia: true,
        seriedade_ocorrencia: true,
      },
    });
  }

  async getTiposOcorrencia() {
    return this.prisma.tipo_ocorrencia.findMany({
      select: { id: true, nome: true },
      orderBy: { nome: 'asc' },
    });
  }

  async getSeriedadesOcorrencia() {
    return this.prisma.seriedade_ocorrencia.findMany({
      select: { id: true, nome: true },
      orderBy: { nome: 'asc' },
    });
  }


  /**Cria novo registro de abastecimento de veículo */
  async createAbastecimento(veiculoId: number, data: any) {
    return this.prisma.abastecimento_veiculo.create({
      data: {
        veiculo: { connect: { id: veiculoId } },
        data: data.data ? new Date(data.data) : null,
        fornecedor: data.fornecedor || null,
        combustivel: data.combustivel_id
          ? { connect: { id: Number(data.combustivel_id) } }
          : undefined,
        litros: data.litros ? parseFloat(data.litros) : null,
        valor: data.valor ? parseFloat(data.valor) : null,
      },
      include: { combustivel: true },
    });
  }
}