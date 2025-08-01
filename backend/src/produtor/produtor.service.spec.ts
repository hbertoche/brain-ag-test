import { Test, TestingModule } from '@nestjs/testing';
import { ProdutorService } from './produtor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Produtor } from './produtor.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateProdutorDto } from './dto/create-produtor.dto';
import { UpdateProdutorDto } from './dto/update-produtor.dto';

describe('ProdutorService', () => {
  let service: ProdutorService;
  let repo: Repository<Produtor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutorService,
        {
          provide: getRepositoryToken(Produtor),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProdutorService>(ProdutorService);
    repo = module.get<Repository<Produtor>>(getRepositoryToken(Produtor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw if areaAgricultavel + areaVegetacao > areaTotal', async () => {
      const dto: CreateProdutorDto = {
        cpfCnpj: '12345678901',
        nomeProdutor: 'Produtor',
        nomeFazenda: 'Fazenda',
        cidade: 'Cidade',
        estado: 'SP',
        areaTotal: 100,
        areaAgricultavel: 60,
        areaVegetacao: 50,
        safras: ['Safra 2021'],
        culturas: [{ safra: 'Safra 2021', cultura: 'Soja' }],
      };
      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('should throw if cpfCnpj already exists', async () => {
      const dto: CreateProdutorDto = {
        cpfCnpj: '12345678901',
        nomeProdutor: 'Produtor',
        nomeFazenda: 'Fazenda',
        cidade: 'Cidade',
        estado: 'SP',
        areaTotal: 100,
        areaAgricultavel: 50,
        areaVegetacao: 40,
        safras: ['Safra 2021'],
        culturas: [{ safra: 'Safra 2021', cultura: 'Soja' }],
      };
      jest.spyOn(repo, 'findOne').mockResolvedValue({} as Produtor);
      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('should create and save a produtor', async () => {
      const dto: CreateProdutorDto = {
        cpfCnpj: '12345678901',
        nomeProdutor: 'Produtor',
        nomeFazenda: 'Fazenda',
        cidade: 'Cidade',
        estado: 'SP',
        areaTotal: 100,
        areaAgricultavel: 50,
        areaVegetacao: 40,
        safras: ['Safra 2021'],
        culturas: [{ safra: 'Safra 2021', cultura: 'Soja' }],
      };
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);
      jest.spyOn(repo, 'create').mockReturnValue(dto as any);
      jest.spyOn(repo, 'save').mockResolvedValue(dto as any);
      await expect(service.create(dto)).resolves.toEqual(dto);
    });
  });

  describe('findOne', () => {
    it('should throw if produtor not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
    it('should return produtor if found', async () => {
      const produtor = { id: 1 } as Produtor;
      jest.spyOn(repo, 'findOne').mockResolvedValue(produtor);
      await expect(service.findOne(1)).resolves.toEqual(produtor);
    });
  });

  describe('update', () => {
    it('should throw if areaAgricultavel + areaVegetacao > areaTotal', async () => {
      const produtor = { id: 1 } as Produtor;
      jest.spyOn(service, 'findOne').mockResolvedValue(produtor);
      const dto: UpdateProdutorDto = {
        areaAgricultavel: 60,
        areaVegetacao: 50,
        areaTotal: 100,
      };
      await expect(service.update(1, dto)).rejects.toThrow(BadRequestException);
    });
    it('should update and save produtor', async () => {
      const produtor = { id: 1, areaAgricultavel: 40, areaVegetacao: 30, areaTotal: 100 } as Produtor;
      jest.spyOn(service, 'findOne').mockResolvedValue(produtor);
      jest.spyOn(repo, 'save').mockResolvedValue({ ...produtor, nomeProdutor: 'Novo' } as Produtor);
      const dto: UpdateProdutorDto = { nomeProdutor: 'Novo' };
      await expect(service.update(1, dto)).resolves.toEqual({ ...produtor, nomeProdutor: 'Novo' });
    });
  });

  describe('remove', () => {
    it('should throw if produtor not found', async () => {
      jest.spyOn(repo, 'delete').mockResolvedValue({ affected: 0 } as any);
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
    it('should remove produtor', async () => {
      jest.spyOn(repo, 'delete').mockResolvedValue({ affected: 1 } as any);
      await expect(service.remove(1)).resolves.toBeUndefined();
    });
  });
});
