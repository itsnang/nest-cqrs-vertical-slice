import {
  IsInt,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsUUID()
  categoryId: string;

  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name: string;

  @IsInt()
  @IsPositive()
  priceCents: number;
}
