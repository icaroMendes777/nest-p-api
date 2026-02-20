import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CategoryOrmEntity } from './category.orm-entity';

@Entity('products')
export class ProductOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({ nullable: true })
    description?: string;

    @ManyToOne(() => CategoryOrmEntity, category => category.products, {
        nullable: false,
        eager: true, 
    })
    @JoinColumn({ name: 'category_id' })
    category: CategoryOrmEntity;
}
