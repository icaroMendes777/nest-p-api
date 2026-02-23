import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateProductUseCase } from '../../application/product/create-product.usecase';
import { GetProductsUseCase } from '../../application/product/get-products.usecase';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import toResponseDto from './product.mapper';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProduct: CreateProductUseCase,
    private readonly getProducts: GetProductsUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'Product created',
    type: ProductResponseDto,
  })
  async create(
    @Body() body: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.createProduct.execute(body);
    return toResponseDto(product);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List all products',
    type: ProductResponseDto,
    isArray: true,
  })
  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.getProducts.execute();
    return products.map((p) => toResponseDto(p));
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get product by id',
    type: ProductResponseDto,
  })
  async findProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductResponseDto> {
    const product = await this.getProducts.find(id);
    return toResponseDto(product);
  }
}