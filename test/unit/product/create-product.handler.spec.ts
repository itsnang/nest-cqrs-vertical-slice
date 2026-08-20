import { BadRequestException } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProductHandler } from '../../../src/product/application/commands/create-product.handler.js';
import { CreateProductCommand } from '../../../src/product/application/commands/create-product.command.js';
import { ProductCreatedEvent } from '../../../src/product/domain/events/product-created.event.js';
import {
  ProductEntity,
  ProductStatus,
} from '../../../src/product/infrastructure/entities/product.entity.js';
import { CategoryEntity } from '../../../src/category/infrastructure/entities/category.entity.js';

const category: CategoryEntity = {
  id: 'cat-uuid',
  name: 'Snacks',
  description: null,
  iconUrl: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('CreateProductHandler', () => {
  let handler: CreateProductHandler;
  let productRepo: { save: jest.Mock };
  let categoryRepo: { findOne: jest.Mock };
  let eventBus: { publish: jest.Mock };

  beforeEach(async () => {
    productRepo = { save: jest.fn() };
    categoryRepo = { findOne: jest.fn() };
    eventBus = { publish: jest.fn() };
    const module = await Test.createTestingModule({
      providers: [
        CreateProductHandler,
        { provide: getRepositoryToken(ProductEntity), useValue: productRepo },
        { provide: getRepositoryToken(CategoryEntity), useValue: categoryRepo },
        { provide: EventBus, useValue: eventBus },
      ],
    }).compile();
    handler = module.get(CreateProductHandler);
  });

  it('throws BadRequestException when the category does not exist', async () => {
    categoryRepo.findOne.mockResolvedValue(null);

    await expect(
      handler.execute(new CreateProductCommand('missing-cat', 'Chips', 350)),
    ).rejects.toThrow(new BadRequestException('Category not found'));
    expect(productRepo.save).not.toHaveBeenCalled();
    expect(eventBus.publish).not.toHaveBeenCalled();
  });

  it('saves the product and publishes ProductCreatedEvent', async () => {
    categoryRepo.findOne.mockResolvedValue(category);
    const saved: ProductEntity = {
      id: 'prod-uuid',
      categoryId: 'cat-uuid',
      name: 'Kettle Chips',
      description: 'Crunchy',
      priceCents: 350,
      imageUrl: null,
      status: ProductStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    productRepo.save.mockResolvedValue(saved);

    const result = await handler.execute(
      new CreateProductCommand('cat-uuid', 'Kettle Chips', 350, 'Crunchy'),
    );

    expect(result).toEqual(saved);
    expect(eventBus.publish).toHaveBeenCalledTimes(1);
    const published = (
      eventBus.publish.mock.calls[0] as [ProductCreatedEvent]
    )[0];
    expect(published).toBeInstanceOf(ProductCreatedEvent);
    expect(published.productId).toBe('prod-uuid');
    expect(published.name).toBe('Kettle Chips');
    expect(published.priceCents).toBe(350);
  });
});
