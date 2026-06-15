import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  customerId: string;

  @Column()
  status: string;

  @Column({ type: 'jsonb' })
  items: { productId: string; quantity: number; unitPrice: number }[];

  @Column({ type: 'int' })
  totalCents: number;

  @CreateDateColumn()
  createdAt: Date;
}
