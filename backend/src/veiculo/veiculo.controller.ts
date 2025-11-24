import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('veiculo')
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  /** Lista todos os veículos com paginação */
  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.veiculoService.findAll(Number(page), Number(limit));
  }

  /** Busca um veículo específico pelo ID */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.veiculoService.findOne(Number(id));
  }

  /** Busca dados auxiliares*/
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

  /** Busca tipos e severidade de ocorrência */
  @Get('ocorrencia/tipos')
  async getTiposOcorrencia() {
    return this.veiculoService.getTiposOcorrencia();
  }

  @Get('ocorrencia/seriedades')
  async getSeriedadesOcorrencia() {
    return this.veiculoService.getSeriedadesOcorrencia();
  }

  /** Cria um novo veículo */
  @Post()
  async create(@Body() createVeiculoDto: any) {
    return this.veiculoService.create(createVeiculoDto);
  }

  /** Atualiza os dados de um veículo existente */
  @Put(':id')
  updateVehicle(@Param('id') id: string, @Body() data: any) {
    return this.veiculoService.updateVehicle(Number(id), data);
  }

  /** Upload de até 10 imagens para um veículo */
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
    }),
  )
  uploadImages(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.veiculoService.uploadImages(Number(id), files);
  }

  /** Remove todas as imagens de um veículo */
  @Delete(':id/imagens')
  deleteAllImages(@Param('id') id: string) {
    return this.veiculoService.deleteAllImages(Number(id));
  }

  /** Upload de um documento (com metadados no body) */
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
    }),
  )
  uploadDocument(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: any,
  ) {
    return this.veiculoService.uploadDocument(Number(id), file, data);
  }

  /** Cria uma nova ocorrência (com anexo opcional) */
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

  /** Registra um novo abastecimento */
  @Post(':id/abastecimentos')
  async createAbastecimento(
    @Param('id', ParseIntPipe) veiculoId: number,
    @Body() data: any,
  ) {
    return this.veiculoService.createAbastecimento(veiculoId, data);
  }
}