import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateStoreDto {
  @ApiProperty({ example: 'Loja Bauru' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Rua rtx numero 100'})
  @IsString()
  address: string;

  @ApiProperty({ example: '9999-8888' })
  @IsString()
  phone: string;
}

