import { Store } from './store.entity';

export abstract class StoreRepository {
  abstract create(Store: Store): Promise<Store>;
  abstract findAll(): Promise<Store[]>;
  abstract findById(id: number): Promise<Store | null>;
  abstract update(Store: Store): Promise<Store>;
  abstract delete(id: number): Promise<void>;
}
