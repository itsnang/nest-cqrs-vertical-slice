import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../infrastructure/entities/product.entity.js';
import { GetProductQuery } from './get-product.query.js';

@Injectable()
@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<
  GetProductQuery,
  ProductEntity
> {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async execute(query: GetProductQuery): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id: query.id },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}
