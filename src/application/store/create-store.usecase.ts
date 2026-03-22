import { Injectable } from '@nestjs/common';
import { StoreRepository } from '../../domain/store/store.repository';
import { Store } from '../../domain/store/store.entity';
import { Category } from 'src/domain/category/category.entity';
import { CreateStoreDto } from 'src/presentation/store/dto/create-store.dto';

@Injectable()
export class CreateStoreUseCase {
  constructor(private readonly storeRepo: StoreRepository) { }

  async execute(data: {
    name: string,
    address: string,
    phone: string,
  }) {

    const store = new Store(
      null,
      data.name,
      data.address,
      data.phone,
    );

    return this.storeRepo.create(store);
  }
}
