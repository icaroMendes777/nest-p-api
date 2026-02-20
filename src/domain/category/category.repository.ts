import { Category } from './category.entity';

export abstract class CategoryRepository {
  abstract create(Category: Category): Promise<Category>;
  abstract findAll(): Promise<Category[]>;
  abstract findById(id: number): Promise<Category | null>;
  abstract findByName(name: string): Promise<Category | null>;
  abstract update(Category: Category): Promise<Category>;
  abstract delete(id: number): Promise<void>;
}