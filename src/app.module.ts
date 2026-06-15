import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigFactory } from './typeorm.config.js';
import { SharedModule } from './shared/shared.module.js';
import { OrderModule } from './order/order.module.js';
import configuration from '../config/configuration.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfigFactory,
    }),
    SharedModule,
    OrderModule,
  ],
})
export class AppModule {}
