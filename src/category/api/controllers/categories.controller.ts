import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCategoryCommand } from '../../application/commands/create-category.command.js';
import { DeleteCategoryCommand } from '../../application/commands/delete-category.command.js';
import { UpdateCategoryCommand } from '../../application/commands/update-category.command.js';
import { GetCategoryQuery } from '../../application/queries/get-category.query.js';
import { ListCategoriesQuery } from '../../application/queries/list-categories.query.js';
import { CreateCategoryDto } from '../dto/create-category.dto.js';
import { UpdateCategoryDto } from '../dto/update-category.dto.js';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.commandBus.execute(
      new CreateCategoryCommand(dto.name, dto.description, dto.iconUrl),
    );
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new ListCategoriesQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetCategoryQuery(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.commandBus.execute(
      new UpdateCategoryCommand(id, dto.name, dto.description, dto.iconUrl),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteCategoryCommand(id));
  }
}
