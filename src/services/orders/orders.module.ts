import { Module } from '@nestjs/common';
import { OrdersCoreService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '@/shared/entities';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  providers: [OrdersCoreService],
  exports: [OrdersCoreService],
})
export class OrdersCoreModule {}
