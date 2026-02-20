import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './product.controller';

import { CreateProductUseCase } from '../../application/product/create-product.usecase';
import { GetProductsUseCase } from '../../application/product/get-products.usecase';

import { ProductRepository } from '../../domain/product/product.repository';
import { ProductRepositoryImpl } from '../../infrastructure/database/typeorm/product.repository.impl';
import { ProductOrmEntity } from '../../infrastructure/database/typeorm/product.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity])],
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    GetProductsUseCase,
    {
      provide: ProductRepository,
      useClass: ProductRepositoryImpl,
    },
  ],
})
export class ProductModule {}
