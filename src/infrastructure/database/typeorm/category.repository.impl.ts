import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/domain/category/category.entity';
import { CategoryOrmEntity } from './category.orm-entity';
import { CategoryRepository } from 'src/domain/category/category.repository';

@Injectable()
export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryOrmEntity)
    private readonly repository: Repository<CategoryOrmEntity>,
  ) {}

  private toDomain(entity: CategoryOrmEntity): Category {
    return new Category(
      entity.id,
      entity.name,
    );
  }

  private toOrm(Category: Category): CategoryOrmEntity {
    const entity = new CategoryOrmEntity();
    entity.id = Category.id!;
    entity.name = Category.name;
    return entity;
  }

  async create(Category: Category): Promise<Category> {
    console.log('category', Category)
    const saved = await this.repository.save(this.toOrm(Category));
    return this.toDomain(saved);
  }

  async findAll(): Promise<Category[]> {
    const entities = await this.repository.find();
    return entities.map(this.toDomain);
  }

  async findById(id: number): Promise<Category | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findByName(name: string): Promise<Category | null> {
    const entity = await this.repository.findOne({ where: { name } });
    return entity ? this.toDomain(entity) : null;
  }

  async update(Category: Category): Promise<Category> {
    const updated = await this.repository.save(this.toOrm(Category));
    return this.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
