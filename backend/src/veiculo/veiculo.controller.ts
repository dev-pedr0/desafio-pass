import { Controller, Get, Query } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';

@Controller('veiculo')
export class VeiculoController {
    constructor(private readonly veiculoService: VeiculoService) {}

    @Get()
    findAll(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
    ) {
        return this.veiculoService.findAll(Number(page), Number(limit));
    }
}
