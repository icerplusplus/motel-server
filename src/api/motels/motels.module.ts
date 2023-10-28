import { Module } from '@nestjs/common';
import { MotelsService } from './motels.service';
import { MotelsCoreModule } from '@/services/motels/motels.core.module';
import { MotelsController } from './motels.controller';
import { FilesModule } from '@/services/files/files.module';
import { CategoriesCoreModule } from '@/services/categories/categories.module';
import { UsersCoreModule } from '@/services/users/users.module';

@Module({
  imports: [
    MotelsCoreModule,
    FilesModule,
    CategoriesCoreModule,
    UsersCoreModule,
  ],
  controllers: [MotelsController],
  providers: [MotelsService],
  exports: [MotelsService],
})
export class MotelsModule {}
