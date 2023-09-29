import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { UsersCoreModule } from '@/services/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { FilesModule } from '@/services/files/files.module';
import { JwtStrategy, LocalStrategy } from '@/shared/strategies';
import { OtpsCoreModule } from '@/services/otps/otps.core.module';

@Module({
  imports: [
    // Config jwt service
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN },
    }),
    PassportModule,
    FilesModule,
    UsersCoreModule,
    OtpsCoreModule,
  ],
  controllers: [AuthsController],
  providers: [AuthsService, LocalStrategy, JwtStrategy],
  exports: [AuthsService],
})
export class AuthsModule {}
