import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCategoryHandler } from '../../../src/category/application/commands/create-category.handler.js';
import { CreateCategoryCommand } from '../../../src/category/application/commands/create-category.command.js';
import { CategoryEntity } from '../../../src/category/infrastructure/entities/category.entity.js';

describe('CreateCategoryHandler', () => {
  let handler: CreateCategoryHandler;
  let categoryRepo: { save: jest.Mock };

  beforeEach(async () => {
    categoryRepo = { save: jest.fn() };
    const module = await Test.createTestingModule({
      providers: [
        CreateCategoryHandler,
        { provide: getRepositoryToken(CategoryEntity), useValue: categoryRepo },
      ],
    }).compile();
    handler = module.get(CreateCategoryHandler);
  });

  it('saves and returns a new category with all fields', async () => {
    const saved: CategoryEntity = {
      id: 'cat-uuid',
      name: 'Snacks',
      description: 'Salty and sweet',
      iconUrl: 'https://example.com/icon.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    categoryRepo.save.mockResolvedValue(saved);

    const cmd = new CreateCategoryCommand(
      'Snacks',
      'Salty and sweet',
      'https://example.com/icon.png',
    );
    const result = await handler.execute(cmd);

    expect(result).toEqual(saved);
    const savedArg = (
      categoryRepo.save.mock.calls[0] as [Partial<CategoryEntity>]
    )[0];
    expect(savedArg.name).toBe('Snacks');
    expect(savedArg.description).toBe('Salty and sweet');
    expect(savedArg.iconUrl).toBe('https://example.com/icon.png');
    expect(typeof savedArg.id).toBe('string');
  });

  it('saves with null optional fields when omitted', async () => {
    categoryRepo.save.mockResolvedValue({
      id: 'cat-uuid',
      name: 'Electronics',
      description: null,
      iconUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await handler.execute(new CreateCategoryCommand('Electronics'));

    const savedArg = (
      categoryRepo.save.mock.calls[0] as [Partial<CategoryEntity>]
    )[0];
    expect(savedArg.description).toBeNull();
    expect(savedArg.iconUrl).toBeNull();
  });
});
