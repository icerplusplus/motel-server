import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import {
  MotelEntity,
  PaymentMethod,
  PaymentStatus,
  UserEntity,
} from '../entities';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  @Expose()
  status: PaymentStatus;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  motel: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  user: string;
}

export class CreateOrderParams {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  @Expose()
  status: PaymentStatus;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  motel: MotelEntity;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  user: UserEntity;
}

export class UpdateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  ID: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  amount: number;

  @ApiProperty()
  @IsEnum(PaymentStatus)
  @Expose()
  status: PaymentStatus;

  @ApiProperty()
  @IsEnum(PaymentMethod)
  @Expose()
  method: PaymentMethod;

  @ApiProperty()
  @Expose()
  motel: string;

  @ApiProperty()
  @Expose()
  user: string;
}

export class UpdateOrderParams {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  ID: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  @Expose()
  status: PaymentStatus;

  @ApiProperty()
  @IsEnum(PaymentMethod)
  @Expose()
  method: PaymentMethod;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  motel: MotelEntity;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  user: UserEntity;
}
