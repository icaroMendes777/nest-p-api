import { CreateProductUseCase } from './create-product.usecase';
import { ProductRepository } from '../../domain/product/product.repository';
import { CategoryRepository } from 'src/domain/category/category.repository';
import { Category } from 'src/domain/category/category.entity';
import { Product } from '../../domain/product/product.entity';

describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase;

  const mockProductRepo: jest.Mocked<ProductRepository> = {
    create: jest.fn(),
  } as any;

  const mockCategoryRepo: jest.Mocked<CategoryRepository> = {
    findByName: jest.fn(),
    create: jest.fn(),
  } as any;

  beforeEach(() => {
    useCase = new CreateProductUseCase(
      mockProductRepo,
      mockCategoryRepo,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should use existing category if found', async () => {
    const input = {
      name: 'Laptop',
      price: 3000,
      description: 'Gaming',
      categoryName: 'Electronics',
    };

    const existingCategory = new Category(1, 'Electronics');

    mockCategoryRepo.findByName.mockResolvedValue(existingCategory);
    mockProductRepo.create.mockResolvedValue({ id: 10 });

    const result = await useCase.execute(input);

    expect(mockCategoryRepo.findByName).toHaveBeenCalledWith('Electronics');
    expect(mockCategoryRepo.create).not.toHaveBeenCalled();

    expect(mockProductRepo.create).toHaveBeenCalledTimes(1);

    const createdProductArg = mockProductRepo.create.mock.calls[0][0];

    expect(createdProductArg).toBeInstanceOf(Product);
    expect(createdProductArg.name).toBe('Laptop');
    expect(createdProductArg.price).toBe(3000);
    expect(createdProductArg.categoryId).toBe(1);

    expect(result).toEqual({ id: 10 });
  });

  it('should create category if not found', async () => {
    const input = {
      name: 'Mouse',
      price: 50,
      description: 'Wireless',
      categoryName: 'Accessories',
    };

    const newCategory = new Category(2, 'Accessories');

    mockCategoryRepo.findByName.mockResolvedValue(null);
    mockCategoryRepo.create.mockResolvedValue(newCategory);
    mockProductRepo.create.mockResolvedValue({ id: 11 });

    const result = await useCase.execute(input);

    expect(mockCategoryRepo.findByName).toHaveBeenCalledWith('Accessories');
    expect(mockCategoryRepo.create).toHaveBeenCalledTimes(1);

    const categoryArg = mockCategoryRepo.create.mock.calls[0][0];
    expect(categoryArg).toBeInstanceOf(Category);
    expect(categoryArg.name).toBe('Accessories');

    expect(mockProductRepo.create).toHaveBeenCalledTimes(1);

    const createdProductArg = mockProductRepo.create.mock.calls[0][0];
    expect(createdProductArg.categoryId).toBe(2);

    expect(result).toEqual({ id: 11 });
  });
});