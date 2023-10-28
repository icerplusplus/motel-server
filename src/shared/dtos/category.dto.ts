import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  name: string;
}

export class UpdateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  name: string;
}
