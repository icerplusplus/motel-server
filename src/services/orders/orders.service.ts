import { CreateOrderParams, UpdateOrderParams } from '@/shared/dtos';
import { OrderEntity } from '@/shared/entities';
import { userWithoutPasswordField } from '@/shared/utils/function.global';
import { Pagination } from '@/shared/utils/type';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersCoreService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}
  async find(pagination: Pagination) {
    const [list, count] = await this.orderRepository.findAndCount({
      relations: ['motel', 'user'],
      order: {
        CreatedAt: 'DESC',
      },
      skip: (pagination.page - 1) * pagination.size,
      take: pagination.size,
    });

    return {
      orders: list.map((order) => ({
        ...order,
        user: userWithoutPasswordField(order.user),
      })),
      pagination: {
        ...pagination,
        count,
      },
    };
  }
  async findById(id: string) {
    const order = await this.orderRepository.findOne({
      where: { ID: id },
      relations: ['motel', 'user'],
    });
    return {
      ...order,
      user: userWithoutPasswordField(order.user),
    };
  }

  async create(params: CreateOrderParams) {
    const newOrder = this.orderRepository.create(params);
    const result = await this.orderRepository.save(newOrder);
    return {
      ...result,
      user: userWithoutPasswordField(result.user),
    };
  }

  async update(id: string, params: UpdateOrderParams) {
    const order = await this.findById(id);
    if (!order)
      throw new BadRequestException('Thông tin hóa đơn không chính xác');
    const result = await this.orderRepository.save({ ...order, ...params });
    return {
      ...result,
      user: userWithoutPasswordField(result.user),
    };
  }

  async delete(id: string): Promise<boolean> {
    const order = await this.findById(id);
    if (!order)
      throw new BadRequestException('Thông tin hóa đơn không chính xác');
    const result = await this.orderRepository.softDelete(id);
    return result.affected > 0;
  }
}
