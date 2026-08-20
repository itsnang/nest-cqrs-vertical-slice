import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { OrderEntity } from './order/infrastructure/entities/order.entity.js';
import { CategoryEntity } from './category/infrastructure/entities/category.entity.js';
import { ProductEntity } from './product/infrastructure/entities/product.entity.js';
import { UserEntity } from './shared/entities/user.entity.js';

export const typeOrmConfigFactory = (
  config: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get<string>('database.host'),
  port: config.get<number>('database.port'),
  username: config.get<string>('database.username'),
  password: config.get<string>('database.password'),
  database: config.get<string>('database.name'),
  entities: [OrderEntity, CategoryEntity, ProductEntity, UserEntity],
  synchronize: true, // dev only — replaced by migrations later (you skipped those for now)
});
