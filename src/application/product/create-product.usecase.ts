import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/product/product.repository';
import { Product } from '../../domain/product/product.entity';
import { Category } from 'src/domain/category/category.entity';
import { CategoryRepository } from 'src/domain/category/category.repository';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepo: ProductRepository,
    private readonly categoryRepo: CategoryRepository) { }

  async execute(data: {
    name: string;
    price: number;
    description?: string;
    categoryName: string;
  }) {

    let category = await this.categoryRepo.findByName(data.categoryName);
    console.log('found category: ', category)


    if (!category) {
      console.log('data ',data)
      category = await this.categoryRepo.create(new Category(null, data.categoryName));
    }

    const product = new Product(
      null,
      data.name,
      data.price,
      category.id,
      data.description,
    );

    console.log('sending to create prod: ', product)

    return this.productRepo.create(product);
  }
}
