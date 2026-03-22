import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreRepository } from '../../../domain/store/store.repository';
import { Store } from '../../../domain/store/store.entity';
import { StoreOrmEntity } from './store.orm-entity';

@Injectable()
export class StoreRepositoryImpl implements StoreRepository {
    constructor(
        @InjectRepository(StoreOrmEntity)
        private readonly repository: Repository<StoreOrmEntity>,
    ) { }

    private toDomain(entity: StoreOrmEntity): Store {
        return new Store(
            entity.id,
            entity.name,
            entity.address,
            entity.phone,
        );
    }

    private toOrm(store: Store): StoreOrmEntity {
        const entity = new StoreOrmEntity();

        entity.id = store.id!;
        entity.name = store.name;
        entity.address = store.address;
        entity.phone = store.phone;

        return entity;
    }

    async create(store: Store): Promise<Store> {
        const saved = await this.repository.save(this.toOrm(store));
        return this.toDomain(saved);
    }

    async findAll(): Promise<Store[]> {
        const entities = await this.repository.find();
        return entities.map(this.toDomain);
    }

    async findById(id: number): Promise<Store | null> {
        const entity = await this.repository.findOne({ where: { id } });
        return entity ? this.toDomain(entity) : null;
    }

    async update(store: Store): Promise<Store> {
        const updated = await this.repository.save(this.toOrm(store));
        return this.toDomain(updated);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
