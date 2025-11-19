import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VeiculoService {
    constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.veiculo.findMany({
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
      orderBy: {
        id: 'asc',
      },
    });
  }

  async listarNomes() {
    return this.prisma.veiculo.findMany({
      select: { modelo: true },
    });
  }
}
