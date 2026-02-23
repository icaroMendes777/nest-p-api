import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/product/product.repository';
import { Product } from '../../domain/product/product.entity';
import { Category } from 'src/domain/category/category.entity';
import { CategoryRepository } from 'src/domain/category/category.repository';
import { CreateProductDto } from 'src/presentation/product/dto/create-product.dto';

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


    if (!category) {
      category = await this.categoryRepo.create(new Category(null, data.categoryName));
    }

    const product = new Product(
      null,
      data.name,
      data.price,
      category.id,
      data.description,
    );

    return this.productRepo.create(product);
  }
}
