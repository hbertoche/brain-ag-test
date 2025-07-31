import { Controller, Get, Post, Body, Param, Patch, Delete, Put } from '@nestjs/common';
import { ProdutorService } from './produtor.service';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { UpdateProdutorDto } from './dto/update-produtor.dto';

@Controller('produtor')
export class ProdutorController {
  constructor(private readonly produtorService: ProdutorService) {}

  @Post()
  create(@Body() dto: CreateProdutorDto) {
    return this.produtorService.create(dto);
  }

  @Get()
  findAll() {
    return this.produtorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtorService.findOne(Number(id));
  }

  @Patch(':id')
  updatePatch(@Param('id') id: string, @Body() dto: UpdateProdutorDto) {
    return this.produtorService.update(Number(id), dto);
  }

  @Put(':id')
  updatePut(@Param('id') id: string, @Body() dto: UpdateProdutorDto) {
    return this.produtorService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtorService.remove(Number(id));
  }
} 