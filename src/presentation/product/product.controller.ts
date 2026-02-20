import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateProductUseCase } from '../../application/product/create-product.usecase';
import { GetProductsUseCase } from '../../application/product/get-products.usecase';

@Controller('products')
export class ProductController {
    constructor(
        private readonly createProduct: CreateProductUseCase,
        private readonly getProducts: GetProductsUseCase,
    ) { }

    @Post()
    create(@Body() body: any) {
        return this.createProduct.execute(body);
    }

    @Get()
    findAll() {
        return this.getProducts.execute();
    }

    @Get(':id')
    findProduct(@Param('id', ParseIntPipe) id: number,) {
        return this.getProducts.find(id);
    }
}
