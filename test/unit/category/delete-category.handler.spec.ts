import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteCategoryHandler } from '../../../src/category/application/commands/delete-category.handler.js';
import { DeleteCategoryCommand } from '../../../src/category/application/commands/delete-category.command.js';
import { CategoryEntity } from '../../../src/category/infrastructure/entities/category.entity.js';
import { ProductEntity } from '../../../src/product/infrastructure/entities/product.entity.js';

const existing: CategoryEntity = {
  id: 'cat-uuid',
  name: 'Snacks',
  description: null,
  iconUrl: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('DeleteCategoryHandler', () => {
  let handler: DeleteCategoryHandler;
  let categoryRepo: { findOne: jest.Mock; remove: jest.Mock };
  let productRepo: { findOne: jest.Mock };

  beforeEach(async () => {
    categoryRepo = { findOne: jest.fn(), remove: jest.fn() };
    productRepo = { findOne: jest.fn() };
    const module = await Test.createTestingModule({
      providers: [
        DeleteCategoryHandler,
        { provide: getRepositoryToken(CategoryEntity), useValue: categoryRepo },
        { provide: getRepositoryToken(ProductEntity), useValue: productRepo },
      ],
    }).compile();
    handler = module.get(DeleteCategoryHandler);
  });

  it('throws NotFoundException when category does not exist', async () => {
    categoryRepo.findOne.mockResolvedValue(null);
    await expect(
      handler.execute(new DeleteCategoryCommand('no-id')),
    ).rejects.toThrow(new NotFoundException('Category not found'));
    expect(productRepo.findOne).not.toHaveBeenCalled();
  });

  it('throws ConflictException when category is in use by a product', async () => {
    categoryRepo.findOne.mockResolvedValue(existing);
    productRepo.findOne.mockResolvedValue({ id: 'product-id' });
    await expect(
      handler.execute(new DeleteCategoryCommand('cat-uuid')),
    ).rejects.toThrow(new ConflictException('Category is in use'));
    expect(categoryRepo.remove).not.toHaveBeenCalled();
  });

  it('removes category when not in use', async () => {
    categoryRepo.findOne.mockResolvedValue(existing);
    productRepo.findOne.mockResolvedValue(null);
    categoryRepo.remove.mockResolvedValue(existing);

    await handler.execute(new DeleteCategoryCommand('cat-uuid'));

    expect(categoryRepo.remove).toHaveBeenCalledWith(existing);
  });
});
