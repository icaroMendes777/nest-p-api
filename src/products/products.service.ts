import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async create(data: CreateProductDto) {
    const product = this.repository.create(data);
    return this.repository.save(product);
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const product = await this.repository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: number, data: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, data);
    return this.repository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.repository.remove(product);
  }
}
