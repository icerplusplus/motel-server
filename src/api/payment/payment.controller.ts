import { Controller, Post, Put, Body } from '@nestjs/common';
import { CreatePaymentDto, UpdatePaymentDto } from '@/shared/dtos';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/create-payment')
  async create(@Body() body: CreatePaymentDto) {
    return await this.paymentService.create(body);
  }

  @Put('/update-payment')
  async update(@Body() body: UpdatePaymentDto) {
    return await this.paymentService.update(body);
  }
}
