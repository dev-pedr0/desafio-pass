import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VeiculoModule } from './veiculo/veiculo.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [VeiculoModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
