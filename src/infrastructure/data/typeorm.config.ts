import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { UserEntity } from './entities/user.entity';

export const typeOrmConfigFactory = (
  config: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get<string>('database.host'),
  port: config.get<number>('database.port'),
  username: config.get<string>('database.username'),
  password: config.get<string>('database.password'),
  database: config.get<string>('database.name'),
  entities: [OrderEntity, UserEntity],
  synchronize: true, // dev only — replaced by migrations later (you skipped those for now)
});
