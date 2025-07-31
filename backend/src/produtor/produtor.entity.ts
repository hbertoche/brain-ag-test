import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Produtor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  cpfCnpj: string;

  @Column()
  nomeProdutor: string;

  @Column()
  nomeFazenda: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column('float')
  areaTotal: number;

  @Column('float')
  areaAgricultavel: number;

  @Column('float')
  areaVegetacao: number;

  @Column('simple-array')
  safras: string[];

  @Column('json')
  culturas: { safra: string; cultura: string }[];
}