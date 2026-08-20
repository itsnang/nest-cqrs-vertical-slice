import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  categoryId: string;

  @Column()
  name: string;

  @Column({ type: 'int' })
  priceCents: number;

  @CreateDateColumn()
  createdAt: Date;
}
