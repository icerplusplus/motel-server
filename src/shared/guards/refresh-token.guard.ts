import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from '../decorators';
import { UserCoreService } from '@/services/users/users.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly userService: UserCoreService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    // Get request
    const request = context.switchToHttp().getRequest();

    // Extract refresh token from request
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    // Validate refresh_token
    const tokenIsValid = await this.validateRefreshToken(token);

    if (!tokenIsValid) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  private async validateRefreshToken(token: string): Promise<boolean> {
    // TODO: find user have this token
    const user = await this.userService.findByToken(token);

    return !!user;
  }
}
