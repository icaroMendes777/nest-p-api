import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/product/product.repository';

@Injectable()
export class GetProductsUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute() {
    return this.repository.findAll();
  }
}
