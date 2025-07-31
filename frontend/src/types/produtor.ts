export interface Cultura {
  safra: string;
  cultura: string;
}

export interface Produtor {
  id?: number;
  cpfCnpj: string;
  nomeProdutor: string;
  nomeFazenda: string;
  cidade: string;
  estado: string;
  areaTotal: number;
  areaAgricultavel: number;
  areaVegetacao: number;
  safras: string[];
  culturas: Cultura[];
}

export interface CreateProdutorDto {
  cpfCnpj: string;
  nomeProdutor: string;
  nomeFazenda: string;
  cidade: string;
  estado: string;
  areaTotal: number;
  areaAgricultavel: number;
  areaVegetacao: number;
  safras: string[];
  culturas: Cultura[];
}

export interface UpdateProdutorDto extends Partial<CreateProdutorDto> {}

export interface DashboardStats {
  totalFazendas: number;
  totalHectares: number;
  porEstado: { estado: string; quantidade: number }[];
  porCultura: { cultura: string; quantidade: number }[];
  porUsoSolo: { tipo: string; area: number }[];
} 