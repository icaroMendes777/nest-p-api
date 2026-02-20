import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductRepository } from '../../../domain/product/product.repository';
import { Product } from '../../../domain/product/product.entity';
import { ProductOrmEntity } from './product.orm-entity';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly repository: Repository<ProductOrmEntity>,
  ) {}

  private toDomain(entity: ProductOrmEntity): Product {
    return new Product(
      entity.id,
      entity.name,
      Number(entity.price),
      entity.description,
    );
  }

  private toOrm(product: Product): ProductOrmEntity {
    const entity = new ProductOrmEntity();
    entity.id = product.id!;
    entity.name = product.name;
    entity.price = product.price;
    entity.description = product.description;
    return entity;
  }

  async create(product: Product): Promise<Product> {
    const saved = await this.repository.save(this.toOrm(product));
    return this.toDomain(saved);
  }

  async findAll(): Promise<Product[]> {
    const entities = await this.repository.find();
    return entities.map(this.toDomain);
  }

  async findById(id: number): Promise<Product | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async update(product: Product): Promise<Product> {
    const updated = await this.repository.save(this.toOrm(product));
    return this.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
