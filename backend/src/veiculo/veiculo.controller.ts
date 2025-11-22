import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.veiculoService.findOne(Number(id));
    }

    @Get('ocorrencia/tipos')
    async getTiposOcorrencia() {
        return this.veiculoService.getTiposOcorrencia();
    }

    @Get('ocorrencia/seriedades')
    async getSeriedadesOcorrencia() {
        return this.veiculoService.getSeriedadesOcorrencia();
    }

    @Put(':id')
    updateVehicle(
        @Param('id') id: string,
        @Body() data: any
    ) {
        return this.veiculoService.updateVehicle(Number(id), data);
    }

    @Post(':id/imagens')
    @UseInterceptors(
    FilesInterceptor('files', 10, {
        storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
            const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, unique + ext);
        },
        }),
    })
    )
    uploadImages(
        @Param('id') id: string,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        return this.veiculoService.uploadImages(Number(id), files);
    }
    @Delete(':id/imagens')
        deleteAllImages(@Param('id') id: string) {
        return this.veiculoService.deleteAllImages(Number(id));
    }

    @Post(':id/documentos')
    @UseInterceptors(
        FileInterceptor('arquivo', {
            storage: diskStorage({
                destination: './uploads/documentos',
                filename: (_, file, cb) => {
                    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    cb(null, unique + ext);
                },
            }),
        })
    )
    uploadDocument(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File,
        @Body() data: any,
    ) {
        return this.veiculoService.uploadDocument(Number(id), file, data);
    }

    @Post(':id/ocorrencias')
    @UseInterceptors(
    FileInterceptor('anexo', {
        storage: diskStorage({
        destination: './uploads/ocorrencias',
        filename: (_, file, cb) => {
            const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, unique + extname(file.originalname));
        },
        }),
        fileFilter: (_, file, cb) => {
        const allowed = ['.pdf', '.png', '.jpg', '.jpeg', '.doc', '.docx'];
        if (allowed.includes(extname(file.originalname).toLowerCase())) {
            cb(null, true);
        } else {
            cb(new Error('Formato de arquivo não permitido'), false);
        }
        },
    }),
    )
    async createOccurrence(
    @Param('id', ParseIntPipe) veiculoId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: any,
    ) {
        return this.veiculoService.createOccurrence(veiculoId, file, data);                         
    }
}
