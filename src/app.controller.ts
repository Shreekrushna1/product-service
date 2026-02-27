import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Controller()
export class AppController {

  constructor(private readonly service: AppService) {}

  @MessagePattern('create_product')
  create(@Payload() data: CreateDto) {
    return this.service.create(data);
  }

  @MessagePattern('findAll_products')
  findAll() {
    return this.service.findAll();
  }

  @MessagePattern('findOne_product')
  findOne(@Payload() id: string) {
    return this.service.findOne(id);
  }

  @MessagePattern('update_product')
  update(@Payload() data: UpdateDto & {id:string}) {
    return this.service.update(data.id, data);
  }

  @MessagePattern('remove_product')
  remove(@Payload() id: string) {
    return this.service.remove(id);
  }
}