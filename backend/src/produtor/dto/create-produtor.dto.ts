import { IsString, IsNumber, IsArray, IsNotEmpty, Length, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class CulturaDto {
  @IsString()
  @IsNotEmpty()
  safra: string;

  @IsString()
  @IsNotEmpty()
  cultura: string;
}

export class CreateProdutorDto {
  @IsString()
  @Length(11, 14)
  cpfCnpj: string;

  @IsString()
  @IsNotEmpty()
  nomeProdutor: string;

  @IsString()
  @IsNotEmpty()
  nomeFazenda: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsNumber()
  areaTotal: number;

  @IsNumber()
  areaAgricultavel: number;

  @IsNumber()
  areaVegetacao: number;

  @IsArray()
  @IsString({ each: true })
  safras: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CulturaDto)
  culturas: CulturaDto[];
} 