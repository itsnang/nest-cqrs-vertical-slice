import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../../product/infrastructure/entities/product.entity.js';
import { CategoryEntity } from '../../infrastructure/entities/category.entity.js';
import { DeleteCategoryCommand } from './delete-category.command.js';

@Injectable()
@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler implements ICommandHandler<
  DeleteCategoryCommand,
  void
> {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async execute(command: DeleteCategoryCommand): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: { id: command.id },
    });
    if (!category) throw new NotFoundException('Category not found');

    // cross-slice referential check: a handler is free to inject another
    // slice's entity directly — vertical slices share a database, they
    // just don't share application/domain code
    const inUse = await this.productRepository.findOne({
      where: { categoryId: command.id },
    });
    if (inUse) throw new ConflictException('Category is in use');

    await this.categoryRepository.remove(category);
  }
}
