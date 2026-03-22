import { CreateStoreUseCase } from './create-store.usecase';
import { StoreRepository } from '../../domain/store/store.repository';
import { CategoryRepository } from 'src/domain/category/category.repository';
import { Category } from 'src/domain/category/category.entity';
import { Store } from '../../domain/store/store.entity';

describe('CreateStoreUseCase', () => {
  let useCase: CreateStoreUseCase;

  const mockStoreRepo: jest.Mocked<StoreRepository> = {
    create: jest.fn(),
  } as any;

  beforeEach(() => {
    useCase = new CreateStoreUseCase(
      mockStoreRepo
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should use existing category if found', async () => {
    const input = {
      name: 'Laptop',
      address: 'street 1',
      phone: '8888222222'
    };

    const existingCategory = new Category(1, 'Electronics');

    mockStoreRepo.create.mockResolvedValue({ id: 10 });

    const result = await useCase.execute(input);

    expect(mockStoreRepo.create).toHaveBeenCalledTimes(1);

    const createdStoreArg = mockStoreRepo.create.mock.calls[0][0];

    expect(createdStoreArg).toBeInstanceOf(Store);
    expect(createdStoreArg.name).toBe(input.name);
    expect(createdStoreArg.address).toBe(input.address);
    expect(createdStoreArg.phone).toBe(input.phone);

    expect(result).toEqual({ id: 10 });
  });

});