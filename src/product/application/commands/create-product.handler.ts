import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../../../category/infrastructure/entities/category.entity.js';
import { ProductCreatedEvent } from '../../domain/events/product-created.event.js';
import { ProductEntity } from '../../infrastructure/entities/product.entity.js';
import { CreateProductCommand } from './create-product.command.js';

@Injectable()
@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<
  CreateProductCommand,
  ProductEntity
> {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateProductCommand): Promise<ProductEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id: command.categoryId },
    });
    if (!category) {
      throw new BadRequestException('Category not found');
    }

    const product = await this.productRepository.save({
      id: randomUUID(),
      categoryId: command.categoryId,
      name: command.name,
      priceCents: command.priceCents,
    });

    // publish after the write commits — other slices react via their own
    // @EventsHandler, with no direct dependency on this one
    this.eventBus.publish(
      new ProductCreatedEvent(product.id, product.name, product.priceCents),
    );

    return product;
  }
}
