import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../../infrastructure/entities/category.entity.js';
import { CreateCategoryCommand } from './create-category.command.js';

@Injectable()
@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<
  CreateCategoryCommand,
  CategoryEntity
> {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async execute(command: CreateCategoryCommand): Promise<CategoryEntity> {
    return this.categoryRepository.save({
      id: randomUUID(),
      name: command.name,
      description: command.description ?? null,
    });
  }
}
