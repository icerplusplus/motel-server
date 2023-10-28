import { Injectable, BadRequestException } from '@nestjs/common';
import { Pagination } from '@/shared/utils/type';
import { OrdersCoreService } from '@/services/orders/orders.service';

@Injectable()
export class BillsService {
  constructor(private readonly orderSerivce: OrdersCoreService) {}

  async find(paginate: Pagination) {
    const orders = await this.orderSerivce.find(paginate);
    return {
      statusCode: 200,
      message: 'OK',
      data: orders,
    };
  }

  async findOne(id: string) {
    const order = await this.orderSerivce.findById(id);
    if (!order) throw new BadRequestException('Hoá đơn không tồn tại!');
    return {
      statusCode: 200,
      message: 'OK',
      data: order,
    };
  }

  async remove(id: string) {
    const isRemoved = await this.orderSerivce.delete(id);
    if (!isRemoved) throw new BadRequestException('Đã có lỗi khi xóa hóa đơn!');
    return {
      statusCode: 200,
      message: 'Hóa đơn đã được xóa.',
      data: null,
    };
  }
}
