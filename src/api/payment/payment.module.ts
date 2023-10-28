import { Module } from '@nestjs/common';
import { UsersCoreModule } from '@/services/users/users.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MotelsCoreModule } from '@/services/motels/motels.core.module';
import { OrdersCoreModule } from '@/services/orders/orders.module';

@Module({
  imports: [UsersCoreModule, MotelsCoreModule, OrdersCoreModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
