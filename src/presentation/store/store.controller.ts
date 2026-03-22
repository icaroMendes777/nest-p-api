import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateStoreUseCase } from '../../application/store/create-store.usecase';
import { GetStoresUseCase } from '../../application/store/get-stores.usecase';
import { CreateStoreDto } from './dto/create-store.dto';
import { StoreResponseDto } from './dto/store-response.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import toResponseDto from './store.mapper';

@ApiTags('stores')
@Controller('stores')
export class StoreController {
  constructor(
    private readonly createStore: CreateStoreUseCase,
    private readonly getStores: GetStoresUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new store' })
  @ApiResponse({
    status: 201,
    description: 'Store created',
    type: StoreResponseDto,
  })
  async create(
    @Body() body: CreateStoreDto,
  ): Promise<StoreResponseDto> {
    const store = await this.createStore.execute(body);
    return toResponseDto(store);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List all stores',
    type: StoreResponseDto,
    isArray: true,
  })
  async findAll(): Promise<StoreResponseDto[]> {
    const stores = await this.getStores.execute();
    return stores.map((p) => toResponseDto(p));
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get store by id',
    type: StoreResponseDto,
  })
  async findStore(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StoreResponseDto> {
    const store = await this.getStores.find(id);
    return toResponseDto(store);
  }
}