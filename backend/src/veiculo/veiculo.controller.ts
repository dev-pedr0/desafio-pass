import { Controller, Get } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';

@Controller('veiculo')
export class VeiculoController {
    constructor(private readonly veiculoService: VeiculoService) {}

    @Get()
    findAll() {
        return this.veiculoService.findAll();
    }
}
