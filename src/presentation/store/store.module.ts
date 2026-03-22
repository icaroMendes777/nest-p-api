import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoreController } from './store.controller';

import { CreateStoreUseCase } from '../../application/store/create-store.usecase';
import { GetStoresUseCase } from '../../application/store/get-stores.usecase';

import { StoreRepository } from '../../domain/store/store.repository';
import { StoreRepositoryImpl } from '../../infrastructure/database/typeorm/store.repository.impl';
import { StoreOrmEntity } from '../../infrastructure/database/typeorm/store.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoreOrmEntity])],
  controllers: [StoreController],
  providers: [
    CreateStoreUseCase,
    GetStoresUseCase,
    {
      provide: StoreRepository,
      useClass: StoreRepositoryImpl,
    },
  ],
})
export class StoreModule {}
