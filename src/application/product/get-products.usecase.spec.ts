import { GetProductsUseCase } from './get-products.usecase';
import { ProductRepository } from '../../domain/product/product.repository';

describe('GetProductsUseCase', () => {
  let useCase: GetProductsUseCase;

  const mockRepository: jest.Mocked<ProductRepository> = {
    findAll: jest.fn(),
    findById: jest.fn(),
  } as any;

  beforeEach(() => {
    useCase = new GetProductsUseCase(mockRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should call repository.findAll and return result', async () => {
      const expected = [
        { id: 1, name: 'Laptop' },
        { id: 2, name: 'Mouse' },
      ];

      mockRepository.findAll.mockResolvedValue(expected);

      const result = await useCase.execute();

      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expected);
    });
  });

  describe('find', () => {
    it('should call repository.findById with id and return result', async () => {
      const expected = { id: 1, name: 'Laptop' };

      mockRepository.findById.mockResolvedValue(expected);

      const result = await useCase.find(1);

      expect(mockRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(expected);
    });
  });
});