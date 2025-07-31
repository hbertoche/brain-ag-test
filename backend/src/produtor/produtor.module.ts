import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutorService } from './produtor.service';
import { ProdutorController } from './produtor.controller';
import { Produtor } from './produtor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produtor])],
  providers: [ProdutorService],
  controllers: [ProdutorController],
})
export class ProdutorModule {}
