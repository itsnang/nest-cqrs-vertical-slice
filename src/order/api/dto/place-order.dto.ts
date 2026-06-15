import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsPositive,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { UserExistenceValidate } from '../../../shared/decorators/user-existence.decorator.js';

export class OrderItemDto {
  @IsUUID()
  productId: string;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsInt()
  @Min(0)
  unitPrice: number;
}

export class PlaceOrderDto {
  @IsUUID()
  @UserExistenceValidate()
  customerId: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
