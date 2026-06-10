import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { typeOrmConfigFactory } from '../infrastructure/data/typeorm.config';
import configuration from '../../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfigFactory,
    }),
    TypeOrmModule.forFeature([
      /* OrderEntity */
    ]),
    CqrsModule.forRoot(),
  ],
  controllers: [
    /* OrdersController */
  ],
  providers: [
    // command/query/event handlers go here as plain classes
    // ports → adapters bindings:
    // { provide: ORDER_REPOSITORY, useClass: OrderWriteRepositoryImpl },
    // { provide: ORDER_READ_REPOSITORY, useClass: OrderReadRepositoryImpl },
  ],
})
export class AppModule {}
