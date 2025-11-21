import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
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

     @Get('companias')
    getCompanhias() {
        return this.veiculoService.getCompanhias();
    }

    @Get('marcas')
    getMarcas() {
        return this.veiculoService.getMarcas();
    }

    @Get('categorias')
    getCategorias() {
        return this.veiculoService.getCategorias();
    }

    @Get('classificacoes')
    getClassificacoes() {
        return this.veiculoService.getClassificacoes();
    }

    @Get('combustiveis')
    getCombustiveis() {
        return this.veiculoService.getCombustiveis();
    }

    @Get('tipos-placa')
    getTiposPlaca() {
        return this.veiculoService.getTiposPlaca();
    }

    @Patch(':id')
    updateVehicle(
        @Param('id') id: string,
        @Body() data: any
    ) {
        return this.veiculoService.updateVehicle(Number(id), data);
    }
}
