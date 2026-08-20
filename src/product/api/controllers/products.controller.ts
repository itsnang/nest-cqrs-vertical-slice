import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from '../../application/commands/create-product.command.js';
import { GetProductQuery } from '../../application/queries/get-product.query.js';
import { ListProductsQuery } from '../../application/queries/list-products.query.js';
import { CreateProductDto } from '../dto/create-product.dto.js';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.commandBus.execute(
      new CreateProductCommand(
        dto.categoryId,
        dto.name,
        dto.priceCents,
        dto.description,
        dto.imageUrl,
      ),
    );
  }

  @Get()
  findAll(@Query('categoryId') categoryId?: string) {
    return this.queryBus.execute(new ListProductsQuery(categoryId));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetProductQuery(id));
  }
}
