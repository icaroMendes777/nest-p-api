import { Injectable } from '@nestjs/common';
import { StoreRepository } from '../../domain/store/store.repository';

@Injectable()
export class GetStoresUseCase {
    constructor(private readonly repository: StoreRepository) { }

    async execute() {
        return this.repository.findAll();
    }

    async find(id: number) {
        return this.repository.findById(id);
    }
}
