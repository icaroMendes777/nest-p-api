import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/product/product.repository';
import { Product } from '../../domain/product/product.entity';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(data: {
    name: string;
    price: number;
    description?: string;
  }) {
    const product = new Product(
      null,
      data.name,
      data.price,
      data.description,
    );

    return this.repository.create(product);
  }
}
