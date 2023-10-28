import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from './base.dto';
import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { PaymentMethod, TypeArea, TypePrice } from '../utils/variables';
import { CategoryEntity, CommentEntity, UserEntity } from '../entities';

export class MotelDto extends BaseDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  thumbnails: string[];

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  area: number;

  @ApiProperty()
  @IsEnum(TypeArea)
  @IsNotEmpty()
  @Expose()
  unitArea: TypeArea;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  price: number;

  @ApiProperty()
  @IsEnum(TypePrice)
  @IsNotEmpty()
  @Expose()
  unitPrice: TypePrice;

  // @ApiProperty()
  // @IsEnum(PaymentMethod)
  // @IsNotEmpty()
  // @Expose()
  // paymentMethod: PaymentMethod;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  address: string;

  @ApiProperty()
  @Expose()
  longitude: number;

  @ApiProperty()
  @Expose()
  latitude: number;

  // @ApiProperty()
  // @Expose()
  // alias: string[];

  @ApiProperty()
  @Expose()
  rating: number;

  @ApiProperty()
  @Expose()
  isChecked: boolean;

  @ApiProperty()
  @Expose()
  bedRoomQuantity: number;

  @ApiProperty()
  @Expose()
  bathRoomQuantity: number;

  @ApiProperty()
  @Expose()
  carGarageQuantity: number;

  @ApiProperty()
  @Expose()
  closeTime: number;

  // @ApiProperty()
  // @Expose()
  // details: MotelDetailEntity[];

  @ApiProperty()
  @Expose()
  comments: CommentEntity[];

  @ApiProperty()
  @Expose()
  owner: UserEntity;
}

export class CreateMotelDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  description: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  thumbnails: string[];

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  area: number;

  @ApiProperty()
  @IsEnum(TypeArea)
  @IsOptional()
  @Expose()
  unitArea: TypeArea;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  price: number;

  @ApiProperty()
  @IsEnum(TypePrice)
  @IsOptional()
  @Expose()
  unitPrice: TypePrice;

  // @ApiProperty()
  // @IsEnum(PaymentMethod)
  // @IsNotEmpty()
  // @Expose()
  // paymentMethod: PaymentMethod;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  address: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  longitude: number;

  @ApiProperty()
  @IsOptional()
  @Expose()
  latitude: number;

  // @ApiProperty()
  // @IsOptional()
  // @Expose()
  // alias: string[];

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  bedRoomQuantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  bathRoomQuantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  carGarageQuantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  closeTime: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  owner: string;
}

export class CreateMotelParams {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  description: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  thumbnails: string[];

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  area: number;

  @ApiProperty()
  @IsEnum(TypeArea)
  @IsOptional()
  @Expose()
  unitArea: TypeArea;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  price: number;

  @ApiProperty()
  @IsEnum(TypePrice)
  @IsOptional()
  @Expose()
  unitPrice: TypePrice;

  // @ApiProperty()
  // @IsEnum(PaymentMethod)
  // @IsNotEmpty()
  // @Expose()
  // paymentMethod: PaymentMethod;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  address: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  longitude: number;

  @ApiProperty()
  @IsOptional()
  @Expose()
  latitude: number;

  // @ApiProperty()
  // @IsOptional()
  // @Expose()
  // alias: string[];

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  bedRoomQuantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  bathRoomQuantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  carGarageQuantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  closeTime: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  category: CategoryEntity;

  @ApiProperty()
  @Expose()
  owner: UserEntity;
}

export class UpdateMotelDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  ID: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  title: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  description: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  thumbnails: string[];

  @ApiProperty()
  @IsOptional()
  @Expose()
  area: number;

  @ApiProperty()
  @IsEnum(TypeArea)
  @IsOptional()
  @Expose()
  unitArea: TypeArea;

  @ApiProperty()
  @IsOptional()
  @Expose()
  price: number;

  @ApiProperty()
  @IsEnum(TypePrice)
  @IsOptional()
  @Expose()
  unitPrice: TypePrice;

  // @ApiProperty()
  // @IsEnum(PaymentMethod)
  // @IsOptional()
  // @Expose()
  // paymentMethod: PaymentMethod;

  @ApiProperty()
  @IsOptional()
  @Expose()
  address: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  longitude: number;

  @ApiProperty()
  @IsOptional()
  @Expose()
  latitude: number;

  // @ApiProperty()
  // @IsOptional()
  // @Expose()
  // alias: string[];

  @ApiProperty()
  @IsOptional()
  @Expose()
  bedRoomQuantity: number;

  @ApiProperty()
  @IsOptional()
  @Expose()
  bathRoomQuantity: number;

  @ApiProperty()
  @IsOptional()
  @Expose()
  carGarageQuantity: number;

  @ApiProperty()
  @IsOptional()
  @Expose()
  closeTime: number;

  @ApiProperty()
  @IsOptional()
  @Expose()
  category: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  owner: string;
}

export class UpdateMotelParams {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  ID: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  title: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  description: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  thumbnails: string[];

  @ApiProperty()
  @IsOptional()
  @Expose()
  area: number;

  @ApiProperty()
  @IsEnum(TypeArea)
  @IsOptional()
  @Expose()
  unitArea: TypeArea;

  @ApiProperty()
  @IsOptional()
  @Expose()
  price: number;

  @ApiProperty()
  @IsEnum(TypePrice)
  @IsOptional()
  @Expose()
  unitPrice: TypePrice;

  // @ApiProperty()
  // @IsEnum(PaymentMethod)
  // @IsOptional()
  // @Expose()
  // paymentMethod: PaymentMethod;

  @ApiProperty()
  @IsOptional()
  @Expose()
  address: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  longitude: number;

  @ApiProperty()
  @IsOptional()
  @Expose()
  latitude: number;

  // @ApiProperty()
  // @IsOptional()
  // @Expose()
  // alias: string[];

  @ApiProperty()
  @IsOptional()
  @Expose()
  bedRoomQuantity: number;

  @ApiProperty()
  @IsOptional()
  @Expose()
  bathRoomQuantity: number;

  @ApiProperty()
  @IsOptional()
  @Expose()
  carGarageQuantity: number;

  @ApiProperty()
  @IsOptional()
  @Expose()
  closeTime: number;

  @ApiProperty()
  @IsOptional()
  @Expose()
  category: CategoryEntity;

  @ApiProperty()
  @IsOptional()
  @Expose()
  owner: UserEntity;
}

export class SearchRooms {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  latitude: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  longitude: number;

  @ApiProperty()
  @IsOptional()
  @Expose()
  radius: number;
}

export class SearchByOwnerDto {
  ownerId: string;
  page: number;
  size: number;
}
