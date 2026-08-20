import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../../infrastructure/entities/category.entity.js';
import { GetCategoryQuery } from './get-category.query.js';

@Injectable()
@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler implements IQueryHandler<
  GetCategoryQuery,
  CategoryEntity
> {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async execute(query: GetCategoryQuery): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id: query.id },
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }
}
