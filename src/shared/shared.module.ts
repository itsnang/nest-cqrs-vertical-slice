import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity.js';
import { UserExistenceValidator } from './decorators/user-existence.decorator.js';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserExistenceValidator],
  exports: [TypeOrmModule, UserExistenceValidator],
})
export class SharedModule {}
