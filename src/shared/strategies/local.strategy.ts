import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthsService } from '@/api/auths/auths.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authsService: AuthsService) {
    super({ usernameField: 'phoneNumber' }); // can replace default usernameField to email
  }

  async validate(phoneNumber: string, password: string): Promise<any> {
    // Check email and password fields
    if (!phoneNumber || !password)
      throw new UnauthorizedException(
        'Số điện thoại hoặc mật khẩu không chính xác!',
      );

    // Validate account
    const user = await this.authsService.validatePhoneNumber(
      phoneNumber,
      password,
    );

    // Check user exists
    if (!user) {
      throw new UnauthorizedException(
        'Số điện thoại hoặc mật khẩu không chính xác!',
      );
    }

    return user;
  }
}
