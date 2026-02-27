import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import { Product } from './dto/product-schema';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
  ) {}

  async create(data: CreateDto) {
    try {
      return await this.productModel.create(data);
    } catch (error) {
      this.handleMongoError(error);
    }
  }

  async findAll() {
    return this.productModel.find();
  }

  async findOne(id: string) {
    try {
      return await this.productModel.findById(id);
    } catch (error) {
      this.handleMongoError(error);
    }
  }

  async update(id: string, data: UpdateDto) {
    try {
      return await this.productModel.findByIdAndUpdate(
        id,
        data,
        { new: true },
      );
    } catch (error) {
      this.handleMongoError(error);
    }
  }

  async remove(id: string) {
    try {
      await this.productModel.findByIdAndDelete(id);
      return { deleted: true };
    } catch (error) {
      this.handleMongoError(error);
    }
  }

  private handleMongoError(error: any): never {

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];

      throw new RpcException({
        statusCode: 400,
        message: `${field} already exists`,
      });
    }

    if (error.name === 'CastError') {
      throw new RpcException({
        statusCode: 400,
        message: 'Invalid ID format',
      });
    }

    throw new RpcException({
      statusCode: 500,
      message: 'Something went wrong',
    });
  }
}