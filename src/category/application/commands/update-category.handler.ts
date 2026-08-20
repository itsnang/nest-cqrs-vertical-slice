import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../../infrastructure/entities/category.entity.js';
import { UpdateCategoryCommand } from './update-category.command.js';

@Injectable()
@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<
  UpdateCategoryCommand,
  CategoryEntity
> {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async execute(command: UpdateCategoryCommand): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id: command.id },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const updates: Partial<CategoryEntity> = {};
    if (command.name !== undefined) updates.name = command.name;
    if (command.description !== undefined)
      updates.description = command.description;
    if (command.iconUrl !== undefined) updates.iconUrl = command.iconUrl;

    return this.categoryRepository.save({ ...category, ...updates });
  }
}
