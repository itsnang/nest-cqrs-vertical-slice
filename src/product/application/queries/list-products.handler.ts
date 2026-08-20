import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../infrastructure/entities/product.entity.js';
import { ListProductsQuery } from './list-products.query.js';

@Injectable()
@QueryHandler(ListProductsQuery)
export class ListProductsHandler implements IQueryHandler<
  ListProductsQuery,
  ProductEntity[]
> {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  execute(query: ListProductsQuery): Promise<ProductEntity[]> {
    return this.productRepository.find({
      where: query.categoryId ? { categoryId: query.categoryId } : {},
      order: { createdAt: 'DESC' },
    });
  }
}
