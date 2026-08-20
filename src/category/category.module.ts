import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../product/infrastructure/entities/product.entity.js';
import { CategoriesController } from './api/controllers/categories.controller.js';
import { CreateCategoryHandler } from './application/commands/create-category.handler.js';
import { DeleteCategoryHandler } from './application/commands/delete-category.handler.js';
import { UpdateCategoryHandler } from './application/commands/update-category.handler.js';
import { GetCategoryHandler } from './application/queries/get-category.handler.js';
import { ListCategoriesHandler } from './application/queries/list-categories.handler.js';
import { CategoryEntity } from './infrastructure/entities/category.entity.js';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CategoryEntity, ProductEntity]),
  ],
  controllers: [CategoriesController],
  providers: [
    CreateCategoryHandler,
    UpdateCategoryHandler,
    DeleteCategoryHandler,
    GetCategoryHandler,
    ListCategoriesHandler,
  ],
})
export class CategoryModule {}
