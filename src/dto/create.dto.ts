import {
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  price: number;
}