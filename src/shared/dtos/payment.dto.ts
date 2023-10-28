import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PaymentMethod, PaymentStatus } from '../entities';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  customerId: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  productId: string;
}

export class UpdatePaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  orderId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  @Expose()
  status: PaymentStatus;

  @ApiProperty()
  @IsEnum(PaymentMethod)
  @Expose()
  method: PaymentMethod;
}
