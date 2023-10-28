import { CreateOtpDto } from '@/shared/dtos';
import { OtpEntity } from '@/shared/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OtpsCoreService {
  constructor(
    @InjectRepository(OtpEntity)
    private readonly otpRepo: Repository<OtpEntity>,
  ) {}

  // Generate OTP
  async generate() {
    return this.generateRandomNumericOTP(6);
  }

  private generateRandomNumericOTP(length: number): string {
    const chars = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      otp += chars[randomIndex];
    }
    return otp;
  }

  async create(createOtpDto: CreateOtpDto) {
    const newOtp = this.otpRepo.create({
      ...createOtpDto,
      expirationTimestamp: new Date(Date.now() + 5 * 60 * 1000),
    });
    return await this.otpRepo.save(newOtp);
  }

  // Find otp
  async findByPhone(phoneNumber: string) {
    const latestOtp = await this.otpRepo.find({
      where: { phoneNumber },
      order: { CreatedAt: 'DESC' },
    });

    if (!latestOtp || latestOtp.length === 0) return null;
    return latestOtp[0];
  }
}
