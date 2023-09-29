import { Module } from '@nestjs/common';
import { UserCoreService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/shared/entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserCoreService],
  exports: [UserCoreService],
})
export class UsersCoreModule {}
