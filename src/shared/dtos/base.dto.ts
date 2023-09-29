import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BaseDto {
  @ApiProperty()
  @Expose()
  ID: string;

  @ApiProperty()
  @Expose()
  CreatedAt: Date;

  @ApiProperty()
  UpdatedAt: Date;

  @ApiProperty()
  DeletedAt: Date;

  //   static plainToClass<Type>(this: new (...args: any[]) => Type, obj: Type) {
  //     return plainToClass(this, obj, { excludeExtraneousValues: true });
  //   }
}
