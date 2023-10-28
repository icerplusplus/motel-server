import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { STRIPE_CLIENT } from '../stripe/stripe.module';
import { CreatePaymentDto, UpdatePaymentDto } from '@/shared/dtos';
import { OrdersCoreService } from '@/services/orders/orders.service';
import { UserCoreService } from '@/services/users/users.service';
import { MotelsCoreService } from '@/services/motels/motels.core.service';
import Stripe from 'stripe';
import { PaymentStatus } from '@/shared/entities';
import { userWithoutPasswordField } from '@/shared/utils/function.global';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(STRIPE_CLIENT) private readonly stripeService: Stripe,
    private readonly orderCoreService: OrdersCoreService,
    private readonly userCoreService: UserCoreService,
    private readonly motelCoreService: MotelsCoreService,
  ) {}

  async create(params: CreatePaymentDto) {
    const customer = await this.stripeService.customers.create();
    const ephemeralKey = await this.stripeService.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2023-08-16' },
    );
    const paymentIntent = await this.stripeService.paymentIntents.create({
      amount: Math.floor(params.amount / 24500) * 100,
      currency: 'usd',
      payment_method_types: ['card'],
      customer: customer.id,
      // automatic_payment_methods: {
      //   enabled: true,
      // },
    });
    if (!paymentIntent.client_secret)
      throw new BadRequestException('Không thể gửi thông tin đến Stripe');

    // save order
    const user = await this.userCoreService.findById(params.customerId);
    const motel = await this.motelCoreService.findById(params.productId);
    if (!user || !motel)
      throw new BadRequestException(
        'Đã có lỗi trong quá trình lưu thông tin hóa hơn',
      );
    const newOrder = await this.orderCoreService.create({
      amount: params.amount,
      status: PaymentStatus.PENDING,
      user,
      motel,
    });

    if (!newOrder) throw new BadRequestException('Hóa đơn không được khởi tạo');

    return {
      statusCode: 200,
      message: 'OK',
      data: {
        orderId: newOrder.ID,
        paymentIntents: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
      },
    };
  }

  async update(params: UpdatePaymentDto) {
    const order = await this.orderCoreService.findById(params.orderId);
    if (!order)
      throw new BadRequestException('Thông tin hóa đơn không chính xác');
    const orderChangeStatus = await this.orderCoreService.update(order.ID, {
      ...order,
      status: params.status,
      method: params.method,
    });

    if (!orderChangeStatus)
      throw new BadRequestException(
        'Đã có lỗi trong quá trình cập nhật thông tin hóa đơn',
      );
    return {
      statusCode: 200,
      message: 'OK',
      data: orderChangeStatus,
    };
  }
}
