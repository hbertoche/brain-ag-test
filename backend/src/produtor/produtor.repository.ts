import { Injectable } from '@nestjs/common';
import { Produtor } from './produtor.entity';
import { CreateProdutorDto } from './dto/create-produtor.dto';

@Injectable()
export class ProdutorRepository {
  private produtores: Produtor[] = [];
  private nextId = 1;

  async create(dto: CreateProdutorDto): Promise<Produtor> {
    const produtor = new Produtor();
    produtor.id = this.nextId++;
    Object.assign(produtor, dto);
    this.produtores.push(produtor);
    return produtor;
  }

  async save(produtor: Produtor): Promise<Produtor> {
    const index = this.produtores.findIndex(p => p.id === produtor.id);
    if (index >= 0) {
      this.produtores[index] = produtor;
    } else {
      this.produtores.push(produtor);
    }
    return produtor;
  }

  async find(): Promise<Produtor[]> {
    return this.produtores;
  }

  async findOne(options: { where: { [key: string]: any } }): Promise<Produtor | null> {
    const key = Object.keys(options.where)[0];
    const value = options.where[key];
    return this.produtores.find(p => (p as any)[key] === value) || null;
  }

  async delete(id: number): Promise<{ affected: number }> {
    const index = this.produtores.findIndex(p => p.id === id);
    if (index >= 0) {
      this.produtores.splice(index, 1);
      return { affected: 1 };
    }
    return { affected: 0 };
  }
} 