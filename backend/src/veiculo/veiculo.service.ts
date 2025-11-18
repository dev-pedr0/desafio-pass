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
        combustivel: true,
      },
    });
  }

  async listarNomes() {
    return this.prisma.veiculo.findMany({
      select: { modelo: true },
    });
  }
}
