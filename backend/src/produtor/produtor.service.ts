import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produtor } from './produtor.entity';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { UpdateProdutorDto } from './dto/update-produtor.dto';

@Injectable()
export class ProdutorService {
  constructor(
    @InjectRepository(Produtor)
    private readonly produtorRepository: Repository<Produtor>,
  ) {}

  async create(dto: CreateProdutorDto): Promise<Produtor> {
    if (dto.areaAgricultavel + dto.areaVegetacao > dto.areaTotal) {
      throw new BadRequestException('A soma das áreas não pode exceder a área total.');
    }
    const exists = await this.produtorRepository.findOne({ where: { cpfCnpj: dto.cpfCnpj } });
    if (exists) {
      throw new BadRequestException('CPF ou CNPJ já cadastrado.');
    }
    const produtor = this.produtorRepository.create(dto);
    return await this.produtorRepository.save(produtor);
  }

  findAll(): Promise<Produtor[]> {
    return this.produtorRepository.find();
  }

  async findOne(id: number): Promise<Produtor> {
    const produtor = await this.produtorRepository.findOne({ where: { id } });
    if (!produtor) throw new NotFoundException('Produtor não encontrado');
    return produtor;
  }

  async update(id: number, dto: UpdateProdutorDto): Promise<Produtor> {
    const produtor = await this.findOne(id);
    const { areaAgricultavel, areaVegetacao, areaTotal } = dto as Partial<import('./dto/create-produtor.dto').CreateProdutorDto>;
    if (
      areaAgricultavel !== undefined &&
      areaVegetacao !== undefined &&
      areaTotal !== undefined &&
      areaAgricultavel + areaVegetacao > areaTotal
    ) {
      throw new BadRequestException('A soma das áreas não pode exceder a área total.');
    }
    Object.assign(produtor, dto);
    return await this.produtorRepository.save(produtor);
  }

  async remove(id: number): Promise<void> {
    const result = await this.produtorRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Produtor não encontrado');
  }
} 