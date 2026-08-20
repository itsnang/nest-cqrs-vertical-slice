import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../../infrastructure/entities/category.entity.js';
import { ListCategoriesQuery } from './list-categories.query.js';

@Injectable()
@QueryHandler(ListCategoriesQuery)
export class ListCategoriesHandler implements IQueryHandler<
  ListCategoriesQuery,
  CategoryEntity[]
> {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  execute(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find({ order: { createdAt: 'DESC' } });
  }
}
