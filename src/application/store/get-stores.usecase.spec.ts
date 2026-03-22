import { GetStoresUseCase } from './get-stores.usecase';
import { StoreRepository } from '../../domain/store/store.repository';

describe('GetStoresUseCase', () => {
  let useCase: GetStoresUseCase;

  const mockRepository: jest.Mocked<StoreRepository> = {
    findAll: jest.fn(),
    findById: jest.fn(),
  } as any;

  beforeEach(() => {
    useCase = new GetStoresUseCase(mockRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should call repository.findAll and return result', async () => {
      const expected = [
        { id: 1, name: 'Store 1' },
        { id: 2, name: 'Store 2' },
      ];

      mockRepository.findAll.mockResolvedValue(expected);

      const result = await useCase.execute();

      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expected);
    });
  });

  describe('find', () => {
    it('should call repository.findById with id and return result', async () => {
      const expected = { id: 1, name: 'Store 1' };

      mockRepository.findById.mockResolvedValue(expected);

      const result = await useCase.find(1);

      expect(mockRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(expected);
    });
  });
});