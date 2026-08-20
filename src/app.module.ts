import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigFactory } from './typeorm.config.js';
import { SharedModule } from './shared/shared.module.js';
import { CategoryModule } from './category/category.module.js';
import { ProductModule } from './product/product.module.js';
import { NotificationModule } from './notification/notification.module.js';
import configuration from '../config/configuration.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfigFactory,
    }),
    SharedModule,
    CategoryModule,
    ProductModule,
    NotificationModule,
  ],
})
export class AppModule {}
