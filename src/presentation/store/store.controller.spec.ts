import { Test, TestingModule } from '@nestjs/testing';
import { StoreController } from './store.controller';
import { CreateStoreUseCase } from '../../application/store/create-store.usecase';
import { GetStoresUseCase } from '../../application/store/get-stores.usecase';
import toResponseDto from './store.mapper';

describe('StoreController', () => {
  let controller: StoreController;

  const mockCreateStoreUseCase = {
    execute: jest.fn(),
  };

  const mockGetStoresUseCase = {
    execute: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
      providers: [
        { provide: CreateStoreUseCase, useValue: mockCreateStoreUseCase },
        { provide: GetStoresUseCase, useValue: mockGetStoresUseCase },
      ],
    }).compile();

    controller = module.get<StoreController>(StoreController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call CreateStoreUseCase.execute with body', async () => {
    const body = { name: 'Test', address: 'street g', phone: '999922222' };
    const expectedResult = { id: 1, ...body };

    mockCreateStoreUseCase.execute.mockResolvedValue(expectedResult);

    const result = await controller.create(body);

    expect(mockCreateStoreUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockCreateStoreUseCase.execute).toHaveBeenCalledWith(body);
    expect(result).toEqual(toResponseDto(expectedResult));
  });

  it('should call GetStoresUseCase.execute and return result', async () => {
    const expected = [{ id: 1, name: 'Test' }];

    mockGetStoresUseCase.execute.mockResolvedValue(expected);

    const result = await controller.findAll();

    expect(mockGetStoresUseCase.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it('should call GetStoresUseCase.find with id and return result', async () => {
    const expected = { id: 1, name: 'Test' };

    mockGetStoresUseCase.find.mockResolvedValue(expected);

    const result = await controller.findStore(1);

    expect(mockGetStoresUseCase.find).toHaveBeenCalledTimes(1);
    expect(mockGetStoresUseCase.find).toHaveBeenCalledWith(1);
    expect(result).toEqual(expected);
  });
});