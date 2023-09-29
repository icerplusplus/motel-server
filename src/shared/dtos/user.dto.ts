import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { BaseDto } from './base.dto';
import {
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
  IsEmail,
  IsPhoneNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Roles } from '../utils/variables';

export class UserDto extends BaseDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  fullname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @IsStrongPassword()
  password: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @IsPhoneNumber('VN', { message: 'Số điện thoại không đúng định dạng' })
  @Transform(({ value }) => value.replace(/\D/g, '')) // remove all character except number
  @Expose()
  phoneNumber: string;

  @ApiProperty()
  @Expose()
  address: string;

  @ApiProperty()
  @Expose()
  birthDate: string;

  @ApiProperty()
  @Expose()
  gender: string;

  @ApiProperty()
  @Expose()
  avatar?: string;

  @ApiProperty()
  @IsEnum(Roles)
  @IsOptional()
  @Expose()
  role: Roles;

  @ApiProperty()
  token: string;
}

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  fullname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @Expose()
  phoneNumber: string;

  @ApiProperty()
  @Expose()
  address: string;

  @ApiProperty()
  @Expose()
  birthDate: string;

  @ApiProperty()
  @Expose()
  gender: string;

  @ApiProperty()
  @Expose()
  avatar?: string;

  @ApiProperty()
  @IsEnum(Roles)
  @IsOptional()
  @Expose()
  role: Roles;

  @ApiProperty()
  @IsEnum(Roles)
  @IsOptional()
  @Expose()
  token?: string;
}

export type CreateUserParams = CreateUserDto;

export type UpdateUserDto = Partial<{
  fullname: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  birthDate: string;
  gender: string;
  avatar: string;
  role: Roles;
  token: string;
}>;
export type UpdateUserParams = UpdateUserDto;
export type RefreshParams = Partial<UserDto>;
