import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './infrastructure/entities/order.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), CqrsModule],
  controllers: [],
  providers: [],
})
export class OrderModule {}
