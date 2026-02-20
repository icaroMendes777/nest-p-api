import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductOrmEntity } from './product.orm-entity';

@Entity('categories')
export class CategoryOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => ProductOrmEntity, product => product.category)
  products: ProductOrmEntity[];
}
