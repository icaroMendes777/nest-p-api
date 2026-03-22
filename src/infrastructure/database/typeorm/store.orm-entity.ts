import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('store')
export class StoreOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address?: string;

    @Column()
    phone?: string;

}
