import { Module } from '@nestjs/common';
import { BillsController } from './bills.controller';
import { OrdersCoreModule } from '@/services/orders/orders.module';
import { BillsService } from './bills.service';

@Module({
  imports: [OrdersCoreModule],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
