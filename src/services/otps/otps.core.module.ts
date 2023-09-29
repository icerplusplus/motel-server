import { OtpEntity } from '@/shared/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpsCoreService } from './otps.core.service';

@Module({
  imports: [TypeOrmModule.forFeature([OtpEntity])],
  providers: [OtpsCoreService],
  exports: [OtpsCoreService],
})
export class OtpsCoreModule {}
