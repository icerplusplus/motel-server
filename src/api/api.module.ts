import { Module } from '@nestjs/common';
import { MotelsModule } from './motels/motels.module';
import { MotelDetailsModule } from './motel-details/motel-details.module';
import { AuthsModule } from './auths/auths.module';
import { CategoriesModule } from './categories/categories.module';
import { StripeModule } from './stripe/stripe.module';
import { STRIPE } from '@/shared/utils/variables';
import { PaymentModule } from './payment/payment.module';
import { BillsModule } from './bills/bills.module';

const apis = [
  MotelsModule,
  MotelDetailsModule,
  AuthsModule,
  CategoriesModule,
  PaymentModule,
  BillsModule,
  StripeModule.forRoot(STRIPE.SECRET_KEY, { apiVersion: '2023-08-16' }),
];

@Module({
  imports: [...apis],
  exports: [...apis],
})
export class ApiModule {}
