import { OtpEntity } from '@/shared/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { Repository } from 'typeorm';

@Injectable()
export class OtpsCleanerService {
  constructor(
    @InjectRepository(OtpEntity)
    private readonly otpRepo: Repository<OtpEntity>,
  ) {}

  // Clean otp
  @Cron('0 * * * *') // Run every minute (adjust the cron expression as needed)
  async handleCron() {
    console.log('cron is running');
    const currentTimestamp = new Date();
    await this.otpRepo
      .createQueryBuilder()
      .delete()
      .where('expirationTimestamp < :currentTimestamp', { currentTimestamp })
      .execute();
  }
}
