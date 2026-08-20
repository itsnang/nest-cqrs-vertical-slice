import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../category/infrastructure/entities/category.entity.js';
import { ProductsController } from './api/controllers/products.controller.js';
import { CreateProductHandler } from './application/commands/create-product.handler.js';
import { GetProductHandler } from './application/queries/get-product.handler.js';
import { ListProductsHandler } from './application/queries/list-products.handler.js';
import { ProductEntity } from './infrastructure/entities/product.entity.js';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity]),
  ],
  controllers: [ProductsController],
  providers: [CreateProductHandler, GetProductHandler, ListProductsHandler],
})
export class ProductModule {}
