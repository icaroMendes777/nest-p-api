import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './product.controller';

import { CreateProductUseCase } from '../../application/product/create-product.usecase';
import { GetProductsUseCase } from '../../application/product/get-products.usecase';

import { ProductRepository } from '../../domain/product/product.repository';
import { ProductRepositoryImpl } from '../../infrastructure/database/typeorm/product.repository.impl';
import { ProductOrmEntity } from '../../infrastructure/database/typeorm/product.orm-entity';

import { CategoryOrmEntity } from 'src/infrastructure/database/typeorm/category.orm-entity';
import { CategoryRepository } from 'src/domain/category/category.repository';
import { CategoryRepositoryImpl } from 'src/infrastructure/database/typeorm/category.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity, CategoryOrmEntity,])],
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    GetProductsUseCase,
    {
      provide: ProductRepository,
      useClass: ProductRepositoryImpl,
    },
    {
      provide: CategoryRepository,
      useClass: CategoryRepositoryImpl,
    },
  ],
})
export class ProductModule {}
