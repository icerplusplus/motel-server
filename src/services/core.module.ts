import { Module } from '@nestjs/common';
import { MotelsCoreModule } from './motels/motels.core.module';
import { MotelDetailsCoreModule } from './motel-details/motel-details.core.module';
import { FilesModule } from './files/files.module';
import { UsersCoreModule } from './users/users.module';
import { OtpsCoreModule } from './otps/otps.core.module';
import { CategoriesCoreModule } from './categories/categories.module';
import { OrdersCoreModule } from './orders/orders.module';

const coreModules = [
  MotelsCoreModule,
  MotelDetailsCoreModule,
  FilesModule,
  UsersCoreModule,
  OtpsCoreModule,
  CategoriesCoreModule,
  OrdersCoreModule,
];
@Module({
  imports: [...coreModules],
  exports: [...coreModules],
})
export class CoreModule {}
