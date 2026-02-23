import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { CreateProductUseCase } from '../../application/product/create-product.usecase';
import { GetProductsUseCase } from '../../application/product/get-products.usecase';
import toResponseDto from './product.mapper';

describe('ProductController', () => {
  let controller: ProductController;

  const mockCreateProductUseCase = {
    execute: jest.fn(),
  };

  const mockGetProductsUseCase = {
    execute: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        { provide: CreateProductUseCase, useValue: mockCreateProductUseCase },
        { provide: GetProductsUseCase, useValue: mockGetProductsUseCase },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call CreateProductUseCase.execute with body', async () => {
    const body = { name: 'Test', price: 10, categoryName: 'Cat' };
    const expectedResult = { id: 1, ...body };

    mockCreateProductUseCase.execute.mockResolvedValue(expectedResult);

    const result = await controller.create(body);

    expect(mockCreateProductUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockCreateProductUseCase.execute).toHaveBeenCalledWith(body);
    expect(result).toEqual(toResponseDto(expectedResult));
  });

  it('should call GetProductsUseCase.execute and return result', async () => {
    const expected = [{ id: 1, name: 'Test' }];

    mockGetProductsUseCase.execute.mockResolvedValue(expected);

    const result = await controller.findAll();

    expect(mockGetProductsUseCase.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it('should call GetProductsUseCase.find with id and return result', async () => {
    const expected = { id: 1, name: 'Test' };

    mockGetProductsUseCase.find.mockResolvedValue(expected);

    const result = await controller.findProduct(1);

    expect(mockGetProductsUseCase.find).toHaveBeenCalledTimes(1);
    expect(mockGetProductsUseCase.find).toHaveBeenCalledWith(1);
    expect(result).toEqual(expected);
  });
});