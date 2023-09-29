import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';
import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class OtpDto extends BaseDto {
  @ApiProperty()
  @Expose()
  phoneNumber: string;

  @ApiProperty()
  @Expose()
  otp: string;

  @ApiProperty()
  @Expose()
  expirationTimestamp: Date;
}

export class CreateOtpDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  otp: string;
}
