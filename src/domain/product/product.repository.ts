import { Product } from './product.entity';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<Product>;
  abstract findAll(): Promise<Product[]>;
  abstract findById(id: number): Promise<Product | null>;
  abstract update(product: Product): Promise<Product>;
  abstract delete(id: number): Promise<void>;
}
