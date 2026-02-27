import {
  IsOptional,
  IsString,
  IsNumber,
  IsMongoId,
} from 'class-validator';

export class UpdateDto {

  @IsMongoId()
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsNumber()
  price?: number;
}